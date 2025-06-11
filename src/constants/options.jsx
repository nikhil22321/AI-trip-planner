export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travels in exploration',
    icon: '👤',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '🎉',
    people: '5 to 10 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '🪙'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💵'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '👑'
  }
];

// src/constants/prompts.jsx
export const AI_PROMPT = `Generate a Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.
Give me:
* 3 to 5 budget hotels (HotelName, Hotel address, Price, geo coordinates, rating, descriptions)
* day wise itinerary with placeName, place details, geo coordinates, ticket pricing, rating
* Day-wise plan with best time to visit
Format the result in pure JSON (no image URLs).`;

