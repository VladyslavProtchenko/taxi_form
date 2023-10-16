import { create } from 'zustand'

interface IUser {
    isReturnTrip: boolean;
    isReturnFlight: boolean;

    from: string;
    to: string;

    stop1: string;
    stop2: string;
    stop3: string;

    date: string;
    time: string;

    flight: string;
    bus: string;
    train: string;


    tripType: string;
    airlines: string;
    departure:string;

    arrivalTime: string;

    
}
interface Store {
    returnTrip: IUser;
    setIsReturnTrip: (value: boolean) => void;

    setFrom: (trip:string) => void;
    setTo: (trip:string) => void;

    setStop1: (trip:string) => void;
    setStop2: (trip:string) => void;
    setStop3: (trip:string) => void;

    setDate: (trip:string) => void;
    setTime: (trip:string) => void;

    setDeparture: (trip:string) => void;
    setFlight: (trip:string) => void;
    setTripType: (trip:string) => void;
    setAirlines: (trip:string) => void;
    setArrivalTime: (trip:string) => void;

    setIsFlight: (trip:boolean) => void;
}
export const useReturnLocation = create<Store>((set) => ({
    returnTrip: {
        isReturnTrip: false,
        isReturnFlight: false,

        from: '',
        to: '',

        stop1: '',
        stop2: '',
        stop3: '',

        date:'',
        time: '',

        flight:'',
        bus:'',
        train:'',
        departure:'',
        tripType: '',
        arrivalTime: '',
        airlines:'',

    },
    

    setIsReturnTrip: (data) => set((state) => ({ returnTrip: {...state.returnTrip, isReturnTrip: data } })),

    setFrom: (data) => set((state) => ({ returnTrip: {...state.returnTrip, from: data } })),
    setTo: (data) => set((state) => ({ returnTrip: {...state.returnTrip, to: data } })),

    setStop1: (data) => set((state) => ({ returnTrip: {...state.returnTrip, stop1: data } })),
    setStop2: (data) => set((state) => ({ returnTrip: {...state.returnTrip, stop2: data } })),
    setStop3:  (data) => set((state) => ({ returnTrip: {...state.returnTrip, stop3: data } })),

    setDate: (data) => set((state) => ({ returnTrip: {...state.returnTrip, date: data } })),
    setTime: (data) => set((state) => ({ returnTrip: {...state.returnTrip, time: data } })),

    setDeparture: (data) => set((state) => ({ returnTrip: {...state.returnTrip, departure: data } })),
    setFlight: (data) => set((state) => ({ returnTrip: {...state.returnTrip, flight: data } })),
    setTripType: (data) => set((state) => ({ returnTrip: {...state.returnTrip, tripType: data } })),
    setAirlines: (data) => set((state) => ({ returnTrip: {...state.returnTrip, airlines: data } })),
    setArrivalTime: (data) => set((state) => ({ returnTrip: {...state.returnTrip, arrivalTime: data } })),

    setIsFlight: (data) => set((state) => ({ returnTrip: {...state.returnTrip, isReturnFlight: data } })),
}))