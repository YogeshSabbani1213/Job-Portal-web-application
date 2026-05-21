import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../services/api'
import JobCard from '../components/JobCard'

export default function Jobs({ searchQuery, locationQuery }) {

  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        let url = `/job/getJobs?page=${page}&limit=6`
        // Keyword search
        if (searchQuery) {
          url += `&search=${searchQuery}`
        }

        // Location filter
        if (locationQuery) {
          url += `&location=${locationQuery}`
        }
        const { data } = await API.get(url)
        setJobs(data.jobs)
        setTotalPages(data.totalPages)
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [searchQuery, locationQuery, page])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, locationQuery])

  function handlebutton() {
    navigate('/appliedJobs')
  }

  return (

    <div className='w-full max-w-7xl mx-auto py-8'>

      {/* Top Section */}
      <div
        className='
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-10
        '
      >

        <h1 className='text-2xl lg:text-4xl font-bold'>
          Jobs for you
        </h1>

        <button
          onClick={handlebutton}
          className='
            bg-black text-white
            px-5 py-3
            rounded-xl
            hover:bg-gray-800
            transition
            w-full sm:w-auto
          '
        >
          My Applications
        </button>

      </div>

      {/* Jobs Grid */}
      <div
        className='
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        '
      >

        {
          loading ? (
            <h1 className='text-center text-3xl mt-20'>
              Loading...
            </h1>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))
          ) : (
            <h1 className='text-center text-3xl mt-20 text-gray-500'>
              No Jobs Found
            </h1>
          )
        }
      </div>

      <div className='flex justify-center items-center gap-4 mt-10'>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className='bg-black text-white px-4 py-2 rounded disabled:opacity-50'
        >
          Prev
        </button>

        <span className='font-semibold'>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className='bg-black text-white px-4 py-2 rounded disabled:opacity-50'
        >
          Next
        </button>

      </div>

    </div>
  )
}