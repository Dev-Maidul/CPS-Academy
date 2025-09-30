'use client'
import { useAuth } from "@/app/contexts/AuthContext"

export default function SocialMediaDashboard() {
  const { user } = useAuth()

  const socialStats = [
    { platform: 'Facebook', followers: '12.5K', engagement: '4.2%', growth: '+125' },
    { platform: 'Twitter', followers: '8.7K', engagement: '3.8%', growth: '+89' },
    { platform: 'Instagram', followers: '15.2K', engagement: '5.1%', growth: '+210' },
    { platform: 'LinkedIn', followers: '5.3K', engagement: '2.9%', growth: '+45' }
  ]

  const scheduledPosts = [
    { id: 1, content: 'New course announcement!', platform: 'Twitter', schedule: 'Today, 2:00 PM' },
    { id: 2, content: 'Student success story', platform: 'Facebook', schedule: 'Tomorrow, 10:00 AM' },
    { id: 3, content: 'Web development tips', platform: 'Instagram', schedule: 'Oct 5, 3:00 PM' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Social Media Manager</h1>
        <p className="opacity-90">Welcome, {user?.name}. Manage your social presence and engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Media Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
          <div className="space-y-4">
            {socialStats.map((stat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{stat.platform}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{stat.growth} followers</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Followers:</span>
                    <span className="font-semibold ml-2">{stat.followers}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Engagement:</span>
                    <span className="font-semibold ml-2">{stat.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Posts & Quick Actions */}
        <div className="space-y-6">
          {/* Scheduled Posts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
            <div className="space-y-3">
              {scheduledPosts.map(post => (
                <div key={post.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-800">{post.content}</h4>
                    <p className="text-sm text-gray-600">{post.platform} • {post.schedule}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer">
                Create Post
              </button>
              <button className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer">
                Analytics
              </button>
              <button className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer">
                Content Calendar
              </button>
              <button className="bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer">
                Audience Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}