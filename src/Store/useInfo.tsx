import { create } from 'zustand'

interface IUser {
    genderList:string[];

    gender: string;
    extraGender1: string;
    extraGender2: string;

    name:string;
    extraName1:string;
    extraName2:string;
    extraName3:string;

    email:string;
    extraEmail1:string;
    extraEmail2:string;
    extraEmail3:string;

    phone:string;
    extraPhone1:string;
    extraPhone2:string;
    extraPhone3:string;

    paymentMethod: string,

}
interface Store {
    user: IUser;
    setGender:(value: string) => void;
    setExtraGender1:(value: string) => void;
    setExtraGender2:(value: string) => void;
    

    setName:(value: string) => void;
    setExtraName1:(value: string) => void;
    setExtraName2:(value: string) => void;
    setExtraName3:(value: string) => void;


    setEmail:(value: string) => void;
    setExtraEmail1:(value: string) => void;
    setExtraEmail2:(value: string) => void;
    setExtraEmail3:(value: string) => void;

    setPhone:(value: string) => void;

    setExtraPhone1:(value: string) => void;
    setExtraPhone2:(value: string) => void;
    setExtraPhone3:(value: string) => void;

    setPaymentMethod:(value: string) => void;
}
export const useInfo = create<Store>((set) => ({
    user: {
        genderList:['Mr.', 'Msr.', 'null', 'undefined', 'object', 'infinity'],

        gender: '',
        extraGender1:'',
        extraGender2:'',

        name: '',
        extraName1:'',
        extraName2:'',
        extraName3:'',

        email: '',
        extraEmail1: '',
        extraEmail2: '',
        extraEmail3: '',

        phone: '',
        extraPhone1:'',
        extraPhone2:'',
        extraPhone3:'',
        paymentMethod: '',
    },
    
    setGender: (data) => set((state) => ({ user: {...state.user, gender: data } })),
    setExtraGender1: (data) => set((state) => ({ user: {...state.user, extraGender1: data } })),
    setExtraGender2: (data) => set((state) => ({ user: {...state.user, extraGender2: data } })),

    setName: (name) => set(state => ({ user: {...state.user, name: name}})),
    setExtraName1: (name) => set(state => ({ user: {...state.user, extraName1: name }})),
    setExtraName2: (name) => set(state => ({ user: {...state.user, extraName2: name }})),
    setExtraName3: (name) => set(state => ({ user: {...state.user, extraName3: name }})),

    setEmail: (name) => set(state => ({ user: {...state.user, email: name }})),
    setExtraEmail1: (name) => set(state => ({ user: {...state.user, setExtraEmail1: name }})),
    setExtraEmail2: (name) => set(state => ({ user: {...state.user, setExtraEmail2: name }})),
    setExtraEmail3: (name) => set(state => ({ user: {...state.user, setExtraEmail3: name }})),


    setPhone: (name) => set(state => ({ user: {...state.user, phone: name }})),
    setExtraPhone1: (name) => set(state => ({ user: {...state.user, setExtraPhone1: name }})),
    setExtraPhone2: (name) => set(state => ({ user: {...state.user, setExtraPhone2: name }})),
    setExtraPhone3: (name) => set(state => ({ user: {...state.user, setExtraPhone3: name }})),

    setPaymentMethod: (name) => set(state => ({ user: {...state.user, paymentMethod: name }})),

}))