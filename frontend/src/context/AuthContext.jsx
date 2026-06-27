import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  // User state
  const [user, setUser] = useState(null)

  // Loading state
  const [loading, setLoading] = useState(true)

  // Restore user after refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  function login(userData, token){
    // Save user
    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    )
    // Save token
    localStorage.setItem(
      'token',
      token
    )
    // Update state
    setUser(userData)
  }

  // Logout function
  function logout(){
    // Remove localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // Clear state
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}