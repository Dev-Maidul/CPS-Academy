'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('my-courses')
  const [courses, setCourses] = useState([])
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [stats, setStats] = useState({})
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      // Mock data for student dashboard
      const mockCourses = [
        {
          id: 1,
          title: 'Web Development Fundamentals',
          description: 'Learn HTML, CSS, JavaScript and modern web development practices',
          instructor: 'Sarah Johnson',
          duration: '8 weeks',
          level: 'Beginner',
          image: '🌐',
          progress: 65,
          totalModules: 12,
          completedModules: 8,
          nextClass: '2024-01-15T10:00:00',
          enrolled: true,
          category: 'Development'
        },
        {
          id: 2,
          title: 'React Masterclass',
          description: 'Master React.js with hooks, context, and advanced patterns',
          instructor: 'Mike Chen',
          duration: '6 weeks',
          level: 'Intermediate',
          image: '⚛️',
          progress: 30,
          totalModules: 10,
          completedModules: 3,
          nextClass: '2024-01-16T14:00:00',
          enrolled: true,
          category: 'Development'
        },
        {
          id: 3,
          title: 'Node.js Backend Development',
          description: 'Build scalable backend applications with Node.js and Express',
          instructor: 'Emily Davis',
          duration: '10 weeks',
          level: 'Intermediate',
          image: '🚀',
          progress: 0,
          totalModules: 15,
          completedModules: 0,
          nextClass: '2024-01-17T16:00:00',
          enrolled: true,
          category: 'Backend'
        },
        {
          id: 4,
          title: 'Database Design & SQL',
          description: 'Learn database design principles and SQL query optimization',
          instructor: 'David Wilson',
          duration: '6 weeks',
          level: 'Intermediate',
          image: '🗄️',
          progress: 0,
          totalModules: 8,
          completedModules: 0,
          nextClass: null,
          enrolled: false,
          category: 'Database'
        }
      ]

      const mockUpcomingClasses = [
        {
          id: 1,
          title: 'React Hooks Deep Dive',
          course: 'React Masterclass',
          time: '2024-01-15T14:00:00',
          duration: '90 mins',
          instructor: 'Mike Chen',
          type: 'live',
          joinLink: '#'
        },
        {
          id: 2,
          title: 'JavaScript Async/Await',
          course: 'Web Development Fundamentals',
          time: '2024-01-16T10:00:00',
          duration: '60 mins',
          instructor: 'Sarah Johnson',
          type: 'live',
          joinLink: '#'
        },
        {
          id: 3,
          title: 'Express Middleware',
          course: 'Node.js Backend Development',
          time: '2024-01-17T16:00:00',
          duration: '75 mins',
          instructor: 'Emily Davis',
          type: 'recorded',
          joinLink: '#'
        }
      ]

      const mockStats = {
        totalCourses: 4,
        enrolledCourses: 3,
        completedCourses: 0,
        learningHours: 24,
        assignmentsDue: 2,
        averageProgress: 32
      }

      setTimeout(() => {
        setCourses(mockCourses)
        setUpcomingClasses(mockUpcomingClasses)
        setStats(mockStats)
        setCoursesLoading(false)
      }, 1000)
    }
  }, [user, loading, router])

  const handleContinueLearning = (courseId) => {
    router.push(`/courses/${courseId}/learn`)
  }

  const handleJoinClass = (classId) => {
    alert(`Joining class ${classId}\nIn production, this would open the video conference.`)
  }

  const handleViewRecordings = (courseId) => {
    router.push(`/courses/${courseId}/recordings`)
  }

  const handleEnroll = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ))
    alert('Successfully enrolled in the course!')
  }

  const formatTime = (dateString) => {
    if (!dateString) return 'Not scheduled'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTimeMobile = (dateString) => {
    if (!dateString) return 'Not scheduled'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
  const availableCourses = courses.filter(course => !course.enrolled)

  const tabs = [
    { id: 'my-courses', name: 'My Courses', icon: '📚' },
    { id: 'upcoming-classes', name: 'Upcoming', icon: '🎯' },
    { id: 'recordings', name: 'Recordings', icon: '🎥' },
    { id: 'assignments', name: 'Assignments', icon: '📝' },
    { id: 'resources', name: 'Resources', icon: '📁' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600 text-sm lg:text-base">Welcome back, {user.name || user.username}! 👋</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium cursor-default">
                {user.role}
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => router.push('/profile')}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-sm">
          <div className="px-4 py-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition cursor-pointer flex items-center space-x-3 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
            <button
              onClick={() => router.push('/profile')}
              className="w-full text-left px-4 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer flex items-center space-x-3"
            >
              <span>👤</span>
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm lg:shadow-md p-3 lg:p-6 border-l-2 lg:border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Enrolled</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.enrolledCourses}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm lg:text-xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm lg:shadow-md p-3 lg:p-6 border-l-2 lg:border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Progress</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm lg:text-xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm lg:shadow-md p-3 lg:p-6 border-l-2 lg:border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Hours</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.learningHours}h</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm lg:text-xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm lg:shadow-md p-3 lg:p-6 border-l-2 lg:border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Due</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.assignmentsDue}</p>
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm lg:text-xl">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition cursor-pointer flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'my-courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
                  <span className="text-sm text-gray-500">
                    {enrolledCourses.length} of {courses.length} courses
                  </span>
                </div>

                {coursesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                              {course.image}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                              <p className="text-sm text-gray-600">by {course.instructor}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                        {/* Progress Section */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{course.progress}% • {course.completedModules}/{course.totalModules} modules</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>📅 {course.duration}</span>
                          <span>Next: {formatTime(course.nextClass)}</span>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleContinueLearning(course.id)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg transition text-sm font-medium cursor-pointer"
                          >
                            Continue Learning
                          </button>
                          <button
                            onClick={() => handleViewRecordings(course.id)}
                            className="px-4 py-2.5 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition text-sm font-medium cursor-pointer"
                          >
                            Recordings
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Available Courses Section */}
                {availableCourses.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Courses</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {availableCourses.map((course) => (
                        <div key={course.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                                {course.image}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                <p className="text-sm text-gray-600">by {course.instructor}</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                              {course.level}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>📅 {course.duration}</span>
                            <span>🔒 Not enrolled</span>
                          </div>

                          <button
                            onClick={() => handleEnroll(course.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg transition text-sm font-medium cursor-pointer"
                          >
                            Enroll Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'upcoming-classes' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Classes</h2>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            classItem.type === 'live' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {classItem.type === 'live' ? '🔴' : '📹'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{classItem.title}</h3>
                            <p className="text-sm text-gray-600">
                              {classItem.course} • {classItem.instructor} • {classItem.duration}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatTime(classItem.time)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleJoinClass(classItem.id)}
                          className={`px-6 py-2 rounded-lg font-medium transition cursor-pointer ${
                            classItem.type === 'live' 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {classItem.type === 'live' ? 'Join Live' : 'Watch Now'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recordings' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Class Recordings</h2>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎥</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Recordings Available</h3>
                  <p className="text-gray-600">Class recordings will appear here after live sessions end.</p>
                </div>
              </div>
            )}

            {activeTab === 'assignments' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Assignments</h2>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Pending Assignments</h3>
                  <p className="text-gray-600">You are all caught up! New assignments will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-xl">📚</span>
                    </div>
                    <h3 className="font-semibold text-blue-800 mb-2">Study Materials</h3>
                    <p className="text-blue-600 text-sm mb-4">PDFs, slides, and reading materials</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer text-sm">
                      Browse Files
                    </button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 text-xl">💬</span>
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">Discussion Forum</h3>
                    <p className="text-green-600 text-sm mb-4">Ask questions and get help</p>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition cursor-pointer text-sm">
                      Join Discussion
                    </button>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 text-xl">👥</span>
                    </div>
                    <h3 className="font-semibold text-purple-800 mb-2">Study Groups</h3>
                    <p className="text-purple-600 text-sm mb-4">Collaborate with peers</p>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition cursor-pointer text-sm">
                      Find Groups
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Tab Content */}
        <div className="lg:hidden bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            {activeTab === 'my-courses' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">My Courses</h2>
                  <span className="text-xs text-gray-500">
                    {enrolledCourses.length}/{courses.length}
                  </span>
                </div>

                {coursesLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl">
                              {course.image}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-800 truncate">{course.title}</h3>
                              <p className="text-xs text-gray-600 truncate">by {course.instructor}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </div>

                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{course.description}</p>

                        {/* Progress Section */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}% • {course.completedModules}/{course.totalModules}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>📅 {course.duration}</span>
                          <span className="text-right">Next: {formatTimeMobile(course.nextClass)}</span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleContinueLearning(course.id)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition text-xs font-medium cursor-pointer"
                          >
                            Continue
                          </button>
                          <button
                            onClick={() => handleViewRecordings(course.id)}
                            className="px-3 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition text-xs font-medium cursor-pointer"
                          >
                            Recordings
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Available Courses Section */}
                {availableCourses.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Available Courses</h3>
                    <div className="space-y-4">
                      {availableCourses.map((course) => (
                        <div key={course.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                {course.image}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-800 truncate">{course.title}</h3>
                                <p className="text-xs text-gray-600 truncate">by {course.instructor}</p>
                              </div>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                              {course.level}
                            </span>
                          </div>

                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{course.description}</p>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>📅 {course.duration}</span>
                            <span>🔒 Not enrolled</span>
                          </div>

                          <button
                            onClick={() => handleEnroll(course.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition text-xs font-medium cursor-pointer"
                          >
                            Enroll Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'upcoming-classes' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Classes</h2>
                <div className="space-y-3">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          classItem.type === 'live' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {classItem.type === 'live' ? '🔴' : '📹'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 mb-1">{classItem.title}</h3>
                          <p className="text-xs text-gray-600 mb-1">
                            {classItem.course} • {classItem.instructor}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimeMobile(classItem.time)} • {classItem.duration}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleJoinClass(classItem.id)}
                        className={`w-full mt-3 py-2 rounded-lg font-medium transition cursor-pointer text-sm ${
                          classItem.type === 'live' 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {classItem.type === 'live' ? 'Join Live' : 'Watch Now'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recordings' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Class Recordings</h2>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🎥</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">No Recordings Available</h3>
                  <p className="text-gray-600 text-sm">Class recordings will appear here after live sessions end.</p>
                </div>
              </div>
            )}

            {activeTab === 'assignments' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Assignments</h2>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📝</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">No Pending Assignments</h3>
                  <p className="text-gray-600 text-sm">You are all caught up! New assignments will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Learning Resources</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600">📚</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-800 text-sm">Study Materials</h3>
                        <p className="text-blue-600 text-xs">PDFs, slides, and reading materials</p>
                      </div>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition cursor-pointer text-xs">
                      Browse Files
                    </button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 text-sm">Discussion Forum</h3>
                        <p className="text-green-600 text-xs">Ask questions and get help</p>
                      </div>
                    </div>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition cursor-pointer text-xs">
                      Join Discussion
                    </button>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600">👥</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple-800 text-sm">Study Groups</h3>
                        <p className="text-purple-600 text-xs">Collaborate with peers</p>
                      </div>
                    </div>
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition cursor-pointer text-xs">
                      Find Groups
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl shadow-md p-4 lg:p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-sm lg:text-base">💬</span>
              </div>
              <div>
                <h4 className="text-base lg:text-lg font-semibold">Need Help?</h4>
                <p className="text-blue-100 text-xs lg:text-sm">Get support from instructors and TAs</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-3 lg:px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm lg:text-base">
              Contact Support
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg lg:rounded-xl shadow-md p-4 lg:p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-sm lg:text-base">📊</span>
              </div>
              <div>
                <h4 className="text-base lg:text-lg font-semibold">Progress Report</h4>
                <p className="text-green-100 text-xs lg:text-sm">View your learning analytics</p>
              </div>
            </div>
            <button className="bg-white text-green-600 hover:bg-green-50 px-3 lg:px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm lg:text-base">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}