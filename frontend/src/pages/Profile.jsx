import React from 'react'
import { Clock, User, Settings, Heart, Lock, Zap, Download, Shield } from 'lucide-react'
import Navbar from '@/compo/Navbar'

const Profile = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Coming Soon Card */}
        <div className="relative mt-20 mb-12">
          {/* Animated background blobs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center mb-16">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-green-400 to-cyan-400 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative bg-slate-800 px-6 py-3 rounded-full border border-green-500/30">
                  <User className="w-6 h-6 text-green-400 mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-green-400 via-cyan-400 to-blue-400">
              Profile Hub
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Your personal profile, preferences, and account management tools are coming soon. Get ready to customize your experience!
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-300 font-medium">Launching Q1 2026</span>
            </div>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="group bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 hover:border-green-400/60 transition-all hover:shadow-xl hover:shadow-green-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 w-14 h-14 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-500/40 transition-colors">
                <User className="w-7 h-7 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Profile Settings</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Update your profile information, add a profile picture, bio, and customize your public profile for better personalization.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/60 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cyan-500/40 transition-colors">
                <Settings className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Account Settings</h3>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Manage email preferences, notification settings, two-factor authentication, and connected devices from your account hub.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/60 transition-all hover:shadow-xl hover:shadow-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 w-14 h-14 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/40 transition-colors">
                <Download className="w-7 h-7 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Data Export</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Download your data in multiple formats, export your extraction history, and maintain backups of your analysis results.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/60 transition-all hover:shadow-xl hover:shadow-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 w-14 h-14 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-500/40 transition-colors">
                <Shield className="w-7 h-7 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Privacy & Security</h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                    Soon
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Control your privacy settings, manage data retention policies, and view comprehensive security logs and activity history.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="relative bg-linear-to-r from-green-600/20 via-cyan-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-sm overflow-hidden mb-16">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Customization Options</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Personalize your experience with theme preferences, language settings, notification rules, and more advanced options coming soon.
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                <div className="text-lg font-bold text-green-400">🎨</div>
                <div className="text-xs text-gray-400 mt-1">Dark/Light Theme</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                <div className="text-lg font-bold text-cyan-400">🌐</div>
                <div className="text-xs text-gray-400 mt-1">Multi-Language</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                <div className="text-lg font-bold text-blue-400">🔔</div>
                <div className="text-xs text-gray-400 mt-1">Notifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Coming */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">Your Profile Features</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-green-400">👤</span>
                <h4 className="text-lg font-semibold">Complete Profile Management</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Edit your profile picture, bio, website link, and social media handles. Show your personality and let others know more about you.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-cyan-400">🔐</span>
                <h4 className="text-lg font-semibold">Advanced Security Features</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Enable two-factor authentication, manage API keys, view login history, and control which apps have access to your account.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-blue-400">⚙️</span>
                <h4 className="text-lg font-semibold">Notification Preferences</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Fine-tune email notifications, choose notification frequency, get alerts for important events, and manage digest emails.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-purple-400">💾</span>
                <h4 className="text-lg font-semibold">Account & Data Management</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Download your personal data, export analysis results, manage storage, and optionally delete your account with all associated data.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-pink-400">💎</span>
                <h4 className="text-lg font-semibold">Subscription & Billing</h4>
              </div>
              <p className="text-gray-400 ml-11">
                Upgrade or downgrade your plan, view billing history, manage payment methods, and see your current usage limits and quota.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 border-t border-white/10 pt-8">
          <p className="mb-2">We're building an amazing profile experience just for you.</p>
          <p className="text-sm">Check back soon for full account personalization and management features! 🎉</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
