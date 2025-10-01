'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import Link from 'next/link'

export default function CourseDetail() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id
  const { user, role } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [userProgress, setUserProgress] = useState(null)
  const [expandedModules, setExpandedModules] = useState({})
  const [videoLoading, setVideoLoading] = useState(false)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        
        // Fetch ALL courses and find the one with matching ID
        const response = await fetch('http://localhost:1337/api/courses')
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses')
        }
        
        const data = await response.json()
        
        // Find the specific course by ID
        const allCourses = data.data || data
        const foundCourse = allCourses.find(course => course.id == courseId)
        
        if (foundCourse) {
          setCourse(foundCourse)
          
          // Check if user is enrolled
          const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
          const enrollment = userEnrollments.find(e => e.courseId == courseId)
          
          if (enrollment) {
            setIsEnrolled(true)
            setUserProgress(enrollment)
          }

          // Expand first module by default
          if (getDemoModules().length > 0) {
            setExpandedModules({ [getDemoModules()[0].id]: true })
          }
        } else {
          throw new Error(`Course with ID ${courseId} not found`)
        }
        
      } catch (error) {
        console.error('Error fetching course:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourseData()
    }
  }, [courseId])

  // Professional demo modules with real content
  const getDemoModules = () => {
    return [
      {
        id: 1,
        title: 'Introduction to Python',
        description: 'Get started with Python programming language',
        duration: '2 hours',
        lessons: [
          {
            id: 1,
            title: 'What is Python?',
            description: 'Understanding Python programming language and its applications',
            duration: '15 min',
            video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
            content: 'Python is a high-level, interpreted programming language known for its simplicity and readability.'
          },
          {
            id: 2,
            title: 'Setting up Environment',
            description: 'Install Python and setup development environment',
            duration: '20 min',
            video_url: 'https://www.youtube.com/embed/jFCNu1-Xdsw',
            content: 'Learn how to install Python and set up your development environment properly.'
          },
          {
            id: 3,
            title: 'Your First Python Program',
            description: 'Write and run your first Python program',
            duration: '25 min',
            video_url: 'https://www.youtube.com/embed/khKv-8q7YmY',
            content: 'Create and execute your first Python script with proper syntax.'
          }
        ]
      },
      {
        id: 2,
        title: 'Python Basics',
        description: 'Learn basic Python syntax and concepts',
        duration: '3 hours',
        lessons: [
          {
            id: 4,
            title: 'Variables and Data Types',
            description: 'Understanding variables and data types in Python',
            duration: '30 min',
            video_url: 'https://www.youtube.com/embed/ghCbURMWBD8',
            content: 'Learn about variables, strings, numbers, and basic data types in Python.'
          },
          {
            id: 5,
            title: 'Control Structures',
            description: 'If statements and loops in Python',
            duration: '35 min',
            video_url: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ',
            content: 'Master if-else statements and different types of loops in Python.'
          },
          {
            id: 6,
            title: 'Functions and Modules',
            description: 'Creating functions and using modules',
            duration: '40 min',
            video_url: 'https://www.youtube.com/embed/9Os0o3wzS_I',
            content: 'Learn to create reusable functions and work with Python modules.'
          }
        ]
      },
      {
        id: 3,
        title: 'Advanced Python Concepts',
        description: 'Dive deeper into Python programming',
        duration: '4 hours',
        lessons: [
          {
            id: 7,
            title: 'Object-Oriented Programming',
            description: 'Classes and objects in Python',
            duration: '45 min',
            video_url: 'https://www.youtube.com/embed/ZDa-Z5JzLYM',
            content: 'Understand classes, objects, inheritance, and polymorphism in Python.'
          },
          {
            id: 8,
            title: 'File Handling',
            description: 'Working with files in Python',
            duration: '30 min',
            video_url: 'https://www.youtube.com/embed/Uh2ebFW8OYM',
            content: 'Learn how to read from and write to files using Python.'
          }
        ]
      }
    ]
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const handleEnrollClick = async () => {
    if (!user) {
      alert('Please login to enroll in this course!')
      router.push('/login')
      return
    }
    
    try {
      const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
      const alreadyEnrolled = userEnrollments.some(enrollment => enrollment.courseId == courseId)
      
      if (!alreadyEnrolled) {
        const newEnrollment = {
          courseId: courseId,
          courseTitle: course?.title || 'Unknown Course',
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completedLessons: [],
          lastAccessed: new Date().toISOString()
        }
        
        userEnrollments.push(newEnrollment)
        localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
        
        // Add to activity
        const activity = JSON.parse(localStorage.getItem('userActivity') || '[]')
        activity.unshift({
          type: 'course_enrolled',
          message: `Enrolled in "${course?.title || 'Unknown Course'}"`,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('userActivity', JSON.stringify(activity))
        
        setIsEnrolled(true)
        setUserProgress(newEnrollment)

        // Auto-expand first module after enrollment
        const modules = getDemoModules()
        if (modules.length > 0) {
          setExpandedModules({ [modules[0].id]: true })
        }
      }
      
      alert(`🎉 Successfully enrolled in ${course?.title || 'the course'}!`)
      
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Enrollment failed. Please try again.')
    }
  }

  const handleLessonClick = (lesson) => {
    if (!isEnrolled) {
      alert('Please enroll in the course to access lessons!')
      return
    }
    
    setSelectedLesson(lesson)
    setVideoLoading(true)
    
    // Update last accessed
    const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
    const enrollmentIndex = userEnrollments.findIndex(e => e.courseId == courseId)
    
    if (enrollmentIndex !== -1) {
      userEnrollments[enrollmentIndex].lastAccessed = new Date().toISOString()
      localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
    }
  }

  const markLessonCompleted = (lessonId, e) => {
    if (e) e.stopPropagation()
    
    if (!isEnrolled) {
      alert('Please enroll in the course first!')
      return
    }
    
    const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
    const enrollmentIndex = userEnrollments.findIndex(e => e.courseId == courseId)
    
    if (enrollmentIndex !== -1) {
      const enrollment = userEnrollments[enrollmentIndex]
      
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId)
        
        // Calculate progress
        const totalLessons = getTotalLessons()
        enrollment.progress = totalLessons > 0 ? 
          Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0
        
        localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
        setUserProgress(enrollment)
        
        // Add to activity
        const activity = JSON.parse(localStorage.getItem('userActivity') || '[]')
        const lessonTitle = getLessonTitle(lessonId)
        activity.unshift({
          type: 'lesson_completed',
          message: `Completed: ${lessonTitle}`,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('userActivity', JSON.stringify(activity))
        
        // Show success message
        alert(`✅ "${getLessonTitle(lessonId)}" marked as completed!`)
      } else {
        alert('This lesson is already completed!')
      }
    }
  }

  const startLearning = () => {
    if (!isEnrolled) {
      alert('Please enroll in the course first!')
      return
    }

    const modules = getDemoModules()
    if (modules.length > 0 && modules[0].lessons.length > 0) {
      const firstLesson = modules[0].lessons[0]
      handleLessonClick(firstLesson)
      
      // Expand first module
      setExpandedModules({ [modules[0].id]: true })
      
      // Scroll to lesson section
      setTimeout(() => {
        document.getElementById('lesson-content')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 500)
    }
  }

  const continueLearning = () => {
    if (!isEnrolled) return

    const modules = getDemoModules()
    let nextLesson = null
    
    // Find first incomplete lesson
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (!userProgress?.completedLessons?.includes(lesson.id)) {
          nextLesson = lesson
          break
        }
      }
      if (nextLesson) break
    }

    if (nextLesson) {
      handleLessonClick(nextLesson)
      
      // Expand the module containing the next lesson
      const moduleContainingLesson = modules.find(m => 
        m.lessons.some(l => l.id === nextLesson.id)
      )
      if (moduleContainingLesson) {
        setExpandedModules({ [moduleContainingLesson.id]: true })
      }
      
      // Scroll to lesson section
      setTimeout(() => {
        document.getElementById('lesson-content')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 500)
    } else {
      alert('🎉 Congratulations! You have completed all lessons in this course!')
    }
  }

  const getTotalLessons = () => {
    const modules = getDemoModules()
    return modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  const getCompletedLessons = () => {
    return userProgress?.completedLessons?.length || 0
  }

  const getLessonTitle = (lessonId) => {
    const modules = getDemoModules()
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === lessonId) {
          return lesson.title
        }
      }
    }
    return 'Unknown Lesson'
  }

  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(lessonId) || false
  }

  const handleVideoLoad = () => {
    setVideoLoading(false)
  }

  const handleVideoError = () => {
    setVideoLoading(false)
    alert('Failed to load video. Please check the video URL.')
  }

  // Role-based content rendering
  const renderRoleSpecificContent = () => {
    switch(role) {
      case 'student':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">🎓 Student Access</h3>
            <p className="text-green-700">You have full access to all course materials and videos.</p>
          </div>
        )
      
      case 'social-media-manager':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-800 mb-2">📊 Social Media Manager View</h3>
            <p className="text-purple-700">Course Analytics: 1,245 enrollments • 68% completion rate</p>
          </div>
        )
      
      case 'developer':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">💻 Developer Information</h3>
            <p className="text-blue-700">Course ID: {courseId} • API: /api/courses</p>
          </div>
        )
      
      default:
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">🔒 Limited Access</h3>
            <p className="text-yellow-700">Enroll in the course to access all lessons and materials.</p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading course details...</p>
          <p className="text-sm text-gray-500 mt-1">Course ID: {courseId}</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-2">Error: {error}</p>
          <p className="text-gray-500 text-sm mb-4">Course ID: {courseId}</p>
          <div className="space-y-3">
            <Link 
              href="/courses"
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              Back to Courses
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const modules = getDemoModules()
  const completedLessons = getCompletedLessons()
  const totalLessons = getTotalLessons()
  const progress = userProgress?.progress || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level || 'Beginner'}
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.price === '0' || !course.price ? 'Free' : `৳${course.price}`}
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ {course.rating || '4.5'}/5
                  </span>
                  {isEnrolled && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✅ Enrolled
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{course.title || 'Untitled Course'}</h1>
                <p className="text-blue-100 text-lg lg:text-xl mb-6 leading-relaxed">
                  {course.description || 'No description available.'}
                </p>
                
                <div className="flex flex-wrap gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    <span className="font-medium">Instructor: {course.instructor || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏱️</span>
                    <span className="font-medium">Duration: {course.duration || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    <span className="font-medium">{modules.length} Modules • {totalLessons} Lessons</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                {!isEnrolled ? (
                  <button 
                    onClick={handleEnrollClick}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:scale-105"
                  >
                    <span className="text-xl">🎯</span>
                    Enroll Now - Free
                  </button>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold border border-gray-300">
                      <div className="text-sm text-gray-600">Your Progress</div>
                      <div className="text-2xl text-blue-600">{progress}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {completedLessons}/{totalLessons} lessons completed
                      </div>
                    </div>
                    <button 
                      onClick={continueLearning}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>▶️</span>
                      Continue Learning
                    </button>
                  </div>
                )}
                
                <Link 
                  href="/courses"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>←</span>
                  Back to Courses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Role-based Content */}
        {renderRoleSpecificContent()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Section */}
            {isEnrolled && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
                  <span className="text-sm font-medium text-blue-600">{progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{completedLessons} of {totalLessons} lessons completed</span>
                  <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
                </div>
              </div>
            )}

            {/* Modules and Lessons */}
            <div id="lesson-content" className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Course Curriculum</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {totalLessons} lessons • {modules.length} modules
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                    {/* Module Header - Clickable */}
                    <div 
                      className="bg-gray-50 p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`transform transition-transform duration-300 ${
                            expandedModules[module.id] ? 'rotate-90' : ''
                          }`}>
                            <span className="text-gray-600">▶</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500">
                            {module.lessons.length} lessons • {module.duration}
                          </div>
                          <div className="text-gray-400">
                            {expandedModules[module.id] ? '▲' : '▼'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lessons List - Collapsible */}
                    {expandedModules[module.id] && (
                      <div className="divide-y divide-gray-100 animate-fadeIn">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lesson.id}
                            className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group ${
                              selectedLesson?.id === lesson.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-4 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                                  isLessonCompleted(lesson.id) 
                                    ? 'bg-green-100 text-green-600 border-2 border-green-300' 
                                    : 'bg-blue-100 text-blue-600 border-2 border-blue-200 group-hover:border-blue-300'
                                }`}>
                                  {isLessonCompleted(lesson.id) ? '✓' : lessonIndex + 1}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-semibold ${
                                      isLessonCompleted(lesson.id) 
                                        ? 'text-green-700' 
                                        : 'text-gray-800'
                                    }`}>
                                      {lesson.title}
                                    </h4>
                                    {isLessonCompleted(lesson.id) && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                                    {lesson.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <span>⏱️</span>
                                      <span>{lesson.duration}</span>
                                    </span>
                                    {lesson.video_url && (
                                      <span className="flex items-center gap-1">
                                        <span>🎥</span>
                                        <span>Video Lesson</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {isEnrolled && (
                                <button 
                                  onClick={(e) => markLessonCompleted(lesson.id, e)}
                                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 cursor-pointer ml-4 ${
                                    isLessonCompleted(lesson.id)
                                      ? 'bg-green-500 hover:bg-green-600 text-white'
                                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                                  }`}
                                >
                                  {isLessonCompleted(lesson.id) ? 'Completed ✓' : 'Mark Complete'}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Lesson Player/Details */}
            {selectedLesson && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Now Playing</h3>
                </div>
                
                {/* Professional Video Player */}
                <div className="bg-black rounded-lg overflow-hidden mb-4 shadow-lg">
                  {videoLoading && (
                    <div className="aspect-video flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Loading video...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={selectedLesson.video_url}
                    className="w-full aspect-video"
                    title={selectedLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleVideoLoad}
                    onError={handleVideoError}
                  ></iframe>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">{selectedLesson.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedLesson.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Lesson Content</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedLesson.content}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>⏱️ {selectedLesson.duration}</span>
                      <span>•</span>
                      <span className={`flex items-center gap-1 ${
                        isLessonCompleted(selectedLesson.id) ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {isLessonCompleted(selectedLesson.id) ? '✓ Completed' : 'In Progress'}
                      </span>
                    </div>
                    {isEnrolled && (
                      <button 
                        onClick={() => markLessonCompleted(selectedLesson.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                          isLessonCompleted(selectedLesson.id)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {isLessonCompleted(selectedLesson.id) ? 'Completed ✓' : 'Mark as Complete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Course Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Course Statistics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Modules</span>
                  <span className="font-semibold text-gray-800">{modules.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-semibold text-gray-800">{totalLessons}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-800">{course.duration || 'Self-paced'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold text-gray-800">{course.level || 'Beginner'}</span>
                </div>
                {isEnrolled && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Your Progress</span>
                    <span className="font-semibold text-green-600">{progress}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={startLearning}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span className="text-lg">🚀</span>
                  Start Learning
                </button>
                <button 
                  onClick={() => window.print()}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🖨️</span>
                  Print Syllabus
                </button>
                <Link 
                  href="/dashboard"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>📊</span>
                  My Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}