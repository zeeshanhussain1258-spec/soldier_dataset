import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-tactical-500',
    red: 'border-alert-500',
    yellow: 'border-warning-500'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      border-2 ${colorClasses[color]} border-t-transparent 
      rounded-full animate-spin
    `} />
  );
};