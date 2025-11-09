import React from 'react';

interface StatusBadgeProps {
  status: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, pulse = false }) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      'Stable_Condition': {
        bg: 'bg-tactical-100',
        text: 'text-tactical-800',
        border: 'border-tactical-300',
        dot: 'bg-tactical-500'
      },
      'Heat_Stress': {
        bg: 'bg-warning-100',
        text: 'text-warning-800',
        border: 'border-warning-300',
        dot: 'bg-warning-500'
      },
      'Severe_Hyperthermia': {
        bg: 'bg-alert-100',
        text: 'text-alert-800',
        border: 'border-alert-300',
        dot: 'bg-alert-500'
      },
      'Critical_Hypoxemia': {
        bg: 'bg-alert-100',
        text: 'text-alert-800',
        border: 'border-alert-300',
        dot: 'bg-alert-500'
      },
      'Hypothermia': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        dot: 'bg-blue-500'
      },
      'Cardio_Respiratory_Stress': {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-300',
        dot: 'bg-orange-500'
      }
    };

    return configs[status as keyof typeof configs] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300',
      dot: 'bg-gray-500'
    };
  };

  const config = getStatusConfig(status);

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
      ${config.bg} ${config.text} ${config.border}
      transition-all duration-200 hover:scale-105
    `}>
      <span className={`
        w-2 h-2 rounded-full mr-2 ${config.dot}
        ${pulse ? 'animate-pulse' : ''}
      `} />
      {status.replace(/_/g, ' ')}
    </span>
  );
};