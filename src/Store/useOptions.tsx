import { create } from 'zustand'


interface IPassengers {
    adults: number;
    kids: {
        id: number,
        age: number,
    }[],
    babies: number
}
interface IPet {
    title: string,
    cage: boolean,
    isActive: boolean
}

interface IItem {
    title: string,
    quantity: number,
    isActive: boolean
}

interface IStore {
    carType: string;
    passengers: IPassengers;
    baggage: IItem[];
    sport: IItem[];
    pets: IPet[];
    carSeats: IItem[];
}
interface Store {
    options: IStore;
    setCarType:(value: string) => void;
    setPassengers:(value: IPassengers) => void;
    setBaggage:(value: IItem[]) => void;
    setSport:(value: IItem[]) => void;
    setPets:(value: IPet[]) => void;
    setCarSeats:(value: IItem[]) => void;
    resetOptions:() => void;
}
export const useOptions = create<Store>((set) => ({
    options: {
        carType: 'sedan (max 4)',
        passengers:{
            adults:1,
            kids:[],
            babies:0,
        },
        baggage: [
            {
                title: '32 kg',
                quantity: 1,
                isActive: false,
            },
            {
                title: '23 kg',
                quantity: 0,
                isActive: true,
            },
            {
                title: 'middle',
                quantity: 1,
                isActive: false,
            },
            {
                title: '10 kg',
                quantity: 1,
                isActive: false,
            },
            {
                title: '8.5 kg',
                quantity: 1,
                isActive: false,
            }
        ],
        sport:[
            {
                title: 'Bikes',
                quantity: 0,
                isActive: true,
            },
            {
                title: 'Skis',
                quantity: 1,
                isActive: false,
            },
            {
                title: 'Golf',
                quantity: 1,
                isActive: false,
            },
            {
                title: 'Surf',
                quantity: 1,
                isActive: false,
            },
        ],
        carSeats: [
            {
                title: 'Baby seat',
                quantity: 0,
                isActive: true,
            },
            {
                title: 'Umbrella stroller',
                quantity: 1,
                isActive: false,
            },
            {
                title: 'Regular stroller',
                quantity: 1,
                isActive: false,
            },
            {
                title: 'Booster seat',
                quantity: 1,
                isActive: false,
            },
        ],
        pets: [
            {
                title: 'Dog',
                cage: false,
                isActive: true,
            },
            {
                title: 'Cat',
                cage: false,
                isActive: false
            },
            {
                title: 'Rabbit',
                cage: false,
                isActive: false
            },
            {
                title: 'Other',
                cage: false,
                isActive: false
            },
        ]
    },
    setCarType: (data) => set((state) => ({ options: {...state.options, carType: data } })),
    setPassengers: (data) => set((state) => ({ options: {...state.options, passengers: data } })),
    setBaggage: (data) => set((state) => ({ options: {...state.options, baggage: data } })),
    setSport: (data) => set((state) => ({ options: {...state.options, sport: data } })),
    setPets: (data) => set((state) => ({ options: {...state.options, pets: data } })),
    setCarSeats: (data) => set((state) => ({ options: {...state.options, carSeats: data } })),
    resetOptions:() => set(() => ({ options:
        {
            carType: 'sedan (max 4)',
            passengers:{
                adults:1,
                kids:[],
                babies:0,
            },
            baggage: [
                {
                    title: '32 kg',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: '23 kg',
                    quantity: 0,
                    isActive: true,
                },
                {
                    title: 'middle',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: '10 kg',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: '8.5 kg',
                    quantity: 1,
                    isActive: false,
                }
            ],
            sport:[
                {
                    title: 'Bikes',
                    quantity: 0,
                    isActive: true,
                },
                {
                    title: 'Skis',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: 'Golf',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: 'Surf',
                    quantity: 1,
                    isActive: false,
                },
            ],
            carSeats: [
                {
                    title: 'Baby seat',
                    quantity: 0,
                    isActive: true,
                },
                {
                    title: 'Umbrella stroller',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: 'Regular stroller',
                    quantity: 1,
                    isActive: false,
                },
                {
                    title: 'Booster seat',
                    quantity: 1,
                    isActive: false,
                },
            ],
            pets: [
                {
                    title: 'Dog',
                    cage: false,
                    isActive: true,
                },
                {
                    title: 'Cat',
                    cage: false,
                    isActive: false
                },
                {
                    title: 'Rabbit',
                    cage: false,
                    isActive: false
                },
                {
                    title: 'Other',
                    cage: false,
                    isActive: false
                },
            ]
        },
    })),
}))