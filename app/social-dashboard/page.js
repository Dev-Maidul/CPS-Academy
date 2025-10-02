'use client'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SocialDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [socialStats, setSocialStats] = useState({})
  const [scheduledPosts, setScheduledPosts] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      // Mock data for social media manager
      const mockSocialStats = {
        totalFollowers: 15420,
        engagementRate: 4.2,
        weeklyReach: 125000,
        postsThisWeek: 12,
        topPerformingPlatform: 'Instagram',
        growthThisMonth: 8.5
      }

      const mockScheduledPosts = [
        {
          id: 1,
          platform: 'Instagram',
          content: 'New course announcement: Advanced Web Development 🚀',
          scheduledTime: '2024-01-15T09:00:00',
          status: 'scheduled',
          image: '📱'
        },
        {
          id: 2,
          platform: 'Twitter',
          content: 'Join our live Q&A session tomorrow! #CPSAcademy #WebDev',
          scheduledTime: '2024-01-15T14:30:00',
          status: 'scheduled',
          image: '🐦'
        },
        {
          id: 3,
          platform: 'Facebook',
          content: 'Student success story: From beginner to full-stack developer in 6 months!',
          scheduledTime: '2024-01-16T11:00:00',
          status: 'scheduled',
          image: '👥'
        }
      ]

      const mockAnalytics = {
        platformPerformance: [
          { platform: 'Instagram', engagement: 6.2, reach: 85000, growth: 12 },
          { platform: 'Twitter', engagement: 3.8, reach: 45000, growth: 8 },
          { platform: 'Facebook', engagement: 2.1, reach: 32000, growth: 5 },
          { platform: 'LinkedIn', engagement: 4.5, reach: 28000, growth: 15 }
        ],
        topPosts: [
          { title: 'Web Development Course Launch', engagement: 2450, platform: 'Instagram' },
          { title: 'Student Project Showcase', engagement: 1890, platform: 'Twitter' },
          { title: 'Free Workshop Announcement', engagement: 1670, platform: 'Facebook' }
        ]
      }

      const mockCampaigns = [
        {
          id: 1,
          name: 'Winter Enrollment Drive',
          status: 'active',
          progress: 65,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          budget: 5000,
          spent: 3250,
          platforms: ['Instagram', 'Facebook']
        },
        {
          id: 2,
          name: 'Student Success Stories',
          status: 'active',
          progress: 40,
          startDate: '2024-01-10',
          endDate: '2024-02-10',
          budget: 3000,
          spent: 1200,
          platforms: ['Instagram', 'LinkedIn']
        }
      ]

      setTimeout(() => {
        setSocialStats(mockSocialStats)
        setScheduledPosts(mockScheduledPosts)
        setAnalytics(mockAnalytics)
        setCampaigns(mockCampaigns)
      }, 1000)
    }
  }, [user, loading, router])

  const handleCreatePost = () => {
    alert('Opening post creation modal...')
  }

  const handleViewAnalytics = () => {
    setActiveTab('analytics')
  }

  const handleSchedulePost = () => {
    alert('Opening scheduling tool...')
  }

  const handleEditPost = (postId) => {
    alert(`Editing post ${postId}...`)
  }

  const handleManageCampaign = (campaignId) => {
    alert(`Managing campaign ${campaignId}...`)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 overflow-x-hidden">
      {/* Header - Fixed for mobile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Social Media Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome, {user.name || user.username}! 📱</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium cursor-default flex-shrink-0">
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

      {/* Main Content - Properly constrained */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Stats Overview - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Followers</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {(socialStats.totalFollowers / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 mt-0.5 truncate">↑ {socialStats.growthThisMonth}% this month</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <span className="text-purple-600 text-sm sm:text-base lg:text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Engagement Rate</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {socialStats.engagementRate}%
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">Avg. across platforms</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <span className="text-blue-600 text-sm sm:text-base lg:text-xl">💬</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Weekly Reach</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {(socialStats.weeklyReach / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">Unique users</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <span className="text-green-600 text-sm sm:text-base lg:text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Posts This Week</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {socialStats.postsThisWeek}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">Across all platforms</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <span className="text-orange-600 text-sm sm:text-base lg:text-xl">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Horizontal scroll on mobile */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-3 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'content', name: 'Content', icon: '📅' },
                { id: 'analytics', name: 'Analytics', icon: '📈' },
                { id: 'campaigns', name: 'Campaigns', icon: '🎯' },
                { id: 'scheduling', name: 'Scheduling', icon: '⏰' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition cursor-pointer flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm sm:text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content - Proper padding for mobile */}
          <div className="p-3 sm:p-4 lg:p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Platform Performance */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Platform Performance</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {analytics.platformPerformance?.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <span className="text-lg sm:text-xl flex-shrink-0">
                            {platform.platform === 'Instagram' ? '📱' : 
                             platform.platform === 'Twitter' ? '🐦' :
                             platform.platform === 'Facebook' ? '👥' : '💼'}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{platform.platform}</p>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{platform.reach.toLocaleString()} reach</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-bold text-green-600 text-sm sm:text-base">{platform.engagement}%</p>
                          <p className="text-xs text-gray-600">+{platform.growth}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={handleCreatePost}
                      className="w-full text-left p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">📢</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-blue-800 text-sm sm:text-base">Create New Post</p>
                        <p className="text-xs sm:text-sm text-blue-600 truncate">Draft content for social media</p>
                      </div>
                    </button>
                    <button
                      onClick={handleSchedulePost}
                      className="w-full text-left p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">⏰</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-green-800 text-sm sm:text-base">Schedule Content</p>
                        <p className="text-xs sm:text-sm text-green-600 truncate">Plan posts for optimal timing</p>
                      </div>
                    </button>
                    <button
                      onClick={handleViewAnalytics}
                      className="w-full text-left p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition cursor-pointer flex items-center space-x-2 sm:space-x-3"
                    >
                      <span className="text-lg sm:text-xl">📈</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-purple-800 text-sm sm:text-base">View Analytics</p>
                        <p className="text-xs sm:text-sm text-purple-600 truncate">Detailed performance reports</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Content Calendar</h2>
                  <button
                    onClick={handleCreatePost}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer text-sm sm:text-base w-full sm:w-auto"
                  >
                    + Create Post
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className="text-xl sm:text-2xl flex-shrink-0">{post.image}</div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{post.content}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {post.platform} • {formatTime(post.scheduledTime)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 justify-between sm:justify-end">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            post.status === 'scheduled' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status}
                          </span>
                          <button
                            onClick={() => handleEditPost(post.id)}
                            className="text-blue-600 hover:text-blue-800 transition cursor-pointer text-sm sm:text-base flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Top Performing Posts */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Top Performing Posts</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {analytics.topPosts?.map((post, index) => (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{post.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{post.platform}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-bold text-blue-600 text-sm sm:text-base">{post.engagement.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">engagements</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Engagement Metrics</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <span className="text-sm sm:text-base">Avg Engagement Rate</span>
                      <span className="font-bold text-green-600 text-sm sm:text-base">{socialStats.engagementRate}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm sm:text-base">Click-Through Rate</span>
                      <span className="font-bold text-blue-600 text-sm sm:text-base">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm sm:text-base">Conversion Rate</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">1.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Marketing Campaigns</h2>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer text-sm sm:text-base w-full sm:w-auto">
                    + New Campaign
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{campaign.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {formatTime(campaign.startDate)} - {formatTime(campaign.endDate)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 mt-1 sm:mt-0 ${
                          campaign.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : campaign.status === 'planning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                          <span>Progress</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div 
                            className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        <span>Budget: ${campaign.budget.toLocaleString()}</span>
                        <span>Spent: ${campaign.spent.toLocaleString()}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                        {campaign.platforms.map((platform, index) => (
                          <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleManageCampaign(campaign.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg transition text-xs sm:text-sm font-medium cursor-pointer"
                      >
                        Manage Campaign
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scheduling' && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">⏰</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Scheduling Tools</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Advanced scheduling features coming soon!</p>
                <button
                  onClick={handleSchedulePost}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition cursor-pointer text-sm sm:text-base"
                >
                  Open Basic Scheduler
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-white">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm sm:text-base">📈</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-semibold truncate">Performance Report</h4>
                <p className="text-blue-100 text-xs sm:text-sm truncate">Weekly analytics summary ready</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition cursor-pointer text-sm sm:text-base w-full">
              View Report
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-white">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm sm:text-base">🎯</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-semibold truncate">Campaign Insights</h4>
                <p className="text-purple-100 text-xs sm:text-sm truncate">Optimize your marketing strategy</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 hover:bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition cursor-pointer text-sm sm:text-base w-full">
              Get Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}