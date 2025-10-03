'use client'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'

export default function CourseDetails() {
  const searchParams = useSearchParams()
  const courseData = JSON.parse(searchParams.get('courseData') || '{}')
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {courseData.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {courseData.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {courseData.level}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {courseData.modules} Modules
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {courseData.lessons} Lessons
            </span>
          </div>
        </div>

        {/* ✅ NEW: Modules and Lessons Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Course Curriculum
          </h2>

          {courseData.modulesData?.map((module, index) => (
            <div key={module.id} className="mb-6 border border-gray-200 rounded-lg">
              {/* Module Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Module {index + 1}: {module.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {module.description}
                </p>
              </div>

              {/* Lessons List */}
              <div className="p-4">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <div 
                    key={lesson.id} 
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {lessonIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {lesson.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm">
                        ⏱️ {lesson.duration} min
                      </span>
                      
                      {/* ✅ Role-based access: Only Students can watch */}
                      {user?.role === 'student' ? (
                        <button 
                          onClick={() => window.open(lesson.video_url, '_blank')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Watch Now
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          Enroll as Student to watch
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}