'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { user } = useAuth()
  
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, JavaScript and build responsive websites',
      category: 'web',
      level: 'Beginner',
      duration: '6 weeks',
      students: 1250,
      modules: 8,
      price: 'Free',
      image: '🌐'
    },
    {
      id: 2,
      title: 'React.js Masterclass',
      description: 'Complete React guide with hooks, context API and projects',
      category: 'web',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 890,
      modules: 12,
      price: '৳3,999',
      image: '⚛️'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Python programming with pandas, numpy and data visualization',
      category: 'data',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 756,
      modules: 10,
      price: '৳4,499',
      image: '🐍'
    },
    {
      id: 4,
      title: 'Mobile App Development with Flutter',
      description: 'Build cross-platform mobile apps using Flutter and Dart',
      category: 'mobile',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 543,
      modules: 14,
      price: '৳5,999',
      image: '📱'
    },
    {
      id: 5,
      title: 'Database Design & SQL',
      description: 'Learn database fundamentals, SQL queries and optimization',
      category: 'database',
      level: 'Beginner',
      duration: '5 weeks',
      students: 987,
      modules: 6,
      price: '৳2,499',
      image: '🗄️'
    },
    {
      id: 6,
      title: 'DevOps & Cloud Computing',
      description: 'Docker, Kubernetes, AWS and CI/CD pipeline setup',
      category: 'devops',
      level: 'Advanced',
      duration: '14 weeks',
      students: 432,
      modules: 16,
      price: '৳7,999',
      image: '☁️'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'web', name: 'Web Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps' }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  const handleEnrollClick = (courseId, coursePrice) => {
    if (!user) {
      alert('Please login to enroll in this course!')
      return false
    }
    
    if (coursePrice !== 'Free') {
      alert(`Redirecting to payment for course ${courseId}...`)
      // পরে payment integration হবে
    } else {
      alert(`Successfully enrolled in course ${courseId}!`)
      // পরে enrollment API call হবে
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover comprehensive programming courses designed for all skill levels. 
            Start your journey to become a professional developer.
          </p>
          
          {/* Login Reminder */}
          {!user && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800">
                🔒 Please <Link href="/login" className="text-blue-600 hover:underline font-semibold">login</Link> to enroll in courses
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
                      View
                    </Link>
                    <button 
                      onClick={() => handleEnrollClick(course.id, course.price)}
                      className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                        user 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!user}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
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