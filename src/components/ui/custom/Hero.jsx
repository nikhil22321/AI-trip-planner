import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'
        ><span className='text-[#f56551]'>Discover your next adventure with AI:</span> Personalized itineraies at your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>
            your personal trip planner and travel educator, creating custom itineraies tailored to your interst and budget
        </p>
        <Link to={'/create-trip'}>
            <Button>Get started. It's free</Button>
        </Link>
    </div>
  )
}

export default Hero