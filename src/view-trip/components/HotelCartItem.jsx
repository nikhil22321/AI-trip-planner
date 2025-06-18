import { getPhotoUrl, GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCartItem({hotel}) {
    const [photoUrl, setPhotoUrl] = useState();
    
        useEffect(()=>{
            hotel&&GetPlacePhoto();
        },[hotel])
    
        // InfoSection.jsx
        const GetPlacePhoto = async () => {
            const label = hotel?.hotelName
    
            if (!label) {
                console.error("Location label is missing");
                return;
            }
    
            const data = { textQuery: label };
    
            try {
                const resp = await GetPlaceDetails(data);
                const photoName = resp.data.places[0]?.photos?.[0]?.name;
    
                if (!photoName) {
                console.log("No photo found for the place");
                return;
                }
    
                const photoUrl = getPhotoUrl(photoName);
                setPhotoUrl(photoUrl)
                // console.log("Photo URL:", photoUrl);
    
                // Optionally set it in state to display
                // setPhotoUrl(photoUrl);
    
            } catch (err) {
                console.error("API error:", err?.response?.data || err.message);
            }
        };
  return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelAddress)} ${encodeURIComponent(hotel?.hotelName)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img
                src={photoUrl || "/placeholder.jpg"}
                className='rounded-xl h-[200px] width-full object-cover'
                alt={hotel?.hotelName}
              />

              <div className='my-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>💲{hotel?.price} /night</h2>
                <h2 className='text-sm'>⭐{hotel?.rating}</h2>
              </div>
            </div>
          </Link>
  )
}

export default HotelCartItem