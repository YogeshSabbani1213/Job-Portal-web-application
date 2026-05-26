import { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  Menu,
  X,
  User,
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  FileUser
} from 'lucide-react'

import { AuthContext } from '../context/AuthContext'

export default function Navbar() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // Mobile menu
  const [openMenu, setOpenMenu] = useState(false)
  // Profile dropdown
  const [openProfile, setOpenProfile] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav
      className='
        bg-linear-to-r from-black via-gray-900 to-black
        text-white
        px-5 md:px-10
        py-4
        sticky top-0
        z-50
        shadow-lg
      '
    >

      {/* Top Navbar */}
      <div className='flex justify-between items-center'>

        {/* Logo */}
        <Link
          to='/'
          className='text-2xl md:text-3xl font-extrabold tracking-wide text-cyan-400'
        >
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          <Link to='/jobs' className='hover:text-cyan-400 transition'>
            Jobs
          </Link>

          {
            user?.role === 'recruiter' && (
              <Link
                to='/create-job'
                className='hover:text-cyan-400 transition'
              >
                Create Job
              </Link>
            )
          }

          {
            user && (
              <Link
                to={
                  user?.role === 'recruiter'
                    ? '/recruiter/dashboard'
                    : user?.role === 'admin'
                      ? '/admin/dashboard'
                      : '/dashboard'
                }
                className='hover:text-cyan-400 transition'
              >
                Dashboard
              </Link>
            )
          }

          {
            user ? (
              <div className='relative'>
                {/* Profile Button */}
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className='
                    flex items-center gap-2
                    bg-cyan-500 hover:bg-cyan-600
                    px-4 py-2
                    rounded-full
                    transition'>
                  <User size={20} />
                  <span className='font-semibold'>
                    {user.fullname}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {
                  openProfile && (
                    <div
                      className='
                        absolute right-0 mt-4
                        w-72
                        bg-white text-black
                        rounded-2xl
                        shadow-2xl
                        p-5
                        border
                      '
                    >
                      {/* Top */}
                      <div className='flex flex-col items-center'>
                        <div
                          className='
                            bg-cyan-500
                            text-white
                            w-16 h-16
                            rounded-full
                            flex items-center justify-center
                            text-2xl font-bold
                            mb-3
                          '
                        >
                          {user.fullname?.charAt(0)}
                        </div>
                        <h2 className='text-xl font-bold'>
                          {user.fullname}
                        </h2>

                        <p className='text-gray-500 text-sm mt-1'>
                          {user.email}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className='border-t my-4'></div>
                      {/* Details */}
                      <div className='space-y-4'>
                        <div className='flex items-center gap-3'>
                          <BriefcaseBusiness
                            size={18}
                            className='text-cyan-500'
                          />

                          <span className='capitalize'>
                            {user.role}
                          </span>
                        </div>

                        <Link
                          to={
                            user?.role === 'recruiter'
                              ? '/recruiter/dashboard'
                              : user?.role === 'admin'
                                ? '/admin/dashboard'
                                : '/dashboard'
                          }
                          className='flex items-center gap-3 hover:text-cyan-500 transition'
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>

                        {/* Profile Page */}
                        <Link
                          to='/profile'
                          className='flex items-center gap-3 hover:text-cyan-500 transition'
                        >
                          <FileUser size={18} />
                          All Details
                        </Link>

                        <button
                          onClick={handleLogout}
                          className='
                            flex items-center gap-3
                            text-red-500
                            hover:text-red-600
                            transition
                          '
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <Link
                  to='/login'
                  className='hover:text-cyan-400 transition'
                >
                  Login
                </Link>

                <Link
                  to='/register'
                  className='
                    bg-cyan-500
                    hover:bg-cyan-600
                    px-5 py-2
                    rounded-full
                    transition
                    font-semibold
                  '
                >
                  Register
                </Link>

              </div>

            )
          }

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenMenu(true)}
          className='md:hidden'
        >

          <Menu size={30} />

        </button>

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 right-0
          h-screen w-[80%]
          bg-black
          z-50
          transform transition-transform duration-500
          ${openMenu ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        {/* Close */}
        <div className='flex justify-end p-5'>

          <button onClick={() => setOpenMenu(false)}>

            <X size={32} />

          </button>

        </div>

        {/* Mobile Content */}
        <div className='flex flex-col gap-8 px-8 text-xl'>

          {
            user && (

              <div
                className='
                  bg-gray-900
                  rounded-2xl
                  p-5
                  flex flex-col items-center
                '
              >

                <div
                  className='
                    bg-cyan-500
                    w-16 h-16
                    rounded-full
                    flex items-center justify-center
                    text-2xl font-bold
                    mb-3
                  '
                >

                  {user.fullname?.charAt(0)}

                </div>

                <h2 className='font-bold'>

                  {user.fullname}

                </h2>

                <p className='text-gray-400 text-sm mt-1'>

                  {user.email}

                </p>

              </div>

            )
          }

          <Link
            to='/jobs'
            onClick={() => setOpenMenu(false)}
          >
            Jobs
          </Link>

          {
            user?.role === 'recruiter' && (

              <Link
                to='/create-job'
                onClick={() => setOpenMenu(false)}
              >
                Create Job
              </Link>

            )
          }

          {
            user && (

              <>
                <Link
                  to={
                    user?.role === 'recruiter'
                      ? '/recruiter/dashboard'
                      : user?.role === 'admin'
                        ? '/admin/dashboard'
                        : '/dashboard'
                  }
                  onClick={() => setOpenMenu(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to='/profile'
                  onClick={() => setOpenMenu(false)}
                  className='flex items-center gap-3 hover:text-cyan-500 transition'
                >
                  All Details
                </Link>
              </>

            )
          }

          {
            user ? (

              <button
                onClick={handleLogout}
                className='
                  bg-red-500
                  px-4 py-3
                  rounded-xl
                '
              >

                Logout

              </button>

            ) : (

              <>
                <Link
                  to='/login'
                  onClick={() => setOpenMenu(false)}
                >
                  Login
                </Link>

                <Link
                  to='/register'
                  onClick={() => setOpenMenu(false)}
                >
                  Register
                </Link>
              </>

            )
          }

        </div>

      </div>

    </nav>
  )
}