'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

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

  const login = (email, password) => {
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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email] && password === 'password') {
          const userData = mockUsers[email]
          setUser(userData)
          localStorage.setItem('cps_user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
  }

  const signup = (userData) => {
    return new Promise((resolve, reject) => {
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
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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