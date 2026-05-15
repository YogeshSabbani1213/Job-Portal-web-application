import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        role: 'job seeker',
        skills: ''
    })

    const [resume, setResume] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const sendData = new FormData()

            sendData.append('fullname', formData.fullname)
            sendData.append('email', formData.email)
            sendData.append('password', formData.password)
            sendData.append('role', formData.role)
            sendData.append('skills', formData.skills)

            if (resume) {
                sendData.append('resume', resume)
            }

            const { data } = await API.post('/auth/register', sendData)

            alert(data.message)

            navigate('/login')

        }
        catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center p-4'>

            <form
                onSubmit={handleSubmit}
                className='bg-white w-full max-w-lg shadow-xl rounded-xl p-8'
            >

                <h2 className='text-3xl font-bold mb-6'>
                    Register
                </h2>

                <input
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    onChange={handleChange}
                    className='w-full border p-3 rounded mb-4'
                />

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

                <select
                    name='role'
                    onChange={handleChange}
                    className='w-full border p-3 rounded mb-4'
                >
                    <option value='job seeker'>Job Seeker</option>
                    <option value='recruiter'>Recruiter</option>
                </select>

                {
                    formData.role === 'job seeker' && (
                        <>

                            <input
                                type='text'
                                name='skills'
                                placeholder='Skills'
                                onChange={handleChange}
                                className='w-full border p-3 rounded mb-4'
                            />

                            <input
                                type='file'
                                onChange={(e) => setResume(e.target.files[0])}
                                className='mb-4'
                            />

                        </>
                    )
                }

                <button className='bg-black text-white w-full py-3 rounded'>
                    Register
                </button>

            </form>

        </div>
    )
}