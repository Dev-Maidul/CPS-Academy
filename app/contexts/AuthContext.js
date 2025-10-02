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
  const [token, setToken] = useState(null)

  useEffect(() => {
    const checkAuthState = () => {
      try {
        const savedToken = localStorage.getItem('cps_token')
        const savedUser = localStorage.getItem('cps_user')
        
        if (savedToken && savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setToken(savedToken)
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
        }
      } catch (error) {
        console.error('Auth restoration error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuthState()
  }, [])

  // SIMPLE & WORKING LOGIN - No additional API calls
  const login = async (identifier, password) => {
    try {
      setLoading(true)

      // Only basic login - no role fetching
      const response = await api.post('/api/auth/local', {
        identifier,
        password,
      })

      const { user: userData, jwt } = response.data
    
      // Simple role mapping based on email (no API calls)
      const getRoleFromEmail = (email) => {
        const roleMap = {
          'student@cps.com': 'student',
          'developer@cps.com': 'developer',
          'social@cps.com': 'social', 
          'user@cps.com': 'normal'
        }
        return roleMap[email] || 'normal'
      }

      const userWithRole = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        name: userData.name || userData.username,
        role: getRoleFromEmail(userData.email)
      }

      // Save to state and localStorage
      setUser(userWithRole)
      setToken(jwt)
      localStorage.setItem('cps_token', jwt)
      localStorage.setItem('cps_user', JSON.stringify(userWithRole))
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      return userWithRole

    } catch (error) {
      console.error('Login error:', error)
      
      let errorMessage = 'Invalid email or password'
      
      if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message
      }
      
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    try {
      setLoading(true)

      const signupData = {
        username: userData.email.split('@')[0],
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }

      const response = await api.post('/api/auth/local/register', signupData)
      const { user: newUser, jwt } = response.data

      const userWithRole = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name || newUser.username,
        role: userData.role || 'normal'
      }

      setUser(userWithRole)
      setToken(jwt)
      localStorage.setItem('cps_token', jwt)
      localStorage.setItem('cps_user', JSON.stringify(userWithRole))
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

      return userWithRole

    } catch (error) {
      console.error('Signup error:', error)
      let errorMessage = 'Registration failed'
      
      if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message
      }
      
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('cps_token')
    localStorage.removeItem('cps_user')
    delete api.defaults.headers.common['Authorization']
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    token
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