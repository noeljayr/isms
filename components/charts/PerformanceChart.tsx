"use client";

import { gradesData } from "@/app/pages/grades/StudentGrades";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Average Academic Performance Over 4 Terms",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `Score: ${context.parsed.y}%`,
      },
    },
  },
  scales: {
    y: {
      title: {
        display: false,
        text: "Average Score (%)",
      },
      grid: {
        // light horizontal lines
        color: "rgba(0,0,0,0.05)",
        display: false,
      },
    },
    x: {
      title: {
        display: false,
        text: "Term",
      },
      grid: {
        // light horizontal lines
        color: "rgba(0,0,0,0.05)",
        display: false,
      },
    },
  },
};

const PerformanceChart: React.FC = () => {
  const [datasets, setDatasets] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const data: number[] = [];
    const labels: string[] = [];
    gradesData.forEach((grade) => {
      data.push(grade.average);
      labels.push(grade.class);
    });
    setDatasets(data);
    setLabels(labels);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average Score",
        data: datasets,
        borderColor: "#0008cc",
        backgroundColor: "#0008cc",
        fill: true,
        tension: 0.3,
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  return <Line className="font-p-3" width="100%" height="100%" data={data} options={options} />;
};

export default PerformanceChart;
