import React, { useEffect, useState } from 'react'
import API from '../../services/api'

import {
    Users,
    BriefcaseBusiness,
    UserCheck,
    FileText,
    ClipboardList
} from 'lucide-react'

const AdminDashboard = () => {

    const [dashboard,setDashboard]=useState({
        totalUsers:0,
        totalRecruiters:0,
        totalJobSeekers:0,
        totalJobs:0,
        totalApplications:0
    })

    const [loading,setLoading]=useState(true)

    useEffect(()=>{

        async function fetchDashboard(){

            try{

                const res=await API.get(
                    '/admin/dashboard'
                )

                setDashboard(res.data.dashboard)

            }catch(error){

                console.log(error)

            }finally{

                setLoading(false)
            }
        }

        fetchDashboard()

    },[])

    if(loading){

        return(

            <div className='text-center mt-20 text-2xl font-semibold'>
                Loading...
            </div>
        )
    }

    return (

        <div className='p-5 md:p-10 min-h-screen bg-gray-100'>

            <h1 className='text-4xl font-bold mb-10'>
                Admin Dashboard
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6'>

                <div className='bg-white rounded-2xl shadow p-6 border'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500'>
                                Total Users
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {dashboard.totalUsers}
                            </h2>

                        </div>

                        <Users
                            size={40}
                            className='text-blue-500'
                        />

                    </div>

                </div>

                <div className='bg-white rounded-2xl shadow p-6 border'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500'>
                                Recruiters
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {dashboard.totalRecruiters}
                            </h2>

                        </div>

                        <BriefcaseBusiness
                            size={40}
                            className='text-green-500'
                        />

                    </div>

                </div>

                <div className='bg-white rounded-2xl shadow p-6 border'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500'>
                                Job Seekers
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {dashboard.totalJobSeekers}
                            </h2>

                        </div>

                        <UserCheck
                            size={40}
                            className='text-purple-500'
                        />

                    </div>

                </div>

                <div className='bg-white rounded-2xl shadow p-6 border'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500'>
                                Jobs
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {dashboard.totalJobs}
                            </h2>

                        </div>

                        <FileText
                            size={40}
                            className='text-orange-500'
                        />

                    </div>

                </div>

                <div className='bg-white rounded-2xl shadow p-6 border'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500'>
                                Applications
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {dashboard.totalApplications}
                            </h2>

                        </div>

                        <ClipboardList
                            size={40}
                            className='text-red-500'
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminDashboard