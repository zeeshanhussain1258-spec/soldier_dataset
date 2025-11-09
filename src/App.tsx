import React, { useState } from 'react';
import { Shield, Activity, Brain, Radar, Target, Zap } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { SoldierDataProcessor } from './utils/dataProcessor';
import { AnalysisResults } from './types/soldier';

function App() {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const csvText = await file.text();
      const analysisResults = await SoldierDataProcessor.processCSV(csvText);
      setResults(analysisResults);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the CSV file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-military-50 via-military-100/50 to-tactical-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-military-pattern opacity-5" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-military-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-military-600 to-military-800 rounded-xl shadow-lg animate-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-military-900 tracking-tight">
                  Soldier Health Monitoring System
                </h1>
                <p className="text-military-600 font-medium">
                  AI-Powered Health Analysis & Tactical Risk Assessment Platform
                </p>
              </div>
            </div>
            {results && (
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 bg-gradient-to-r from-military-600 to-military-700 text-white rounded-xl hover:from-military-700 hover:to-military-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!results ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-8 animate-fade-in">
              <div className="flex justify-center space-x-6">
                <div className="p-4 bg-military-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-subtle">
                  <Activity className="w-10 h-10 text-military-600" />
                </div>
                <div className="p-4 bg-tactical-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                  <Brain className="w-10 h-10 text-tactical-600" />
                </div>
                <div className="p-4 bg-warning-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>
                  <Radar className="w-10 h-10 text-warning-600" />
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-military-900 mb-6 leading-tight">
                  Advanced Health Analytics for <span className="text-tactical-600">Military Personnel</span>
                </h2>
                <p className="text-xl text-military-600 mb-10 leading-relaxed">
                  Upload soldier health data to receive instant <strong>AI-powered analysis</strong> including 
                  fitness predictions, risk assessments, and optimal deployment recommendations for mission success.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-military-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up group">
                <div className="p-4 bg-military-100 rounded-2xl w-fit mb-6 group-hover:bg-military-200 transition-colors duration-300">
                  <Activity className="w-8 h-8 text-military-600" />
                </div>
                <h3 className="text-xl font-bold text-military-900 mb-4">
                  Real-time Vital Analysis
                </h3>
                <p className="text-military-600 leading-relaxed">
                  Automated processing of heart rate, SpO2, body temperature, 
                  and respiratory rate with <strong>instant health status classification</strong>.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-tactical-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up group" style={{ animationDelay: '0.1s' }}>
                <div className="p-4 bg-tactical-100 rounded-2xl w-fit mb-6 group-hover:bg-tactical-200 transition-colors duration-300">
                  <Brain className="w-8 h-8 text-tactical-600" />
                </div>
                <h3 className="text-xl font-bold text-military-900 mb-4">
                  AI Fitness Prediction
                </h3>
                <p className="text-military-600 leading-relaxed">
                  <strong>Machine learning models</strong> predict fitness levels and deployment readiness 
                  with probability scores for informed tactical decision-making.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-warning-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up group" style={{ animationDelay: '0.2s' }}>
                <div className="p-4 bg-warning-100 rounded-2xl w-fit mb-6 group-hover:bg-warning-200 transition-colors duration-300">
                  <Target className="w-8 h-8 text-warning-600" />
                </div>
                <h3 className="text-xl font-bold text-military-900 mb-4">
                  Climate Recommendations
                </h3>
                <p className="text-military-600 leading-relaxed">
                  <strong>Intelligent climate zone analysis</strong> and terrain suitability 
                  recommendations based on individual health profiles and mission requirements.
                </p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="max-w-3xl mx-auto">
              <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
              
              {/* Sample Data Info */}
              <div className="mt-10 p-8 bg-military-50/50 backdrop-blur-sm rounded-2xl border border-military-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-5 h-5 text-military-600" />
                  <h4 className="font-bold text-military-900">Expected CSV Format:</h4>
                </div>
                <div className="text-sm text-military-700 font-mono bg-white/80 p-4 rounded-xl border border-military-200 overflow-x-auto shadow-inner">
                  soldier_id,timestamp,heart_rate_bpm,resp_rate_bpm,spo2_pct,body_temp_c,latitude,longitude
                </div>
                <p className="text-sm text-military-600 mt-4 font-medium">
                  <strong>Don't have sample data?</strong> Upload any CSV file with soldier health metrics to see the advanced AI system in action.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard results={results} />
        )}
      </main>
    </div>
  );
}

export default App;