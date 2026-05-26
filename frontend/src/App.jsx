import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

import Navbar from './components/Navbar'
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import Dashboard from './pages/Dashboard'
import CreateJob from './pages/CreateJob'
import AppliedJobs from './pages/AppliedJobs'
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import { Toaster } from 'react-hot-toast'
import Applicants from './pages/Recruiter/Applicants'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AIResumeAnalyzer from './pages/AIResumeAnalyzer'
import FloatingAIButton from './components/FloatingAIButton'
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FloatingAIButton />
    </>
  )
}

function ProtectedRoute({ children }) {

  const { user, loading } = useContext(AuthContext)

  // Wait until checking localStorage
  if (loading) {
    return <h1>Loading...</h1>
  }

  // If no user
  if (!user) {
    return <Navigate to='/login' />
  }
  return children
}

const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,

    children: [

      {
        index: true,
        element: <Home />
      },

      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'job/:id',
        element: <JobDetails />
      },
      {
        path: 'register',
        element: <Register />
      },

      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: '/appliedJobs',
        element: <AppliedJobs />
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },

      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },

      {
        path: 'create-job',
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        )
      },
      {
        path: '/recruiter/dashboard',
        element: (
          <ProtectedRoute>
            <RecruiterDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/recruiter/applicants/:jobId',
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        )
      },
      {
        path: '/admin/dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/ai-resume',
        element: (
          <ProtectedRoute>
            <AIResumeAnalyzer />
          </ProtectedRoute>
        )
      },

    ]
  }

])

function App() {
  return (
    <RouterProvider router={router} />

  )
}

export default App