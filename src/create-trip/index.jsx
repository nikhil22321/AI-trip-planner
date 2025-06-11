import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTripPlan } from '../service/AIModal'; // adjust path as needed
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../service/firebaseConfig"; // Adjust path based on your file structure
import normalizeKeys from "C:/D drive/projects/ai-trip-planner/src/view-trip/utils/normalizeKeysToCamelCase";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [days, setDays] = useState('');
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [selectedTravelWith, setSelectedTravelWith] = useState(null);
    const[openDialog, setOpenDailog] = useState(false);
    const [formData, setformData]=useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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


    const login=useGoogleLogin({
        // onSuccess:(codeResp) => console.log(codeResp),
        onSuccess:(codeResp) => GetUserProfile(codeResp),
        onError:(error) => console.log(error)
    })

    


    const OnGenerateTrip = async () => {

        // console.log("hello");
        const user=localStorage.getItem('user')
        if(!user){

            setOpenDailog(true)
            return;
        }

        if (
            !formData?.location ||
            !formData?.traveler ||
            !formData?.budget ||
            !formData?.noOfDays
        ) {
            toast("Please fill all details.");
            return;
        }


        console.log(formData);
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget);

        console.log("Sending prompt:", FINAL_PROMPT);

        const tripDataRaw = await generateTripPlan(FINAL_PROMPT);
        const tripData = normalizeKeys(tripDataRaw);

        if (tripData) {
            console.log("🎯 Trip Plan JSON:", tripData);
            // You can store it in state, show modal, etc.
        } else {
            toast("Failed to generate trip plan. Please try again.");
        }
        setLoading(false);
        SaveAiTrip(tripData);
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json'
                }
            }
        )
        .then(resp => {
            console.log(resp);
            localStorage.setItem('user',JSON.stringify(resp.data))
            setOpenDailog(false);
            OnGenerateTrip();
        })
    
    };

    const SaveAiTrip=async(TripData)=>{

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString();
        await setDoc(doc(db, "AITrips", docID), {
            userSelection:formData,
            tripData: TripData,
            userEmail : user?.email,
            id:docID
        });
        setLoading(false);
        navigate('/view-trip/'+docID);

    }

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
                <Button onClick={OnGenerateTrip}
                disabled={loading}>
                    {
                        loading?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
                    }
                    
                </Button>
            </div>
                    <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <img src="/logo.svg" alt="" />
                                <div>
                                    <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                                    <p>Sign in to the App with Google authentication</p>
                                </div>


                            <Button
                            disabled={loading}
                            onClick={login} 
                            className="w-full mt-5 flex gap-4 items-center">
                                
                               < FaGoogle className='h-7 w-7'/>
                                Sign in With Google
                                
                            </Button>
                            </DialogDescription>
                        </DialogHeader>
                        
                    </DialogContent>
                    </Dialog>


                
            
        </div>
    );
}

export default CreateTrip;
