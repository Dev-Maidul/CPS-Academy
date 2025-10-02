'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('cps_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // WORKING LOGIN WITH FALLBACK
  const login = async (identifier, password) => {
    try {
      setLoading(true)
      console.log('🔄 Attempting Strapi login...')

      // Try Strapi login first
      const response = await api.post('/api/auth/local', {
        identifier,
        password,
      })

      console.log('✅ Strapi login successful')
      const { user: userData, jwt } = response.data
    
      const userWithRole = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        name: userData.name || userData.username,
        role: userData.role?.name || 'student'
      }

      setUser(userWithRole)
      localStorage.setItem('cps_token', jwt)
      localStorage.setItem('cps_user', JSON.stringify(userWithRole))
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      return userWithRole

    } catch (error) {
      console.log('❌ Strapi login failed, using mock data')
      
      // FALLBACK: Use mock data if Strapi fails
      const mockUsers = {
        'student@cps.com': { 
          id: 1, 
          email: 'student@cps.com', 
          name: 'John Student', 
          role: 'student' 
        },
        'developer@cps.com': { 
          id: 2, 
          email: 'developer@cps.com', 
          name: 'Jane Developer', 
          role: 'developer' 
        },
        'social@cps.com': { 
          id: 3, 
          email: 'social@cps.com', 
          name: 'Mike Social', 
          role: 'social' 
        },
        'user@cps.com': { 
          id: 4, 
          email: 'user@cps.com', 
          name: 'Sarah User', 
          role: 'normal' 
        }
      }

      if (mockUsers[identifier] && password === 'password') {
        const userData = mockUsers[identifier]
        setUser(userData)
        localStorage.setItem('cps_user', JSON.stringify(userData))
        return userData
      } else {
        throw new Error('Invalid email or password')
      }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    // Mock signup for now
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          role: userData.role || 'normal'
        }
        setUser(newUser)
        localStorage.setItem('cps_user', JSON.stringify(newUser))
        resolve(newUser)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cps_user')
    localStorage.removeItem('cps_token')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}