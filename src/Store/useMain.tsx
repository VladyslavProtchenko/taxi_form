import dayjs from 'dayjs';
import { create } from 'zustand';

export interface IPet {
    isOther?: boolean;
    title: string,
    cage: boolean,
    quantity: number,
}


interface IItem {
    title: string,
    quantity: number,
}

export interface ITaxi {
    id: number;
    filled: boolean;
    timeType: number;
    timeTypeR: number;
    type: number;
    validation:number;
    isEdit: boolean;
    isReset: {[key:number]: boolean};

    name: string;
    name2: string;
    name3: string;

    title: string;
    title2: string;
    title3: string;

    email: string;
    email2: string;
    email3: string;

    phone: string;
    phone2: string;
    phone3: string;

    date: string;
    time: string;
    dateNow: boolean;

    //trip information
    from: string;
    to: string;

    stops: { [key: number]: string; };

    icon: number;
    icon2: number;

    flight: {
        title: string;
        prefix: string;
        number: string;
    };
    flight2: {
        title: string;
        prefix: string;
        number: string;
    };

    airlines: string;
    airlinesBack: string;

    departure: string;
    departure2: string;
    tripType: string;

    paymentMethod: string;
    additionalText: string;

    //return trip information
    isReturnStatus: boolean;
    isReturnTrip: boolean;

    fromR: string;
    toR: string;

    stopsR: {
        [key: number]: string;
    },

    dateR: string;
    timeR: string;

    iconR: number;
    icon2R: number;
    flightR: {
        title: string;
        prefix: string;
        number: string;
    };
    flight2R: {
        title: string;
        prefix: string;
        number: string;
    };

    airlinesR: string;
    airlinesBackR: string;
    departureR: string;
    departure2R: string;

    //options information
    carType: number;
    adults: number;
    kids: number[],
    babies: number
    baggage: IItem[];
    sport: IItem[];
    pets: IPet[];
    carSeats: IItem[];
    steps: number;
}

interface IStore {
    day: boolean;
    isFrench: boolean;
    submit: boolean;
    infoOpen: boolean;

    isCars: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
    }
    activeCarId: number;
    list: ITaxi[];
    //info methods
    setDay: (value: boolean) => void;
    setInfoOpen: (value: boolean) => void;
    setType: (value: number) => void;
    setIsFrench: (value: boolean) => void;
    setActiveCarId: (value: number) => void;
    setFilled: (value: boolean, id: number) => void;
    setTimeType: (value: number) => void;
    setTimeTypeR: (value: number) => void;
    setIsCars: (data: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean
    }) => void;
    addNewCar: () => void;
    removeCar: (id: number) => void;
    setSubmit: (value: boolean) => void;
    setValidation: (value: number) => void;
    setTitle: (value: string) => void;
    setTitle2: (value: string) => void;
    setTitle3: (value: string) => void;

    setName: (name: string) => void;
    setName2: (name: string) => void;
    setName3: (name: string) => void;

    setEmail: (email: string) => void;
    setEmail2: (email: string) => void;
    setEmail3: (email: string) => void;

    setPhone: (phone: string) => void;
    setPhone2: (phone: string) => void;
    setPhone3: (phone: string) => void;

    setPaymentMethod: (method: string) => void;
    setAdditionalText: (text: string) => void;
    resetForm: () => void;
    restoreForm: () => void;

    reset1: () => void;
    reset2: () => void;
    reset3: () => void;
    reset4: () => void;
    reset5: () => void;
    reset6: () => void;

    restore1: () => void;
    restore2: () => void;
    restore3: () => void;
    restore4: () => void;
    restore5: () => void;
    restore6: () => void;

    //trip data methods
    setDate: (value: string) => void;
    setTime: (value: string) => void;
    setDateNow: (value: boolean) => void;

    setFrom: (data: string) => void;
    setTo: (data: string) => void;

    setStops: (value: {
        [key: number]: string;
    }) => void;

    setDeparture: (section: string) => void;
    setDeparture2: (section: string) => void;

    setIcon: (value: number) => void;
    setIcon2: (value: number) => void;

    setFlight: (value: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setFlight2: (value: {
        title: string;
        prefix: string;
        number: string;
    }) => void;

    setTripType?: (trip: string) => void;
    setAirlines: (value: string) => void;
    setAirlinesBack: (value: string) => void;

    resetLocation: () => void;

    // return trip methods
    setIsReturnTrip: (value: boolean) => void;

    setFromR: (trip: string) => void;
    setToR: (trip: string) => void;

    setStopsR: (trip: {
        [key: number]: string;
    }) => void;


    setDateR: (trip: string) => void;
    setTimeR: (trip: string) => void;

    setDepartureR: (trip: string) => void;
    setDeparture2R: (trip: string) => void;
    setIconR: (trip: number) => void;
    setIcon2R: (trip: number) => void;
    setFlightR: (trip: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setFlight2R: (trip: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setAirlinesR: (trip: string) => void;
    setAirlinesBackR: (trip: string) => void;

    resetReturn: () => void;

    //options methods
    setCarType: (value: number) => void;
    setAdults: (value: number) => void;
    setKids: (value: number[]) => void;
    setBabies: (value: number) => void;
    setBaggage: (value: IItem[]) => void;
    setSport: (value: IItem[]) => void;
    setPets: (value: IPet[]) => void;
    setCarSeats: (value: IItem[]) => void;
    setIsReturnStatus: (value: boolean) => void;
    setIsEdit: (value: boolean) => void;
    setList: (value: ITaxi[]) => void;

    //steps 
    setSteps: (value: number) => void;
}

export const useMain = create<IStore>()(
    (set) => ({
        day: true,
        isFrench: false,
        infoOpen: false,
        isCars: {
            1: false, 2: false, 3: false, 4: false, 5: false,
        },
        activeCarId: 1,
        submit: false,
        list: [
            {
                id: 1,
                type: 1,
                timeType: 0,
                timeTypeR: 0,
                filled: false,
                validation:0,
                isEdit: false,
                isReset: {1:false, 2:false, 3:false, 4:false, 5:false, 6:false },
                name: '',
                name2: '',
                name3: '',

                title: '',
                title2: '',
                title3: '',

                email:'@',
                email2:'@',
                email3:'@',

                phone: '',
                phone2: '',
                phone3: '',

                date: '', 
                time: dayjs().format('hh:mm'), 
                dateNow: true,

                //trip information
                from: '', to: '',

                stops: {
                    1: '', 2: '', 3: '', 4: '',
                },

                icon: 0, icon2: 0,

                airlines: '', airlinesBack: '',
                flight: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2: {
                    title: '',
                    prefix: '',
                    number: '',
                },

                departure: '', departure2: '',

                tripType: 'Vacation', paymentMethod: 'Cash',
                additionalText: '',

                //return trip information
                isReturnTrip: false,
                isReturnStatus:false,

                fromR: '', toR: '',

                stopsR: {
                    1: '', 2: '', 3: '', 4: '',
                },

                dateR: '', timeR: '',

                iconR: 0, icon2R: 0,
                flightR: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2R: {
                    title: '',
                    prefix: '',
                    number: '',
                },

                airlinesR: '', airlinesBackR: '',
                departureR: '', departure2R: '',

                //options information
                carType: 1,

                adults: 1, kids: [], babies: 0,

                baggage: [
                    { title: '32 kg', quantity: 0, },
                    { title: '23 kg', quantity: 0, },
                    { title: 'Between', quantity: 0, },
                    { title: '10 kg', quantity: 0, },
                    { title: '8 kg', quantity: 0, }
                ],
                sport: [
                    { title: 'Bikes', quantity: 0, },
                    { title: 'Skis', quantity: 0, },
                    { title: 'Golf', quantity: 0, },
                    { title: 'Surf', quantity: 0, },
                ],
                carSeats: [
                    {
                        title: 'Regular',
                        quantity: 0,
                    },
                    {
                        title: 'Babi',
                        quantity: 0,
                    },
                    {
                        title: 'Booster',
                        quantity: 0,
                    },
                    {
                        title: 'Regular stroller',
                        quantity: 0,
                    },
                    {
                        title: 'Umbrella',
                        quantity: 0,
                    },
                    {
                        title: 'Double',
                        quantity: 0,
                    },
                    {
                        title: 'Wheelchair',
                        quantity: 0,
                    },
                ],
                pets: [
                    { title: 'Dog', cage: false, quantity: 0, },
                    { title: 'Cat', cage: false, quantity: 0 },
                    { title: 'Rabbit', cage: false, quantity: 0 },
                    { title: 'Service dog (Mira)', cage: false, quantity: 0 },
                    { title: 'Other', cage: false, quantity: 0, isOther: true, },
                ],
                steps:0,
            }
        ],
        addNewCar:() => {
            set((state)=>({
                ...state,
                list:[...state.list, {...state.list[state.list.length-1], id: (state.list[state.list.length-1].id+1), isEdit: false, filled: false } ]
            }))
        },
        removeCar:(id) =>  set((state)=>({...state, list:state.list.filter(item => item.id !== id)})),

        setList:(data) => {
            const res = data.map((item,index)=> { return {...item, id: (index+1)} })
            set((state)=>({...state, list:res}))
        },

        setDay: (data) => set((state) => ({ ...state, day: data })),
        setInfoOpen: (data) => set((state) => ({ ...state, infoOpen: data })),
        setSubmit: (data) => set((state) => ({ ...state, submit: data })),
        setType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, type: data } : item) })),
        setValidation: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, validation: data } : item) })),
        setIsEdit: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, isEdit: data } : item) })),

        setIsFrench: (data) => set((state) => ({ ...state, isFrench: data })),
        setActiveCarId: (data) => set((state) => ({ ...state, activeCarId: data })),
        setIsCars: (data) => set((state) => ({ ...state, isCars: data })),
        setTimeType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeType: data } : item) })),
        setTimeTypeR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeTypeR: data } : item) })),
        setFilled: (data, id) => set((state) => ({ ...state, list: state.list.map(item => item.id === id ? { ...item, filled: data } : item) })),


        //info methods

        setTitle: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title: data } : item) })),
        setTitle2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title2: data } : item) })),
        setTitle3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title3: data } : item) })),

        setName: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name: data } : item) })),
        setName2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name2: data } : item) })),
        setName3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name3: data } : item) })),

        setEmail: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email: data } : item) })),
        setEmail2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email2: data } : item) })),
        setEmail3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email3: data } : item) })),

        setPhone: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone: data } : item) })),
        setPhone2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone2: data } : item) })),
        setPhone3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone3: data } : item) })),

        setPaymentMethod: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, paymentMethod: data } : item) })),
        setAdditionalText: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, additionalText: data } : item) })),
        resetForm: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    type: 1,
                    timeType: 0,
                    timeTypeR: 0,
                    filled: false,
                    validation:0,
                    isEdit: false,
                    isReset: { 1:true, 2:true, 3:true, 4:true, 5:true, 6:true },
                    name: '',
                    name2: '',
                    name3: '',
    
                    title: '',
                    title2: '',
                    title3: '',
    
                    email:'@',
                    email2:'@',
                    email3:'@',
    
                    phone: '',
                    phone2: '',
                    phone3: '',
    
                    date: '',
                    time: '', 
                    dateNow: true,
    
                    //trip information
                    from: ''
                    , to: '',
    
                    stops: {
                        1: '',
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    icon: 0, 
                    icon2: 0,
    
                    airlines: '', 
                    airlinesBack: '',
                    flight: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    departure: '', 
                    departure2: '',
    
                    tripType: 'Vacation', 
                    paymentMethod: 'Cash',
                    additionalText: '',
    
                    //return trip information
                    isReturnTrip: false,
                    isReturnStatus:false,
    
                    fromR: '', 
                    toR: '',
    
                    stopsR: {
                        1: '', 
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    dateR: '', 
                    timeR: '',
    
                    iconR: 0, icon2R: 0,
                    flightR: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2R: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    airlinesR: '', airlinesBackR: '',
                    departureR: '', departure2R: '',
    
                    //options information
                    carType: 1,
    
                    adults: 1, kids: [], babies: 0,
    
                    baggage: [
                        { title: '32 kg', quantity: 0, },
                        { title: '23 kg', quantity: 0, },
                        { title: 'Between', quantity: 0, },
                        { title: '10 kg', quantity: 0, },
                        { title: '8 kg', quantity: 0, }
                    ],
                    sport: [
                        { title: 'Bikes', quantity: 0, },
                        { title: 'Skis', quantity: 0, },
                        { title: 'Golf', quantity: 0, },
                        { title: 'Surf', quantity: 0, },
                    ],
                    carSeats: [
                        {
                            title: 'Regular',
                            quantity: 0,
                        },
                        {
                            title: 'Babi',
                            quantity: 0,
                        },
                        {
                            title: 'Booster',
                            quantity: 0,
                        },
                        {
                            title: 'Regular stroller',
                            quantity: 0,
                        },
                        {
                            title: 'Umbrella',
                            quantity: 0,
                        },
                        {
                            title: 'Double',
                            quantity: 0,
                        },
                        {
                            title: 'Wheelchair',
                            quantity: 0,
                        },
                    ],
                    pets: [
                        { title: 'Dog', cage: false, quantity: 0, },
                        { title: 'Cat', cage: false, quantity: 0 },
                        { title: 'Rabbit', cage: false, quantity: 0 },
                        { title: 'Service dog (Mira)', cage: false, quantity: 0 },
                        { title: 'Other', cage: false, quantity: 0, isOther: true, },
                    ],
                    steps:item.steps,
                } : item)
        })),
        restoreForm: () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? {
                ...state.list[0],
                id:state.activeCarId,
                isReset: { 1:false, 2:false, 3:false, 4:false, 5:false, 6:false },
                filled:false,
                steps:  state.list[state.activeCarId-1].steps,
            }
            : item
        )})),
        reset1: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    filled: false,
                    isReset: { ...item.isReset, 1:true },
                    name: '',
                    name2: '',
                    name3: '',
    
                    title: '',
                    title2: '',
                    title3: '',
    
                    email:'@',
                    email2:'@',
                    email3:'@',
    
                    phone: '',
                    phone2: '',
                    phone3: '',

                    steps:item.steps,
                } : item)
        })),

        reset2: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    filled: false,
                    isReset: { ...item.isReset, 2: true },

                    date: '',
                    time: '', 
                    dateNow: true,
    
                    //trip information
                    from: ''
                    , to: '',
    
                    stops: {
                        1: '',
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    icon: 0, 
                    icon2: 0,
    
                    airlines: '', 
                    airlinesBack: '',
                    flight: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    departure: '', 
                    departure2: '',
    
                    //return trip information
                    isReturnTrip: false,
                    isReturnStatus:false,
    
                    fromR: '', 
                    toR: '',
    
                    stopsR: {
                        1: '', 
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    dateR: '', 
                    timeR: '',
    
                    iconR: 0, icon2R: 0,
                    flightR: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2R: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    airlinesR: '', airlinesBackR: '',
                    departureR: '', departure2R: '',

                    steps:item.steps,
                } : item)
        })),

        reset3: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    filled: false,
                    isReset: { ...item.isReset, 3: true},

                    fromR: '', 
                    toR: '',
    
                    stopsR: {
                        1: '', 
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    dateR: '', 
                    timeR: '',
    
                    iconR: 0, icon2R: 0,
                    flightR: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2R: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    airlinesR: '', 
                    airlinesBackR: '',
                    departureR: '', 
                    departure2R: '',

                    steps:item.steps,
                } : item)
        })),

        reset4: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,

                    filled: false,
                    isReset: { ...item.isReset, 4: true },
                    //options information
                    carType: 1,
                    adults: 1, kids: [], babies: 0,
    
                    baggage: [
                        { title: '32 kg', quantity: 0, },
                        { title: '23 kg', quantity: 0, },
                        { title: 'Between', quantity: 0, },
                        { title: '10 kg', quantity: 0, },
                        { title: '8 kg', quantity: 0, }
                    ],

                    steps:item.steps,
                } : item)
        })),

        reset5: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    filled: false,
                    isReset: { ...item.isReset, 5: true },

                    carSeats: [
                        {
                            title: 'Regular',
                            quantity: 0,
                        },
                        {
                            title: 'Babi',
                            quantity: 0,
                        },
                        {
                            title: 'Booster',
                            quantity: 0,
                        },
                        {
                            title: 'Regular stroller',
                            quantity: 0,
                        },
                        {
                            title: 'Umbrella',
                            quantity: 0,
                        },
                        {
                            title: 'Double',
                            quantity: 0,
                        },
                        {
                            title: 'Wheelchair',
                            quantity: 0,
                        },
                    ],
                    steps:item.steps,
                } : item)
        })),
        reset6: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId 
                ? 
                {   ...item,
                    id: state.activeCarId,
                    filled: false,
                    isReset: { ...item.isReset, 5: true },
                    sport: [
                        { title: 'Bikes', quantity: 0, },
                        { title: 'Skis', quantity: 0, },
                        { title: 'Golf', quantity: 0, },
                        { title: 'Surf', quantity: 0, },
                    ],
                    pets: [
                        { title: 'Dog', cage: false, quantity: 0, },
                        { title: 'Cat', cage: false, quantity: 0 },
                        { title: 'Rabbit', cage: false, quantity: 0 },
                        { title: 'Service dog (Mira)', cage: false, quantity: 0 },
                        { title: 'Other', cage: false, quantity: 0, isOther: true, },
                    ],
                    steps:item.steps,
                } : item)
        })),

        restore1 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? {   
                ...item,
                filled: false,
                isReset: { ...item.isReset, 1:false },
                name: state.list[0].name,
                name2:  state.list[0].name2,
                name3:  state.list[0].name3,

                title:  state.list[0].title,
                title2:  state.list[0].title2,
                title3:  state.list[0].title3,

                email: state.list[0].email,
                email2: state.list[0].email2,
                email3: state.list[0].email3,

                phone:  state.list[0].phone,
                phone2:  state.list[0].phone2,
                phone3: state.list[0].phone3,

                steps:item.steps,
            } 
            : item
        )})),

        restore2 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? 
            {   ...item,
                filled: false,
                isReset: { ...item.isReset, 2: false },

                date: state.list[0].date,
                time: state.list[0].time, 
                dateNow: state.list[0].dateNow,

                //trip information
                from: state.list[0].from,
                to: state.list[0].to,

                stops: state.list[0].date,

                icon: state.list[0].icon, 
                icon2: state.list[0].icon2,

                airlines: state.list[0].airlines, 
                airlinesBack: state.list[0].airlinesBack,
                flight: state.list[0].flight,
                flight2: state.list[0].flight2,

                departure: state.list[0].departure, 
                departure2: state.list[0].departure2,

                //return trip information
                isReturnTrip: state.list[0].isReturnTrip,
                isReturnStatus:state.list[0].isReturnStatus,

                fromR: state.list[0].fromR, 
                toR: state.list[0].toR,

                stopsR: state.list[0].stopsR,

                dateR: state.list[0].dateR, 
                timeR: state.list[0].timeR,

                iconR: state.list[0].iconR,
                icon2R: state.list[0].icon2R,
                flightR: state.list[0].flightR,
                flight2R: state.list[0].flight2R,

                airlinesR: state.list[0].airlinesR,
                airlinesBackR: state.list[0].airlinesBackR,
                departureR: state.list[0].departureR,
                departure2R: state.list[0].departure2R,
                steps:item.steps,

            }
            : item
        )})),

        restore3 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? 
            {   ...item,
                filled: false,
                isReset: { ...item.isReset, 3: false },
                isReturnTrip: state.list[0].isReturnTrip,
                isReturnStatus:state.list[0].isReturnStatus,

                fromR: state.list[0].fromR, 
                toR: state.list[0].toR,

                stopsR: state.list[0].stopsR,

                dateR: state.list[0].dateR, 
                timeR: state.list[0].timeR,

                iconR: state.list[0].iconR,
                icon2R: state.list[0].icon2R,
                flightR: state.list[0].flightR,
                flight2R: state.list[0].flight2R,

                airlinesR: state.list[0].airlinesR,
                airlinesBackR: state.list[0].airlinesBackR,
                departureR: state.list[0].departureR,
                departure2R: state.list[0].departure2R,
                steps:item.steps,
            }
            : item
        )})),

        restore4 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? 
            {   ...item,
                filled: false,
                isReset: { ...item.isReset, 4: false },
                carType: state.list[0].carType,
                adults: state.list[0].adults, 
                kids: state.list[0].kids, 
                babies: state.list[0].babies,
    
                baggage: state.list[0].baggage,
                steps:item.steps,
            }
            : item
        )})),

        restore5 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? 
            {   ...item,
                filled: false,
                isReset: { ...item.isReset, 5: false },
                carSeats: state.list[0].carSeats,
                steps:item.steps,
            }
            : item
        )})),
        restore6 : () => set((state) => ({...state, list: state.list.map(item=> item.id === state.activeCarId
            ? 
            {   ...item,
                filled: false,
                isReset: { ...item.isReset, 6: false },
                sport: state.list[0].sport,
                pets: state.list[0].pets,
                steps:item.steps,
            }
            : item
        )})),

        //trip methods 

        setFrom: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, from: data } : item) })),
        setTo: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, to: data } : item) })),
        setStops: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, stops: data } : item) })),

        setDate: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, date: data } : item) })),
        setTime: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, time: data } : item) })),
        setDateNow: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, dateNow: data } : item) })),


        setIcon: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon: data } : item) })),
        setIcon2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon2: data } : item) })),

        setDeparture: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure: data } : item) })),
        setDeparture2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure2: data } : item) })),


        setFlight: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight: data } : item) })),
        setFlight2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight2: data } : item) })),
        setTripType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, tripType: data } : item) })),
        setAirlines: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlines: data } : item) })),
        setAirlinesBack: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlineBacks: data } : item) })),

        resetLocation: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId ? {
                ...item,
                from: '',
                to: '',

                stops: {
                    1: '', 2: '', 3: '', 4: '',
                },

                icon: 0, icon2: 0,
                flight: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                airlines: '', airlinesBack: '',
                departure: '', departure2: '',
                tripType: '',

                paymentMethod: '',
                additionalText: '',
            } : item)
        })),

        //return trip methods 
        setIsReturnTrip: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, isReturnTrip: data } : item) })),
        setIsReturnStatus: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, isReturnStatus: data } : item) })),

        setFromR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, fromR: data } : item) })),
        setToR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, toR: data } : item) })),
        setStopsR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, stopsR: data } : item) })),

        setDateR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, dateR: data } : item) })),
        setTimeR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeR: data } : item) })),


        setIconR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, iconR: data } : item) })),
        setIcon2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon2R: data } : item) })),

        setDepartureR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departureR: data } : item) })),
        setDeparture2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure2R: data } : item) })),


        setFlightR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flightR: data } : item) })),
        setFlight2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight2R: data } : item) })),
        setTripTypeR: (data: string) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, tripTypeR: data } : item) })),
        setAirlinesR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlinesR: data } : item) })),
        setAirlinesBackR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlinesBackR: data } : item) })),

        resetReturn: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId ? {
                ...item,
                fromR: '', toR: '',
                stopsR: {
                    1: '', 2: '', 3: '', 4: '',
                },

                iconR: 0, icon2R: 0,
                flightR: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2R: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                airlinesR: '', airlinesBackR: '',
                departureR: '', departure2R: '',
                tripTypeR: '',

            } : item)
        })),


        setCarType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, carType: data } : item) })),

        setAdults: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, adults: data } : item) })),
        setKids: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, kids: data } : item) })),
        setBabies: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, babies: data } : item) })),

        setBaggage: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, baggage: data } : item) })),
        setPets: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, pets: data } : item) })),
        setSport: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, sport: data } : item) })),
        setCarSeats: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, carSeats: data } : item) })),

        setSteps: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, steps: data } : item) })),
    }))

