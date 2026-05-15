import API from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function JobCard({ job }) {
  const navigate = useNavigate()

  const applyJob = async () => {

    try {

      const { data } = await API.post('/application/applyjob', {
        jobId: job._id
      })

      alert(data.message)

    }
    catch (error) {
      console.log(error)
      alert(error.response.data.message)
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