import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

import {
  MapPin,
  Building2,
  CircleCheckBig
} from 'lucide-react'

const AppliedJobs = () => {

  const [appliedJobs, setAppliedJobs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    async function gettingAppliedJobs() {

      try {

        const { data } = await API.get(
          '/application/getmyapplications'
        )

        console.log(data)

        setAppliedJobs(data)

      }
      catch (error) {

        console.log(error)

      }
    }

    gettingAppliedJobs()

  }, [])

  return (

    <div
      className='
        min-h-screen
        bg-gray-50
        px-4 py-10
      '
    >

      <div className='max-w-7xl mx-auto'>

        {/* Heading */}
        <div className='mb-12'>

          <h1
            className='
              text-3xl lg:text-5xl
              font-bold
              text-gray-800
            '
          >

            Applied Jobs

          </h1>

          <p className='text-gray-500 mt-3 text-lg'>

            Track all your job applications

          </p>

        </div>

        {/* Applications */}
        <div className='space-y-6'>

          {
            appliedJobs.length > 0 ? (

              appliedJobs.map((item, index) => (

                <div
                  key={index}

                  onClick={() =>
                    navigate(`/job/${item.job._id}`)
                  }

                  className='
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-6 lg:p-8
                    cursor-pointer
                    hover:shadow-2xl
                    hover:-translate-y-1
                    transition
                  '
                >

                  <div
                    className='
                      flex flex-col lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-6
                    '
                  >

                    {/* Left */}
                    <div className='flex-1'>

                      <h1
                        className='
                          text-2xl lg:text-3xl
                          font-bold
                          text-gray-800
                        '
                      >

                        {item.job.jobtitle}

                      </h1>

                      {/* Company */}
                      <div
                        className='
                          flex items-center gap-2
                          mt-4
                          text-gray-600
                        '
                      >

                        <Building2 size={20} />

                        <h2 className='text-lg'>

                          {item.job.companyname}

                        </h2>

                      </div>

                      {/* Location */}
                      <div
                        className='
                          flex items-center gap-2
                          mt-3
                          text-gray-500
                        '
                      >

                        <MapPin size={20} />

                        <h2>

                          {item.job.location}

                        </h2>

                      </div>

                    </div>

                    {/* Right */}
                    <div
                      className='
                        flex flex-col
                        items-start lg:items-end
                        gap-4
                      '
                    >

                      {/* Status */}
                      <div
                        className={`
                          px-5 py-2
                          rounded-full
                          text-sm font-semibold
                          flex items-center gap-2

                          ${item.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'

                            : item.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'

                              : item.status === 'rejected'
                                ? 'bg-red-100 text-red-700'

                                : 'bg-gray-100 text-gray-700'
                          }
                        `}
                      >

                        <CircleCheckBig size={18} />

                        {item.status}

                      </div>

                      {/* View Button */}
                      <button
                        onClick={(e) => {

                          e.stopPropagation()

                          navigate(`/job/${item.job._id}`)
                        }}

                        className='
                          bg-black text-white
                          px-5 py-3
                          rounded-2xl
                          hover:bg-gray-800
                          transition
                        '
                      >

                        View Details

                      </button>

                    </div>

                  </div>

                </div>

              ))

            ) : (
              <div>
                <h1 className='text-center text-3xl mt-20'>
                  Loading...
                </h1>

                <div
                  className='
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-10
                  text-center
                '
                >

                  <h1
                    className='
                    text-3xl
                    font-bold
                    text-gray-700
                  '
                  >

                    No Applications Yet

                  </h1>

                  <p className='text-gray-500 mt-4'>

                    Start applying for jobs today

                  </p>

                </div>

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default AppliedJobs