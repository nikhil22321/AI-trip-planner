import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/userTripCardItem';

function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }

        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });

        setUserTrips(trips); // ✅ update once
    };


  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <h2 className='font-bold text-3xl'>MyTrips</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
            {userTrips?.length>0?userTrips.map((trip, index) => (
                <UserTripCardItem key={index} trip={trip}/>
            ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

            </div>
        ))}
        </div>

    </div>
  )
}

export default MyTrips