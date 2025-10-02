'use client'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('🚫 No user found, redirecting to login')
        router.push('/login')
        return
      }

      console.log('🔄 Determining dashboard for role:', user.role)
      
      // Redirect based on user role with exact matching
      switch (user.role) {
        case 'student':
          console.log('🎯 Redirecting to Student Dashboard')
          router.push('/student-dashboard')
          break
        case 'developer':
          console.log('🎯 Redirecting to Developer Dashboard')
          router.push('/developer-dashboard')
          break
        case 'social':
          console.log('🎯 Redirecting to Social Dashboard')
          router.push('/social-dashboard')
          break
        case 'normal':
          console.log('🎯 Redirecting to User Dashboard')
          router.push('/user-dashboard')
          break
        default:
          console.log('⚠️ Unknown role, defaulting to User Dashboard')
          router.push('/user-dashboard')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
        <p className="mt-2 text-sm text-gray-500">
          Detected role: {user?.role || 'Unknown'}
        </p>
      </div>
    </div>
  )
}