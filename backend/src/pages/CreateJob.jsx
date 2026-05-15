import { useState } from 'react'
import API from '../services/api'

export default function CreateJob(){

  const [formData, setFormData] = useState({
    jobtitle:'',
    companyname:'',
    location:'',
    jobtype:'Full time',
    description:'',
    salary:'',
    experiencelevel:'',
    skillsrequired:''
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      const sendData = {
        ...formData,
        skillsrequired:formData.skillsrequired.split(',')
      }

      const { data } = await API.post('/job/createjob', sendData)

      alert(data.message)

    }
    catch(error){
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return(

    <div className='min-h-screen flex justify-center items-center p-6'>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl'
      >

        <h1 className='text-4xl font-bold mb-6'>
          Create Job
        </h1>

        <input
          type='text'
          name='jobtitle'
          placeholder='Job Title'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <input
          type='text'
          name='companyname'
          placeholder='Company Name'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <input
          type='text'
          name='location'
          placeholder='Location'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <textarea
          name='description'
          placeholder='Description'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4 h-32'
        />

        <input
          type='number'
          name='salary'
          placeholder='Salary'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <input
          type='number'
          name='experiencelevel'
          placeholder='Experience'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <input
          type='text'
          name='skillsrequired'
          placeholder='React, Node, MongoDB'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <button className='bg-black text-white w-full py-3 rounded'>
          Create Job
        </button>

      </form>

    </div>
  )
}