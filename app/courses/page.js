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
        
        const response = await fetch('http://localhost:1337/api/courses?populate=modules')
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.data && Array.isArray(data.data)) {
          const coursesData = data.data.map(course => ({
            id: course.id,
            title: course.title || 'No Title',
            description: course.description || 'No Description',
            category: course.category?.toLowerCase() || 'programming',
            level: course.level || 'Beginner',
            duration: course.duration || 'Not Specified',
            students: course.students || 0,
            modules: course.modules?.length || 0, // FIX: course.modules directly
            price: course.price === '0' || course.price === 0 || !course.price ? 'Free' : `৳${course.price}`, // FIX: Price check
            instructor: course.instructor || 'Unknown Instructor',
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
      // FREE enrollment - No payment
      if (coursePrice === 'Free') {
        alert(`🎉 Successfully enrolled in ${courseTitle}!`)
        
        // Save to localStorage
        const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]')
        userEnrollments.push({
          courseId: courseId,
          courseTitle: courseTitle,
          enrolledAt: new Date().toISOString()
        })
        localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      } else {
        // Paid course - but we don't want payment
        alert(`This course (${courseTitle}) is available for enrollment!`)
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
            Professional programming courses with hands-on projects
          </p>
          
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800">
              ✅ {courses.length} Courses Available • All Free Access
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{course.image}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>📚 {course.modules} modules</span>
                  <span>⏱️ {course.duration}</span>
                  <span>👥 {course.students} students</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">{course.price}</span>
                  <div className="flex gap-2">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition cursor-pointer"
                    >
                      Details
                    </Link>
                    <button 
                      onClick={() => handleEnrollClick(course.id, course.price, course.title)}
                      className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                        user 
                          ? course.price === 'Free' 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!user}
                    >
                      {course.price === 'Free' ? 'Enroll Free' : 'Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}