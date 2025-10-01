'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react' 
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function CourseDetail() {
  const params = useParams()
  const courseId = params.id
  const { user } = useAuth()
  const router = useRouter()
  const [enrolled, setEnrolled] = useState(false)
  const [activeModule, setActiveModule] = useState(0)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('🔍 Fetching course with ID:', courseId)
        
        // FIX: Strapi v4 API structure - populate modules and their lessons
        const response = await fetch(
  `http://localhost:1337/api/courses/${courseId}?populate=modules.lessons`
)
        
        console.log('📡 API Response Status:', response.status)
        
        if (!response.ok) {
          // If 404, check if course exists in the list
          if (response.status === 404) {
            console.log('❌ Course not found in API, checking available courses...')
            
            // Fetch all courses to see what's available
            const allCoursesResponse = await fetch('http://localhost:1337/api/courses')
            const allCoursesData = await allCoursesResponse.json()
            console.log('📋 Available courses:', allCoursesData)
            
            throw new Error(`Course ID ${courseId} not found. Available courses: ${allCoursesData.data?.map(c => c.id).join(', ')}`)
          }
          throw new Error(`API Error: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📦 Course API Response:', data)
        
        // FIX: Strapi v4 structure - data is in data.attributes
        if (data.data) {
          const courseAttributes = data.data.attributes || data.data
          
          const courseData = {
            id: data.data.id,
            title: courseAttributes.title || 'No Title',
            description: courseAttributes.description || 'No Description',
            longDescription: courseAttributes.longDescription || courseAttributes.description || 'No detailed description available.',
            category: courseAttributes.category || 'programming',
            level: courseAttributes.level || 'Beginner',
            duration: courseAttributes.duration || 'Not Specified',
            students: courseAttributes.students || 0,
            price: courseAttributes.price === '0' || !courseAttributes.price ? 'Free' : `৳${courseAttributes.price}`,
            instructor: courseAttributes.instructor || 'Unknown Instructor',
            rating: courseAttributes.rating || 0,
            image: '📚',
            modules: courseAttributes.modules?.data || courseAttributes.modules || []
          }
          console.log('✅ Processed Course Data:', courseData)
          setCourse(courseData)
        } else {
          console.log('❌ No course data found in response')
          setCourse(null)
        }
      } catch (error) {
        console.error('💥 Error fetching course:', error)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    } else {
      console.log('❌ No course ID provided')
      setLoading(false)
    }
  }, [courseId])

  const handleEnroll = async () => {
    if (!user) {
      alert('Please login to enroll in this course!')
      router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`))
      return
    }

    if (!course) {
      alert('Course information not available. Please try again.')
      return
    }

    try {
      // Free course enrollment - No payment integration
      setEnrolled(true)
      
      // Save enrollment to localStorage (temporary solution)
      const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
      
      // Check if already enrolled
      const alreadyEnrolled = userEnrollments.some(enrollment => enrollment.courseId === course.id)
      
      if (!alreadyEnrolled) {
        userEnrollments.push({
          courseId: course.id,
          courseTitle: course.title,
          courseImage: course.image,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          lastAccessed: new Date().toISOString()
        })
        localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
        
        // Update course students count (mock)
        const updatedStudents = (course.students || 0) + 1
        setCourse(prev => prev ? {...prev, students: updatedStudents} : null)
      }
      
      alert(`🎉 Successfully enrolled in "${course.title}"!`)
      
      // Redirect to student dashboard after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
      
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Enrollment failed. Please try again.')
    }
  }

  const handleLessonClick = (lessonId, lessonTitle) => {
    if (!user) {
      alert('Please login to access course content!')
      router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`))
      return
    }

    if (!enrolled) {
      alert('Please enroll in this course first!')
      return
    }

    // Update last accessed time
    const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
    const updatedEnrollments = userEnrollments.map(enrollment => 
      enrollment.courseId === course.id 
        ? {...enrollment, lastAccessed: new Date().toISOString()}
        : enrollment
    )
    localStorage.setItem('userEnrollments', JSON.stringify(updatedEnrollments))

    // For now, show alert. Later implement video player
    alert(`🎬 Starting lesson: ${lessonTitle}`)
    // router.push(`/courses/${courseId}/lessons/${lessonId}`)
  }

  // Check if user is already enrolled
  useEffect(() => {
    if (user && course) {
      const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
      const isEnrolled = userEnrollments.some(enrollment => enrollment.courseId === course.id)
      setEnrolled(isEnrolled)
      console.log('✅ Enrollment status:', isEnrolled)
    }
  }, [user, course])

  // Calculate progress
  const completedLessons = 0
  const totalLessons = course?.modules?.reduce((total, module) => {
    const moduleLessons = module.attributes?.lessons?.data || module.lessons || []
    return total + moduleLessons.length
  }, 0) || 0
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
          <p className="text-sm text-gray-500 mt-2">Course ID: {courseId}</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist or may have been removed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Course ID: <code>{courseId}</code>
          </p>
          <div className="space-y-3">
            <Link 
              href="/courses" 
              className="block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Browse All Courses
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="block bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{course.image}</div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {course.category?.toUpperCase() || 'PROGRAMMING'}
                  </span>
                  {course.price === 'Free' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      FREE
                    </span>
                  )}
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span>👤</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span>⭐</span>
                  <span className="font-medium">{course.rating}/5.0 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span>👥</span>
                  <span className="font-medium">{course.students} Students</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span>⏱️</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>
            </div>
            
            {/* Enrollment Card */}
            <div className="lg:w-96 w-full bg-white border-2 border-gray-100 rounded-xl p-6 lg:sticky lg:top-8 shadow-lg">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-800">{course.price}</span>
                {course.price === 'Free' && (
                  <div className="text-green-600 text-sm font-medium mt-1">🎁 Completely Free</div>
                )}
              </div>
              
              {!user ? (
                <div className="space-y-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                    <p className="text-yellow-800 text-sm">🔐 Login required to enroll</p>
                  </div>
                  <button 
                    onClick={() => router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`))}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
                  >
                    Login to Enroll
                  </button>
                </div>
              ) : enrolled ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-800 font-medium">Your Progress</span>
                      <span className="text-green-800 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
                  >
                    🎯 Continue Learning
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Access all course materials from your dashboard
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer text-lg"
                  >
                    🚀 Enroll for Free
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Instant access • Lifetime availability
                  </p>
                </div>
              )}
              
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✅</span>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✅</span>
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✅</span>
                  <span>Hands-on projects</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg">✅</span>
                  <span>Community support</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{course.longDescription}</p>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
          
          {/* Access Warning */}
          {(!user || !enrolled) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-xl">🔒</span>
                <div>
                  <p className="text-blue-800 font-medium">
                    {!user 
                      ? 'Login required to view course content' 
                      : 'Enroll in this course to access all lessons'
                    }
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    {!user 
                      ? 'Create an account or login to start learning' 
                      : 'Click the enroll button above to get started'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, index) => {
                const moduleData = module.attributes || module
                const lessons = moduleData.lessons?.data || moduleData.lessons || []
                
                return (
                  <div key={module.id || index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                    <button
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      disabled={!user || !enrolled}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                          user && enrolled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-800">{moduleData.title}</h3>
                          <p className="text-gray-600 text-sm">
                            {lessons.length} lessons • {moduleData.duration}
                          </p>
                        </div>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          activeModule === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeModule === index && lessons.length > 0 && (
                      <div className="p-6 bg-white border-t border-gray-200">
                        <p className="text-gray-700 mb-4">{moduleData.description}</p>
                        <div className="space-y-3">
                          {lessons.map((lesson, lessonIndex) => {
                            const lessonData = lesson.attributes || lesson
                            return (
                              <div 
                                key={lesson.id || lessonIndex} 
                                onClick={() => handleLessonClick(lesson.id, lessonData.title)}
                                className={`flex items-center justify-between p-4 border rounded-lg transition cursor-pointer ${
                                  user && enrolled
                                    ? 'border-gray-200 hover:bg-blue-50 hover:border-blue-200' 
                                    : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    user && enrolled ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    {lessonData.type === 'video' ? '🎥' : '📄'}
                                  </div>
                                  <div>
                                    <h4 className={`font-medium ${
                                      user && enrolled ? 'text-gray-800' : 'text-gray-500'
                                    }`}>
                                      {lessonData.title}
                                    </h4>
                                    <p className={`text-sm ${
                                      user && enrolled ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                      {lessonData.duration} • {lessonData.type || 'video'}
                                    </p>
                                  </div>
                                </div>
                                {user && enrolled ? (
                                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition cursor-pointer">
                                    Start
                                  </button>
                                ) : (
                                  <span className="text-gray-400 text-sm px-3 py-1 bg-gray-200 rounded">Locked</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Course content coming soon</h3>
                <p className="text-gray-600">The instructor is preparing amazing learning materials for this course.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}