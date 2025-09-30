'use client'
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold cursor-pointer">
            CPS Academy
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-200 transition cursor-pointer">
              Home
            </Link>
            <Link href="/courses" className="hover:text-blue-200 transition cursor-pointer">
              Courses
            </Link>
            <Link href="/about" className="hover:text-blue-200 transition cursor-pointer">
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-200 cursor-default">Hello, {user.name}</span>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition cursor-pointer"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="hover:text-blue-200 transition cursor-pointer">
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button className="md:hidden cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}