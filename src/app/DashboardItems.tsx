"use client";

import ProductSellingGraph from "@components/Graphs/ProductSellingGraph";
import { HiCreditCard, HiHashtag } from "react-icons/hi";
import { BiBlock } from "react-icons/bi";
import { parseCommaDecimalNumber } from "@utils/numberProcessing";
import { ProductsRevenueDetails } from "@data/productRevenue";
import { DailyValue } from "@data/dailyValue";
import MoneyIcon from "@components/Icons/MoneyIcon";
import StockUpIcon from "@components/Icons/StockUpIcon";
import GlobalIcon from "@components/Icons/GlobalIcon";
import PorcentageFlagIcon from "@components/Icons/PorcentageFlagIcon";
import RefundFlagIcon from "@components/Icons/RefundFlagIcon";
import HelpIcon from "@components/Icons/HelpIcon";
import { ReactNode, useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { formatDate2, isSameDay } from "@utils/dateProcessing";
import { databaseIP } from "@data/database";

const pb = new PocketBase(databaseIP);

interface DashboardItemsProps {
  details: ProductsRevenueDetails;
  dailyValues: DailyValue[];
  sameDay: boolean;
  dateInterval: [Date, Date | null];
}

export default function DashboardItems({
  details,
  dailyValues,
  sameDay,
  dateInterval,
}: DashboardItemsProps) {
  const [numVendas, setNumVendas] = useState(details.numVendas);

  const changeNumSells = async () => {
    const start: Date = dateInterval[0];
    const end: Date = dateInterval[1] ?? dateInterval[0];

    try {
      const record = await pb
        .collection("vendasTotaisCloneFy")
        .getFirstListItem(
          `start="${formatDate2(start, false)}" && end="${formatDate2(
            end,
            false
          )}"`
        );

      await pb.collection("vendasTotaisCloneFy").update(record.id, {
        vendas: numVendas,
        start: formatDate2(start, false),
        end: formatDate2(end, false),
      });
    } catch (e) {
      const newRecord = await pb.collection("vendasTotaisCloneFy").create({
        vendas: numVendas,
        start: formatDate2(start, false),
        end: formatDate2(end, false),
      });
    }

    if (isSameDay(start, end)) {
      try {
        const record = await pb
          .collection("datesCloneFy")
          .getFirstListItem(`date="${formatDate2(start, false)}"`);

        await pb.collection("datesCloneFy").update(record.id, {
          date: formatDate2(start, false),
          numVendas: numVendas,
        });
      } catch (e) {
        const newRecord = await pb.collection("datesCloneFy").create({
          date: formatDate2(start, false),
          numVendas: numVendas,
        });
      }
    }
  };

  useEffect(() => {
    setNumVendas(details.numVendas);
  }, [details]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex w-full">
          <div className="shadow rounded-lg bg-white w-full">
            <ProductSellingGraph dailyValues={dailyValues} sameDay={sameDay} />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 gap-5">
          <InformationCard
            title="Valor líquido"
            information={`R$ ${parseCommaDecimalNumber(details.valorLiquido)}`}
            icon={<MoneyIcon />}
          />
          <InformationCard
            title="Vendas"
            information={`${numVendas}`}
            icon={<StockUpIcon />}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="mt-2 lg:mt-0 grid grid-cols-1 gap-5 w-full">
              <InformationCard
                title="Aprovação cartão"
                information={`${details.aprovacaoPorcentagem.toFixed(0)} %`}
                icon={
                  <HiCreditCard
                    className="justify-center fill-gray-400"
                    size={24}
                  />
                }
              />
              <InformationCard
                title="Reembolso"
                information={`${details.reembolsoPorcentagem.toFixed(0)} %`}
                icon={<RefundFlagIcon />}
              />
              <InformationCard
                title="Chargeback"
                information={`${details.chargebackPorcentagem.toFixed(0)} %`}
                icon={
                  <BiBlock className="justify-center fill-gray-400" size={24} />
                }
              />
            </div>
            <div className="mt-2 lg:mt-0 grid grid-cols-1 gap-5 w-full">
              <InformationCard
                title="Vendas 1-click da rede CloneFy"
                information={`R$ ${parseCommaDecimalNumber(
                  details.vendasClickCloneFy
                )}`}
                icon={<GlobalIcon />}
                lateralIcon={<HelpIcon />}
                additionalText={`${details.vendasClickCloneFyPorcentagem.toFixed(
                  0
                )}%`}
              />
              <InformationCard
                title="Conversão boleto"
                information={`${details.conversaoBoletoPorcentagem.toFixed(
                  0
                )} %`}
                icon={<PorcentageFlagIcon />}
              />
              <InformationCard
                title="Boletos gerados"
                information={`${details.numBoletosGerados}`}
                icon={
                  <HiHashtag
                    className="justify-center fill-gray-400"
                    size={24}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InformationCardProps {
  title: string;
  information: string;
  icon: ReactNode;
  lateralIcon?: ReactNode;
  className?: string;
  additionalText?: string;
}

function InformationCard({
  title,
  additionalText,
  information,
  icon,
  lateralIcon,
  className,
}: InformationCardProps) {
  return (
    <div
      className={`bg-white px-5 py-5 rounded-lg drop-shadow h-22 flex items-center ${className}`}
    >
      <div className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-gray-500">{title}</h2>
            {lateralIcon}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-900 font-[450]">{information}</p>
            <p className="text-gray-500">{additionalText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
