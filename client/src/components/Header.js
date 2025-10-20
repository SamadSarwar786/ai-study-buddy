import React from 'react';
import { Brain, Github, Star } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Study Buddy</h1>
              <p className="text-sm text-gray-500">Smart learning assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
