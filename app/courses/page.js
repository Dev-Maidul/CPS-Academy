'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dataSource, setDataSource] = useState('checking')
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        setDataSource('checking')
        
        console.log('🔄 Step 1: Testing Strapi connection...')
        
        // ✅ STEP 1: Test basic API connection
        const testResponse = await fetch('http://localhost:1337/api/courses')
        console.log('🔍 Strapi Connection Test - Status:', testResponse.status)
        
        if (!testResponse.ok) {
          throw new Error(`Strapi Connection Failed: ${test.response.status}`)
        }
        
        const testData = await testResponse.json()
        console.log('🔍 Strapi Test Response:', testData)
        
        // ✅ STEP 2: Check if courses exist in Strapi
        if (testData.data && testData.data.length > 0) {
          console.log('🎯 Courses found in Strapi, fetching detailed data...')
          setDataSource('strapi')
          
          // Fetch courses with thumbnail populate
          const detailedResponse = await fetch('http://localhost:1337/api/courses?populate=*')
          const detailedData = await detailedResponse.json()
          
          console.log('📊 Detailed Courses Data Structure:', detailedData)
          console.log('🔍 First course data:', detailedData.data[0])
          
          // ✅ SAFE DATA PROCESSING - Handle any Strapi response structure
          const coursesData = detailedData.data.map((course, index) => {
            console.log(`📖 Processing course ${index}:`, course)
            
            // Safe attribute access
            const attributes = course.attributes || course || {}
            const courseId = course.id || index + 1
            
            // ✅ SAFE Thumbnail access with multiple fallbacks
            let thumbnailUrl = null
            try {
              // Try different possible thumbnail structures
              if (attributes.thumbnail?.data?.attributes?.url) {
                thumbnailUrl = `http://localhost:1337${attributes.thumbnail.data.attributes.url}`
                console.log(`🖼️ Course ${courseId}: Thumbnail found in thumbnail.data.attributes.url`)
              } else if (attributes.thumbnail?.url) {
                thumbnailUrl = `http://localhost:1337${attributes.thumbnail.url}`
                console.log(`🖼️ Course ${courseId}: Thumbnail found in thumbnail.url`)
              } else if (attributes.image?.data?.attributes?.url) {
                thumbnailUrl = `http://localhost:1337${attributes.image.data.attributes.url}`
                console.log(`🖼️ Course ${courseId}: Thumbnail found in image.data.attributes.url`)
              } else if (attributes.image?.url) {
                thumbnailUrl = `http://localhost:1337${attributes.image.url}`
                console.log(`🖼️ Course ${courseId}: Thumbnail found in image.url`)
              } else if (attributes.thumbnail) {
                // If thumbnail is just a string URL
                thumbnailUrl = attributes.thumbnail
                console.log(`🖼️ Course ${courseId}: Thumbnail is direct string`)
              }
            } catch (thumbError) {
              console.warn(`⚠️ Thumbnail processing error for course ${courseId}:`, thumbError)
            }
            
            // ✅ SAFE Field access with fallbacks
            const courseData = {
              id: courseId,
              title: attributes.title || `Course ${courseId}`,
              description: attributes.description || 'No description available',
              category: (attributes.category?.toLowerCase() || 
                        attributes.tags?.[0]?.toLowerCase() || 
                        'programming'),
              level: attributes.level || attributes.difficulty || 'Beginner',
              duration: attributes.duration ? 
                        `${attributes.duration} ${attributes.duration_unit || 'hours'}` : 
                        (attributes.duration_hours ? `${attributes.duration_hours} hours` : 'Not specified'),
              students: attributes.students || attributes.enrollments || Math.floor(Math.random() * 500) + 100,
              modules: attributes.modules_count || 
                      attributes.modules?.data?.length || 
                      attributes.modules?.length || 
                      attributes.lessons_count ||
                      0,
              price: attributes.price === 0 || !attributes.price ? 'Free' : `৳${attributes.price}`,
              instructor: attributes.instructor || 
                         attributes.teacher || 
                         attributes.author || 
                         'CPS Academy',
              rating: attributes.rating?.toString() || 
                     attributes.rating_score?.toString() || 
                     (Math.random() * 1 + 4).toFixed(1),
              thumbnail: thumbnailUrl,
              image: thumbnailUrl ? '🖼️' : (attributes.icon || '📚')
            }
            
            console.log(`✅ Processed course ${courseId}:`, courseData)
            return courseData
          })
          
          setCourses(coursesData)
          console.log(`✅ Successfully loaded ${coursesData.length} courses from Strapi`)
          
        } else {
          // ✅ STEP 3: No courses in Strapi, use mock data
          console.log('📝 No courses in Strapi, using mock data')
          setDataSource('mock')
          
          const mockCourses = [
            {
              id: 1,
              title: 'Web Development Fundamentals',
              description: 'Learn HTML, CSS, JavaScript and modern web development practices from scratch. Build real-world projects and master frontend development.',
              category: 'web',
              level: 'Beginner',
              duration: '48 hours',
              students: 342,
              modules: 12,
              price: 'Free',
              instructor: 'Sarah Johnson',
              rating: '4.8',
              image: '🌐'
            },
            {
              id: 2,
              title: 'React Masterclass',
              description: 'Master React.js with hooks, context, and advanced patterns for modern web applications. Learn state management and performance optimization.',
              category: 'web',
              level: 'Intermediate',
              duration: '36 hours',
              students: 278,
              modules: 10,
              price: '৳2500',
              instructor: 'Mike Chen',
              rating: '4.9',
              image: '⚛️'
            }
          ]
          
          setCourses(mockCourses)
        }
        
      } catch (error) {
        console.error('❌ Error in course fetching:', error)
        setDataSource('mock')
        setError(`Connection Issue: ${error.message}`)
        
        // Fallback to mock data
        const mockCourses = [
          {
            id: 1,
            title: 'Web Development Fundamentals',
            description: 'Learn web development from scratch with hands-on projects',
            category: 'web',
            level: 'Beginner',
            duration: '8 weeks',
            students: 342,
            modules: 12,
            price: 'Free',
            instructor: 'CPS Academy',
            rating: '4.8',
            image: '🌐'
          },
          {
            id: 2,
            title: 'React.js Complete Guide',
            description: 'Master React with modern practices and build real applications',
            category: 'web', 
            level: 'Intermediate',
            duration: '6 weeks',
            students: 278,
            modules: 10,
            price: '৳2500',
            instructor: 'CPS Academy',
            rating: '4.9',
            image: '⚛️'
          }
        ]
        setCourses(mockCourses)
        
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'web', name: 'Web Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'programming', name: 'Programming' }
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Courses from Strapi...</h3>
            <p className="text-gray-600">Processing course data structure</p>
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
          
          {/* Data Source Indicator */}
          <div className="mt-4">
            {dataSource === 'strapi' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                <p className="text-green-800 font-medium">
                  ✅ Connected to Strapi • {courses.length} Real Courses Loaded
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Data is coming directly from your Strapi backend
                </p>
              </div>
            )}
            {dataSource === 'mock' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-blue-800 font-medium">
                  📝 Using Demo Courses • {courses.length} Courses Available
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Add courses in Strapi Admin to see real data
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block max-w-2xl">
              <p className="text-yellow-800 font-semibold">
                ⚠️ Notice: Using Demo Data
              </p>
              <p className="text-yellow-700 text-sm mt-1">{error}</p>
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

        {courses.length > 0 && (
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

        {/* Debug Information */}
        {/* {dataSource === 'strapi' && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔧 Debug Information</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Strapi Integration Status:</strong> ✅ Working</p>
              <p><strong>Courses Loaded:</strong> {courses.length}</p>
              <p><strong>API Endpoint:</strong> http://localhost:1337/api/courses?populate=*</p>
              <p className="text-green-600 font-medium">🎉 Successfully connected to your Strapi backend!</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}