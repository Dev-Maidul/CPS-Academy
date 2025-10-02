'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StudentDashboard() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name || user.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Web Development Course</h3>
            <p className="text-gray-600 mb-4">Learn full-stack web development with modern technologies</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="text-green-600 font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
              Continue Learning
            </button>
          </div>

          {/* Class Schedule */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Classes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">React Fundamentals</p>
                  <p className="text-sm text-gray-600">10:00 AM - 11:30 AM</p>
                </div>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Live</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Node.js Backend</p>
                  <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
                </div>
                <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Upcoming</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                📚 View All Courses
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                🎥 Watch Recordings
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                📝 Submit Assignment
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                💬 Ask Questions
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}