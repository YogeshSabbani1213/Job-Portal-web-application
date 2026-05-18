import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'


import {
  MapPin,
  IndianRupee,
  BriefcaseBusiness,
  Clock3
} from 'lucide-react'

import API from '../services/api'

export default function JobDetails() {

  const { id } = useParams()

  const [job, setJob] = useState(null)

  useEffect(() => {

    async function fetchSingleJob() {

      try {

        const { data } = await API.get('/job/getJobs?limit=100')

        const foundJob = data.jobs.find(
          (item) => item._id === id
        )

        setJob(foundJob)

      }
      catch (error) {

        console.log(error)

      }
    }

    fetchSingleJob()

  }, [id])

  async function applyJob() {

    try {

      const { data } = await API.post(
        '/application/applyjob',
        {
          jobId: job._id
        }
      )

      toast.success(data.message)

    }
    catch (error) {

      console.log(error)

      console.log(error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || error.message)


    }
  }

  if (!job) {

    return (
      <h1 className='text-center text-3xl mt-20'>
        Loading...
      </h1>
    )
  }

  return (

    <div className='min-h-screen bg-gray-50 py-10 px-4'>

      <div className='max-w-7xl mx-auto'>

        {/* Top Card */}
        <div
          className='
            bg-white rounded-3xl shadow-xl
            p-6 lg:p-10
            flex flex-col lg:flex-row
            justify-between
            gap-8
          '
        >

          {/* Left */}
          <div className='flex-1'>

            <h1
              className='
                text-3xl lg:text-5xl
                font-bold
                text-gray-800
              '
            >

              {job.jobtitle}

            </h1>

            <h2
              className='
                text-xl lg:text-2xl
                text-cyan-600
                mt-3
                font-semibold
              '
            >

              {job.companyname}

            </h2>

            {/* Info */}
            <div
              className='
                flex flex-wrap
                gap-5
                mt-6
                text-gray-600
              '
            >

              <div className='flex items-center gap-2'>

                <MapPin size={20} />

                {job.location}

              </div>

              <div className='flex items-center gap-2'>

                <BriefcaseBusiness size={20} />

                {job.jobtype}

              </div>

              <div className='flex items-center gap-2'>

                <Clock3 size={20} />

                {job.experiencelevel} Years

              </div>

            </div>

          </div>

          {/* Right */}
          <div
            className='
              bg-cyan-50
              rounded-3xl
              p-6
              min-w-70
              flex flex-col
              justify-between
            '
          >

            <div>

              <p className='text-gray-500 text-lg'>
                Salary
              </p>

              <h2
                className='
                  text-4xl
                  font-bold
                  text-cyan-600
                  mt-2
                '
              >

                ₹ {job.salary}

              </h2>

            </div>

            <button
              onClick={applyJob}
              className='
                mt-8
                bg-black text-white
                py-4
                rounded-2xl
                hover:bg-gray-800
                transition
                text-lg
                font-semibold
              '
            >

              Apply Now

            </button>

          </div>

        </div>

        {/* Main Content */}
        <div
          className='
            grid
            grid-cols-1 lg:grid-cols-3
            gap-8
            mt-10
          '
        >

          {/* Left Side */}
          <div className='lg:col-span-2 space-y-8'>

            {/* Description */}
            <div
              className='
                bg-white
                rounded-3xl
                shadow-lg
                p-6 lg:p-8
              '
            >

              <h2
                className='
                  text-2xl font-bold
                  mb-5
                '
              >

                Job Description

              </h2>

              <p
                className='
                  text-gray-600
                  leading-8
                '
              >

                {job.description}

              </p>

            </div>

            {/* Responsibilities */}
            <div
              className='
                bg-white
                rounded-3xl
                shadow-lg
                p-6 lg:p-8
              '
            >

              <h2
                className='
                  text-2xl font-bold
                  mb-5
                '
              >

                Responsibilities

              </h2>

              <ul
                className='
                  list-disc
                  pl-6
                  text-gray-600
                  space-y-3
                '
              >

                <li>Develop scalable applications</li>

                <li>Collaborate with cross-functional teams</li>

                <li>Write clean maintainable code</li>

                <li>Participate in code reviews</li>

                <li>Optimize performance and UI</li>

              </ul>

            </div>

          </div>

          {/* Right Side */}
          <div className='space-y-8'>

            {/* Skills */}
            <div
              className='
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              '
            >

              <h2
                className='
                  text-2xl font-bold
                  mb-5
                '
              >

                Skills Required

              </h2>

              <div className='flex flex-wrap gap-3'>

                {
                  job.skillsrequired.map((skill, index) => (

                    <span
                      key={index}
                      className='
                        bg-cyan-100
                        text-cyan-700
                        px-4 py-2
                        rounded-full
                        font-medium
                      '
                    >

                      {skill}

                    </span>

                  ))
                }

              </div>

            </div>

            {/* Recruiter */}
            <div
              className='
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              '
            >

              <h2
                className='
                  text-2xl font-bold
                  mb-5
                '
              >

                Recruiter

              </h2>

              <div className='space-y-3'>

                <h3 className='font-semibold text-lg'>

                  {job.createdBy?.fullname}

                </h3>

                <p className='text-gray-500'>

                  {job.createdBy?.email}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}