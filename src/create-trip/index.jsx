import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTripPlan } from '../../service/AIModal'; // adjust path as needed
// import { GoogleGenAI } from '@google/genai';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [days, setDays] = useState('');
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [selectedTravelWith, setSelectedTravelWith] = useState(null);

    const [formData, setformData]=useState([]);

    const handleInputChange=(name, value)=>{

        if (name == 'noOfDays' && value>5){
            console.log("please enter the Trip days less than 5")
            return;
        }

        setformData({
            ...formData,
            [name]:value
        })
    }
    useEffect(() => {
        console.log(formData);
    },[formData])




const OnGenerateTrip = async () => {
  if (
    !formData?.location ||
    !formData?.traveler ||
    !formData?.budget ||
    !formData?.noOfDays
  ) {
    toast("Please fill all details.");
    return;
  }

    const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);

    console.log("Sending prompt:", FINAL_PROMPT);

    const tripData = await generateTripPlan(FINAL_PROMPT);

    if (tripData) {
        console.log("🎯 Trip Plan JSON:", tripData);
        // You can store it in state, show modal, etc.
    } else {
        toast("Failed to generate trip plan. Please try again.");
    }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-4xl font-bold text-gray-800">Tell us your travel preference 🏕️</h2>
            <p className="mt-3 text-gray-600 text-lg">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">What is destination of choice?</h3>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => {
                                setPlace(v);
                                // console.log(v);
                                handleInputChange('location',v)
                            },
                            placeholder: 'Select...',
                            styles: {
                                control: (provided) => ({
                                    ...provided,
                                    padding: '6px',
                                    borderRadius: '0.5rem',
                                    borderColor: '#d1d5db',
                                    boxShadow: 'none',
                                }),
                            },
                        }}
                    />
                </div>

                {/* Days input */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">How many days are you planning your trip?</h3>
                    <Input
                        type="number"
                        placeholder="Ex.3"
                        className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                        onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
                    />
                </div>
            </div>

            {/* Budget Section */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">What is Your Budget?</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('budget',item.title)}
                            className={`cursor-pointer p-4 border rounded-lg hover:shadow transition ${
                                formData?.budget==item.title&& 'border-black shadow-md'
                            }`}
                        >
                            <div className='text-3xl mb-2'>{item.icon}</div>
                            <div className='font-bold text-lg'>{item.title}</div>
                            <div className='text-sm text-gray-500'>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Travel Group Section */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Who do you plan on traveling with on your next adventure?</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5'>
                    {SelectTravelsList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('traveler',item.people)}
                            className={`cursor-pointer p-4 border rounded-lg hover:shadow transition ${
                                formData.traveler == item.people? 'border-black shadow-md' : 'border-gray-300'
                            }`}
                        >
                            <div className='text-3xl mb-2'>{item.icon}</div>
                            <div className='font-bold text-lg'>{item.title}</div>
                            <div className='text-sm text-gray-500'>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <div className='my-10 flex justify-end'>
                <Button onClick={OnGenerateTrip}>
                    Generate Trip
                </Button>
            </div>
        </div>
    );
}

export default CreateTrip;
