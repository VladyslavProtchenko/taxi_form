import { create } from 'zustand'
import dayjs from "dayjs";

const today = dayjs().format('DD/MM/YYYY');
const timeNow = dayjs().format('HH:mm');

interface IUser {
    date:string;
    time:string;
    taxiNow:boolean;

    defaultLocations:string[];
    tripList:string[];
    departureSections: string[];
    flights: string[];

    pickUpLocation: string;
    dropOffLocation: string;

    stopFirst:string;
    stopSecond:string;
    stopLast:string;


    airline:string;
    departureSection: string;
    tripType:string;
    flight:string;
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
    setDepartureSection: (section: string) => void;
    setFlight: (value: string) => void;  
    setTripType:(trip:string) => void;
    setAirline:(value: string) => void;
    setArrivalTime: (value: string) => void;
}
export const useLocation = create<Store>((set) => ({
    user: {
        defaultLocations: ['Airport - Montreal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Central Station( 895 Gauchetière Ouest)', 'Train - Dorval Station', 'Bus - Central Station( 1717 Rue Berri)',],

        tripList:['Business (need receipt)', 'Vacation', 'Else'],
        departureSections: ['Departure (Domestic)', 'Departure (International)', 'Departure (USA)', 'Arrival'],
        flights: ['Air Canada', 'Air Canada(to USA)', 'Air Transat','Air Transat (to USA)', 'Sunwing', 'Qatar', 'RAM', 'Another'],


        pickUpLocation: '',
        dropOffLocation: '',

        stopFirst: '',
        stopSecond: '',
        stopLast: '',

        airline:'',
        departureSection: '',
        flight: '',
        arrivalTime: '',


        date: today,
        time: '',
        taxiNow: false,
        tripType:'',
    },
    
    setDropOffLocation: (name) => set(state => ({ user: {...state.user, dropOffLocation: name }})),
    setPickUpLocation: (name) => set(state => ({ user: {...state.user, pickUpLocation: name }})),

    setStopFirst: (data) => set((state) => ({ user: {...state.user, stopFirst: data } })),
    setStopSecond: (data) => set((state) => ({ user: {...state.user, stopSecond: data } })),
    setStopLast: (data) => set((state) => ({ user: {...state.user, stopLast: data } })),
    
    setAirline: (data) => set((state) => ({ user: {...state.user, airline: data } })),
    setDepartureSection: (data) => set((state) => ({ user: {...state.user, departureSection: data } })),
    setFlight: (data) => set((state) => ({ user: {...state.user, flight: data } })),
    setArrivalTime: (data) => set((state) => ({ user: {...state.user, arrivalTime: data } })),

    setDate: (data) => set((state) => ({ user: {...state.user, date: data } })),
    setTime: (data) => set((state) => ({ user: {...state.user, time: data } })),
    setTaxiNow: (data) => set((state) => {
        if(data) {
            return ({user: {...state.user, date: today, time: timeNow, taxiNow: data}})
        } else return ( {user: {...state.user, taxiNow: data}}) 
    }),
    setTripType: (data) => set((state) => ({ user: {...state.user, tripType: data } })),
}))