'use client'
import { useAuth } from "@/app/contexts/AuthContext"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StudentDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    totalLessons: 0,
    learningHours: 0
  })

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        
        const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
        console.log('User Enrollments:', userEnrollments)
        
        if (userEnrollments.length === 0) {
          setEnrolledCourses([])
          setStats({
            totalCourses: 0,
            completedLessons: 0,
            totalLessons: 0,
            learningHours: 0
          })
          setLoading(false)
          return
        }

        const coursesWithProgress = await Promise.all(
          userEnrollments.map(async (enrollment) => {
            try {
              const response = await fetch(
                `http://localhost:1337/api/courses/${enrollment.courseId}?populate=modules.lessons`
              )
              
              if (!response.ok) {
                console.error(`Course ${enrollment.courseId} not found`)
                return null
              }
              
              const courseData = await response.json()
              
              if (courseData.data) {
                const course = courseData.data
                const attributes = course.attributes
                
                let totalLessons = 0
                if (attributes.modules?.data) {
                  attributes.modules.data.forEach(module => {
                    totalLessons += module.attributes.lessons?.data?.length || 0
                  })
                }
                
                const completedLessons = enrollment.completedLessons?.length || 0
                const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
                
                const nextLesson = getNextLesson(attributes, enrollment.completedLessons || [])
                
                return {
                  id: course.id,
                  title: attributes.title || 'Untitled Course',
                  description: attributes.description || 'No description available',
                  image: '📚',
                  progress: progress,
                  totalLessons: totalLessons,
                  completedLessons: completedLessons,
                  nextLesson: nextLesson,
                  lastAccessed: enrollment.lastAccessed,
                  enrolledAt: enrollment.enrolledAt
                }
              }
              return null
            } catch (error) {
              console.error(`Error fetching course ${enrollment.courseId}:`, error)
              return null
            }
          })
        )

        const validCourses = coursesWithProgress.filter(course => course !== null)
        console.log('Valid Courses:', validCourses)
        setEnrolledCourses(validCourses)

        const totalCompleted = validCourses.reduce((sum, course) => 
          sum + (course?.completedLessons || 0), 0
        )
        const totalLessons = validCourses.reduce((sum, course) => 
          sum + (course?.totalLessons || 0), 0
        )
        
        setStats({
          totalCourses: validCourses.length,
          completedLessons: totalCompleted,
          totalLessons: totalLessons,
          learningHours: Math.round(totalCompleted * 0.5)
        })

        const activity = JSON.parse(localStorage.getItem('userActivity') || '[]')
        setRecentActivity(activity.slice(0, 5))

      } catch (error) {
        console.error('Error loading dashboard:', error)
        setEnrolledCourses([])
        setStats({
          totalCourses: 0,
          completedLessons: 0,
          totalLessons: 0,
          learningHours: 0
        })
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const getNextLesson = (course, completedLessons = []) => {
    if (!course.modules?.data) return null
    
    for (const module of course.modules.data) {
      const moduleAttributes = module.attributes
      const lessons = moduleAttributes.lessons?.data || []
      
      for (const lesson of lessons) {
        const lessonId = lesson.id
        if (!completedLessons.includes(lessonId)) {
          return {
            id: lessonId,
            title: lesson.attributes?.title || 'Untitled Lesson',
            module: moduleAttributes.title,
            duration: lesson.attributes?.duration || '10 min'
          }
        }
      }
    }
    return null
  }

  const continueLearning = (course) => {
    if (course.nextLesson) {
      router.push(`/courses/${course.id}?lesson=${course.nextLesson.id}`)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Loading your dashboard...</h1>
          <p className="text-sm opacity-80">Checking your enrolled courses</p>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-xl p-6 h-64"></div>
            <div className="bg-gray-200 rounded-xl p-6 h-64"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!
          <span className="text-yellow-300 ml-2">👋</span>
        </h1>
        
        {enrolledCourses.length > 0 ? (
          <>
            <p className="opacity-90 mb-4">
              Continue your learning journey with {stats.totalCourses} active courses
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <div className="text-sm opacity-90">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.completedLessons}</div>
                <div className="text-sm opacity-90">Lessons Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalLessons}</div>
                <div className="text-sm opacity-90">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.learningHours}h</div>
                <div className="text-sm opacity-90">Learning Time</div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="opacity-90 mb-4">Start your learning journey by enrolling in courses</p>
            <button 
              onClick={() => router.push('/courses')}
              className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Browse Available Courses
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Courses</h2>
            <Link href="/courses" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Browse More Courses →
            </Link>
          </div>
          
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{course.image}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{course.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          course.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.progress}%
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                        {course.nextLesson && (
                          <span>Next: {course.nextLesson.title}</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => continueLearning(course)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          {course.progress === 0 ? 'Start' : 'Continue'} Learning
                        </button>
                        <button 
                          onClick={() => router.push(`/courses/${course.id}`)}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition"
                        >
                          View Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in courses</p>
              <Link 
                href="/courses" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition inline-block"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'lesson_completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'lesson_completed' ? '✓' : '📚'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400">Start learning to see your activity here</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => router.push('/courses')}
                className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📚</span>
                Browse Courses
              </button>
              <button 
                onClick={() => {
                  const firstCourse = enrolledCourses[0]
                  if (firstCourse) continueLearning(firstCourse)
                }}
                className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2"
                disabled={enrolledCourses.length === 0}
              >
                <span>🎯</span>
                Continue Learning
              </button>
              <button 
                onClick={() => router.push('/profile')}
                className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>👤</span>
                My Profile
              </button>
              <button 
                onClick={() => alert('Certificate feature coming soon!')}
                className="bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🏆</span>
                Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}