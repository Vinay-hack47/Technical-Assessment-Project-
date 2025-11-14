import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Zap, Image, FileText, BarChart3, Lock, Sparkles, ChevronRight } from 'lucide-react'

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
              Extract & Analyze<br />Social Media Content
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your images and PDFs into actionable insights. Extract text with precision, analyze sentiment, and unlock the power of your visual content.
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

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:border-green-400/60 transition-all hover:shadow-xl hover:shadow-green-500/20">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/40 transition-colors">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Process documents in milliseconds. Optimized algorithms ensure blazing-fast extraction and analysis.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/60 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/40 transition-colors">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                Your data is encrypted end-to-end. We never store your original files without permission.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-500/20">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/40 transition-colors">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Powered</h3>
              <p className="text-gray-400">
                Leverage cutting-edge AI models for intelligent text recognition and content understanding.
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
              Three simple steps to extract and analyze your content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center hover:border-blue-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/30 border-2 border-blue-400 mb-6">
                  <span className="text-2xl font-bold text-blue-300">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Upload Your File</h3>
                <p className="text-gray-400">
                  Upload an image or PDF document. We support JPG, PNG, GIF, and multi-page PDFs.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ChevronRight className="w-8 h-8 text-gray-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-8 text-center hover:border-purple-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/30 border-2 border-purple-400 mb-6">
                  <span className="text-2xl font-bold text-purple-300">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">We Extract & Analyze</h3>
                <p className="text-gray-400">
                  Our AI-powered system extracts text and performs comprehensive content analysis instantly.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ChevronRight className="w-8 h-8 text-gray-600" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-2xl p-8 text-center hover:border-pink-400/60 transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/30 border-2 border-pink-400 mb-6">
                  <span className="text-2xl font-bold text-pink-300">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Get Your Results</h3>
                <p className="text-gray-400">
                  View extracted text, analysis results, and insights all in one beautiful dashboard.
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
            Ready to Extract Insights?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are extracting and analyzing content with ease. Start for free today.
          </p>
          <button
            onClick={() => user ? navigate('/upload') : navigate('/register')}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 mx-auto"
          >
            Start Extracting Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 mb-2">
          {user ? `Welcome back, ${user.name}! Ready to analyze more content?` : "Don't have an account yet?"}
        </p>
        <p className="text-sm text-gray-500">
          {user ? "Head to the upload page to get started" : "Sign up now and start extracting text in seconds"}
        </p>
      </section>
    </div>
  )
}

export default Body
