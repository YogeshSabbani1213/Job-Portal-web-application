import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Jobs from './Jobs.jsx'
import { Search, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import API from '../services/api'
import {
  BriefcaseBusiness,
  Bookmark,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const [stats, setStats] = useState({
    totalApplications: 0,
    savedJobs: 0,
    shortlisted: 0,
    rejected: 0
  })

  // Search states
  const [searchText, setSearchText] = useState('')
  const [locationText, setLocationText] = useState('')

  // Final search values after clicking button
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')

  // Search button
  function handleSearch() {
    setSearchQuery(searchText)
    setLocationQuery(locationText)
  }

  async function fetchDashboardStats() {
    try {
      const applicationsRes = await API.get('/application/getmyapplications')

      const savedJobsRes = await API.get('/job/getsavedjobs')

      const applications = applicationsRes.data || []

      const shortlisted = applications.filter(app => app.status === 'shortlisted').length

      const rejected = applications.filter(app => app.status === 'rejected').length

      setStats({
        totalApplications: applicationsRes.data.length,
        savedJobs: savedJobsRes.data.savedJobs.length,
        shortlisted,
        rejected
      })      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    fetchDashboardStats()
  }, [])

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-8'>
      {/* Search Bar */}
      <div
        className='
          border-2 border-gray-300 rounded-2xl
          flex flex-col lg:flex-row
          gap-4 lg:gap-3
          p-4 lg:p-3
          mb-8
          bg-white shadow-sm
        '
      >
        {/* Search Input */}
        <div className='flex items-center gap-2 flex-1'>
          <Search
            size={20}
            className='text-gray-500 shrink-0'
          />

          <input
            type="text"
            placeholder='Search for Job'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='
              flex-1
              bg-transparent
              focus:outline-none
              text-base lg:text-lg
              py-2
            '
          />
        </div>

        {/* Divider */}
        <div className='hidden lg:block w-px h-8 bg-gray-300'></div>

        {/* Location Input */}
        <div className='flex items-center gap-2 flex-1'>
          <MapPin
            size={20}
            className='text-gray-500 shrink-0'
          />

          <input
            type="text"
            placeholder='Location'
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            className='
              flex-1
              bg-transparent
              focus:outline-none
              text-base lg:text-lg
              py-2
            '
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className='
            bg-black text-white
            px-5 py-3
            rounded-xl
            hover:bg-gray-800
            transition
            w-full lg:w-auto
          '
        >
          Find Jobs
        </button>
      </div>

      {/* Welcome Section */}
      <div className='lg:mb-10'>
        <h1 className='text-3xl lg:text-5xl font-bold'>
          Welcome {user.fullname}
        </h1>

        <p className='mt-3 text-lg lg:text-xl text-gray-600'>
          Role : {user.role}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10'>

        <div className='bg-white rounded-2xl shadow p-6 border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500'>
                Applications
              </p>

              <h2 className='text-3xl font-bold mt-2'>
                {stats.totalApplications}
              </h2>
            </div>

            <BriefcaseBusiness
              size={40}
              className='text-blue-500'
            />
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow p-6 border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500'>
                Saved Jobs
              </p>

              <h2 className='text-3xl font-bold mt-2'>
                {stats.savedJobs}
              </h2>
            </div>

            <Bookmark
              size={40}
              className='text-yellow-500'
            />
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow p-6 border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500'>
                Shortlisted
              </p>

              <h2 className='text-3xl font-bold mt-2'>
                {stats.shortlisted}
              </h2>
            </div>

            <CheckCircle
              size={40}
              className='text-green-500'
            />
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow p-6 border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500'>
                Rejected
              </p>

              <h2 className='text-3xl font-bold mt-2'>
                {stats.rejected}
              </h2>
            </div>

            <XCircle
              size={40}
              className='text-red-500'
            />
          </div>
        </div>
      </div>

      
      {/* Jobs */}
      <Jobs
        searchQuery={searchQuery}
        locationQuery={locationQuery}
      />

    </div>
  )
}