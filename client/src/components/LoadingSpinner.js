import React from 'react';
import { Brain, Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="relative">
        <div className="animate-spin">
          <Loader2 className="w-8 h-8 text-primary-600" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary-400 animate-pulse-slow" />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Processing your image...
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="animate-pulse">🔍 Extracting text from image</p>
          <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            🧠 Analyzing content with AI
          </p>
          <p className="animate-pulse" style={{ animationDelay: '1s' }}>
            ✨ Generating your results
          </p>
        </div>
      </div>
      
      <div className="w-64 bg-gray-200 rounded-full h-2">
        <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
      </div>
      
      <p className="text-xs text-gray-500 text-center max-w-sm">
        This may take a few moments depending on image complexity and text length.
      </p>
    </div>
  );
};

export default LoadingSpinner;
