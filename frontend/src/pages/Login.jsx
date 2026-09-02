import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../services/api'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google'
import axios from "axios";


export default function Login() {

  const { login } = useContext(AuthContext)   //gets the login() function from AuthProvider.

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,//(Spread operator) Copies old values.
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()//stops page refresh
    try {
      const { data } = await API.post('/auth/login', formData)
      login(data.user, data.token)
      toast.success('Login Successfully')
      navigate('/Dashboard')
    }
    catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential
      const { data } = await API.post('/auth/google', {
        token: googleToken
      })

      // Save user and JWT using AuthContext
      login(data.user, data.token)
      toast.success('Google Login Successful')
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || 'Google Login Failed'
      )
    }
  }


  return (

    <div className='min-h-screen flex justify-center items-center p-4'>

      <form
        onSubmit={handleSubmit}//Runs when form is submitted
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

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log("Google Login Failed")
          }}
        />

      </form>

    </div>
  )
}