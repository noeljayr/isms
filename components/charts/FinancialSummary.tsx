"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2020", "2021", "2022", "2023", "2024", "2025"];

// Raw data in “units” (e.g. 1 = 1 dollar); we'll format ticks to k/M
const feesPaid = [2000000, 4500000, 1500000, 3000000, 6000000, 2500000];
const outstanding = [200000, 400000, 100000, 800000, 200000, 700000];

const data = {
  labels,
  datasets: [
    {
      label: "Fees paid",
      data: feesPaid,
      borderColor: "#0008cc",
      backgroundColor: "#0008cc",
      tension: 0.3,
      pointStyle: "circle",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    },
    {
      label: "Outstanding fees",
      data: outstanding,
      borderColor: "#ffc801",
      backgroundColor: "#ffc801",
      tension: 0.3,
      pointStyle: "circle",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: ({ dataset, parsed }) => {
          // format tooltip values
          const v = parsed.y as number;
          if (v >= 1e6) return `${dataset.label}: ${(v / 1e6).toFixed(1)}M`;
          return `${dataset.label}: ${(v / 1e3).toFixed(0)}k`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => {
          // format axis ticks to k/M
          if (Number(value) >= 1e6) return `${Number(value) / 1e6}M`;
          return `${Number(value) / 1e3}k`;
        },
        font: {
          size: 11,
          family: "Lexend",
        },
      },
      grid: {
        // light horizontal lines
        color: "rgba(0,0,0,0.05)",
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
          family: "Lexend",
        },
      },
    },
  },
};

export const FinancialSummary: React.FC = () => {
  return <Line options={options} data={data} />;
};
