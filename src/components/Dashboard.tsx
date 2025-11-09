import React from 'react';
import { AnalysisResults } from '../types/soldier';
import { StatsCard } from './StatsCard';
import { DataTable } from './DataTable';
import { ChartContainer } from './ChartContainer';
import { DownloadSection } from './DownloadSection';
import { Users, Heart, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';

interface DashboardProps {
  results: AnalysisResults;
}

export const Dashboard: React.FC<DashboardProps> = ({ results }) => {
  const { summary, processedData } = results;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats Banner */}
      <div className="bg-gradient-to-r from-military-800 via-military-700 to-military-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-military-pattern opacity-10" />
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-8 h-8 text-tactical-400" />
            <h2 className="text-2xl font-bold">Mission Analysis Complete</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-tactical-400">{summary.totalSoldiers}</div>
              <div className="text-sm text-military-300">Personnel Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tactical-400">
                {((summary.fitSoldiers / summary.totalSoldiers) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-military-300">Mission Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-400">{summary.criticalCases}</div>
              <div className="text-sm text-military-300">Critical Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Object.keys(summary.climateDistribution).length}
              </div>
              <div className="text-sm text-military-300">Climate Zones</div>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Soldiers"
          value={summary.totalSoldiers}
          icon={<Users className="w-7 h-7" />}
          color="blue"
          trend="stable"
        />
        <StatsCard
          title="Fit for Duty"
          value={summary.fitSoldiers}
          icon={<CheckCircle className="w-7 h-7" />}
          color="green"
          percentage={(summary.fitSoldiers / summary.totalSoldiers) * 100}
          trend="up"
        />
        <StatsCard
          title="Unfit for Duty"
          value={summary.unfitSoldiers}
          icon={<AlertTriangle className="w-7 h-7" />}
          color="yellow"
          percentage={(summary.unfitSoldiers / summary.totalSoldiers) * 100}
          trend="down"
        />
        <StatsCard
          title="Critical Cases"
          value={summary.criticalCases}
          icon={<Heart className="w-7 h-7" />}
          color="red"
          percentage={(summary.criticalCases / summary.totalSoldiers) * 100}
          trend={summary.criticalCases > 0 ? "up" : "stable"}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
        <ChartContainer
          title="Health Status Distribution"
          data={summary.healthStatusDistribution}
          type="doughnut"
        />
        <ChartContainer
          title="Climate Zone Distribution"
          data={summary.climateDistribution}
          type="bar"
        />
      </div>

      {/* Fitness Prediction Chart */}
      <div className="grid grid-cols-1 gap-8 animate-slide-up">
        <ChartContainer
          title="Fitness Probability Distribution"
          data={processedData.reduce((acc, soldier) => {
            const range = Math.floor(soldier.fitness_probability * 10) / 10;
            const key = `${range.toFixed(1)}-${(range + 0.1).toFixed(1)}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)}
          type="bar"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-military-200 animate-slide-up">
        <div className="p-6 border-b border-military-200 bg-gradient-to-r from-military-50 to-military-100/50">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-military-600" />
            <div>
              <h2 className="text-xl font-bold text-military-900">Detailed Analysis Results</h2>
              <p className="text-military-600 mt-1">First 20 records with AI predictions and tactical recommendations</p>
            </div>
          </div>
        </div>
        <DataTable data={processedData.slice(0, 20)} />
      </div>

      {/* Download Section */}
      <div className="animate-slide-up">
        <DownloadSection results={results} />
      </div>
    </div>
  );
};