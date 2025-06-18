import { getPhotoUrl, GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto(place.placeName);
    } else {
      console.warn("Skipping photo fetch: placeName is missing", place);
    }
  }, [place]);

  const GetPlacePhoto = async (label) => {
    try {
      const data = { textQuery: label };
      const resp = await GetPlaceDetails(data);
      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (!photoName) {
        console.warn("No photo found for:", label);
        return;
      }

      const url = getPhotoUrl(photoName);
      setPhotoUrl(url);
    } catch (err) {
      console.error("API error:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
      <img
        src={photoUrl || '/placeholder.jpg'}
        alt={place?.placeName || 'Unnamed Place'}
        className="rounded-md mb-2 w-full h-40 object-cover"
      />
      <h2 className="font-bold text-md mb-1 hover:text-blue-600 transition-colors">
        {place?.placeName || 'Unnamed Place'}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        {place?.placeDetails || 'No details available.'}
      </p>
      {place?.ticketPricing && (
        <p className="text-sm">🎫 {place.ticketPricing}</p>
      )}
      {place?.rating && (
        <p className="text-sm">⭐ {place.rating}</p>
      )}
      {place?.placeName && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 mt-1 inline-block"
        >
          📍 View on Map
        </a>
      )}
    </div>
  );
}

export default PlaceCard;
