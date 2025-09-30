'use client'
import { useAuth } from "@/app/contexts/AuthContext"

export default function DeveloperDashboard() {
  const { user } = useAuth()

  const apiEndpoints = [
    { method: 'GET', endpoint: '/api/courses', description: 'Fetch all courses' },
    { method: 'POST', endpoint: '/api/courses', description: 'Create new course' },
    { method: 'GET', endpoint: '/api/users', description: 'Get user data' },
    { method: 'PUT', endpoint: '/api/courses/:id', description: 'Update course' }
  ]

  const systemStatus = {
    api: 'Operational',
    database: 'Operational',
    authentication: 'Operational',
    storage: '85% used'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Developer Dashboard</h1>
        <p className="opacity-90">Welcome, {user?.name}. Monitor systems and access developer tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Endpoints */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.endpoint}</code>
                </div>
                <p className="text-gray-600 text-sm">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Status & Tools */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-3">
              {Object.entries(systemStatus).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-700 capitalize">{key}:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    value === 'Operational' ? 'bg-green-100 text-green-800' :
                    value.includes('%') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Developer Tools</h2>
            <div className="grid grid-cols-1 gap-3">
              <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer">
                API Documentation
              </button>
              <button className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer">
                Database Manager
              </button>
              <button className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer">
                Log Viewer
              </button>
              <button className="bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer">
                System Metrics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}