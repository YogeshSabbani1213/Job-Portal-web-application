import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Login(){

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email:'',
    password:''
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

      const { data } = await API.post('/auth/login', formData)

      login(data.user, data.token)

      alert(data.message)

      navigate('/Dashboard')

    }
    catch(error){
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return(

    <div className='min-h-screen flex justify-center items-center p-4'>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-xl rounded-xl p-8 w-full max-w-md'
      >

        <h2 className='text-3xl font-bold mb-6'>
          Login
        </h2>

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-4'
        />

        <button className='bg-black text-white w-full py-3 rounded'>
          Login
        </button>

      </form>

    </div>
  )
}