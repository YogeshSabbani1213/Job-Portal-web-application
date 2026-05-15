import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Jobs from './Jobs.jsx'
import { Search, MapPin } from 'lucide-react'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

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

      {/* Jobs */}
      <Jobs
        searchQuery={searchQuery}
        locationQuery={locationQuery}
      />

    </div>
  )
}