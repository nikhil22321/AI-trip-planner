import React from 'react';
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary || [];

  // Grouping days
  const groupedByDay = itinerary.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(...item.places); // Combine all places for that day
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4">Places to Visit</h2>

      {Object.entries(groupedByDay).map(([dayLabel, places], index) => (
        <div
          key={`group-${dayLabel}`}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
        >
          <h3 className="text-lg font-semibold mt-6">{dayLabel}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {places.map((place, idx) => (
              <PlaceCard key={`${place?.placeName}-${idx}`} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
