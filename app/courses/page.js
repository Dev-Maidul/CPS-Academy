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

  // Categories array
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'web', name: 'Web Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'programming', name: 'Programming' }
  ]

  // Helper function to get emoji based on course title
  const getCourseEmoji = (title) => {
    if (!title) return '📚'
    const titleLower = title.toLowerCase()
    if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('css')) return '🌐'
    if (titleLower.includes('react') || titleLower.includes('javascript')) return '⚛️'
    if (titleLower.includes('python') || titleLower.includes('data')) return '🐍'
    if (titleLower.includes('mobile') || titleLower.includes('app')) return '📱'
    if (titleLower.includes('node') || titleLower.includes('backend')) return '🔧'
    return '📚'
  }

  // Process Strapi data
  const processStrapiData = (strapiData) => {
    if (!strapiData.data || !Array.isArray(strapiData.data)) {
      throw new Error('No valid course data found in Strapi')
    }

    return strapiData.data.map(course => {
      const courseData = course.attributes || course
      
      // Get modules count
      const modulesCount = courseData.modules?.data?.length || 0

      return {
        id: course.id,
        title: courseData.title,
        description: courseData.description,
        category: courseData.category ? courseData.category.toLowerCase() : 'programming',
        level: courseData.level || 'Beginner',
        duration: courseData.duration ? `${courseData.duration} hours` : 'Not specified',
        students: courseData.students || 0,
        modules: modulesCount, // ✅ Actual module count
        lessons: 0,
        price: courseData.price === 0 || !courseData.price ? 'Free' : `৳${courseData.price}`,
        instructor: courseData.instructor,
        rating: courseData.rating ? courseData.rating.toString() : '4.5',
        image: getCourseEmoji(courseData.title),
        modulesData: courseData.modules?.data || []
      }
    })
  }

  // Fetch courses from Strapi
  const fetchCoursesFromStrapi = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://cheerful-kindness-e070e3dd6b.strapiapp.com/api/courses?populate=modules')
      
      if (!response.ok) {
        throw new Error(`Strapi API failed with status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No courses found in Strapi')
      }

      const processedCourses = processStrapiData(data)
      setCourses(processedCourses)
      
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError(error.message)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoursesFromStrapi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  // Enrollment function
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
          alert(`🎉 Successfully enrolled in "${courseTitle}"!`)
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1500)
        } else {
          alert(`✅ You are already enrolled in "${courseTitle}"`)
        }
      } else {
        alert(`💳 Payment integration for ${courseTitle} coming soon!`)
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Enrollment failed. Please try again.')
    }
    
    return true
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Courses...</h3>
            <p className="text-gray-600">Fetching course data from Strapi</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional programming courses with hands-on projects and expert guidance
          </p>

          {!user && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800">
                🔐 <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login</Link> to enroll in courses
              </p>
            </div>
          )}
        </div>

        {/* Show courses if available */}
        {courses.length > 0 ? (
          <>
            {/* Categories Filter */}
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

            {/* Courses Grid */}
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
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs">👤</span>
                      </div>
                      <span className="text-sm text-gray-600">By {course.instructor}</span>
                    </div>
                    
                    {/* Modules and Lessons Info - ✅ NOW SHOWING ACTUAL MODULE COUNT */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      {/* <div className="flex items-center">
                        <span className="mr-1">📚</span>
                        <span>{course.modules} Modules</span>
                      </div> */}
                      {/* <div className="flex items-center">
                        <span className="mr-1">🎬</span>
                        <span>{course.lessons} Lessons</span>
                      </div> */}
                      <div className="flex items-center">
                        <span className="mr-1">👥</span>
                        <span>{course.students} students</span>
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
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer text-sm"
                        >
                          View Details
                        </Link>
                        <button 
                          onClick={() => handleEnrollClick(course.id, course.price, course.title)}
                          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm ${
                            user 
                              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg' 
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
          </>
        ) : (
          // No courses found
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Courses Available</h3>
            <p className="text-gray-600 mb-4">{error || 'No courses found in Strapi'}</p>
            <button 
              onClick={fetchCoursesFromStrapi}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}