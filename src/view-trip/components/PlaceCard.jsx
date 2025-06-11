import { getPhotoUrl, GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function PlaceCard({ place }) {

  const [photoUrl, setPhotoUrl] = useState();
  
      useEffect(()=>{
          place&&GetPlacePhoto();
      },[place])
  
      // InfoSection.jsx
      const GetPlacePhoto = async () => {
          const label = place?.placeName;
  
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
    <div className="border rounded-xl p-4 bg-white shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
      <img
        src={photoUrl?photoUrl : '/placeholder.jpg'}
        alt={place?.placeName}
        className="rounded-md mb-2 w-full h-40 object-cover"
      />
      <h2 className="font-bold text-md mb-1 hover:text-blue-600 transition-colors">
        {place?.placeName}
      </h2>
      <p className="text-sm text-gray-600 mb-1">{place?.placeDetails}</p>
      <p className="text-sm">🎫 {place?.ticketPricing}</p>
      <p className="text-sm">⭐ {place?.rating}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 mt-1 inline-block"
      >
        📍 View on Map
      </a>
    </div>
  );
}

export default PlaceCard;
