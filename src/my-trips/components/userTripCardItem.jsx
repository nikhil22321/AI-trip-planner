// UserTripCardItem.jsx
import { getPhotoUrl, GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
//   console.log("Trip Location Label:", trip?.userSelection?.location?.label);
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(()=>{
            trip&&GetPlacePhoto();
        },[trip])
    
        // InfoSection.jsx
        const GetPlacePhoto = async () => {
            const label = trip?.userSelection?.location?.label;
    
            if (!label) {
                console.error("Location label is missing");
                return;
            }
    
            const data = { textQuery: label };
    
            try {
                const resp = await GetPlaceDetails(data);
                const photoName = resp.data.places[0]?.photos?.[0]?.name;
    
                if (!photoName) {
                console.error("No photo found for the place");
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
    <Link to={'/view-trip/' + trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-md'>
      <img src={photoUrl || "/placeholder.jpg"} className='rounded-xl h-[220px] width-full object-cover' />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem;
