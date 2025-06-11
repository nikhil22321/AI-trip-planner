import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { getPhotoUrl, GetPlaceDetails } from '@/service/GlobalApi';

// const getPhotoUrl = (photoName) =>
//   `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;


function InfoSection({trip}) {

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
    <div>
        <img src={photoUrl || "/placeholder.jpg"} className='h-[340px] w-full object-cover rounded-xl'/>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>
                    {trip?.userSelection?.location?.label}
                </h2>

                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 📅 {trip.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip.userSelection?.budget} Budget </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🕶️ No. of traveller : {trip.userSelection?.traveler} </h2>
                </div>
            </div>
            <Button>
                <IoIosSend />
            </Button>
        </div>

    </div>
  )
}

export default InfoSection