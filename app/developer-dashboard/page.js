'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DeveloperDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [systemStatus, setSystemStatus] = useState({})
  const [serverMetrics, setServerMetrics] = useState({})
  const [recentActivity, setRecentActivity] = useState([])
  const [apiLogs, setApiLogs] = useState([])
  const [databaseStats, setDatabaseStats] = useState({})

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      // Mock system status data
      const mockSystemStatus = {
        api: { status: 'online', responseTime: '120ms', uptime: '99.9%' },
        database: { status: 'healthy', connections: 45, size: '2.4GB' },
        server: { status: 'stable', load: '65%', memory: '72%' },
        cache: { status: 'active', hitRate: '94%', size: '256MB' },
        storage: { status: 'normal', used: '1.2TB', available: '3.8TB' }
      }

      const mockServerMetrics = {
        cpuUsage: 45,
        memoryUsage: 68,
        diskUsage: 42,
        networkIn: '125 Mbps',
        networkOut: '89 Mbps',
        activeUsers: 234,
        requestsPerMinute: 1250
      }

      const mockRecentActivity = [
        {
          id: 1,
          action: 'User authentication system updated',
          type: 'deployment',
          timestamp: '2024-01-15T14:30:00',
          user: 'dev@cps.com',
          status: 'success'
        },
        {
          id: 2,
          action: 'Course API endpoint optimized',
          type: 'optimization',
          timestamp: '2024-01-15T12:15:00',
          user: 'dev@cps.com',
          status: 'success'
        },
        {
          id: 3,
          action: 'Database backup completed',
          type: 'maintenance',
          timestamp: '2024-01-15T03:00:00',
          user: 'system',
          status: 'success'
        },
        {
          id: 4,
          action: 'Security patch applied',
          type: 'security',
          timestamp: '2024-01-14T22:45:00',
          user: 'dev@cps.com',
          status: 'success'
        },
        {
          id: 5,
          action: 'API rate limiting configured',
          type: 'configuration',
          timestamp: '2024-01-14T16:20:00',
          user: 'dev@cps.com',
          status: 'warning'
        }
      ]

      const mockApiLogs = [
        {
          id: 1,
          endpoint: '/api/auth/local',
          method: 'POST',
          status: 200,
          responseTime: '145ms',
          timestamp: '2024-01-15T15:23:12',
          user: 'student@cps.com'
        },
        {
          id: 2,
          endpoint: '/api/courses',
          method: 'GET',
          status: 200,
          responseTime: '89ms',
          timestamp: '2024-01-15T15:22:45',
          user: 'anonymous'
        },
        {
          id: 3,
          endpoint: '/api/users/me',
          method: 'GET',
          status: 401,
          responseTime: '23ms',
          timestamp: '2024-01-15T15:22:30',
          user: 'unauthenticated'
        },
        {
          id: 4,
          endpoint: '/api/upload',
          method: 'POST',
          status: 413,
          responseTime: '210ms',
          timestamp: '2024-01-15T15:21:15',
          user: 'social@cps.com'
        }
      ]

      const mockDatabaseStats = {
        totalUsers: 1245,
        totalCourses: 45,
        totalEnrollments: 5678,
        activeSessions: 89,
        queryPerformance: '96%',
        backupStatus: 'completed'
      }

      setTimeout(() => {
        setSystemStatus(mockSystemStatus)
        setServerMetrics(mockServerMetrics)
        setRecentActivity(mockRecentActivity)
        setApiLogs(mockApiLogs)
        setDatabaseStats(mockDatabaseStats)
      }, 1000)
    }
  }, [user, loading, router])

  const handleApiDocs = () => {
    window.open('/api-docs', '_blank')
  }

  const handleViewLogs = () => {
    setActiveTab('logs')
  }

  const handleServerConfig = () => {
    alert('Opening server configuration panel...')
  }

  const handleDatabaseBackup = () => {
    alert('Initiating database backup...')
  }

  const handleClearCache = () => {
    alert('Clearing system cache...')
  }

  const handleRestartService = (service) => {
    alert(`Restarting ${service} service...`)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'active':
      case 'success':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'stable':
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadge = (status) => {
    const colors = getStatusColor(status)
    return `px-2 py-1 rounded-full text-xs font-medium ${colors}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading developer dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Developer Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome, {user.name || user.username}! 💻</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium cursor-default flex-shrink-0">
                {user.role}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/profile')}
                className="text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition cursor-pointer text-sm"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* System Status Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {Object.entries(systemStatus).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 capitalize truncate">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    {typeof value === 'object' ? value.status : value}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <span className="text-purple-600 text-sm sm:text-base">
                    {key === 'api' ? '🔌' : 
                     key === 'database' ? '🗄️' :
                     key === 'server' ? '🖥️' :
                     key === 'cache' ? '⚡' : '💾'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-3 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'metrics', name: 'Metrics', icon: '📈' },
                { id: 'logs', name: 'API Logs', icon: '📋' },
                { id: 'activity', name: 'Activity', icon: '🔄' },
                { id: 'database', name: 'Database', icon: '🗄️' },
                { id: 'tools', name: 'Tools', icon: '🔧' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition cursor-pointer flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm sm:text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 lg:p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Server Metrics */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Server Metrics</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm sm:text-base">CPU Usage</span>
                      <div className="text-right">
                        <span className="font-bold text-blue-600 text-sm sm:text-base">{serverMetrics.cpuUsage}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${serverMetrics.cpuUsage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm sm:text-base">Memory Usage</span>
                      <div className="text-right">
                        <span className="font-bold text-green-600 text-sm sm:text-base">{serverMetrics.memoryUsage}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${serverMetrics.memoryUsage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm sm:text-base">Active Users</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">{serverMetrics.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm sm:text-base">Requests/Min</span>
                      <span className="font-bold text-orange-600 text-sm sm:text-base">{serverMetrics.requestsPerMinute}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={handleApiDocs}
                      className="w-full text-left p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">📚</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-blue-800 text-sm sm:text-base">API Documentation</p>
                        <p className="text-xs sm:text-sm text-blue-600 truncate">View and test API endpoints</p>
                      </div>
                    </button>
                    <button
                      onClick={handleViewLogs}
                      className="w-full text-left p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">🐛</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-green-800 text-sm sm:text-base">Debug Logs</p>
                        <p className="text-xs sm:text-sm text-green-600 truncate">View system and error logs</p>
                      </div>
                    </button>
                    <button
                      onClick={handleServerConfig}
                      className="w-full text-left p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">⚙️</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-purple-800 text-sm sm:text-base">Server Config</p>
                        <p className="text-xs sm:text-sm text-purple-600 truncate">Manage server settings</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Performance Metrics */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>API Response Time</span>
                        <span>{systemStatus.api?.responseTime}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Database Performance</span>
                        <span>{databaseStats.queryPerformance}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Cache Hit Rate</span>
                        <span>{systemStatus.cache?.hitRate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">System Health</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <span className="text-sm sm:text-base">Uptime</span>
                      <span className="font-bold text-green-600 text-sm sm:text-base">{systemStatus.api?.uptime}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm sm:text-base">Database Connections</span>
                      <span className="font-bold text-blue-600 text-sm sm:text-base">{systemStatus.database?.connections}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm sm:text-base">Network Throughput</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">{serverMetrics.networkIn} / {serverMetrics.networkOut}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">API Request Logs</h2>
                  <div className="flex space-x-2">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition cursor-pointer text-sm">
                      Filter
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer text-sm">
                      Export
                    </button>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {apiLogs.map((log) => (
                    <div key={log.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.status === 200 ? 'bg-green-100 text-green-800' :
                            log.status >= 400 ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-sm sm:text-base text-gray-800 truncate">
                              {log.method} {log.endpoint}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {formatTime(log.timestamp)} • {log.responseTime} • {log.user}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Recent System Activity</h2>
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.status === 'success' ? 'bg-green-100 text-green-600' :
                          activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {activity.type === 'deployment' ? '🚀' :
                           activity.type === 'optimization' ? '⚡' :
                           activity.type === 'maintenance' ? '🔧' :
                           activity.type === 'security' ? '🛡️' : '⚙️'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{activity.action}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            By {activity.user} • {formatTime(activity.timestamp)}
                          </p>
                        </div>
                        <span className={getStatusBadge(activity.status)}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Database Statistics */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Database Statistics</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm sm:text-base">Total Users</span>
                      <span className="font-bold text-blue-600 text-sm sm:text-base">{databaseStats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <span className="text-sm sm:text-base">Total Courses</span>
                      <span className="font-bold text-green-600 text-sm sm:text-base">{databaseStats.totalCourses}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm sm:text-base">Total Enrollments</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">{databaseStats.totalEnrollments}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm sm:text-base">Active Sessions</span>
                      <span className="font-bold text-orange-600 text-sm sm:text-base">{databaseStats.activeSessions}</span>
                    </div>
                  </div>
                </div>

                {/* Database Actions */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Database Management</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={handleDatabaseBackup}
                      className="w-full text-left p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">💾</span>
                      <div>
                        <p className="font-medium text-green-800 text-sm sm:text-base">Backup Database</p>
                        <p className="text-xs sm:text-sm text-green-600">Create a full database backup</p>
                      </div>
                    </button>
                    <button
                      onClick={handleClearCache}
                      className="w-full text-left p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">🧹</span>
                      <div>
                        <p className="font-medium text-blue-800 text-sm sm:text-base">Clear Cache</p>
                        <p className="text-xs sm:text-sm text-blue-600">Clear system and application cache</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleRestartService('database')}
                      className="w-full text-left p-3 sm:p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">🔄</span>
                      <div>
                        <p className="font-medium text-yellow-800 text-sm sm:text-base">Restart Database</p>
                        <p className="text-xs sm:text-sm text-yellow-600">Restart database service</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-white text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">🔍</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2">API Testing</h4>
                  <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Test and debug API endpoints</p>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition cursor-pointer text-sm">
                    Open Tester
                  </button>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-white text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">📊</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2">Performance Monitor</h4>
                  <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Real-time system monitoring</p>
                  <button className="bg-white text-green-600 hover:bg-green-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition cursor-pointer text-sm">
                    Launch Monitor
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-white text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">🛡️</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2">Security Audit</h4>
                  <p className="text-purple-100 text-xs sm:text-sm mb-3 sm:mb-4">Run security checks</p>
                  <button className="bg-white text-purple-600 hover:bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition cursor-pointer text-sm">
                    Start Audit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}