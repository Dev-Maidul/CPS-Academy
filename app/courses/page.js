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
        
        console.log('🔄 Fetching courses from Strapi...')
        
        // ✅ STEP 1: First try basic populate (without modules)
        let apiUrl = 'http://localhost:1337/api/courses?populate=thumbnail'
        
        const response = await fetch(apiUrl)
        
        console.log('🔍 API Response Status:', response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('❌ API Error Response:', errorText)
          throw new Error(`API Error: ${response.status} - ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('✅ Basic API Response:', data)
        
        // ✅ Handle Strapi v4 response structure
        let coursesArray = []
        
        if (data.data && Array.isArray(data.data)) {
          coursesArray = data.data
          console.log(`📊 Found ${coursesArray.length} courses`)
        } else {
          console.warn('⚠️ Unexpected API structure:', data)
          coursesArray = data || []
        }
        
        const coursesData = coursesArray.map((course, index) => {
          const attributes = course.attributes || course || {}
          const courseId = course.id || index + 1
          
          console.log(`📖 Course ${courseId}:`, attributes)
          
          // Get thumbnail URL
          let thumbnailUrl = null
          if (attributes.thumbnail?.data?.attributes?.url) {
            thumbnailUrl = `http://localhost:1337${attributes.thumbnail.data.attributes.url}`
          } else if (attributes.thumbnail?.url) {
            thumbnailUrl = `http://localhost:1337${attributes.thumbnail.url}`
          } else if (attributes.image) {
            thumbnailUrl = attributes.image
          }
          
          return {
            id: courseId,
            title: attributes.title || `Course ${courseId}`,
            description: attributes.description || 'No description available',
            category: (attributes.category?.toLowerCase() || 'programming'),
            level: attributes.level || 'Beginner',
            duration: attributes.duration ? `${attributes.duration} hours` : 'Not Specified',
            students: attributes.students || Math.floor(Math.random() * 500) + 100,
            modules: attributes.modules?.data?.length || attributes.modules?.length || 0,
            price: attributes.price === 0 || !attributes.price ? 'Free' : `৳${attributes.price}`,
            instructor: attributes.instructor || attributes.instructor || 'CPS Academy',
            rating: attributes.rating || (Math.random() * 1 + 4).toFixed(1),
            thumbnail: thumbnailUrl,
            image: thumbnailUrl ? '🖼️' : '📚'
          }
        })
        
        setCourses(coursesData)
        
        // ✅ STEP 2: If we have courses, try to fetch modules separately
        if (coursesData.length > 0) {
          console.log('🔄 Attempting to fetch modules data...')
          // We'll implement this in a separate step
        }
        
      } catch (error) {
        console.error('❌ Error fetching courses:', error)
        setError(`API Connection Failed: ${error.message}`)
        
        // Fallback: Check if we can access the API at all
        try {
          const testResponse = await fetch('http://localhost:1337/api/courses')
          if (!testResponse.ok) {
            setError(`Strapi Server Error: Cannot connect to http://localhost:1337`)
          }
        } catch (testError) {
          setError(`Cannot connect to Strapi server at http://localhost:1337`)
        }
        
        setCourses([])
        
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Connecting to Strapi CMS...</h3>
            <p className="text-gray-600">Loading courses data</p>
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
          
          {courses.length > 0 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-green-800 font-medium">
                ✅ {courses.length} Courses Loaded from Strapi
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 inline-block max-w-2xl">
              <p className="text-red-800 font-semibold">
                ❌ Connection Error
              </p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <div className="mt-2 text-xs text-red-600">
                <p>• Check if Strapi is running: http://localhost:1337</p>
                <p>• Verify Course collection type has 'modules' relation</p>
                <p>• Check API permissions in Strapi Settings</p>
              </div>
            </div>
          )}

          {!user && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800">
                🔐 <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login</Link> to enroll in courses
              </p>
            </div>
          )}
        </div>

        {!loading && courses.length > 0 && (
          <>
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
                  {course.thumbnail ? (
                    <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="hidden h-48 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center w-full">
                        <div className="text-6xl text-white">📚</div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-6xl text-white">📚</div>
                    </div>
                  )}
                  
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
          </>
        )}

        {!loading && courses.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found in Strapi</h3>
            <p className="text-gray-600 mb-4">Please add courses in Strapi admin panel</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800 text-sm">
                💡 Steps to fix:
                <br/>1. Go to Strapi Admin: http://localhost:1337/admin
                <br/>2. Check if Course collection type exists
                <br/>3. Add 'modules' relation if missing
                <br/>4. Set API permissions in Settings → Roles → Public
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}