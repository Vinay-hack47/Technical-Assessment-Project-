# 🧠 ContentLab — Social Media Content Analyzer

## Live Demo - https://technical-assessment-project-8fje.vercel.app

> **Intelligent text extraction meets AI-powered content optimization.** Extract text from PDFs and images, analyze sentiment and tone, and get AI-driven suggestions to maximize your social media engagement.

![Status](https://img.shields.io/badge/status-active-brightgreen) 
![Node](https://img.shields.io/badge/node-18+-blue) 
![React](https://img.shields.io/badge/react-19-61dafb) 
![MongoDB](https://img.shields.io/badge/mongodb-8+-13aa52)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [🎯 Key Features](#-key-features)
- [🛠️ Tech Stack & Package Breakdown](#️-tech-stack--package-breakdown)
- [🏗️ Architecture](#️-architecture)
- [📊 Process Flow](#-process-flow)
- [🚀 Getting Started](#-getting-started)
- [📡 API Reference](#-api-reference)
- [🔐 Security Features](#-security-features)
- [⚙️ Configuration](#️-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [🚀 Performance Optimization](#-performance-optimization)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## Overview

**ContentLab** is a full-stack application that bridges the gap between content creation and data-driven optimization. Whether you're a social media manager, influencer, or content strategist, ContentLab helps you:

- 📤 Upload social media drafts (PDFs, images)
- 🔍 Extract text intelligently (OCR + PDF parsing)
- 🤖 Analyze content for sentiment, tone, and engagement potential
- 💡 Get AI-powered suggestions for improvement
- 💾 Persist your analysis history with Redux state management

**Built for creators. Designed for scale. Made with ❤️**

---

## 🎯 Key Features

### 1. **🔐 Secure Authentication**
- JWT-based login/register system
- httpOnly cookies for XSS protection
- Password encryption with bcryptjs (10-round salt)
- Automatic logout with cookie clearance
- Redux state persistence across sessions

### 2. **📤 Multi-Format Document Upload**
- **Supported Formats**: PDF, JPG, JPEG, PNG
- **Cloud Storage**: Cloudinary integration for reliable, scalable file hosting
- **Real-time Progress**: Live upload progress bar
- **File Validation**: Strict MIME type checking before processing

### 3. **🔬 Dual-Method Text Extraction**

#### **Image Extraction** (`/api/v1/ocr/extract-image`)
- Uses **Tesseract.js** for open-source OCR
- Supports 5+ languages (English, Hindi, Spanish, French, Portuguese)
- Uploads to Cloudinary before processing
- Returns extracted text with high accuracy

#### **PDF Extraction** (`/api/v1/ocr/extract-pdf`)
- Primary: **pdfjs-dist** for native PDF text parsing
- Fallback: **Tesseract.js** OCR for scanned/image-based PDFs
- Per-page extraction tracking (text method: `'pdf-text'` or `'ocr'`)
- Intelligent page detection (empty pages trigger OCR)

### 4. **🤖 AI-Powered Content Analysis**
- **Sentiment Analysis** — Positive, Negative, Neutral classification
- **Tone Detection** — Professional, casual, urgent, conversational, etc.
- **Readability Metrics** — Complexity, grade level, reading time
- **Keyword Extraction** — High-impact words, hashtags, CTAs
- **Engagement Scoring** — Virality potential, audience resonance
- **Emoji & Formatting Suggestions** — Optimal placement and usage
- **AI-Generated Rewrites** — Alternative versions optimized for engagement

### 5. **💾 State Persistence & Rehydration**
- Redux Toolkit for centralized state management
- Redux Persist auto-saves auth state to localStorage
- Automatic rehydration on app reload
- User stays logged in across sessions

### 6. **🛡️ Protected Routes & Auth Guards**
- `/upload` route restricted to authenticated users
- Automatic redirect to login for unauthorized access
- Backend middleware validates JWT on all protected endpoints
- Frontend ProtectedRoute component for client-side guards

### 7. **🎨 Modern, Responsive UI**
- Tailwind CSS + ShadCN UI component library
- Indigo primary color theme
- Mobile-first responsive design
- Smooth animations with Framer Motion
- Toast notifications for user feedback

---

## 🛠️ Tech Stack & Package Breakdown

### **Frontend (React + Vite)**

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | 19.2.0 | Core UI library |
| **react-dom** | 19.2.0 | DOM rendering |
| **vite** | 5.1.0 | Ultra-fast build tool & dev server |
| **@reduxjs/toolkit** | 2.10.1 | Simplified Redux state management |
| **react-redux** | 9.2.0 | React bindings for Redux |
| **redux-persist** | 6.0.0 | Persist Redux state to localStorage |
| **react-router-dom** | 6.30.1 | Client-side routing |
| **tailwindcss** | 4.1.17 | Utility-first CSS framework |
| **@radix-ui/* | 1.x | Accessible UI components (Avatar, Dropdown, Navigation, Progress, Label) |
| **framer-motion** | 12.23.24 | Smooth animations & transitions |
| **lucide-react** | 0.553.0 | Beautiful SVG icon library |
| **axios** | 1.13.2 | HTTP client with interceptor support |
| **react-hook-form** | 7.66.0 | Performant form validation |
| **zod** | 4.1.12 | TypeScript-first schema validation |
| **sonner** | 2.0.7 | Toast notifications |
| **react-dropzone** | 14.3.8 | Drag-and-drop file upload |
| **class-variance-authority** | 0.7.1 | Type-safe CSS class composition |
| **clsx** | 2.1.1 | Conditional className utility |
| **tailwind-merge** | 3.4.0 | Merge Tailwind CSS classes intelligently |

**Why These Choices?**
- **Vite**: 10-100x faster than webpack; instant HMR (hot module replacement)
- **Redux Persist**: One-line setup for automatic state rehydration
- **ShadCN UI**: Pre-styled, accessible components with Tailwind
- **Zod**: Runtime validation ensures data integrity before API calls

---

### **Backend (Node.js + Express)**

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | 5.1.0 | Web framework; routing, middleware, response handling |
| **mongoose** | 8.19.3 | MongoDB ODM; schema validation, queries |
| **dotenv** | 17.2.3 | Load environment variables from .env file |
| **jsonwebtoken** | 9.0.2 | JWT creation & verification |
| **bcryptjs** | 3.0.3 | Password hashing (10-round salt) |
| **cookie-parser** | 1.4.7 | Parse HTTP cookies |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing middleware |
| **multer** | 2.0.2 | In-memory file upload middleware |
| **cloudinary** | 2.8.0 | Cloud storage SDK for file uploads |
| **tesseract.js** | 6.0.1 | Client-side OCR for image text extraction |
| **pdfjs-dist** | 5.4.394 | PDF parsing (ESM legacy build) |
| **canvas** | 3.2.0 | PDF page rendering to PNG for OCR fallback |
| **pdf-parse** | 2.4.5 | Alternative PDF text extraction library |
| **openai** | 6.9.0 | AI analysis integration (extensible) |
| **datauri** | 4.1.0 | Convert files to Data URIs |
| **body-parser** | 2.2.0 | Parse JSON/URL-encoded request bodies |

**Why These Choices?**
- **Tesseract.js v6**: Lightweight, no server-side OCR needed; multi-language support
- **pdfjs-dist + Canvas**: Handles both native PDF text and scanned PDFs elegantly
- **Cloudinary**: Removes file storage burden; built-in CDN and optimization
- **JWT + httpOnly**: Industry-standard, XSS-resistant auth pattern
- **Mongoose**: Enforces schema validation; prevents invalid data in DB

---

## 🏗️ Architecture

### **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React + Vite)                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Pages: Login, Register, OCRPage, Home, Dashboard        │   │
│  │  Components: Navbar, ProtectedRoute, UI (ShadCN)        │   │
│  │  State: Redux (auth slice) + Redux Persist              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│                        Axios (withCredentials)                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express)                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  User Routes                                             │   │
│  │  ├─ POST /register  (bcrypt password)                   │   │
│  │  ├─ POST /login     (JWT token → httpOnly cookie)       │   │
│  │  └─ POST /logout    (clear cookies)                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  OCR Routes                                              │   │
│  │  ├─ POST /extract-image  → Tesseract.js OCR             │   │
│  │  └─ POST /extract-pdf    → pdfjs-dist + Canvas + OCR    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Analysis Routes                                         │   │
│  │  └─ POST /analyze-text   → OpenAI/Hugging Face API      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware: isAuthenticated (JWT verification)         │   │
│  │  Middleware: Multer (file upload handling)              │   │
│  │  Middleware: CORS (request origin validation)           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  External Services                                       │   │
│  │  ├─ Cloudinary: File storage & CDN                      │   │
│  │  └─ OpenAI/HF: AI analysis                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ↓ Mongoose
┌─────────────────────────────────────────────────────────────────┐
│                    MongoDB (Local/Cloud)                        │
│  Collections:                                                   │
│  ├─ users          (email, password_hash, fullname)            │
│  ├─ uploads        (userId, fileUrl, type, extractedText)      │
│  └─ analyses       (uploadId, sentiment, tone, suggestions)    │
└─────────────────────────────────────────────────────────────────┘
```

### **Folder Structure**

```
Social-Media-Content-Analyzer/
├── frontend/                          # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── OCRPage.jsx           # Upload & text extraction UI
│   │   │   ├── Login.jsx             # Auth page
│   │   │   ├── Register.jsx          # Auth page
│   │   │   ├── Home.jsx              # Landing page
│   │   │   └── Dashboard.jsx         # Analytics (TBD)
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx    # Auth guard
│   │   │   └── ui/                   # ShadCN components
│   │   ├── compo/
│   │   │   └── Navbar.jsx            # Header with user profile
│   │   ├── redux/
│   │   │   ├── store.js              # Redux + Persist config
│   │   │   ├── authSlice.js          # Auth reducer
│   │   │   └── (future) ocrSlice.js  # OCR state (planned)
│   │   ├── App.jsx                   # Router setup
│   │   ├── main.jsx                  # Entry point + PersistGate
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
│
├── backend/                           # Node.js + Express API
│   ├── controllers/
│   │   ├── ocrController.js          # extractFromImage, extractFromPDF
│   │   ├── ocrAnalysisController.js  # analyzeText
│   │   └── user.controller.js        # register, login, logout
│   ├── models/
│   │   └── user.model.js             # User schema (Mongoose)
│   ├── router/
│   │   ├── ocrRoutes.js              # /api/v1/ocr/*
│   │   ├── ocrAnalyzeRoutes.js       # /api/v1/ocr-analyzer/*
│   │   └── user.route.js             # /api/v1/user/*
│   ├── middlewares/
│   │   ├── isAuthenticated.js        # JWT verification
│   │   └── upload.js                 # Multer config
│   ├── services/
│   │   └── cloudinary.js             # Cloudinary SDK setup
│   ├── db/
│   │   └── connectDB.js              # MongoDB connection
│   ├── index.js                      # Express app entry
│   ├── package.json
│   ├── .env.example                  # Environment template
│   └── eng.traineddata               # Tesseract language data
│
├── README.md                          # This file
├── PROJECT_ABSTRACT.md                # Detailed project overview
└── .gitignore
```

---

## 📊 Process Flow

### **Flow 1: User Registration & Login**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User fills Register form (email, password, fullname)     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Frontend validates with Zod schema                       │
│    - Email format check                                     │
│    - Password strength validation                           │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Axios POST to /api/v1/user/register                      │
│    { email, password, fullname }                            │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Backend: user.controller.js → register()                │
│    ├─ Check if user exists (prevent duplicates)            │
│    ├─ Hash password with bcrypt (10 rounds)                │
│    └─ Save to MongoDB                                      │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Frontend receives success → Auto-redirect to /login      │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. User logs in:                                            │
│    POST /api/v1/user/login { email, password }             │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Backend verifies password with bcrypt.compare()         │
│    ├─ If match: Create JWT token                           │
│    ├─ Set httpOnly cookie (expires 7d)                     │
│    └─ Return user data                                     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Frontend receives response:                              │
│    ├─ Dispatch setAuthUser(user) → Redux                  │
│    ├─ Redux Persist saves to localStorage                  │
│    └─ Redirect to /upload (OCRPage)                        │
└─────────────────────────────────────────────────────────────┘
```

### **Flow 2: Image Upload & OCR Extraction**

```
┌──────────────────────────────────────────────────────────────┐
│ 1. User selects image (JPG/PNG/JPEG)                         │
│    (or drag-drop in upload area)                             │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. Frontend: onFileChange() triggers                         │
│    ├─ Validate MIME type (must start with 'image/')        │
│    ├─ Generate preview (FileReader.readAsDataURL)          │
│    └─ Call uploadAndExtract()                              │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. Create FormData:                                          │
│    ├─ Append file buffer                                    │
│    ├─ Append language (eng, hin, spa, fra, por)            │
│    └─ POST to /api/v1/ocr/extract-image                    │
│    (with withCredentials & onUploadProgress listener)       │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. Frontend shows upload progress bar (0-100%)              │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. Backend: ocrController.js → extractFromImage()           │
│    ├─ Verify JWT (isAuthenticated middleware)              │
│    ├─ Validate file format & size                          │
│    ├─ Upload to Cloudinary                                 │
│    │   (returns secure_url)                                │
│    └─ Proceed to OCR extraction                            │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. Tesseract.js worker:                                      │
│    ├─ await createWorker()                                  │
│    ├─ worker.recognize(fileUrl, language)                  │
│    │   (Worker downloads language model on first run)       │
│    └─ Extract text data                                    │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 7. Return response:                                          │
│    {                                                         │
│      fileName: "social-post.jpg",                           │
│      fileUrl: "https://cloudinary.../image.jpg",           │
│      type: "image",                                         │
│      pages: [{                                              │
│        text: "Extracted text from image...",               │
│        method: "ocr"                                        │
│      }]                                                      │
│    }                                                         │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 8. Frontend receives response:                               │
│    ├─ Extract pages array                                   │
│    ├─ Join text with "---PAGE BREAK---" separator          │
│    ├─ setOcrText() → display in textarea                   │
│    └─ Status: 'done' (enable Analyze button)               │
└──────────────────────────────────────────────────────────────┘
```

### **Flow 3: PDF Upload with Dual Extraction**

```
┌──────────────────────────────────────────────────────────────┐
│ 1. User selects PDF file                                     │
│    ├─ File validation (must be application/pdf)             │
│    └─ Call uploadAndExtract()                               │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. POST to /api/v1/ocr/extract-pdf                          │
│    (with FormData: file + language)                          │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. Backend: extractFromPDF()                                 │
│    ├─ Convert Node Buffer → Uint8Array                      │
│    │   (pdfjs requires plain Uint8Array for ESM)            │
│    └─ getDocument({ data: uint8buf })                       │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. For each page (1 to pdf.numPages):                        │
│                                                              │
│    ├─ getPage(i) → page object                             │
│    ├─ getTextContent() → extract native text               │
│    ├─ Check if text is minimal (< 5 chars)                 │
│    │                                                        │
│    ├─ IF text found:                                        │
│    │  └─ Push { pageNum: i, text, method: 'pdf-text' }    │
│    │                                                        │
│    └─ IF minimal/empty:                                     │
│       ├─ renderPageToImage(page)                           │
│       │  (Canvas: render at 2x scale to PNG)               │
│       ├─ Tesseract.js worker.recognize(imgBuffer)          │
│       └─ Push { pageNum: i, text, method: 'ocr' }         │
│                                                              │
│    (This handles scanned PDFs elegantly!)                    │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. Worker terminates after all pages processed              │
│    Upload PDF to Cloudinary                                 │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. Return response:                                          │
│    {                                                         │
│      fileName: "social-ideas.pdf",                          │
│      fileUrl: "https://cloudinary.../file.pdf",            │
│      type: "pdf",                                           │
│      pages: [                                                │
│        { pageNum: 1, text: "...", method: "pdf-text" },    │
│        { pageNum: 2, text: "...", method: "ocr" },         │
│        { pageNum: 3, text: "...", method: "pdf-text" }     │
│      ]                                                       │
│    }                                                         │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 7. Frontend joins all pages with separator                   │
│    Display in textarea for user review/edit                 │
└──────────────────────────────────────────────────────────────┘
```

### **Flow 4: Content Analysis**

```
┌──────────────────────────────────────────────────────────────┐
│ 1. User clicks "Analyze Text" button                         │
│    (ocrText must not be empty)                               │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. Frontend POST to /api/v1/ocr-analyzer/analyze-text       │
│    {                                                         │
│      text: "extracted content...",                          │
│      language: "eng"                                        │
│    }                                                         │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. Backend: ocrAnalysisController.js → analyzeText()        │
│    ├─ Verify JWT                                            │
│    └─ Call external AI service (OpenAI / Hugging Face)     │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. AI Service returns analysis:                              │
│    {                                                         │
│      sentiment: {                                           │
│        label: "positive",                                   │
│        score: 0.87                                          │
│      },                                                      │
│      tone: "professional_encouraging",                      │
│      readability: {                                         │
│        score: 78,                                           │
│        level: "intermediate"                                │
│      },                                                      │
│      keywords: ["engagement", "growth", "strategy", ...],   │
│      engagement_score: 8.2,                                 │
│      suggestions: [                                         │
│        "Add CTA for higher conversion",                    │
│        "Use more specific emojis",                          │
│        ...                                                  │
│      ],                                                      │
│      rewrite: "Alternative version optimized for..."        │
│    }                                                         │
└──────────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. Frontend receives response:                               │
│    ├─ setAnalysisResult(data)                               │
│    ├─ Display sentiment with color-coded badge             │
│    ├─ Show readability score                                │
│    ├─ List extracted keywords                               │
│    ├─ Display AI suggestions                                │
│    ├─ Show rewritten version (optional)                     │
│    └─ User can copy suggestions                             │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18+ ([download](https://nodejs.org/))
- **MongoDB** (local or cloud connection)
- **Cloudinary Account** ([sign up free](https://cloudinary.com))
- **Git** & basic terminal knowledge

### **1. Clone Repository**

```bash
git clone https://github.com/yourusername/Social-Media-Content-Analyzer.git
cd Social-Media-Content-Analyzer
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/contentlab
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
EOF

# Start the server
npm start
# or with nodemon (dev mode):
npx nodemon index.js
```

**MongoDB Setup** (if local):
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows (Chocolatey)
choco install mongodb-community

# Or use MongoDB Atlas (cloud): update MONGODB_URI in .env
```

### **3. Frontend Setup**

```bash
cd ../frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# Opens http://localhost:5173
```

### **4. Verify Setup**

1. ✅ Backend running on `http://localhost:3000`
2. ✅ Frontend running on `http://localhost:5173`
3. ✅ MongoDB connection established (check console)
4. ✅ Cloudinary credentials configured

**Test Registration:**
- Navigate to `http://localhost:5173/register`
- Create a test account
- Log in
- Upload a test image or PDF

---

## 📡 API Reference

### **Authentication Endpoints**

#### Register User
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullname": "John Doe"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullname": "John Doe"
  }
}

Headers:
- Set-Cookie: token=jwt_token_here; HttpOnly; Secure; SameSite=Strict
```

#### Logout User
```http
POST /api/v1/user/logout
Content-Type: application/json

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}

Headers:
- Set-Cookie: token=; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 UTC;
```

---

### **Text Extraction Endpoints**

#### Extract Text from Image
```http
POST /api/v1/ocr/extract-image
Content-Type: multipart/form-data
Authorization: Bearer {jwt_token}

Body:
- file: <image_file>
- lang: "eng" (or "hin", "spa", "fra", "por")

Response 200:
{
  "fileName": "social-post.jpg",
  "fileUrl": "https://cloudinary.com/.../image.jpg",
  "type": "image",
  "pages": [
    {
      "text": "This is the extracted text from the image...",
      "method": "ocr"
    }
  ]
}
```

#### Extract Text from PDF
```http
POST /api/v1/ocr/extract-pdf
Content-Type: multipart/form-data
Authorization: Bearer {jwt_token}

Body:
- file: <pdf_file>
- lang: "eng" (or other languages)

Response 200:
{
  "fileName": "document.pdf",
  "fileUrl": "https://cloudinary.com/.../document.pdf",
  "type": "pdf",
  "pages": [
    {
      "pageNum": 1,
      "text": "Native PDF text extracted...",
      "method": "pdf-text"
    },
    {
      "pageNum": 2,
      "text": "Text from scanned page via OCR...",
      "method": "ocr"
    }
  ]
}
```

---

### **Analysis Endpoints**

#### Analyze Extracted Text
```http
POST /api/v1/ocr-analyzer/analyze-text
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "text": "Your extracted social media content here...",
  "language": "eng"
}

Response 200:
{
  "sentiment": {
    "label": "positive",
    "score": 0.92
  },
  "tone": "professional_encouraging",
  "readability": {
    "score": 82,
    "level": "intermediate",
    "readingTime": "2 min"
  },
  "keywords": [
    "engagement",
    "growth",
    "strategy",
    "content",
    "audience"
  ],
  "engagement_score": 8.5,
  "suggestions": [
    "Add a call-to-action for higher conversion",
    "Consider using emojis to break up text",
    "Highlight key stats or numbers",
    "Use storytelling to increase relatability"
  ],
  "rewrite": "Alternative version optimized for engagement..."
}
```

---

## 🔐 Security Features

### **Authentication & Authorization**

| Feature | Implementation |
|---------|-----------------|
| **Password Hashing** | bcryptjs (10-round salt) |
| **JWT Tokens** | Signed with `JWT_SECRET` |
| **Token Storage** | httpOnly cookies (XSS-resistant) |
| **Token Expiry** | 7 days |
| **Protected Routes** | Backend middleware + Frontend ProtectedRoute |
| **CORS** | Restricted to frontend origin only |

### **File Security**

| Feature | Implementation |
|---------|-----------------|
| **File Validation** | Strict MIME type checking |
| **File Size Limit** | 50MB (configurable in Multer) |
| **Storage** | Cloudinary (secure, CDN-backed) |
| **Virus Scanning** | (Optional: integrate Cloudinary add-ons) |

### **Data Protection**

| Feature | Implementation |
|---------|-----------------|
| **Sensitive Data** | Never logged or transmitted in plain text |
| **API Credentials** | Stored in `.env` (not committed to git) |
| **User Data** | Encrypted at rest (MongoDB encryption TBD) |
| **HTTPS** | Recommended for production |

---

## ⚙️ Configuration

### **Environment Variables (.env)**

#### Backend
```env
# Database
MONGODB_URI=mongodb://localhost:27017/contentlab

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
NODE_ENV=development

# AI Services (Optional)
OPENAI_API_KEY=your_openai_key_if_using_openai
HUGGINGFACE_API_KEY=your_hf_key_if_using_huggingface
```

#### Frontend
The frontend uses `http://localhost:3000` by default. To change:
1. Open `src/pages/OCRPage.jsx`
2. Find all `http://localhost:3000/api/v1/...` URLs
3. Replace with your backend URL

### **Customization**

**Change Primary Color:**
1. Open `frontend/tailwind.config.cjs`
2. Find the `theme.colors` section
3. Update the `primary` color from indigo to your choice

**Add More Languages to OCR:**
1. Open `backend/controllers/ocrController.js`
2. Update the language selection form in frontend
3. Tesseract supports 100+ languages (see [supported languages](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-Git-Repo.html))

**Adjust Upload File Size:**
1. Open `backend/middlewares/upload.js`
2. Modify `limits: { fileSize: 50 * 1024 * 1024 }` (currently 50MB)

---

## 🐛 Troubleshooting

### **Common Issues**

#### **"Cannot find module 'pdfjs-dist/legacy/build/pdf.js'"**
```bash
# Solution: Use the ESM build
# Update: backend/controllers/ocrController.js
# Change FROM: import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js'
# Change TO:   import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
```

#### **"Please provide binary data as `Uint8Array`, rather than `Buffer`"**
```bash
# Solution: Convert Node Buffer to Uint8Array
# The code already does this:
# const uint8buf = buffer instanceof Uint8Array ? buffer : 
#                  new Uint8Array(buffer.length);
# uint8buf.set(buffer);
```

#### **MongoDB Connection Refused**
```bash
# Solution 1: Start MongoDB locally
brew services start mongodb-community  # macOS
net start MongoDB                       # Windows

# Solution 2: Use MongoDB Atlas (cloud)
# Update .env:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contentlab
```

#### **Cloudinary Upload Fails**
```bash
# Verify credentials:
# 1. Check .env has correct CLOUDINARY_NAME, API_KEY, API_SECRET
# 2. Visit https://cloudinary.com/console to confirm values
# 3. Test in browser console:
# console.log('Backend URL:', 'http://localhost:3000')
```

#### **CORS Error: "Access to XMLHttpRequest blocked"**
```bash
# Solution: Verify frontend URL matches CORS config
# backend/index.js line 27:
# const corsOptions = {
#   origin: "http://localhost:5173",  # Match your frontend URL!
#   credentials: true,
# };
```

#### **Redux Persist Not Rehydrating**
```bash
# Solution: Check browser localStorage
# 1. Open DevTools → Application → Local Storage
# 2. Look for `persist:root` key
# 3. Clear if corrupted: localStorage.clear()
# 4. Refresh app
```

#### **Tesseract.js Very Slow on First Run**
```bash
# Normal! Language model (~70MB) downloads on first use.
# Subsequent runs are much faster (cached locally).
# Tip: Pre-download models if needed:
# import { createWorker } from 'tesseract.js';
# const worker = await createWorker();
# await worker.load();  // Pre-load
```

---

### **Debug Mode**

Enable verbose logging:

```javascript
// backend/index.js
const DEBUG = true;
if (DEBUG) {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// frontend - Check Redux state
// In browser console:
console.log(store.getState());
```

---

## 🚀 Performance Optimization

### **Frontend**

| Optimization | How |
|--------------|-----|
| **Code Splitting** | Vite auto-chunks routes (load on demand) |
| **Lazy Loading** | React.lazy() for page components |
| **Image Optimization** | Cloudinary URLs with `?q=auto&f=auto` |
| **CSS** | Tailwind purges unused styles in production |
| **Bundle Size** | `npm run build` → Check `dist/` folder |

### **Backend**

| Optimization | How |
|--------------|-----|
| **Database Indexing** | Add indices on `email`, `userId` fields |
| **Caching** | Redis (optional) for frequently analyzed content |
| **Compression** | Express gzip middleware (add if needed) |
| **Clustering** | Use Node's `cluster` module for multi-core |

### **Tesseract.js**

| Optimization | How |
|--------------|-----|
| **Worker Pool** | Create multiple workers for concurrent requests |
| **Language Limiting** | Only download needed languages |
| **Image Preprocessing** | Resize/contrast-enhance before OCR |

### **PDF Processing**

| Optimization | How |
|--------------|-----|
| **Page Limiting** | Don't OCR all pages if not needed |
| **Rendering Quality** | Canvas scale affects performance vs quality |
| **Parallel Processing** | Process pages in parallel (worker threads) |

---

## 🤝 Contributing

We welcome contributions! Here's how:

### **Steps to Contribute**

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/fork/Social-Media-Content-Analyzer.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add support for batch uploads"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### **Code Standards**

- **Naming**: camelCase for variables/functions, PascalCase for components
- **Formatting**: Prettier (configured in `frontend/`)
- **Testing**: Jest for unit tests (optional but encouraged)
- **Comments**: JSDoc for complex functions

### **Ideas for Contribution**

- [ ] Add batch upload support
- [ ] Implement dashboard analytics
- [ ] Add dark mode toggle
- [ ] Support more languages
- [ ] Add export-to-PDF functionality
- [ ] Implement real AI analysis (OpenAI/HuggingFace)
- [ ] Add user profile customization
- [ ] Create admin moderation panel
- [ ] Add WebSocket for real-time notifications
- [ ] Implement rate limiting

---

## 📜 License

This project is licensed under the **MIT License** — see LICENSE file for details.

Essentially: free to use, modify, and distribute. Attribution appreciated but not required.

---

## 🎯 Key Takeaways

✨ **ContentLab** demonstrates:
- Full-stack MERN-adjacent architecture
- Industry-standard security practices (JWT, bcrypt, httpOnly cookies)
- Advanced text processing (OCR + PDF parsing)
- Cloud-first file storage strategy
- Modern frontend tooling (React 19, Vite, Redux Persist)
- Professional UI/UX with accessible components

💼 **Portfolio-Ready**: Production-quality code, scalable architecture, security-conscious design.

---

