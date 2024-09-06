'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StockChartProps } from '@/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.Date),
    datasets: [
      {
        label: 'Open Price',
        data: data.map((d) => d.open),
        borderColor: 'rgba(90, 90, 90,1)',
        fill: false,
      },
      {
        label: 'Highest Price',
        data: data.map((d) => d.high),
        borderColor: 'rgba(106, 90, 205,1)',
        fill: false,
      },
      {
        label: 'Lowest Price',
        data: data.map((d) => d.low),
        borderColor: 'rgba(255, 165, 0,1)',
        fill: false,
      },
      {
        label: 'Close Price',
        data: data.map((d) => d.close),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Daily Return (%)',
        data: data.map((d) => d.dailyReturn),
        borderColor: 'rgba(255,99,132,1)',
        fill: true,
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
      },
      'y-axis-2': {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return (
    <div className="mt-8">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
