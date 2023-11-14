import { create } from 'zustand'

interface IUser {
    isTitle: boolean;
    isName: boolean;
    isEmail: boolean;
    isPhone: boolean;

    isTo: boolean;
    isFrom: boolean;

    isDate: boolean;
    isTime: boolean;

    isToR: boolean;
    isFromR: boolean;
    
    isDateR: boolean;
    isTimeR: boolean;
    
    isCarType: boolean;
    isPayment: boolean;
    isSubmit: boolean;
    cars: {
        [key: number]: boolean;
    }
}
interface Store {
    validation: IUser;
    setIsTitle:(value: boolean) => void;
    setIsName:(value: boolean) => void;
    setIsEmail:(value: boolean) => void;
    setIsPhone:(value: boolean) => void;

    setIsFrom:(value: boolean) => void;
    setIsTo:(value: boolean) => void;


    setIsDate:(value: boolean) => void;
    setIsTime:(value: boolean) => void;


    setIsToR:(value: boolean) => void;
    setIsFromR:(value: boolean) => void;

    setIsDateR:(value: boolean) => void;
    setIsTimeR:(value: boolean) => void;

    setIsCarType:(value: boolean) => void;
    setIsPayment:(value: boolean) => void;

    setIsSubmit:(value: boolean) => void;
    setCars:(value: {[key: number]: boolean;}) => void;

}
export const useValidation = create<Store>((set) => ({
    validation: {
        isTitle: false,
        isName: false,
        isEmail: false,
        isPhone: false,
    
        isTo: false,
        isFrom: false,

        isDate: false,
        isTime: false,

        isToR: false,
        isFromR: false,
        
        isDateR: false,
        isTimeR: false,
    
        
        isCarType: true,
        isPayment: false,

        isSubmit: false,
        cars: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        }
    },

    setIsTitle: (name) => set(state => ({ validation: {...state.validation, isTitle: name }})),
    setIsName: (name) => set(state => ({ validation: {...state.validation, isName: name }})),
    setIsEmail: (name) => set(state => ({ validation: {...state.validation, isEmail: name }})),
    setIsPhone: (name) => set(state => ({ validation: {...state.validation, isPhone: name }})),

    setIsFrom: (name) => set(state => ({ validation: {...state.validation, isFrom: name }})),
    setIsTo: (name) => set(state => ({ validation: {...state.validation, isTo: name }})),
    setIsDate: (name) => set(state => ({ validation: {...state.validation, isDate: name }})),
    setIsTime: (name) => set(state => ({ validation: {...state.validation, isTime: name }})),


    setIsToR: (name) => set(state => ({ validation: {...state.validation, isToR: name }})),
    setIsFromR: (name) => set(state => ({ validation: {...state.validation, isFromR: name }})),


    setIsCarType: (name) => set(state => ({ validation: {...state.validation, isCarType: name }})),
    setIsPayment: (name) => set(state => ({ validation: {...state.validation, isPayment: name }})),

    setIsDateR: (name) => set(state => ({ validation: {...state.validation, isDateR: name }})),
    setIsTimeR: (name) => set(state => ({ validation: {...state.validation, isTimeR: name }})),
    setIsSubmit: (name) => set(state => ({ validation: {...state.validation, isSubmit: name }})),
    setCars: (name) => set(state => ({ validation: {...state.validation, cars: name }})),
}))