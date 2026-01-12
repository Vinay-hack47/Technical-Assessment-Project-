import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Zap, Image, FileText, BarChart3, Lock, Sparkles, ChevronRight, Wand2, FileType } from 'lucide-react'

const Body = () => {
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:border-blue-400/60 transition-colors cursor-pointer">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Advanced OCR & AI
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-fade-in">
              Extract, Analyze & Refine<br />Your Content
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your images, PDFs, and documents into actionable insights. Extract text with precision, analyze sentiment, and refine prompts with AI-powered intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => user ? navigate('/upload') : navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => user ? navigate('/refine-prompt') : navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/50"
              >
                Try Prompt Refiner
                <Wand2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg font-semibold text-lg transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-blue-400">99.9%</div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-pink-400">Instant</div>
                <div className="text-sm text-gray-400">Processing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to extract and analyze content from images and PDFs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/60 transition-all hover:shadow-xl hover:shadow-blue-500/20">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/40 transition-colors">
                <Image className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Image to Text</h3>
              <p className="text-gray-400">
                Extract text from images using advanced OCR technology with support for multiple languages and formats.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/60 transition-all hover:shadow-xl hover:shadow-purple-500/20">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/40 transition-colors">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">PDF Extraction</h3>
              <p className="text-gray-400">
                Process multi-page PDFs seamlessly. Extract text from every page with intelligent page-break detection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl p-6 hover:border-pink-400/60 transition-all hover:shadow-xl hover:shadow-pink-500/20">
              <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/40 transition-colors">
                <BarChart3 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Analysis</h3>
              <p className="text-gray-400">
                Get detailed insights about your content including sentiment analysis and keyword extraction.
              </p>
            </div>

            {/* Feature 4 - NEW: Prompt Refiner */}
            <div className="group bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-400/60 transition-all hover:shadow-xl hover:shadow-indigo-500/20">
              <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/40 transition-colors">
                <Wand2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prompt Refiner</h3>
              <p className="text-gray-400">
                Transform multi-modal inputs (text, images, PDFs, Word docs) into structured, refined prompts with AI-powered intelligence.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:border-green-400/60 transition-all hover:shadow-xl hover:shadow-green-500/20">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/40 transition-colors">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Process documents in milliseconds. Optimized algorithms ensure blazing-fast extraction and analysis.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/60 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/40 transition-colors">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                Your data is encrypted end-to-end. We never store your original files without permission.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-500/20">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/40 transition-colors">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Powered</h3>
              <p className="text-gray-400">
                Leverage cutting-edge AI models for intelligent text recognition and content understanding.
              </p>
            </div>

            {/* Feature 8 - Multi-format Support */}
            <div className="group bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6 hover:border-teal-400/60 transition-all hover:shadow-xl hover:shadow-teal-500/20">
              <div className="bg-teal-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-500/40 transition-colors">
                <FileType className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Format Support</h3>
              <p className="text-gray-400">
                Support for images, PDFs, Word documents, and more. Process any format with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple steps to extract, analyze, and refine your content
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/30 border-2 border-blue-400 mb-4">
                  <span className="text-xl font-bold text-blue-300">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Upload</h3>
                <p className="text-sm text-gray-400">
                  Upload images, PDFs, or Word documents. Multiple formats supported.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:border-purple-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/30 border-2 border-purple-400 mb-4">
                  <span className="text-xl font-bold text-purple-300">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Extract</h3>
                <p className="text-sm text-gray-400">
                  AI-powered OCR extracts text from your files with high accuracy.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-2xl p-6 text-center hover:border-pink-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-500/30 border-2 border-pink-400 mb-4">
                  <span className="text-xl font-bold text-pink-300">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyze</h3>
                <p className="text-sm text-gray-400">
                  Get sentiment analysis, keywords, and insights from your content.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* Step 4 - NEW: Refine */}
            <div>
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 rounded-2xl p-6 text-center hover:border-indigo-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/30 border-2 border-indigo-400 mb-4">
                  <span className="text-xl font-bold text-indigo-300">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Refine</h3>
                <p className="text-sm text-gray-400">
                  Transform inputs into structured prompts with AI-powered refinement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-t border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Extract & Refine?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are extracting, analyzing, and refining content with ease. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => user ? navigate('/upload') : navigate('/register')}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
            >
              Start Extracting
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => user ? navigate('/refine-prompt') : navigate('/register')}
              className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/50"
            >
              Try Prompt Refiner
              <Wand2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 mb-2">
          {user ? `Welcome back, ${user.fullname || user.name}! Ready to analyze more content?` : "Don't have an account yet?"}
        </p>
        <p className="text-sm text-gray-500">
          {user ? "Head to the upload page or try the Prompt Refiner to get started" : "Sign up now and start extracting text in seconds"}
        </p>
      </section>
    </div>
  )
}

export default Body
