import React from 'react';
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary || [];

  // Detect if flat structure
  const isFlat = itinerary.length > 0 && !itinerary[0].places && !itinerary[0].plan;

  // Normalize into { "Day X": { bestTime, places[] } }
  const groupedByDay = isFlat
    ? itinerary.reduce((acc, item) => {
        const day = item.day || 'Unknown Day';
        if (!acc[day]) {
          acc[day] = { bestTime: item.bestTime || '', places: [] };
        }
        acc[day].places.push(item);
        return acc;
      }, {})
    : itinerary.reduce((acc, item, idx) => {
        const day = item.day || `Day ${idx + 1}`;
        const bestTime = item.bestTime || '';
        const places = item.plan || item.places || [];
        acc[day] = { bestTime, places };
        return acc;
      }, {});

  // Sort days like "Day 1", "Day 2", ...
  const sortedDayKeys = Object.keys(groupedByDay).sort((a, b) => {
    const getDayNum = (label) => parseInt(label.match(/\d+/)) || 0;
    return getDayNum(a) - getDayNum(b);
  });

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4">Places to Visit</h2>

      {sortedDayKeys.length === 0 && (
        <p className="text-gray-500">No places to visit</p>
      )}

      {sortedDayKeys.map((dayLabel) => {
        const { bestTime, places } = groupedByDay[dayLabel];

        return (
          <div key={dayLabel}>
            <h3 className="text-lg font-semibold mt-4">{dayLabel}</h3>
            {bestTime && (
              <p className="text-sm italic text-gray-500 mb-2">Best time: {bestTime}</p>
            )}
            {places.length === 0 ? (
              <p className="text-sm text-gray-500">No places listed for this day.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {places.map((place, i) => (
                  <PlaceCard key={`${dayLabel}-${i}`} place={place} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;
