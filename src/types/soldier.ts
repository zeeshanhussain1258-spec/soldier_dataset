export interface SoldierData {
  soldier_id: string;
  timestamp: string;
  heart_rate_bpm: number;
  resp_rate_bpm: number;
  spo2_pct: number;
  body_temp_c: number;
  latitude: number;
  longitude: number;
  climate_zone: string;
  health_status: string;
  predicted_fitness: number;
  fitness_probability: number;
  recommended_climate: string;
}

export interface AnalysisResults {
  processedData: SoldierData[];
  summary: {
    totalSoldiers: number;
    fitSoldiers: number;
    unfitSoldiers: number;
    criticalCases: number;
    healthStatusDistribution: Record<string, number>;
    climateDistribution: Record<string, number>;
  };
}