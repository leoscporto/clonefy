"use client";
import DashboardItems from "./DashboardItems";
import DashboardHeader from "./DashboardHeader";
import { ProductsRevenueDetails } from "@data/productRevenue";
import { useEffect, useState } from "react";
import { DailyValue, calculateDailyValues } from "@data/dailyValue";
import { generateTransactions } from "@data/transaction";
import { faker } from "@faker-js/faker";
import {
  formatDate2,
  getDaysBetweenDates,
  getSimpleDateHash,
  isSameDay,
} from "@utils/dateProcessing";
import { sleep } from "@utils/await";

import PocketBase from "pocketbase";
import { databaseIP } from "@data/database";

const pb = new PocketBase(databaseIP);

export default function Dashboard() {
  const [productRevenue, setProductRevenue] = useState<ProductsRevenueDetails>({
    aprovacaoPorcentagem: 0,
    reembolsoPorcentagem: 0,
    chargebackPorcentagem: 0,
    valorLiquido: 0,
    numVendas: 0,
    vendasClickCloneFy: 0,
    conversaoBoletoPorcentagem: 0,
    numBoletosGerados: 0,
    vendasClickCloneFyPorcentagem: 0,
  });
  const [dailyValues, setDailyValues] = useState<DailyValue[]>([]);

  const [dateInterval, setDateInterval] = useState<[Date, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("Todos os produtos");
  const [sameDay, setSameDay] = useState(false);

  const retrieveTransactionsAndDailyValues = async (
    product: string,
    start: Date,
    end: Date | null
  ) => {
    let numDaysBetween = 1;
    setLoading(true);
    let hash = 0;
    if (end === null || isSameDay(start, end)) hash = getSimpleDateHash(start);
    else {
      hash = getSimpleDateHash(start) + getSimpleDateHash(end);
      numDaysBetween = getDaysBetweenDates(start, end);
    }

    faker.seed(hash);
    const today = new Date();

    let aprovacao = 0;
    let reembolso = 0;
    let chargeback = 0;
    let valorLiquido = 0;
    let numVendas = 0;
    let vendasClickCloneFy = 0;
    let conversaoBoleto = 0;

    let record;

    try {
      const startDate = formatDate2(start, false);
      const endDate = formatDate2(
        end ?? start,
        false
      );

      console.log(startDate,endDate);
      
      record = await pb
        .collection("vendasTotaisCloneFy")
        .getFirstListItem(
          `start="${startDate}" && end="${endDate}"`
        );
    } catch (e) {
      console.log(e);
    }
    
    if (record) {
      numVendas = record.vendas;
    } else {
      numVendas =
        start > today
          ? 0
          : faker.datatype.number({
              min: 121 * numDaysBetween,
              max: 321 * numDaysBetween,
            });
    }
    
    const productRevenueDetails: ProductsRevenueDetails = {
      aprovacaoPorcentagem: 0,
      reembolsoPorcentagem: 0,
      chargebackPorcentagem: 0,
      valorLiquido: 0,
      numVendas: 0,
      vendasClickCloneFy: 0,
      conversaoBoletoPorcentagem: 0,
      numBoletosGerados: 0,
      vendasClickCloneFyPorcentagem: 0,
    };

    let randomTransactions = generateTransactions(
      product,
      numVendas,
      start,
      end
    );    
      
    const [total, dailyV] = await calculateDailyValues(
      product,
      randomTransactions,
      start,
      end
    );

    dailyV.forEach((value) => (numVendas += value.numSells));

    if (numVendas !== 0) {
      for (const tr of randomTransactions) {
        aprovacao = tr.refund ? aprovacao : aprovacao + 1;
        reembolso = tr.refund ? reembolso + 1 : reembolso;
        chargeback = tr.chargeback ? chargeback + 1 : chargeback;
        vendasClickCloneFy = tr.one_click
          ? vendasClickCloneFy + faker.datatype.number({ min: 15, max: 135 })
          : vendasClickCloneFy;

        conversaoBoleto = tr.boleto_conversion
          ? conversaoBoleto + 1
          : conversaoBoleto;
      }

      valorLiquido = total;

      (productRevenueDetails.aprovacaoPorcentagem =
        (aprovacao / numVendas) * 100),
        (productRevenueDetails.reembolsoPorcentagem =
          (reembolso / numVendas) * 100),
        (productRevenueDetails.chargebackPorcentagem =
          (chargeback / numVendas) * 100),
        (productRevenueDetails.valorLiquido = valorLiquido),
        (productRevenueDetails.numVendas = numVendas),
        (productRevenueDetails.vendasClickCloneFy = vendasClickCloneFy),
        (productRevenueDetails.conversaoBoletoPorcentagem =
          (conversaoBoleto / numVendas) * 100),
        (productRevenueDetails.numBoletosGerados = conversaoBoleto),
        (productRevenueDetails.vendasClickCloneFyPorcentagem =
          (vendasClickCloneFy / valorLiquido) * 100 ?? 0);
    }
    await sleep(1);

    setLoading(false);
    setDailyValues(dailyV);
    setProductRevenue(productRevenueDetails);
  };

  const dateIntervalChanged = (dates: [Date | null, Date | null]) => {
    const start = dates[0] ?? new Date();
    const end = dates[1];

    setDateInterval([start, end]);
    setSameDay(isSameDay(start, end) || end === null);
    retrieveTransactionsAndDailyValues(product, start, end);
  };

  const productChangedHandler = (product: string) => {
    setProduct(product);
    retrieveTransactionsAndDailyValues(
      product,
      dateInterval[0],
      dateInterval[1]
    );
  };

  useEffect(() => {
    dateIntervalChanged(dateInterval);
  }, [dateInterval[0], dateInterval[1]]);

  useEffect(() => {
    pb.collection("vendasTotaisCloneFy").subscribe("*", function (e) {
      retrieveTransactionsAndDailyValues(
        product,
        dateInterval[0],
        dateInterval[1]
      );
    });
    pb.collection("datesCloneFy").subscribe("*", function (e) {
      retrieveTransactionsAndDailyValues(
        product,
        dateInterval[0],
        dateInterval[1]
      );
    });
  }, []);

  return (
    <div className="container mx-auto sm:px-6 md:px-20 py-10 lg:py-12 relative w-full 2xl:w-9/12 animate-fadein">
      <DashboardHeader
        dateInterval={dateInterval}
        isDataLoading={loading}
        onDateChange={dateIntervalChanged}
        onProductChange={productChangedHandler}
      />
      <DashboardItems
        dateInterval={dateInterval}
        sameDay={sameDay}
        details={productRevenue}
        dailyValues={dailyValues}
      />
    </div>
  );
}
