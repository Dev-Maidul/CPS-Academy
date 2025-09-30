'use client'
import { useAuth } from "@/app/contexts/AuthContext"

export default function StudentDashboard() {
  const { user } = useAuth()

  const enrolledCourses = [
    { id: 1, title: 'Web Development Fundamentals', progress: 65, nextClass: 'React Basics' },
    { id: 2, title: 'Data Structures & Algorithms', progress: 30, nextClass: 'Linked Lists' },
    { id: 3, title: 'Database Management', progress: 15, nextClass: 'SQL Queries' }
  ]

  const recentClasses = [
    { id: 1, title: 'HTML & CSS Basics', date: '2024-10-01', duration: '2h 15m' },
    { id: 2, title: 'JavaScript Fundamentals', date: '2024-09-28', duration: '1h 45m' },
    { id: 3, title: 'Responsive Design', date: '2024-09-25', duration: '2h 30m' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Continue your learning journey. You have 3 active courses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          <div className="space-y-4">
            {enrolledCourses.map(course => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Next: {course.nextClass}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Classes & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Classes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Classes</h2>
            <div className="space-y-3">
              {recentClasses.map(classItem => (
                <div key={classItem.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-800">{classItem.title}</h4>
                    <p className="text-sm text-gray-600">{classItem.date} • {classItem.duration}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                    Watch
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer">
                Join Live Class
              </button>
              <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer">
                View Assignments
              </button>
              <button className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer">
                Course Materials
              </button>
              <button className="bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer">
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}