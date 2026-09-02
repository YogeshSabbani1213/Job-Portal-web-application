import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null)// User state
  const [loading, setLoading] = useState(true)// Loading state

  // Restore user after refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))//String ➜ Object
    }
    setLoading(false)
  }, [])

  // Login function
  function login(userData, token){
    localStorage.setItem("user", JSON.stringify(userData))// Save user Object ➜ String
    localStorage.setItem("token", token)// Save token
   
    setUser(userData) // Update state
  }

  // Logout function
  function logout(){
    localStorage.removeItem('user')// Remove localStorage
    localStorage.removeItem('token')// Remove localStorage
    
    setUser(null)// Clear state
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