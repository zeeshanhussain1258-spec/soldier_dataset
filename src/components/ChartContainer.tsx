import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ChartContainerProps {
  title: string;
  data: Record<string, number>;
  type: 'doughnut' | 'bar';
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, data, type }) => {
  const colors = [
    '#627d98', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#486581'
  ];

  const chartData = {
    labels: Object.keys(data).map(key => key.replace(/_/g, ' ')),
    datasets: [
      {
        label: 'Count',
        data: Object.values(data),
        backgroundColor: type === 'doughnut' 
          ? colors.slice(0, Object.keys(data).length)
          : colors[0] + 'CC',
        borderColor: type === 'doughnut' 
          ? colors.slice(0, Object.keys(data).length)
          : colors[0],
        borderWidth: type === 'doughnut' ? 3 : 2,
        borderRadius: type === 'bar' ? 8 : 0,
        hoverBackgroundColor: type === 'doughnut' 
          ? colors.slice(0, Object.keys(data).length).map(c => c + 'DD')
          : colors[0] + 'EE',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: type === 'doughnut' ? 'right' : 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600' as const,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 138, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#627d98',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    ...(type === 'bar' && {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              weight: '600' as const,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(98, 125, 152, 0.1)',
          },
          ticks: {
            font: {
              weight: '600' as const,
            },
          },
        },
      },
    }),
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-military-200 hover:shadow-2xl transition-all duration-300 animate-scale-in group">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-4 h-4 bg-gradient-to-r from-military-500 to-tactical-500 rounded-full animate-pulse" />
        <h3 className="text-lg font-bold text-military-900 group-hover:text-military-800 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <div className="h-80 relative">
        {type === 'doughnut' ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};