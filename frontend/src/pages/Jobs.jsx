import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../services/api'
import JobCard from '../components/JobCard'

export default function Jobs({searchQuery,locationQuery}) {

  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = '/job/getJobs?limit=50'
        // Keyword search
        if(searchQuery){
          url += `&keyword=${searchQuery}`
        }

        // Location filter
        if(locationQuery){
          url += `&location=${locationQuery}`
        }
        const { data } = await API.get(url)
        setJobs(data.jobs)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchJobs()
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
          jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))

          ) : (
            <h1 className='text-2xl font-bold'>
              No Jobs Found
            </h1>
          )
        }

      </div>

    </div>
  )
}