'use client'
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight cursor-pointer">
            CPS Academy
          </Link>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer">
              Home
            </Link>
            <Link href="/courses" className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer">
              Courses
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer">
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-blue-100 font-medium cursor-default">Hello, {user.name}</span>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-6">
                <Link href="/login" className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer">
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button 
            className="md:hidden cursor-pointer focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              href="/" 
              className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {user ? (
              <div className="flex flex-col space-y-4">
                <span className="text-blue-100 font-medium cursor-default">Hello, {user.name}</span>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 cursor-pointer text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/login" 
                  className="text-lg font-medium hover:text-blue-100 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 cursor-pointer text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}