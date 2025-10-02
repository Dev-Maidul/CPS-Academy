'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 No user found, redirecting to login...')
      router.push('/login')
      return
    }

    if (user) {
      const mockCourses = [
        { id: 1, title: 'Web Development Fundamentals', description: 'Learn HTML, CSS, and JavaScript', duration: '4 weeks', level: 'Beginner', price: 'Free', image: '🌐', enrolled: true, progress: 65 },
        { id: 2, title: 'Introduction to Programming', description: 'Start your programming journey with Python', duration: '6 weeks', level: 'Beginner', price: 'Free', image: '🐍', enrolled: false, progress: 0 },
        { id: 3, title: 'Digital Marketing Basics', description: 'Understand digital marketing strategies', duration: '3 weeks', level: 'Intermediate', price: 'Premium', image: '📱', enrolled: false, progress: 0 },
        { id: 4, title: 'Data Science Introduction', description: 'Explore data analysis and visualization', duration: '8 weeks', level: 'Intermediate', price: 'Premium', image: '📊', enrolled: false, progress: 0 },
        { id: 5, title: 'UI/UX Design Principles', description: 'Learn user interface and experience design', duration: '5 weeks', level: 'Beginner', price: 'Free', image: '🎨', enrolled: true, progress: 30 },
        { id: 6, title: 'Advanced JavaScript', description: 'Master modern JavaScript concepts', duration: '6 weeks', level: 'Advanced', price: 'Premium', image: '⚡', enrolled: false, progress: 0 }
      ]
      setTimeout(() => {
        setCourses(mockCourses)
        setCoursesLoading(false)
      }, 1000)
    }
  }, [user, loading, router])

  const handleUpgrade = () => {
    alert('Redirecting to upgrade page...')
  }

  const handleEnroll = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true, progress: 0 } : course
    ))
    alert('Course enrolled successfully!')
  }

  const handleViewDetails = (courseId) => {
    router.push(`/courses/${courseId}`)
  }

  const handleContinueLearning = (courseId) => {
    alert(`Continuing with course ${courseId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const enrolledCourses = courses.filter(course => course.enrolled)
  const freeCourses = courses.filter(course => course.price === 'Free' && !course.enrolled)
  const premiumCourses = courses.filter(course => course.price === 'Premium')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-gray-600">Hello, {user.name || user.username}!</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                {user.role}
              </span>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition cursor-pointer w-full sm:w-auto border sm:border-0"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-6 sm:space-x-8 min-w-max">
            {['overview', 'courses', 'progress', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">👤</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Welcome to CPS Academy!</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  As a Normal User, you have access to free courses. Upgrade to Student role for premium courses & mentorship.
                </p>
              </div>
            </div>
            <button
              onClick={handleUpgrade}
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition shadow-md"
            >
              Upgrade to Student
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Each stat box */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Available</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{courses.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Enrolled</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-purple-500">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Free</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {freeCourses.length + enrolledCourses.filter(c => c.price === 'Free').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-yellow-500">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Hours</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">12h</p>
          </div>
        </div>

        {/* Course sections remain same, already responsive with grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}
        {/* ... keep your enrolled and available courses UI as-is ... */}

      </main>
    </div>
  )
}
