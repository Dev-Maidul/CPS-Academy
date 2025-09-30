'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const demoLogins = [
    { email: 'student@cps.com', password: 'password', role: 'Student', color: 'from-green-500 to-blue-500' },
    { email: 'developer@cps.com', password: 'password', role: 'Developer', color: 'from-purple-500 to-pink-500' },
    { email: 'social@cps.com', password: 'password', role: 'Social Media', color: 'from-blue-500 to-teal-500' },
    { email: 'user@cps.com', password: 'password', role: 'Normal User', color: 'from-gray-500 to-gray-700' }
  ]

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your CPS Academy account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500 text-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500 text-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8">
          <div className="text-center mb-4">
            <span className="text-gray-500 text-sm">Quick Demo Login (Use any)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {demoLogins.map((demo, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(demo.email, demo.password)}
                className={`bg-gradient-to-r ${demo.color} text-white py-2 px-3 rounded text-xs font-medium hover:opacity-90 transition cursor-pointer`}
              >
                {demo.role}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition cursor-pointer">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}