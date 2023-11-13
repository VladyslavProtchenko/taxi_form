import { create } from 'zustand'

export interface IUser {
    isReturnTrip: boolean;

    from: string;
    to: string;

    stops: {
        [key:number] : string;
    },

    date: string;
    time: string;

    icon:number;
    icon2:number;
    flight: string;
    flight2: string;

    airline: string;
    airlineBack: string;
    departure:string;
    departure2:string;

}
export interface IStore {
    returnTrip: IUser;
    setIsReturnTrip: (value: boolean) => void;

    setFrom: (trip:string) => void;
    setTo: (trip:string) => void;

    setStops: (trip:{
        [key:number] : string;
    }) => void;


    setDate: (trip:string) => void;
    setTime: (trip:string) => void;

    setDeparture: (trip:string) => void;
    setDeparture2: (trip:string) => void;
    setIcon: (trip:number) => void;
    setIcon2: (trip:number) => void;
    setFlight: (trip:string) => void;
    setFlight2: (trip:string) => void;
    setAirlines: (trip:string) => void;
    setAirlinesBack: (trip:string) => void;

    resetReturn: () => void;
}
export const useReturnLocation = create<IStore>()(
    (set) => ({
        returnTrip: {
            isReturnTrip: false,

            from: '',
            to: '',

            stops: {},

            date:'',
            time: '',

            icon: 0,
            icon2: 0,
            flight:'',
            flight2:'',
            bus:'',
            train:'',
            departure:'',
            departure2:'',
            airline:'',
            airlineBack:'',

        },
        setIsReturnTrip: (data) => set((state) => ({ returnTrip: {...state.returnTrip, isReturnTrip: data } })),

        setFrom: (data) => set((state) => ({ returnTrip: {...state.returnTrip, from: data } })),
        setTo: (data) => set((state) => ({ returnTrip: {...state.returnTrip, to: data } })),

        setStops: (data) => set((state) => ({ returnTrip: {...state.returnTrip, stops: data } })),

        setDate: (data) => set((state) => ({ returnTrip: {...state.returnTrip, date: data } })),
        setTime: (data) => set((state) => ({ returnTrip: {...state.returnTrip, time: data } })),

        setDeparture: (data) => set((state) => ({ returnTrip: {...state.returnTrip, departure: data } })),
        setDeparture2: (data) => set((state) => ({ returnTrip: {...state.returnTrip, departure2: data } })),

        setIcon: (data) => set((state) => ({ returnTrip: {...state.returnTrip, icon: data } })),
        setIcon2: (data) => set((state) => ({ returnTrip: {...state.returnTrip, icon2: data } })),
        setFlight: (data) => set((state) => ({ returnTrip: {...state.returnTrip, flight: data } })),
        setFlight2: (data) => set((state) => ({ returnTrip: {...state.returnTrip, flight2: data } })),
        setAirlines: (data) => set((state) => ({ returnTrip: {...state.returnTrip, airline: data } })),
        setAirlinesBack: (data) => set((state) => ({ returnTrip: {...state.returnTrip, airlineBack: data } })),

        resetReturn: () => set((state) => ({ returnTrip: {
            isReturnTrip: state.returnTrip.isReturnTrip,

            from: '',
            to: '',

            stops: {},

            date:'',
            time: '',

            icon: 0,
            icon2: 0,
            flight:'',
            flight2:'',
            bus:'',
            train:'',
            departure:'',
            departure2:'',
            airline:'',
            airlineBack:'',
        }})),
    }
))