'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import StudentDashboard from '../components/Dashboards/StudentDashboard'
import DeveloperDashboard from '../components/Dashboards/DeveloperDashboard';
import SocialMediaDashboard from '../components/Dashboards/SocialMediaDashboard';
import NormalUserDashboard from '../components/Dashboards/SocialMediaDashboard';
export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Render different dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />
      case 'developer':
        return <DeveloperDashboard />
      case 'social':
        return <SocialMediaDashboard />
      case 'normal':
        return <NormalUserDashboard />
      default:
        return <NormalUserDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user.role === 'student' && 'Student Dashboard'}
                {user.role === 'developer' && 'Developer Dashboard'}
                {user.role === 'social' && 'Social Media Dashboard'}
                {user.role === 'normal' && 'User Dashboard'}
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
              <div className="flex items-center mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {user.role.toUpperCase()} ROLE
                </span>
                <span className="ml-3 text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Role-specific Dashboard Content */}
        {renderDashboard()}

        {/* Demo Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Demo Mode:</strong> This is mock authentication. Each user role sees different content and features.
          </p>
        </div>
      </div>
    </div>
  )
}