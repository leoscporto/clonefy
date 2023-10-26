"use client";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";

import "apexcharts/dist/apexcharts.css";
import { DailyValue, extractDate, extractValues } from "@data/dailyValue";
import {
  formatDate,
  formatDateWithHours,
  isSameDay,
} from "@utils/dateProcessing";
import {
  parseCommaDecimalNumber,
  simplifyNumber,
} from "@utils/numberProcessing";

import "@styles/apexchartstyles.css"

interface ProductSellingGraphInterface {
  dailyValues: DailyValue[];
  sameDay: boolean;
}

export interface GraphDetails {
  x: Date;
  y: number;
  z: number;
}

const ProductSellingGraph = ({
  dailyValues,
  sameDay,
}: ProductSellingGraphInterface) => {
  const [values, setValues] = useState<number[]>([]);
  const [dataset, setDataset] = useState<GraphDetails[]>([]);
  const [categories, setCategories] = useState<Date[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const dates = extractDate(dailyValues);
    const [v, d] = extractValues(dailyValues, dates);

    setCategories(dates);
    setDataset(d);
    setValues(v);
  }, [dailyValues]);

  const chartData = [
    {
      name: "Valor",
      data: dataset,
      line: {
        strokeWidth: 3,
      },
    },
  ];

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const chartOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      width: 250,
      zoom: {
        enabled: false,
      },
    },
    forecastDataPoints: {
      count: 1,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#5555e8"],
    stroke: {
      width: 2,
    },
    grid: {
      show: true,
      padding: {
        top: 5,
        right: 35,
        bottom: 0,
        left: 50,
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: "#e3e3e3",
        strokeWidth: 2,
      },
      labels: {
        formatter: (value: string) => {
          let date = new Date(value);

          if (
            isSameDay(categories[0], date, true) ||
            isSameDay(categories[categories.length - 1], date, true)
          ) {
            if (sameDay) return formatDateWithHours(date);
            return formatDate(date, true);
          }

          return "";
        },
        rotate: 0,
        style: {
          colors: "gray",
          fontSize: "12px",
        },
      },
      tooltip: {
        enabled: false,
      }
    },
    yaxis: {
      min: minValue,
      max: maxValue,
      opposite: true,

      labels: {
        formatter: (value, opts) => {
          const v = Math.round(value);
          const onlyZero = minValue === maxValue;

          if (onlyZero && opts === 0) {
            return "R$ 0,00";
          } else if (onlyZero) {
            return "";
          }

          if (v === minValue) {
            return `R$ ${simplifyNumber(value)}`;
          }
          if (v === maxValue) {
            return `R$ ${simplifyNumber(value)}`;
          }

          return "";
        },
        style: {
          colors: "gray",
          fontSize: "12px",
          fontWeight: 500,
        },
        offsetX: 25,
      },
    },
    tooltip: {
      x: {
        formatter: (value: number) => {
          return `${
            sameDay
              ? formatDateWithHours(categories[value - 1])
              : formatDate(categories[value - 1], true)
          }`;
        },
      },
      y: {
        title: {
          formatter: (seriesName: string) => "R$",
        },
        formatter: (value: any) => `${parseCommaDecimalNumber(value)}`,
      },
      z: {
        title: "Vendas: ",
        formatter: (value: any) => ` ${value.toFixed(0)}`,
      },
      marker: {
        show: false,
      },
    },
  };
  return (
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        height={180}
      />
  );
};

export default ProductSellingGraph;
