'use client'
import { useAuth } from '../contexts/AuthContext'

export default function NormalUserDashboard() {
  const { user } = useAuth()

  const availableCourses = [
    { id: 1, title: 'Introduction to Programming', level: 'Beginner', duration: '4 weeks', price: 'Free' },
    { id: 2, title: 'Web Development Basics', level: 'Beginner', duration: '6 weeks', price: 'Free' },
    { id: 3, title: 'Python for Everyone', level: 'Beginner', duration: '8 weeks', price: '৳2,999' },
    { id: 4, title: 'Data Science Fundamentals', level: 'Intermediate', duration: '10 weeks', price: '৳4,999' }
  ]

  const learningResources = [
    { title: 'Documentation', description: 'Complete course documentation', icon: '📚' },
    { title: 'Community Forum', description: 'Connect with other learners', icon: '👥' },
    { title: 'Video Tutorials', description: 'Step-by-step video guides', icon: '🎥' },
    { title: 'Practice Exercises', description: 'Hands-on coding exercises', icon: '💻' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to CPS Academy</h1>
        <p className="opacity-90">Hello, {user?.name}! Explore courses and start your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <div className="space-y-4">
            {availableCourses.map(course => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{course.level}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-green-600">{course.price}</span>
                </div>
                <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources & Profile */}
        <div className="space-y-6">
          {/* Learning Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
            <div className="grid grid-cols-2 gap-4">
              {learningResources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition cursor-pointer">
                  <div className="text-2xl mb-2">{resource.icon}</div>
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Account Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span className="font-medium">October 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Courses enrolled:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Learning hours:</span>
                <span className="font-medium">0h</span>
              </div>
              <button className="w-full mt-3 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer">
                Upgrade to Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}