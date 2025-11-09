import React from 'react';
import { SoldierData } from '../types/soldier';
import { StatusBadge } from './StatusBadge';

interface DataTableProps {
  data: SoldierData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const getFitnessBadgeClass = (fitness: number) => {
    return fitness === 1 
      ? 'bg-tactical-100 text-tactical-800 border-tactical-300' 
      : 'bg-alert-100 text-alert-800 border-alert-300';
  };

  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="min-w-full divide-y divide-military-200">
        <thead className="bg-military-50/50 backdrop-blur-sm">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Soldier ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Vitals
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Health Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Fitness
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Climate Zone
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-military-700 uppercase tracking-wider">
              Recommendation
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-military-100">
          {data.map((soldier, index) => (
            <tr 
              key={index} 
              className="hover:bg-military-50/50 transition-all duration-200 hover:scale-[1.01] animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-military-900">
                {soldier.soldier_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-military-600">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span className="font-medium">HR: {soldier.heart_rate_bpm} bpm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="font-medium">SpO2: {soldier.spo2_pct}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    <span className="font-medium">Temp: {soldier.body_temp_c}°C</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge 
                  status={soldier.health_status} 
                  pulse={soldier.health_status.includes('Critical') || soldier.health_status.includes('Severe')}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col space-y-1">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border
                    ${getFitnessBadgeClass(soldier.predicted_fitness)}
                    transition-all duration-200 hover:scale-105
                  `}>
                    {soldier.predicted_fitness === 1 ? 'Fit' : 'Unfit'}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`
                        h-1.5 rounded-full transition-all duration-500
                        ${soldier.predicted_fitness === 1 ? 'bg-tactical-500' : 'bg-alert-500'}
                      `}
                      style={{ width: `${soldier.fitness_probability * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-military-500 font-medium">
                    {(soldier.fitness_probability * 100).toFixed(1)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-military-600 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-green-400 rounded-full" />
                  <span>{soldier.climate_zone.replace(/_/g, ' ')}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  ${soldier.recommended_climate === 'Relocate' 
                    ? 'bg-warning-100 text-warning-800 border border-warning-300' 
                    : 'bg-tactical-100 text-tactical-800 border border-tactical-300'
                  }
                  transition-all duration-200 hover:scale-105
                `}>
                  {soldier.recommended_climate.replace(/_/g, ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};