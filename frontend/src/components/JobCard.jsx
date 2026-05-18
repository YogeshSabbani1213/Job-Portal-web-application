import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


export default function JobCard({ job }) {
  const navigate = useNavigate()

  const applyJob = async () => {

    try {

      const { data } = await API.post('/application/applyjob', {
        jobId: job._id
      })

      toast.success('Applied for the Job')

    }
    catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)

    }
  }

  return (

    <div
      onClick={() => navigate(`/job/${job._id}`)}
      className='
    bg-white rounded-xl shadow-lg p-6
    hover:shadow-2xl
    hover:-translate-y-2
    transition
    cursor-pointer
  '
    >

      <h2 className='text-2xl font-bold'>
        {job.jobtitle}
      </h2>

      <p className='text-gray-500 mt-2'>
        {job.companyname}
      </p>

      <p className='mt-2'>
        {job.location}
      </p>

      <p className='mt-2 font-semibold'>
        ₹ {job.salary}
      </p>

      <p className='mt-4 text-gray-600'>
        {job.description}
      </p>

      <button
        onClick={(e) => {

          e.stopPropagation()

          applyJob()
        }}></button>

    </div>
  )
}