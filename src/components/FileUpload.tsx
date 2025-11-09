import React, { useRef, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ProgressBar } from './ProgressBar';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    setError(null);
    setUploadProgress(0);
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    onFileUpload(file);
  };

  const handleClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 hover:border-military-500 hover:bg-military-50/50
          backdrop-blur-sm bg-white/80
          ${isDragOver ? 'border-military-500 bg-military-50/50 scale-105' : 'border-military-300'}
          ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}
          group overflow-hidden
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-military-pattern opacity-5" />
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="relative flex flex-col items-center space-y-6">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center
            transition-all duration-300 group-hover:scale-110
            ${isProcessing ? 'bg-military-200 animate-pulse' : 'bg-military-100 group-hover:bg-military-200'}
          `}>
            {isProcessing ? (
              <LoadingSpinner size="lg" color="blue" />
            ) : (
              <Upload className="w-10 h-10 text-military-600 group-hover:text-military-700 transition-colors duration-300" />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-military-900 mb-3 group-hover:text-military-800 transition-colors duration-300">
              {isProcessing ? 'Processing Data...' : 'Upload Soldier Health Data'}
            </h3>
            <p className="text-military-600 mb-4 max-w-md mx-auto leading-relaxed">
              {isProcessing 
                ? 'Analyzing health metrics, generating AI predictions, and creating visualizations...'
                : 'Drag and drop your CSV file here, or click to browse'
              }
            </p>
            
            {/* Processing Progress */}
            {isProcessing && (
              <div className="mb-4 max-w-sm mx-auto">
                <ProgressBar 
                  progress={uploadProgress} 
                  color="blue" 
                  animated={true}
                />
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-3 text-sm text-military-500">
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>CSV files only</span>
              </div>
              <div className="w-1 h-1 bg-military-400 rounded-full" />
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Max 10MB</span>
              </div>
            </div>
          </div>
          
          {/* Success indicator */}
          {uploadProgress === 100 && !error && (
            <div className="flex items-center space-x-2 text-tactical-600 animate-scale-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">File uploaded successfully!</span>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-alert-50 border border-alert-200 rounded-xl flex items-center space-x-3 animate-slide-down">
          <AlertCircle className="w-5 h-5 text-alert-500 flex-shrink-0" />
          <span className="text-alert-700 font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};