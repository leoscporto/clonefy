import {
  formatDate2,
  getEndOfDay,
  getStartOfDay,
  isSameDay,
} from "@utils/dateProcessing";
import { Transaction } from "./transaction";
import { faker } from "@faker-js/faker";
import { GraphDetails } from "@components/Graphs/ProductSellingGraph";
import PocketBase, { Record } from "pocketbase";
import { databaseIP } from "@data/database";

const pb = new PocketBase(databaseIP);

export interface DailyValue {
  date: Date;
  value: number;
  numSells: number;
}

export function extractValues(
  dailyValues: DailyValue[],
  dates: Date[]
): [number[], GraphDetails[]] {
  const dataset: GraphDetails[] = [];
  const values: number[] = [];
  for (let i = 0; i < dailyValues.length; i++) {
    dataset.push({
      x: dates[i],
      y: dailyValues[i].value,
      z: dailyValues[i].numSells,
    });
    values.push(dailyValues[i].value);
  }

  return [values, dataset];
}

export function extractDate(dailyValues: DailyValue[]): Date[] {
  return dailyValues.map((dailyValue) => dailyValue.date);
}

export async function calculateDailyValues(
  product: string,
  transactions: Transaction[],
  startDate: Date,
  endDate: Date | null
): Promise<[number, DailyValue[]]> {
  const dailyValues: DailyValue[] = [];
  let totalValue = 0;
  const today = new Date();

  // Create a copy of the start date so we can modify it without affecting the original
  const currentDate = getStartOfDay(startDate);
  let end = new Date();

  if (endDate === null) {
    end = getEndOfDay(startDate);
  } else {
    end = getEndOfDay(endDate);
  }

  let dateVendasRecords: Record[] = [];

  try {
    const record = await pb.collection("datesCloneFy").getList();

    dateVendasRecords = record.items;
  } catch (e) {
    console.log("datesCloneFy:", e);
  }

  const sameDay = isSameDay(startDate, end);

  // Loop through each day between the start date and end date

  while (currentDate <= end) {
    // Filter the transactions array to get only the transactions that occurred on the current date
    const transactionsOnDate = transactions.filter((transaction) => {
      if (sameDay) {
        return (
          transaction.transaction_date.getHours() === currentDate.getHours()
        );
      }
      return isSameDay(transaction.transaction_date, currentDate);
    });

    let numSells = currentDate > today ? 0 : transactionsOnDate.length;

    const existSellOnThisDate = dateVendasRecords.find(
      (record) => record.date === formatDate2(currentDate, sameDay)
    );

    if (existSellOnThisDate) {
      numSells = existSellOnThisDate.numVendas;
    }

    let valueOnDate = 0;
    for (let i = 0; i < numSells; i++) {
      valueOnDate += faker.datatype.number({ min: 65, max: 189 });
    }

    // Add an object to the dailyValues array that contains the current date and the value generated on that date
    dailyValues.push({
      date: new Date(currentDate.getTime()),
      value: valueOnDate,
      numSells: numSells,
    });

    totalValue += valueOnDate;

    // Move to the next day or increment hours if it's the same day
    currentDate.setHours(currentDate.getHours() + 1);
    if (currentDate.getHours() == 23) {
      currentDate.setMinutes(59);
    }
  }

  return [totalValue, dailyValues];
}
