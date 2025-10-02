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
        // If no user, redirect to login
        router.push('/login')
        return
      }

      // Redirect based on user role
      switch (user.role?.toLowerCase()) {
        case 'student':
          router.push('/student-dashboard')
          break
        case 'normal user':
        case 'normal':
          router.push('/user-dashboard')
          break
        case 'social media manager':
        case 'social':
          router.push('/social-dashboard')
          break
        case 'developer':
          router.push('/developer-dashboard')
          break
        default:
          router.push('/user-dashboard') // Default fallback
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}