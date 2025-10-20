import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { BookOpen, Brain, FileText, HelpCircle } from 'lucide-react';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageProcess = async (imageFile, requestType) => {
    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('requestType', requestType);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/process-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      setResults(data);
      setExtractedText(data.extractedText);
    } catch (err) {
      setError(err.message);
      console.error('Error processing image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextReprocess = async (requestType) => {
    if (!extractedText) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: extractedText,
          requestType: requestType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process text');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Error processing text:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setResults(null);
    setError(null);
    setExtractedText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        {!results && !loading && false && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <Brain className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Study Buddy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload images of textbooks, notes, or documents and get instant summaries, 
              explanations, and quiz questions powered by AI.
            </p>
            
            {/* Features */}
            {/* <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card text-center">
                <FileText className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Smart Summaries</h3>
                <p className="text-gray-600 text-sm">
                  Get concise summaries of complex texts in key points
                </p>
              </div>
              <div className="card text-center">
                <BookOpen className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Simple Explanations</h3>
                <p className="text-gray-600 text-sm">
                  Break down difficult concepts into easy-to-understand language
                </p>
              </div>
              <div className="card text-center">
                <HelpCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Quiz Generation</h3>
                <p className="text-gray-600 text-sm">
                  Create practice questions to test your understanding
                </p>
              </div>
            </div> */}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card bg-red-50 border-red-200 mb-8 animate-slide-up">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-4">
                <HelpCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={resetApp}
              className="mt-4 btn-primary bg-red-600 hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}


{/* results ? "grid lg:grid-cols-2 gap-8" :  */}
        {/* Main Content */}
        {!loading && (
          <div className={"flex justify-center"}>

              {/* Results Section */}
              {results && (
              <div className="space-y-6">
                <ResultsDisplay
                  results={results}
                  onReprocess={handleTextReprocess}
                  extractedText={extractedText}
                  onReset={resetApp}
                />
              </div>
            )}
            {/* Upload Section */}
            {!results && <div className={results ? "space-y-6" : "w-full max-w-2xl"}>
              <ImageUploader 
                onImageProcess={handleImageProcess}
                disabled={loading}
              />
            </div>}

          
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 AI Study Buddy. Powered by Google AI and OCR technology.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
