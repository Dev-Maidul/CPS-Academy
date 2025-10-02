'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DeveloperDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.name || user.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {user.role}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>API Status</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Server Load</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Developer Tools</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                🔧 API Documentation
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                🐛 Debug Logs
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                📊 System Metrics
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                ⚙️ Server Configuration
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">User authentication updated</p>
                <p className="text-gray-500">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Course API endpoint modified</p>
                <p className="text-gray-500">5 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Database backup completed</p>
                <p className="text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}