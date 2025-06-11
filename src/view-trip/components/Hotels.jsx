import React from 'react'

import HotelCartItem from './HotelCartItem'

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 py-3'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <HotelCartItem hotel={hotel}/>
        ))}
      </div>
    </div>
  )
}

export default Hotels
