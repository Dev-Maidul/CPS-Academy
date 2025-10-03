'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

export default function CourseDetail() {
  const params = useParams()
  const courseId = params.id
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [userProgress, setUserProgress] = useState({})
  const [expandedModules, setExpandedModules] = useState({})
  const { user } = useAuth()

  useEffect(() => {
    // Load user progress and expanded states from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}')
    const savedExpanded = JSON.parse(localStorage.getItem('expandedModules') || '{}')
    
    setUserProgress(savedProgress)
    setExpandedModules(savedExpanded)
    
    // Always use fake data for demo
    setTimeout(() => {
      const fakeCourse = generateComprehensiveFakeData(courseId)
      setCourse(fakeCourse)
      // Auto-expand first module
      if (!savedExpanded[courseId]) {
        setExpandedModules(prev => ({
          ...prev,
          [courseId]: { [fakeCourse.attributes.modules.data[0].id]: true }
        }))
      }
      setLoading(false)
    }, 1000)
  }, [courseId])

  // Toggle module accordion
  const toggleModule = (moduleId) => {
    setExpandedModules(prev => {
      const newState = {
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [moduleId]: !prev[courseId]?.[moduleId]
        }
      }
      localStorage.setItem('expandedModules', JSON.stringify(newState))
      return newState
    })
  }

  // Expand/Collapse all modules
  const toggleAllModules = (expand) => {
    if (!course) return
    
    const newExpandedState = {}
    course.attributes.modules.data.forEach(module => {
      newExpandedState[module.id] = expand
    })
    
    setExpandedModules(prev => {
      const newState = {
        ...prev,
        [courseId]: newExpandedState
      }
      localStorage.setItem('expandedModules', JSON.stringify(newState))
      return newState
    })
  }

  // Case-insensitive role checking
  const isStudent = () => {
    if (!user || !user.role) return false
    return user.role.toLowerCase() === 'student'
  }

  // Comprehensive Fake Data with Real Video URLs
  const generateComprehensiveFakeData = (id) => {
    const fakeCourses = {
      '13': {
        id: 13,
        attributes: {
          title: "Full Stack Web Development",
          description: "Complete web development course covering frontend, backend, database, and deployment. Build real-world projects and become job-ready.",
          category: "web-development",
          level: "Beginner to Advanced",
          duration: 120,
          price: 0,
          instructor: "CPS Academy Master Instructors",
          rating: 4.8,
          students: 2347,
          thumbnail: "🌐",
          modules: {
            data: [
              {
                id: 131,
                attributes: {
                  title: "HTML5 & CSS3 Fundamentals",
                  description: "Learn modern HTML5 semantics and CSS3 styling with flexbox, grid, and responsive design.",
                  order: 1,
                  duration: 160,
                  lessons: {
                    data: [
                      {
                        id: 1311,
                        attributes: {
                          title: "HTML5 Structure and Semantics",
                          description: "Understanding semantic HTML5 tags, document structure, and accessibility best practices.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                          duration: 45,
                          order: 1,
                          resources: ["Cheat Sheet", "Exercise Files", "Code Examples"]
                        }
                      },
                      {
                        id: 1312,
                        attributes: {
                          title: "CSS3 Flexbox Layout",
                          description: "Master modern CSS layout with flexbox for responsive designs and complex layouts.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                          duration: 60,
                          order: 2,
                          resources: ["Flexbox Guide", "Layout Templates"]
                        }
                      },
                      {
                        id: 1313,
                        attributes: {
                          title: "CSS Grid System",
                          description: "Create complex, two-dimensional layouts with CSS Grid system.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                          duration: 55,
                          order: 3,
                          resources: ["Grid Template", "Practice Projects"]
                        }
                      }
                    ]
                  }
                }
              },
              {
                id: 132,
                attributes: {
                  title: "JavaScript Programming",
                  description: "Master JavaScript from basics to advanced concepts and modern ES6+ features.",
                  order: 2,
                  duration: 115,
                  lessons: {
                    data: [
                      {
                        id: 1321,
                        attributes: {
                          title: "JavaScript Basics and DOM",
                          description: "Variables, functions, control structures, and DOM manipulation fundamentals.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                          duration: 50,
                          order: 1,
                          resources: ["DOM Cheat Sheet", "Practice Exercises"]
                        }
                      },
                      {
                        id: 1322,
                        attributes: {
                          title: "ES6+ Modern Features",
                          description: "Arrow functions, destructuring, template literals, and modern JavaScript patterns.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                          duration: 65,
                          order: 2,
                          resources: ["ES6 Guide", "Code Examples"]
                        }
                      }
                    ]
                  }
                }
              },
              {
                id: 133,
                attributes: {
                  title: "React.js Framework",
                  description: "Build modern user interfaces with React.js and component-based architecture.",
                  order: 3,
                  duration: 225,
                  lessons: {
                    data: [
                      {
                        id: 1331,
                        attributes: {
                          title: "React Components and JSX",
                          description: "Understanding React components, JSX syntax, and virtual DOM concepts.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                          duration: 70,
                          order: 1,
                          resources: ["React Setup Guide", "Component Templates"]
                        }
                      },
                      {
                        id: 1332,
                        attributes: {
                          title: "State and Props Management",
                          description: "Manage component state with useState and pass data with props effectively.",
                          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                          duration: 75,
                          order: 2,
                          resources: ["State Examples", "Best Practices"]
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    }
    
    return fakeCourses[id] || fakeCourses['13']
  }

  // Video player functions
  const handlePlayVideo = (lesson, moduleTitle) => {
    if (!user) {
      alert('🔐 Please login to access course videos')
      return
    }

    if (!isStudent()) {
      alert(`🎓 Upgrade to Student role to watch "${lesson.attributes.title}"`)
      return
    }

    setSelectedLesson({ 
      ...lesson, 
      moduleTitle
    })
    setShowVideoModal(true)
  }

  const markLessonAsCompleted = (lessonId, completed = true) => {
    const newProgress = {
      ...userProgress,
      [courseId]: {
        ...userProgress[courseId],
        [lessonId]: {
          watched: completed,
          watchedAt: completed ? new Date().toISOString() : null,
          progress: completed ? 100 : 0
        }
      }
    }
    setUserProgress(newProgress)
    localStorage.setItem('userProgress', JSON.stringify(newProgress))
  }

  const getLessonProgress = (lessonId) => {
    return userProgress[courseId]?.[lessonId] || { watched: false, progress: 0 }
  }

  const getModuleProgress = (module) => {
    const lessons = module.attributes.lessons.data
    const completedLessons = lessons.filter(lesson => 
      getLessonProgress(lesson.id).watched
    ).length
    return {
      completed: completedLessons,
      total: lessons.length,
      percentage: lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0
    }
  }

  const getCourseProgress = () => {
    if (!course) return { completed: 0, total: 0, percentage: 0 }
    
    const allLessons = course.attributes.modules.data.flatMap(
      module => module.attributes.lessons.data
    )
    const completedLessons = allLessons.filter(lesson => 
      getLessonProgress(lesson.id).watched
    ).length
    
    return {
      completed: completedLessons,
      total: allLessons.length,
      percentage: allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0
    }
  }

  // Render video button with completion options - MOBILE FIXED
  const renderLessonActions = (lesson, moduleTitle) => {
    const progress = getLessonProgress(lesson.id)
    
    if (!user) {
      return (
        <button 
          onClick={() => alert('🔐 Please login to access course content')}
          className="bg-gray-400 text-white px-3 py-2 rounded-lg text-sm transition flex items-center justify-center cursor-not-allowed w-full sm:w-auto"
          disabled
        >
          <span className="mr-2">🔒</span>
          Login Required
        </button>
      )
    }

    if (!isStudent()) {
      return (
        <button 
          onClick={() => alert(`🎓 Upgrade to Student role to access videos\nCurrent role: ${user.role}`)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm transition flex items-center justify-center hover:bg-blue-600 cursor-pointer w-full sm:w-auto"
        >
          <span className="mr-2">🎓</span>
          Upgrade to Student
        </button>
      )
    }

    return (
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button 
          onClick={() => handlePlayVideo(lesson, moduleTitle)}
          className={`px-3 py-2 rounded-lg text-sm transition flex items-center justify-center font-medium cursor-pointer w-full sm:w-auto ${
            progress.watched 
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-md' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
          }`}
        >
          <span className="mr-2">{progress.watched ? '▶️' : '🎬'}</span>
          {progress.watched ? 'Watch Again' : 'Watch Video'}
        </button>
        
        {!progress.watched ? (
          <button 
            onClick={() => markLessonAsCompleted(lesson.id, true)}
            className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition flex items-center justify-center cursor-pointer w-full sm:w-auto"
          >
            <span className="mr-2">✅</span>
            Mark Complete
          </button>
        ) : (
          <button 
            onClick={() => markLessonAsCompleted(lesson.id, false)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition flex items-center justify-center cursor-pointer w-full sm:w-auto"
          >
            <span className="mr-2">↶</span>
            Undo
          </button>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading course content...</p>
        </div>
      </div>
    )
  }

  const courseData = course.attributes
  const modules = courseData.modules.data
  const courseProgress = getCourseProgress()
  const allModulesExpanded = course && modules.every(module => expandedModules[courseId]?.[module.id])

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        {/* Header Section - MOBILE FIXED */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1">
              <Link href="/courses" className="text-blue-600 hover:underline mb-3 sm:mb-4 inline-block cursor-pointer text-sm sm:text-base">
                ← Back to Courses
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl bg-blue-100 p-3 sm:p-4 rounded-lg self-start">
                  {courseData.thumbnail}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 break-words">{courseData.title}</h1>
                  <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{courseData.description}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Card - MOBILE FIXED */}
            {user && (
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl shadow-lg w-full lg:min-w-64 mt-4 sm:mt-0">
                <h3 className="font-bold text-base sm:text-lg mb-2">Your Progress</h3>
                <div className="text-2xl sm:text-3xl font-bold mb-3">{courseProgress.percentage}%</div>
                <div className="w-full bg-blue-400 rounded-full h-2 sm:h-3 mb-3">
                  <div 
                    className="bg-white h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${courseProgress.percentage}%` }}
                  ></div>
                </div>
                <p className="text-blue-100 text-xs sm:text-sm">
                  {courseProgress.completed} of {courseProgress.total} lessons completed
                </p>
              </div>
            )}
          </div>

          {/* Course Stats - MOBILE FIXED */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{modules.length}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Modules</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{courseProgress.total}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Lessons</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{courseData.duration}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Hours</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition">
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">{courseData.rating}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Rating</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="text-lg sm:text-2xl font-bold text-red-600">{courseData.students}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Students</div>
            </div>
          </div>

          {/* Course Meta - MOBILE FIXED */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs cursor-default">
              📚 {courseData.category}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs cursor-default">
              👤 {courseData.instructor}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs cursor-default">
              ⭐ {courseData.rating}/5.0
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs cursor-default">
              🕒 {courseData.duration} hours
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs cursor-default">
              🎯 {courseData.level}
            </span>
          </div>
        </div>

        {/* Course Curriculum - MOBILE FIXED */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Course Curriculum</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {modules.length} modules • {courseProgress.total} lessons • {courseData.duration} hours
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button 
                onClick={() => toggleAllModules(!allModulesExpanded)}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition cursor-pointer w-full sm:w-auto"
              >
                {allModulesExpanded ? 'Collapse All' : 'Expand All'}
              </button>
              
              {isStudent() && (
                <button 
                  onClick={() => {
                    modules.forEach(module => {
                      module.attributes.lessons.data.forEach(lesson => {
                        markLessonAsCompleted(lesson.id, true)
                      })
                    })
                  }}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition cursor-pointer w-full sm:w-auto"
                >
                  Mark All Complete
                </button>
              )}
            </div>
          </div>

          {/* Modules Accordion - MOBILE FIXED */}
          <div className="space-y-3 sm:space-y-4">
            {modules.map((module, moduleIndex) => {
              const moduleData = module.attributes
              const lessons = moduleData.lessons.data
              const moduleProgress = getModuleProgress(module)
              const isExpanded = expandedModules[courseId]?.[module.id]
              
              return (
                <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                  {/* Module Header - Clickable - MOBILE FIXED */}
                  <div 
                    className="bg-gray-50 p-4 sm:p-6 hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-sm sm:text-base">{moduleIndex + 1}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-words">{moduleData.title}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">{moduleData.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-4 ml-2">
                        {/* Progress - MOBILE FIXED */}
                        {user && (
                          <div className="text-right hidden sm:block">
                            <div className="text-sm text-gray-600">
                              {moduleProgress.completed}/{moduleProgress.total} lessons
                            </div>
                            <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${moduleProgress.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Progress - Show only on mobile */}
                    {user && (
                      <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-600">
                            {moduleProgress.completed}/{moduleProgress.total} lessons completed
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {moduleProgress.percentage}%
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${moduleProgress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lessons List - Animated Accordion - MOBILE FIXED */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                      {lessons.map((lesson, lessonIndex) => {
                        const lessonData = lesson.attributes
                        const progress = getLessonProgress(lesson.id)
                        
                        return (
                          <div key={lesson.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border transition-all ${
                            progress.watched 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-white border-gray-200 hover:bg-blue-50'
                          }`}>
                            <div className="flex items-start gap-3 sm:gap-4 flex-1 mb-3 sm:mb-0">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                progress.watched ? 'bg-green-100' : 'bg-blue-100'
                              }`}>
                                <span className={`font-bold text-xs sm:text-sm ${
                                  progress.watched ? 'text-green-600' : 'text-blue-600'
                                }`}>
                                  {progress.watched ? '✓' : lessonIndex + 1}
                                </span>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base break-words">{lessonData.title}</h4>
                                  {progress.watched && (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">
                                      Completed
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{lessonData.description}</p>
                                
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1 whitespace-nowrap">
                                    <span>⏱️</span>
                                    {lessonData.duration} min
                                  </span>
                                  {lessonData.resources && lessonData.resources.length > 0 && (
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                      <span>📎</span>
                                      {lessonData.resources.length} resources
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1 whitespace-nowrap">
                                    <span>🎬</span>
                                    Video Lesson
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end sm:justify-normal">
                              {renderLessonActions(lesson, moduleData.title)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Video Modal - MOBILE FIXED */}
        {showVideoModal && selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl sm:max-w-4xl mx-auto shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start sm:items-center p-4 sm:p-6 border-b bg-gray-50 rounded-t-xl">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 break-words">{selectedLesson.attributes.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">Module: {selectedLesson.moduleTitle}</p>
                </div>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer transition flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
                  <video 
                    controls 
                    autoPlay
                    className="w-full h-48 sm:h-80 lg:h-96"
                    onEnded={() => {
                      markLessonAsCompleted(selectedLesson.id, true)
                      setTimeout(() => {
                        alert('🎉 Lesson completed! Progress has been saved.')
                      }, 500)
                    }}
                  >
                    <source src={selectedLesson.attributes.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">About this lesson</h4>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{selectedLesson.attributes.description}</p>
                  
                  {selectedLesson.attributes.resources && selectedLesson.attributes.resources.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">📚 Learning Resources</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.attributes.resources.map((resource, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm cursor-default border border-blue-200">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t bg-gray-50 rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-green-600 font-medium text-sm sm:text-base">
                  ✅ Watching as: {user?.role}
                </div>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium w-full sm:w-auto text-sm sm:text-base"
                >
                  Close Video Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment CTA - MOBILE FIXED */}
        {!isStudent() && user && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-4 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Ready to Start Learning?</h3>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-lg">
              Upgrade to Student role to access all {courseProgress.total} video lessons and track your progress
            </p>
            <button className="bg-white text-blue-600 px-4 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition cursor-pointer w-full sm:w-auto text-sm sm:text-lg shadow-lg">
              Upgrade to Student - {courseData.price === 0 ? 'Free' : `৳${courseData.price}`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}