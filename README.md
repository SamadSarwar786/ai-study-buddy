# 🧠 AI Study Buddy

An intelligent study assistant that helps you learn from images of textbooks, notes, and documents. Upload any image containing text and get instant summaries, explanations, quiz questions, and study notes powered by AI.

![AI Study Buddy](https://img.shields.io/badge/AI-Study%20Buddy-blue?style=for-the-badge&logo=brain)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![Google AI](https://img.shields.io/badge/Google-AI%20API-4285F4?style=flat&logo=google)

## ✨ Features

- 📸 **Image Upload**: Drag & drop or click to upload images
- 🔍 **OCR Technology**: Extract text from images using Tesseract.js
- 🧠 **AI Processing**: Powered by Google's Gemini AI model
- 📝 **Multiple Analysis Types**:
  - **Summarize**: Get key points and main ideas
  - **Explain**: Break down complex concepts in simple terms
  - **Quiz Me**: Generate practice questions with answers
  - **Study Notes**: Create organized, structured notes
- 💫 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Works great on all devices
- ⚡ **Fast Processing**: Optimized for quick results
- 📋 **Copy & Download**: Easy sharing and saving of results

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google AI API key (free from Google AI Studio)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-study-buddy
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` and add your Google AI API key:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   cd ..
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting Your Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env` file

**Note**: The Google AI API is free with generous usage limits, perfect for personal and educational use.

## 📁 Project Structure

```
ai-study-buddy/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.js
│   │   │   ├── ImageUploader.js
│   │   │   ├── ResultsDisplay.js
│   │   │   └── LoadingSpinner.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Main server file
│   ├── package.json
│   └── env.example
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Dropzone**: Drag & drop file uploads
- **Axios**: HTTP client for API calls

### Backend
- **Node.js & Express**: Server framework
- **Tesseract.js**: OCR for text extraction
- **Google Generative AI**: AI processing
- **Multer**: File upload handling
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

## 🎯 How It Works

1. **Upload Image**: User uploads an image containing text (textbook pages, handwritten notes, documents)

2. **OCR Processing**: Tesseract.js extracts text from the image

3. **AI Analysis**: Google's Gemini AI processes the text based on the selected analysis type:
   - **Summarize**: Creates concise key points
   - **Explain**: Breaks down complex concepts
   - **Quiz**: Generates multiple-choice questions
   - **Notes**: Creates structured study notes

4. **Display Results**: Beautiful, formatted results with options to copy, download, or reprocess

## 📱 Usage Tips

### For Best OCR Results:
- Use clear, well-lit images
- Ensure text is not blurry or tilted
- Higher resolution images work better
- Avoid very small text

### Supported Image Formats:
- JPEG/JPG
- PNG
- GIF
- BMP
- WebP

### File Size Limits:
- Maximum: 10MB per image
- Recommended: Under 5MB for faster processing

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build frontend for production
npm run build
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_AI_API_KEY` | Your Google AI API key | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder
3. Set up redirects for SPA routing

### Backend (Railway/Render/Heroku)
1. Deploy the `server` folder
2. Set environment variables
3. Ensure the build process installs dependencies

### Full Stack (Railway)
1. Connect your GitHub repository
2. Set the root directory to `/`
3. Add environment variables
4. Railway will automatically detect and deploy both services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google AI](https://ai.google.dev/) for the powerful Gemini API
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR capabilities
- [React](https://reactjs.org/) for the amazing frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [Lucide](https://lucide.dev/) for the gorgeous icons

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/your-username/ai-study-buddy/issues) page
2. Create a new issue with detailed information
3. Include screenshots and error messages if applicable

---

**Happy Learning! 🎓✨**

Made with ❤️ for students everywhere.
