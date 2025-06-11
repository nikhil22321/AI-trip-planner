import React from 'react';

function Footer({ trip }) {
  return (
    <footer className="mt-10 py-6 bg-gray-100 border-t text-center text-sm text-gray-600 w-full">
      {trip?.tripData?.travelPlan ? (
        <div className="mb-2">
          <p>
            Showing travel plan for:{" "}
            <span className="font-semibold text-black">
              {trip.tripData?.location}
            </span>{" "}
            | Duration:{" "}
            <span className="font-semibold text-black">
              {trip.userSelection?.noOfDays} Days
            </span>
          </p>
        </div>
      ) : (
        <p className="mb-2">Plan your perfect trip with AI ✈️</p>
      )}

      <p>
        © {new Date().getFullYear()} AI Trip Planner. Built with ❤️ using React,
        Tailwind, and Gemini API.
      </p>
    </footer>
  );
}

export default Footer;
