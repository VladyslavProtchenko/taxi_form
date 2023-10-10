import { create } from 'zustand'

interface IUser {
    isReturnTrip: boolean;

    retPickUpLocation: string;
    retDropOffLocation: string;

    retStopFirst: string;
    retStopSecond: string;
    retStopLast: string;

    retDate: string;
    retTime: string;

    retTripType: string;
    retDepartureSection: string;
    retAirlines: string;
    retFlight: string;
}
interface Store {
    user: IUser;
    setIsReturnTrip: (value: boolean) => void;

    setRetPickUpLocation: (trip:string) => void;
    setRetDropOffLocation: (trip:string) => void;

    setRetStopFirst: (trip:string) => void;
    setRetStopSecond: (trip:string) => void;
    setRetStopLast: (trip:string) => void;

    setRetDate: (trip:string) => void;
    setRetTime: (trip:string) => void;

    setRetDepartureSection: (trip:string) => void;
    setRetFlight: (trip:string) => void;
    setRetTripType: (trip:string) => void;
    setRetAirlines: (trip:string) => void;
}
export const useReturnLocation = create<Store>((set) => ({
    user: {
        isReturnTrip: false,

        retPickUpLocation: '',
        retDropOffLocation: '',

        retStopFirst: '',
        retStopSecond: '',
        retStopLast: '',

        retDate:'',
        retTime: '',

        retDepartureSection:'',
        retFlight:'',
        retTripType: '',
        retAirlines:''
    },
    


    setIsReturnTrip: (data) => set((state) => ({ user: {...state.user, isReturnTrip: data } })),

    setRetPickUpLocation: (data) => set((state) => ({ user: {...state.user, retPickUpLocation: data } })),
    setRetDropOffLocation: (data) => set((state) => ({ user: {...state.user, retDropOffLocation: data } })),

    setRetStopFirst: (data) => set((state) => ({ user: {...state.user, retStopFirst: data } })),
    setRetStopSecond: (data) => set((state) => ({ user: {...state.user, retStopSecond: data } })),
    setRetStopLast:  (data) => set((state) => ({ user: {...state.user, retStopLast: data } })),

    setRetDate: (data) => set((state) => ({ user: {...state.user, retDate: data } })),
    setRetTime: (data) => set((state) => ({ user: {...state.user, retTime: data } })),

    setRetDepartureSection: (data) => set((state) => ({ user: {...state.user, retDepartureSection: data } })),
    setRetFlight: (data) => set((state) => ({ user: {...state.user, retFlight: data } })),
    setRetTripType: (data) => set((state) => ({ user: {...state.user, retTripType: data } })),
    setRetAirlines: (data) => set((state) => ({ user: {...state.user, retAirlines: data } })),
}))