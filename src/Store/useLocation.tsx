import { create } from 'zustand'

import dayjs from "dayjs";

const today = dayjs().format('DD/MM/YYYY');
const timeNow = dayjs().format('HH:mm');

export interface IUser {
    date:string;
    time:string;
    dateNow:boolean;

    from: string;
    to: string;

    stops: {
        [key:number] : string;
    };

    icon: number;
    icon2: number;

    flight:string;
    flight2:string;


    airline:string;
    airlineBack:string;

    departure: string;
    departure2: string;
    tripType:string;
}
export interface IStore {
    user: IUser;
    
    setDate:(value: string) => void;
    setTime:(value: string) => void;
    setDateNow: (value: boolean) => void;

    setFrom: (address: string) => void;
    setTo: (address: string) => void;

    setStops: (value: {
        [key:number] : string;
    }) => void;

    setDeparture: (section: string) => void;
    setDeparture2: (section: string) => void;

    setIcon: (value: number) => void;
    setIcon2: (value: number) => void;

    setFlight: (value: string) => void;
    setFlight2: (value: string) => void;

    setTripType?:(trip:string) => void;
    setAirline:(value: string) => void;
    setAirlineBack:(value: string) => void;

    resetLocation: () => void;
}
export const useLocation = create<IStore>()(
            (set) => ({
            user: {

                dateNow: true,

                from: '',
                to: '',

                stops: {},

                icon:0,
                icon2:0,
                flight: '',
                flight2: '',


                airline:'',
                airlineBack:'',
                departure: '',
                departure2:'',

                date: today,
                time: timeNow,
                tripType:'',

            },
            setTo: (name) => set(state => ({ user: {...state.user, to: name }})),
            setFrom: (name) => set(state => ({ user: {...state.user, from: name }})),

            setStops: (data) => set((state) => ({ user: {...state.user, stops:data } })),
            
            setIcon: (data) => set((state) => ({ user: {...state.user, icon: data } })),
            setIcon2: (data) => set((state) => ({ user: {...state.user, icon2: data } })),

            setFlight: (data) => set((state) => ({ user: {...state.user, flight: data } })),
            setFlight2: (data) => set((state) => ({ user: {...state.user, flight2: data } })),

            setAirline: (data) => set((state) => ({ user: {...state.user, airline: data } })),
            setAirlineBack: (data) => set((state) => ({ user: {...state.user, airlineBack: data } })),

            setDeparture: (data) => set((state) => ({ user: {...state.user, departure: data } })),
            setDeparture2: (data) => set((state) => ({ user: {...state.user, departure2: data } })),

            setDate: (data) => set((state) => ({ user: {...state.user, date: data } })),
            setTime: (data) => set((state) => ({ user: {...state.user, time: data } })),


            setDateNow: (data) => set((state) => {
                if(data) {
                    return ({user: {...state.user, date: today, time: timeNow, dateNow: data}})
                } else return ( {user: {...state.user, dateNow: data}}) 
            }),
            setTripType: (data) => set((state) => ({ user: {...state.user, tripType: data } })),
            resetLocation: () => set(() => ({ user: {
                tripList:['Business (need receipt)', 'Vacation', 'Else'],
                departureSections: ['Domestic', 'International', 'USA', 'Arrival'],
                flights: ['Air Canada', 'Air Canada(to USA)', 'Air Transat','Air Transat (to USA)', 'Sunwing', 'Qatar', 'RAM', 'Another'],

                dateNow: true,

                from: '',
                to: '',

                stops: {},

                icon:0,
                icon2:0,
                flight: '',
                flight2: '',

                airline:'',
                airlineBack:'',
                departure: '',
                departure2:'',

                date: today,
                time: timeNow,
                tripType:'',

            }})),
        }
))