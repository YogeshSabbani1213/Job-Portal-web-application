import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider >
        <App />
        <Toaster position='top-center' reverseOrder={false} />
      </AuthProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
)