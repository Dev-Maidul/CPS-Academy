'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  const roleContent = {
    student: {
      title: "Student Dashboard",
      description: "Access your courses, track progress, and watch class recordings.",
      features: ["Course Access", "Class Recordings", "Progress Tracking", "Assignments"],
      courses: ["Web Development", "Data Science", "Mobile App Development"]
    },
    developer: {
      title: "Developer Dashboard", 
      description: "Developer tools, API access, and technical resources.",
      features: ["API Documentation", "Developer Tools", "Technical Support", "System Status"],
      courses: ["Advanced JavaScript", "System Architecture", "DevOps"]
    },
    social: {
      title: "Social Media Manager Dashboard",
      description: "Manage social content, analytics, and engagement.",
      features: ["Content Calendar", "Analytics", "Social Posts", "Engagement Metrics"],
      courses: ["Digital Marketing", "Content Strategy", "Social Media Analytics"]
    },
    normal: {
      title: "User Dashboard",
      description: "Browse available courses and manage your account.",
      features: ["Course Catalog", "Account Settings", "Learning Resources", "Support"],
      courses: ["All Available Courses"]
    }
  }

  const content = roleContent[user.role] || roleContent.normal

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{content.title}</h1>
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
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Your Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-gray-800">{feature}</h3>
                    <p className="text-sm text-gray-600 mt-1">Access your {feature.toLowerCase()} here</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
              <div className="space-y-3">
                {content.courses.map((course, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <span className="font-medium">{course}</span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                      Enroll
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Role Information</h2>
            <p className="mb-4">{content.description}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Role: {user.role}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Full access to {content.features.length} features</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>{content.courses.length} courses available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Demo Mode:</strong> This is mock authentication. For real implementation, 
            connect to Strapi backend with proper API calls.
          </p>
        </div>
      </div>
    </div>
  )
}