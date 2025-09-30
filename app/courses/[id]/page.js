'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function CourseDetail() {
  const params = useParams()
  const courseId = params.id
  const [enrolled, setEnrolled] = useState(false)
  const [activeModule, setActiveModule] = useState(0)

  // Mock course data - পরে Strapi থেকে replace করব
  const course = {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners who want to start their coding journey.',
    longDescription: 'This comprehensive course will take you from zero to hero in web development. You will learn the fundamental technologies that power the web and build real-world projects that you can add to your portfolio.',
    category: 'web',
    level: 'Beginner',
    duration: '6 weeks',
    students: 1250,
    price: 'Free',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    image: '🌐',
    modules: [
      {
        id: 1,
        title: 'HTML & CSS Basics',
        description: 'Learn the building blocks of web development',
        duration: '2 weeks',
        lessons: [
          { id: 1, title: 'Introduction to HTML', duration: '45m', type: 'video', completed: true },
          { id: 2, title: 'CSS Selectors & Properties', duration: '1h', type: 'video', completed: true },
          { id: 3, title: 'Layout with Flexbox', duration: '1h 15m', type: 'video', completed: false },
          { id: 4, title: 'Responsive Design', duration: '1h 30m', type: 'video', completed: false },
          { id: 5, title: 'HTML & CSS Project', duration: '2h', type: 'project', completed: false }
        ]
      },
      {
        id: 2,
        title: 'JavaScript Fundamentals',
        description: 'Master the programming language of the web',
        duration: '2 weeks',
        lessons: [
          { id: 6, title: 'Variables & Data Types', duration: '1h', type: 'video', completed: false },
          { id: 7, title: 'Functions & Scope', duration: '1h 15m', type: 'video', completed: false },
          { id: 8, title: 'DOM Manipulation', duration: '1h 30m', type: 'video', completed: false },
          { id: 9, title: 'JavaScript Project', duration: '2h 30m', type: 'project', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Advanced Topics',
        description: 'Explore modern web development concepts',
        duration: '2 weeks',
        lessons: [
          { id: 10, title: 'ES6+ Features', duration: '1h 15m', type: 'video', completed: false },
          { id: 11, title: 'Async JavaScript', duration: '1h 30m', type: 'video', completed: false },
          { id: 12, title: 'Final Project', duration: '4h', type: 'project', completed: false }
        ]
      }
    ]
  }

  const handleEnroll = () => {
    setEnrolled(true)
    // পরে Strapi API call হবে
  }

  const completedLessons = course.modules.flatMap(module => 
    module.lessons.filter(lesson => lesson.completed)
  ).length

  const totalLessons = course.modules.flatMap(module => module.lessons).length
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{course.image}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">{course.category.toUpperCase()}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>👤 {course.instructor}</span>
                <span>⭐ {course.rating}/5.0</span>
                <span>👥 {course.students} students</span>
                <span>⏱️ {course.duration}</span>
              </div>
            </div>
            
            {/* Enrollment Card */}
            <div className="ml-8 w-80 bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-800">{course.price}</span>
                {course.price === 'Free' && (
                  <div className="text-green-600 text-sm font-medium">Lifetime access</div>
                )}
              </div>
              
              {enrolled ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-800">Progress</span>
                      <span className="text-green-800">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer">
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEnroll}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
                >
                  Enroll Now
                </button>
              )}
              
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">✅</span>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✅</span>
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✅</span>
                  <span>Project-based learning</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Description */}
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-4">About This Course</h3>
            <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
          
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                      <p className="text-gray-600 text-sm">{module.lessons.length} lessons • {module.duration}</p>
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
                
                {activeModule === index && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{module.description}</p>
                    <div className="space-y-3">
                      {module.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {lesson.type === 'video' ? '🎥' : '💻'}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                              <p className="text-sm text-gray-600">{lesson.duration}</p>
                            </div>
                          </div>
                          {lesson.completed ? (
                            <span className="text-green-600 text-sm font-medium">Completed</span>
                          ) : (
                            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition cursor-pointer">
                              Start
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}