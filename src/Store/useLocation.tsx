import { create } from 'zustand'
import { persist } from 'zustand/middleware';

import dayjs from "dayjs";

const today = dayjs().format('DD/MM/YYYY');
const timeNow = dayjs().format('HH:mm');

interface IUser {
    date:string;
    time:string;
    taxiNow:boolean;

    tripList:string[];
    departureSections: string[];
    flights: string[];
    isFlight:boolean;

    pickUpLocation: string;
    dropOffLocation: string;

    stopFirst:string;
    stopSecond:string;
    stopLast:string;

    icon: number;
    icon2: number;

    flight:string;
    bus: string,
    train:string,

    airline:string;
    airlineBack:string;

    departure: string;
    departure2: string;
    tripType:string;
    arrivalTime:string;
}
interface Store {
    user: IUser;
    
    setDate:(value: string) => void;
    setTime:(value: string) => void;
    setTaxiNow: (value: boolean) => void;

    setPickUpLocation: (address: string) => void;
    setDropOffLocation: (address: string) => void;

    setStopFirst: (value: string) => void;
    setStopSecond: (value: string) => void;
    setStopLast: (value: string) => void;
    setDeparture: (section: string) => void;
    setDeparture2: (section: string) => void;


    setIcon: (value: number) => void;
    setIcon2: (value: number) => void;

    setFlight: (value: string) => void;
    setTrain: (value: string) => void;
    setBus: (value: string) => void;

    setTripType:(trip:string) => void;
    setAirline:(value: string) => void;
    setAirlineBack:(value: string) => void;

    setArrivalTime: (value: string) => void;

    setIsFlight: (value: boolean) => void;
}
export const useLocation = create<Store>()(
        persist(
            (set) => ({
            user: {
                tripList:['Business (need receipt)', 'Vacation', 'Else'],
                departureSections: ['Domestic', 'International', 'USA', 'Arrival'],
                flights: ['Air Canada', 'Air Canada(to USA)', 'Air Transat','Air Transat (to USA)', 'Sunwing', 'Qatar', 'RAM', 'Another'],

                isFlight: false,
                taxiNow: false,

                pickUpLocation: '',
                dropOffLocation: '',

                stopFirst: '',
                stopSecond: '',
                stopLast: '',

                icon:1,
                icon2:1,
                flight: '',
                bus: '',
                train:'',

                airline:'',
                airlineBack:'',
                departure: '',
                departure2:'',
                arrivalTime: '',

                date: today,
                time: '',
                tripType:'',

            },
            setDropOffLocation: (name) => set(state => ({ user: {...state.user, dropOffLocation: name }})),
            setPickUpLocation: (name) => set(state => ({ user: {...state.user, pickUpLocation: name }})),

            setStopFirst: (data) => set((state) => ({ user: {...state.user, stopFirst: data } })),
            setStopSecond: (data) => set((state) => ({ user: {...state.user, stopSecond: data } })),
            setStopLast: (data) => set((state) => ({ user: {...state.user, stopLast: data } })),
            
            setIcon: (data) => set((state) => ({ user: {...state.user, icon: data } })),
            setIcon2: (data) => set((state) => ({ user: {...state.user, icon2: data } })),

            setFlight: (data) => set((state) => ({ user: {...state.user, flight: data } })),
            setBus: (data) => set((state) => ({ user: {...state.user, bus: data } })),
            setTrain: (data) => set((state) => ({ user: {...state.user, train: data } })),

            setAirline: (data) => set((state) => ({ user: {...state.user, airline: data } })),
            setAirlineBack: (data) => set((state) => ({ user: {...state.user, airlineBack: data } })),

            setDeparture: (data) => set((state) => ({ user: {...state.user, departure: data } })),
            setDeparture2: (data) => set((state) => ({ user: {...state.user, departure2: data } })),
            setArrivalTime: (data) => set((state) => ({ user: {...state.user, arrivalTime: data } })),

            setDate: (data) => set((state) => ({ user: {...state.user, date: data } })),
            setTime: (data) => set((state) => ({ user: {...state.user, time: data } })),


            setTaxiNow: (data) => set((state) => {
                if(data) {
                    return ({user: {...state.user, date: today, time: timeNow, taxiNow: data}})
                } else return ( {user: {...state.user, taxiNow: data}}) 
            }),
            setTripType: (data) => set((state) => ({ user: {...state.user, tripType: data } })),
            setIsFlight: (data) => set((state) => ({ user: {...state.user, isFlight: data } })),
        }),
        {
            name: 'location'
        }
))