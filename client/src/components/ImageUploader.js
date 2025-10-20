import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Upload, Camera, FileText, BookOpen, HelpCircle, Sparkles} from 'lucide-react';

const ImageUploader = ({onImageProcess, disabled}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [requestType, setRequestType] = useState('summarize');
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
    },
    multiple: false,
    disabled,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && onImageProcess) {
      onImageProcess(selectedFile, requestType);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const requestTypes = [
    {
      value: 'summarize',
      label: 'Summarize',
      description: 'Get key points and main ideas',
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      value: 'explain',
      label: 'Explain',
      description: 'Break down complex concepts',
      icon: BookOpen,
      color: 'text-green-600',
    },
    {
      value: 'quiz',
      label: 'Quiz Me',
      description: 'Generate practice questions',
      icon: HelpCircle,
      color: 'text-purple-600',
    },
    {
      value: 'notes',
      label: 'Study Notes',
      description: 'Create organized notes',
      icon: Sparkles,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Study Material</h2>

        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
          <input {...getInputProps()} />

          {preview ? (
            <div className="space-y-4">
              <img src={preview} alt="Preview" className="max-w-sm max-h-20 mx-auto rounded-lg shadow-md" />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{selectedFile?.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="text-red-600 hover:text-red-800 text-sm underline">
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                {isDragActive ? (
                  <Camera className="w-12 h-12 text-primary-400" />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop your image here' : 'Upload an image'}
                </p>
                <p className="text-sm text-gray-500">Drag & drop or click to select • PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Request Type Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">What would you like me to do?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {requestTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <label
                  key={type.value}
                  className={`
                    relative flex items-center p-4 border rounded-lg cursor-pointer transition-all
                    ${
                      requestType === type.value
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}>
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    checked={requestType === type.value}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <IconComponent className={`w-5 h-5 ${type.color}`} />
                    <div>
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </div>
                  </div>
                  {requestType === type.value && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || disabled}
          className={`
            w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors
            ${
              selectedFile && !disabled
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}>
          {disabled ? 'Processing...' : 'Analyze Image'}
        </button>
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">💡 Tips for best results:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure text is clear and well-lit</li>
          <li>• Avoid blurry or tilted images</li>
          <li>• Higher resolution images work better</li>
          <li>• Make sure text is not too small</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
