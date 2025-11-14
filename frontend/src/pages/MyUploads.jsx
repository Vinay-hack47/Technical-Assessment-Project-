import React from 'react'
import { Clock, Zap, TrendingUp, BarChart3, Calendar, Bell } from 'lucide-react'
import Navbar from '@/compo/Navbar'

const MyUploads = () => {
  return (
    <>
    <Navbar></Navbar>
    
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Coming Soon Card */}
        <div className="relative mt-20 mb-12">
          {/* Animated background blobs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center mb-16">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative bg-slate-800 px-6 py-3 rounded-full border border-blue-500/30">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Coming Soon
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              We're building something amazing. Your upload history and advanced analytics are on the way!
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-blue-300 font-medium">Launching Q1 2026</span>
            </div>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/60 transition-all hover:shadow-xl hover:shadow-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/40 transition-colors">
                <BarChart3 className="w-7 h-7 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Upload History</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  View all your past uploads, extraction results, and keep track of your analysis history in one centralized dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/60 transition-all hover:shadow-xl hover:shadow-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/40 transition-colors">
                <TrendingUp className="w-7 h-7 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Advanced Analytics</h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Deep dive into your content with detailed analytics, trends, sentiment scores, and actionable insights powered by AI.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 hover:border-green-400/60 transition-all hover:shadow-xl hover:shadow-green-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/40 transition-colors">
                <Zap className="w-7 h-7 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Quick Actions</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Batch process multiple files, export results in various formats, and automate your content extraction workflow.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-400/60 transition-all hover:shadow-xl hover:shadow-yellow-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-500/20 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/40 transition-colors">
                <Calendar className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Scheduled Tasks</h3>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Schedule automatic extraction jobs, set up recurring tasks, and get notified when results are ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-sm overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4">
              <Bell className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Get Notified When It Launches</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Be the first to access these powerful features. We'll send you an email when your upload history and analytics are ready.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center">What's Coming Next?</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-blue-400">📊</span>
                <h4 className="text-lg font-semibold">Dashboard with Upload History</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Track all your uploads with timestamps, file sizes, extraction status, and quick access to previous results.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-purple-400">🤖</span>
                <h4 className="text-lg font-semibold">AI-Powered Content Insights</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Get sentiment analysis, keyword extraction, entity recognition, and content recommendations for your extracted text.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-pink-400">📈</span>
                <h4 className="text-lg font-semibold">Usage Statistics & Reports</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Visualize your extraction patterns, API usage, monthly trends, and generate detailed reports for your content strategy.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-green-400">⚡</span>
                <h4 className="text-lg font-semibold">Batch Processing & Automation</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Upload multiple files at once, set up automated workflows, and export results in CSV, JSON, or PDF formats.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 border-t border-white/10 pt-8">
          <p className="mb-2">In the meantime, you can continue extracting text from images and PDFs.</p>
          <p className="text-sm">Stay tuned for exciting updates! 🚀</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyUploads
