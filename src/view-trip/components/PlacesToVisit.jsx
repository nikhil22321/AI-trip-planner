import React from 'react';
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4">Places to Visit</h2>

      {trip?.tripData?.travelPlan?.itinerary?.map((day, index) => (
        <div
          key={`day-${index}`}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
        >
          <h3 className="text-lg font-semibold mt-6">{day.day}</h3>
          <p className="text-sm italic text-gray-500 mb-2">Best time: {day.bestTime}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {day.plan?.map((place, idx) => (
              <PlaceCard key={`${place?.placeName}-${idx}`} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
