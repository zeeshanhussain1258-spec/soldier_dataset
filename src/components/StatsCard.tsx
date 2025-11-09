import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red';
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
}

const colorClasses = {
  blue: {
    bg: 'bg-military-50',
    icon: 'text-military-600',
    text: 'text-military-900',
    accent: 'text-military-600',
    border: 'border-military-200',
    glow: 'hover:shadow-military-500/20'
  },
  green: {
    bg: 'bg-tactical-50',
    icon: 'text-tactical-600',
    text: 'text-tactical-900',
    accent: 'text-tactical-600',
    border: 'border-tactical-200',
    glow: 'hover:shadow-tactical-500/20'
  },
  yellow: {
    bg: 'bg-warning-50',
    icon: 'text-warning-600',
    text: 'text-warning-900',
    accent: 'text-warning-600',
    border: 'border-warning-200',
    glow: 'hover:shadow-warning-500/20'
  },
  red: {
    bg: 'bg-alert-50',
    icon: 'text-alert-600',
    text: 'text-alert-900',
    accent: 'text-alert-600',
    border: 'border-alert-200',
    glow: 'hover:shadow-alert-500/20'
  }
};

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  percentage, 
  trend = 'stable' 
}) => {
  const classes = colorClasses[color];

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6 
      hover:shadow-xl transition-all duration-300 hover:scale-105
      ${classes.border} ${classes.glow} group animate-slide-up
      relative overflow-hidden
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-military-pattern opacity-5" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-military-600 mb-2 uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline space-x-3">
            <p className={`text-3xl font-bold ${classes.text} transition-colors duration-300`}>
              <AnimatedCounter value={value} />
            </p>
            {percentage !== undefined && (
              <p className={`text-sm font-bold ${classes.accent} transition-colors duration-300`}>
                ({percentage.toFixed(1)}%)
              </p>
            )}
          </div>
          
          {/* Trend Indicator */}
          {trend !== 'stable' && (
            <div className={`
              mt-2 text-xs font-medium flex items-center space-x-1
              ${trend === 'up' ? 'text-tactical-600' : 'text-alert-600'}
            `}>
              <span className={`
                w-0 h-0 border-l-2 border-r-2 border-transparent
                ${trend === 'up' 
                  ? 'border-b-4 border-b-tactical-600' 
                  : 'border-t-4 border-t-alert-600'
                }
              `} />
              <span>{trend === 'up' ? 'Trending up' : 'Trending down'}</span>
            </div>
          )}
        </div>
        
        <div className={`
          p-4 rounded-xl ${classes.bg} transition-all duration-300 
          group-hover:scale-110 group-hover:rotate-3
        `}>
          <div className={`${classes.icon} transition-colors duration-300`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};