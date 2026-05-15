import { Link } from 'react-router-dom'

export default function Home(){

  return(

    <section className='min-h-screen flex flex-col justify-center items-center text-center px-4'>

      <h1 className='text-4xl md:text-7xl font-bold mb-6'>
        Find Your Dream Job
      </h1>

      <p className='text-gray-600 max-w-2xl text-lg mb-8'>
        Apply to thousands of jobs from top companies.
      </p>

      <Link
        to='/jobs'
        className='bg-black text-white px-8 py-4 rounded-lg'
      >
        Browse Jobs
      </Link>

    </section>
  )
}