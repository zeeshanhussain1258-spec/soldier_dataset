import { SoldierData, AnalysisResults } from '../types/soldier';

// Simulate the Python backend analysis logic
export class SoldierDataProcessor {
  static async processCSV(csvText: string): Promise<AnalysisResults> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const rawData = lines.slice(1).map(line => {
      const values = line.split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim();
      });
      return row;
    });

    const processedData: SoldierData[] = rawData.map((row, index) => {
      const heartRate = parseFloat(row.heart_rate_bpm) || this.randomInRange(70, 150);
      const respRate = parseFloat(row.resp_rate_bpm) || this.randomInRange(12, 25);
      const spo2 = parseFloat(row.spo2_pct) || this.randomInRange(85, 100);
      const bodyTemp = parseFloat(row.body_temp_c) || this.randomInRange(36.1, 39.5);
      const lat = parseFloat(row.latitude) || this.randomInRange(20, 35);
      const lon = parseFloat(row.longitude) || this.randomInRange(70, 80);

      const climateZone = this.assignClimateZone(lat, lon);
      const healthStatus = this.determineHealthStatus(heartRate, respRate, spo2, bodyTemp);
      const fitnessScore = this.predictFitness(heartRate, respRate, spo2, bodyTemp);
      
      return {
        soldier_id: row.soldier_id || `SOLDIER_${index + 1}`,
        timestamp: row.timestamp || new Date(Date.now() - Math.random() * 86400000).toISOString(),
        heart_rate_bpm: heartRate,
        resp_rate_bpm: respRate,
        spo2_pct: spo2,
        body_temp_c: bodyTemp,
        latitude: lat,
        longitude: lon,
        climate_zone: climateZone,
        health_status: healthStatus,
        predicted_fitness: fitnessScore > 0.5 ? 1 : 0,
        fitness_probability: fitnessScore,
        recommended_climate: fitnessScore > 0.5 ? 'Current_Climate_Suitable' : 'Relocate'
      };
    });

    return this.generateAnalysisResults(processedData);
  }

  private static randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private static assignClimateZone(lat: number, lon: number): string {
    if (lat >= 24 && lat <= 29 && lon >= 69 && lon <= 75) return "Thar_Hot_Desert";
    if (lat >= 32 && lat <= 35 && lon >= 76 && lon <= 79.5) return "Ladakh_Cold_Desert";
    if (lat < 23.5) return "Tropical";
    if (lat <= 66.5) return "Temperate";
    return "Polar";
  }

  private static determineHealthStatus(heartRate: number, respRate: number, spo2: number, bodyTemp: number): string {
    if (bodyTemp >= 39 && heartRate >= 130) return "Severe_Hyperthermia";
    if (bodyTemp >= 38 && heartRate >= 110) return "Heat_Stress";
    if (bodyTemp < 35.5) return "Hypothermia";
    if (spo2 < 90) return "Critical_Hypoxemia";
    if (heartRate >= 120 && respRate >= 24) return "Cardio_Respiratory_Stress";
    return "Stable_Condition";
  }

  private static predictFitness(heartRate: number, respRate: number, spo2: number, bodyTemp: number): number {
    // Simulate ML model prediction
    let score = 0.8;
    
    if (spo2 < 90) score -= 0.4;
    if (heartRate > 120) score -= 0.2;
    if (bodyTemp > 38.5) score -= 0.3;
    if (respRate > 20) score -= 0.1;
    
    return Math.max(0, Math.min(1, score + (Math.random() - 0.5) * 0.2));
  }

  private static generateAnalysisResults(data: SoldierData[]): AnalysisResults {
    const fitSoldiers = data.filter(s => s.predicted_fitness === 1).length;
    const criticalCases = data.filter(s => 
      s.health_status === 'Severe_Hyperthermia' || 
      s.health_status === 'Critical_Hypoxemia' || 
      s.health_status === 'Hypothermia'
    ).length;

    const healthStatusDistribution: Record<string, number> = {};
    const climateDistribution: Record<string, number> = {};

    data.forEach(soldier => {
      healthStatusDistribution[soldier.health_status] = 
        (healthStatusDistribution[soldier.health_status] || 0) + 1;
      climateDistribution[soldier.climate_zone] = 
        (climateDistribution[soldier.climate_zone] || 0) + 1;
    });

    return {
      processedData: data,
      summary: {
        totalSoldiers: data.length,
        fitSoldiers,
        unfitSoldiers: data.length - fitSoldiers,
        criticalCases,
        healthStatusDistribution,
        climateDistribution
      }
    };
  }
}