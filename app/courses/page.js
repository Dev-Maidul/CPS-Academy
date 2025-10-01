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
  
  // Fetch courses from Strapi API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:1337/api/courses?populate=*')
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.data && Array.isArray(data.data)) {
          const coursesData = data.data.map(course => ({
            id: course.id,
            title: course.title || 'No Title Available',
            description: course.description || 'No Description Available',
            category: course.category?.toLowerCase() || 'programming',
            level: course.level || 'Beginner',
            duration: course.duration || 'Not Specified',
            students: course.students || 0,
            modules: course.modules?.data?.length || 0,
            price: course.price === '0' || !course.price ? 'Free' : `৳${course.price}`,
            instructor: course.instructor || 'Instructor Not Set',
            rating: course.rating || 0,
            image: '📚'
          }))
          setCourses(coursesData)
        } else {
          setCourses([])
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setError('Failed to load courses')
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
      if (coursePrice !== 'Free') {
        // Payment integration - redirect to payment page
        alert(`Redirecting to payment for ${courseTitle}...`)
        // router.push(`/payment/${courseId}`)
      } else {
        // Free course enrollment
        const enrollmentResponse = await fetch('http://localhost:1337/api/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              user: user.id,
              course: courseId,
              enrolledAt: new Date().toISOString()
            }
          })
        })

        if (enrollmentResponse.ok) {
          alert(`🎉 Successfully enrolled in ${courseTitle}!`)
          // Update UI or redirect to course
        } else {
          alert('Enrollment failed. Please try again.')
        }
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Enrollment failed. Please try again.')
    }
    
    return true
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional programming courses with hands-on projects and expert guidance
          </p>
          
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800">
              ✅ {courses.length} Professional Courses Available
            </p>
          </div>

          {!user && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800">
                🔐 <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login</Link> to enroll in courses and track progress
              </p>
            </div>
          )}
        </div>

        {/* Professional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.price === 'Free').length}
            </div>
            <div className="text-sm text-gray-600">Free Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {courses.reduce((total, c) => total + c.students, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {courses.reduce((total, c) => total + c.modules, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Modules</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Professional Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Course Image/Banner */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-6xl text-white">{course.image}</div>
              </div>
              
              <div className="p-6">
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <span className="text-yellow-800 text-sm font-semibold">⭐ {course.rating}</span>
                  </div>
                </div>
                
                {/* Course Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                
                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-sm text-gray-600">By {course.instructor}</span>
                </div>
                
                {/* Course Stats */}
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
                
                {/* Price & Actions */}
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

        {/* Empty States */}
        {filteredCourses.length === 0 && courses.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found in this category</h3>
            <p className="text-gray-600">Try selecting a different category or browse all courses</p>
          </div>
        )}

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses available yet</h3>
            <p className="text-gray-600 mb-4">We're preparing amazing courses for you</p>
            <Link 
              href="http://localhost:1337/admin" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block"
              target="_blank"
            >
              Add Courses in Strapi
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}