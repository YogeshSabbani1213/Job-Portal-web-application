import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../services/api'
import toast from 'react-hot-toast'

const Applicants = () => {

    const { jobId } = useParams()

    const [applications,setApplications]=useState([])

    const [loading,setLoading]=useState(true)

    const fetchApplications=async()=>{

        try{

            const res=await API.get(
                `/application/job/${jobId}`
            )

            setApplications(res.data.applications)

        }catch(error){

            console.log(error)

            toast.error('Failed to fetch applicants')

        }finally{

            setLoading(false)
        }
    }

    useEffect(()=>{

        fetchApplications()

    },[])

    const updateStatus=async(applicationId,status)=>{

        try{

            const res=await API.put(
                `/application/status/${applicationId}`,
                {status}
            )

            toast.success(res.data.message)

            setApplications(
                applications.map((app)=>
                    app._id===applicationId
                    ? {...app,status}
                    : app
                )
            )

        }catch(error){

            console.log(error)

            toast.error('Failed to update status')
        }
    }

    if(loading){
        return(
            <div className='text-center mt-20 text-2xl font-semibold'>
                Loading...
            </div>
        )
    }

    return (

        <div className='p-5 md:p-10'>

            <h1 className='text-3xl font-bold mb-8'>
                Applicants
            </h1>

            {
                applications.length===0 ? (

                    <div className='text-center text-gray-500 text-xl mt-20'>
                        No applicants yet
                    </div>

                ) : (

                    <div className='overflow-x-auto bg-white rounded-xl shadow'>

                        <table className='w-full'>

                            <thead className='bg-gray-100'>

                                <tr>

                                    <th className='p-4 text-left'>
                                        Name
                                    </th>

                                    <th className='p-4 text-left'>
                                        Email
                                    </th>

                                    <th className='p-4 text-left'>
                                        Resume
                                    </th>

                                    <th className='p-4 text-left'>
                                        Status
                                    </th>

                                    <th className='p-4 text-left'>
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    applications.map((app)=>(

                                        <tr
                                            key={app._id}
                                            className='border-b'
                                        >

                                            <td className='p-4'>
                                                {app.applicant?.fullname}
                                            </td>

                                            <td className='p-4'>
                                                {app.applicant?.email}
                                            </td>

                                            <td className='p-4'>

                                                <a
                                                    href={app.resumeURL}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='text-blue-500 underline'
                                                >
                                                    View Resume
                                                </a>

                                            </td>

                                            <td className='p-4 capitalize'>
                                                {app.status}
                                            </td>

                                            <td className='p-4'>

                                                <select
                                                    value={app.status}
                                                    onChange={(e)=>
                                                        updateStatus(
                                                            app._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className='border p-2 rounded'
                                                >

                                                    <option value='pending'>
                                                        Pending
                                                    </option>

                                                    <option value='shortlisted'>
                                                        Shortlisted
                                                    </option>

                                                    <option value='rejected'>
                                                        Rejected
                                                    </option>

                                                    <option value='hired'>
                                                        Hired
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

        </div>
    )
}

export default Applicants