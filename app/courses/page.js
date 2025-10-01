'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // First, let's test the API response
        const response = await fetch('http://localhost:1337/api/courses?populate=*')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('🔍 Full API Response:', data)
        
        // Handle different possible response structures
        let coursesArray = []
        
        if (data.data && Array.isArray(data.data)) {
          // Strapi v4 format
          coursesArray = data.data
        } else if (Array.isArray(data)) {
          // Strapi v3 format or direct array
          coursesArray = data
        } else if (data.courses) {
          // Custom format
          coursesArray = data.courses
        }
        
        console.log('📊 Processed Courses Array:', coursesArray)
        
        const coursesData = coursesArray.map((course, index) => {
          // Handle different course object structures
          let courseData = {}
          
          if (course.attributes) {
            // Strapi v4 with attributes
            courseData = course.attributes
          } else if (course.id) {
            // Direct course object
            courseData = course
          } else {
            // Fallback
            courseData = course
          }
          
          console.log(`📖 Course ${index}:`, course)
          console.log(`📋 Course Data ${index}:`, courseData)
          
          return {
            id: course.id || index,
            title: courseData.title || `Course ${index + 1}`,
            description: courseData.description || 'No description available',
            category: (courseData.category?.toLowerCase() || 'programming'),
            level: courseData.level || 'Beginner',
            duration: courseData.duration || 'Not Specified',
            students: courseData.students || Math.floor(Math.random() * 1000),
            modules: courseData.modules?.data?.length || courseData.modules?.length || 0,
            price: courseData.price === '0' || courseData.price === 0 || !courseData.price ? 'Free' : `৳${courseData.price}`,
            instructor: courseData.instructor || 'Unknown Instructor',
            rating: courseData.rating || (Math.random() * 2 + 3).toFixed(1),
            image: '📚'
          }
        })
        
        setCourses(coursesData)
        
      } catch (error) {
        console.error('❌ Error fetching courses:', error)
        setError(`Failed to load courses: ${error.message}`)
        
        // Fallback dummy data for testing
        const dummyCourses = [
          {
            id: 1,
            title: 'Python for Beginners',
            description: 'Learn Python programming from scratch with hands-on projects',
            category: 'programming',
            level: 'Beginner',
            duration: '8 weeks',
            students: 1245,
            modules: 6,
            price: 'Free',
            instructor: 'John Doe',
            rating: '4.5',
            image: '📚'
          },
          {
            id: 2,
            title: 'Web Development Bootcamp',
            description: 'Full-stack web development with modern technologies',
            category: 'web',
            level: 'Intermediate',
            duration: '12 weeks',
            students: 892,
            modules: 8,
            price: 'Free',
            instructor: 'Jane Smith',
            rating: '4.7',
            image: '📚'
          }
        ]
        
        setCourses(dummyCourses)
        
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // ... rest of the component remains the same as above
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'web', name: 'Web Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Development' }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  const handleEnrollClick = async (courseId, coursePrice, courseTitle) => {
    if (!user) {
      alert('Please login to enroll in this course!')
      return false
    }
    
    try {
      if (coursePrice === 'Free') {
        const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
        
        const alreadyEnrolled = userEnrollments.some(enrollment => enrollment.courseId == courseId)
        
        if (!alreadyEnrolled) {
          userEnrollments.push({
            courseId: courseId,
            courseTitle: courseTitle,
            enrolledAt: new Date().toISOString(),
            progress: 0,
            completedLessons: [],
            lastAccessed: new Date().toISOString()
          })
          localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
          
          const activity = JSON.parse(localStorage.getItem('userActivity') || '[]')
          activity.unshift({
            type: 'course_enrolled',
            message: `Enrolled in "${courseTitle}"`,
            timestamp: new Date().toISOString()
          })
          localStorage.setItem('userActivity', JSON.stringify(activity))
        }
        
        alert(`🎉 Successfully enrolled in ${courseTitle}!`)
        
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Enrollment failed. Please try again.')
    }
    
    return true
  }

  // ... rest of the JSX remains the same
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional programming courses with hands-on projects and expert guidance
          </p>
          
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-medium">
              ✅ {courses.length} Professional Courses Available
            </p>
          </div>

          {!user && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800">
                🔐 <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login</Link> to enroll in courses
              </p>
            </div>
          )}
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Debug Information</h3>
            <p className="text-yellow-700 text-sm">
              Loaded {courses.length} courses • API Response logged in console
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-6xl text-white">{course.image}</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <span className="text-yellow-800 text-sm font-semibold">⭐ {course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-sm text-gray-600">By {course.instructor}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="mr-1">📚</span>
                    <span>{course.modules} Modules</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">👥</span>
                    <span>{course.students}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{course.price}</span>
                    {course.price === 'Free' && (
                      <div className="text-green-600 text-xs font-medium">No payment required</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer text-sm"
                    >
                      Details
                    </Link>
                    <button 
                      onClick={() => handleEnrollClick(course.id, course.price, course.title)}
                      className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm ${
                        user 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!user}
                    >
                      {course.price === 'Free' ? 'Enroll Free' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && courses.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found in this category</h3>
            <p className="text-gray-600">Try selecting a different category or browse all courses</p>
          </div>
        )}

        {courses.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses available yet</h3>
            <p className="text-gray-600 mb-4">We're preparing amazing courses for you</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800">
                💡 Check browser console for API response details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}