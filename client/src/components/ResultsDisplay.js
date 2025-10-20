import React, {useState} from 'react';
import {
  FileText,
  BookOpen,
  HelpCircle,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ResultsDisplay = ({results, onReprocess, extractedText, onReset}) => {
  const [showExtractedText, setShowExtractedText] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadAsText = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatQuizResponse = (response) => {
    try {
      // Try to parse as JSON first
      // 🧹 Step 1: Clean Markdown fences or extra text
      let cleaned = response.trim();
      cleaned = cleaned.replace(/```json|```/g, '').trim(); // remove ```json and ```

      // 🧠 Step 2: Extract first valid JSON block if extra text is present
      const match = cleaned.match(/{[\s\S]*}/);
      const jsonString = match ? match[0] : cleaned;

      // 🧩 Step 3: Parse safely
      const parsed = JSON.parse(jsonString);
      if (parsed.questions) {
        return parsed.questions.map((q, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Question {index + 1}: {q.question}
            </h4>
            <div className="space-y-2">
              {q.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-2 rounded ${
                    optIndex === q.correct
                      ? 'bg-green-100 border border-green-300 text-green-800'
                      : 'bg-white border border-gray-200'
                  }`}>
                  <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                  {optIndex === q.correct && <CheckCircle className="inline w-4 h-4 ml-2 text-green-600" />}
                </div>
              ))}
            </div>
          </div>
        ));
      }
    } catch (e) {
      // If not valid JSON, return as formatted text
    }

    // Fallback to formatted text display
    return response.split('\n').map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  const getIcon = (requestType) => {
    switch (requestType) {
      case 'summarize':
        return FileText;
      case 'explain':
        return BookOpen;
      case 'quiz':
        return HelpCircle;
      case 'notes':
        return Sparkles;
      default:
        return FileText;
    }
  };

  const getTitle = (requestType) => {
    switch (requestType) {
      case 'summarize':
        return 'Summary';
      case 'explain':
        return 'Explanation';
      case 'quiz':
        return 'Quiz Questions';
      case 'notes':
        return 'Study Notes';
      default:
        return 'Results';
    }
  };

  const getColor = (requestType) => {
    switch (requestType) {
      case 'summarize':
        return 'text-blue-600';
      case 'explain':
        return 'text-green-600';
      case 'quiz':
        return 'text-purple-600';
      case 'notes':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  const IconComponent = getIcon(results.requestType);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Results Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <IconComponent className={`w-6 h-6 ${getColor(results.requestType)}`} />
            <h2 className="text-xl font-semibold text-gray-900">{getTitle(results.requestType)}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(results.aiResponse, 'result')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Copy to clipboard">
              {copiedText === 'result' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => downloadAsText(results.aiResponse, `${results.requestType}-result.txt`)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Download as text file">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          {results.requestType === 'quiz' ? (
            <div>{formatQuizResponse(results.aiResponse)}</div>
          ) : (
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              <ReactMarkdown>{results.aiResponse}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Extracted Text Toggle */}
      {extractedText && (
        <div className="card">
          <button
            onClick={() => setShowExtractedText(!showExtractedText)}
            className="flex items-center justify-between w-full text-left">
            <div className="flex items-center space-x-2">
              {showExtractedText ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-medium text-gray-900">{showExtractedText ? 'Hide' : 'Show'} Extracted Text</span>
            </div>
            <span className="text-sm text-gray-500">{extractedText.length} characters</span>
          </button>

          {showExtractedText && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Raw text from image:</span>
                <button
                  onClick={() => copyToClipboard(extractedText, 'extracted')}
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1">
                  {copiedText === 'extracted' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-48 overflow-y-auto">
                {extractedText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="card">
        <h3 className="font-medium text-gray-900 mb-4">Try Different Analysis</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            {type: 'summarize', label: 'Summarize', icon: FileText},
            {type: 'explain', label: 'Explain', icon: BookOpen},
            {type: 'quiz', label: 'Quiz Me', icon: HelpCircle},
            {type: 'notes', label: 'Study Notes', icon: Sparkles},
          ]
            .filter((option) => option.type !== results.requestType)
            .map((option) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => onReprocess(option.type)}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <OptionIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </button>
              );
            })}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-white-300 rounded-lg bg-green-600 text-white hover:bg-green-700 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Upload New Image</span>
          </button>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-center text-sm text-gray-500">
        Processed at {new Date(results.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default ResultsDisplay;
