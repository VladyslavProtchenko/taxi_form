import { create } from 'zustand'

interface IUser {
    isTitle: boolean;
    isName: boolean;
    isEmail: boolean;
    isPhone: boolean;

    isTo: boolean;
    isFrom: boolean;

    isAirport: boolean;

    isMontreal: boolean,
    isMontrealBack: boolean,
    isMontrealPick: boolean,
    isMontrealPickBack: boolean,

    isFlight: boolean;
    isDeparture: boolean;

    isDate: boolean;
    isTime: boolean;

    isReturn: boolean;

    isBackTo: boolean;
    isBackFrom: boolean;
    
    isDateBack: boolean;
    isTimeBack: boolean;

    
    isFlightBack: boolean;
    isDepartureBack: boolean;
    
    isCarType: boolean;
    isPayment: boolean;
}
interface Store {
    validation: IUser;
    setIsTitle:(value: boolean) => void;
    setIsName:(value: boolean) => void;
    setIsEmail:(value: boolean) => void;
    setIsPhone:(value: boolean) => void;

    setIsFrom:(value: boolean) => void;
    setIsTo:(value: boolean) => void;

    setIsAirport:(value: boolean) => void;
    setIsMontreal:(value: boolean) => void;
    setIsMontrealBack:(value: boolean) => void;
    setIsMontrealPick:(value: boolean) => void;
    setIsMontrealPickBack:(value: boolean) => void;

    setIsFlight:(value: boolean) => void;
    setIsDeparture:(value: boolean) => void;

    setIsDate:(value: boolean) => void;
    setIsTime:(value: boolean) => void;

    setIsReturn:(value: boolean) => void;

    setIsBackTo:(value: boolean) => void;
    setIsBackFrom:(value: boolean) => void;

    setIsDateBack:(value: boolean) => void;
    setIsTimeBack:(value: boolean) => void;

    setIsFlightBack:(value: boolean) => void;
    setIsDepartureBack:(value: boolean) => void;
    
    setIsCarType:(value: boolean) => void;
    setIsPayment:(value: boolean) => void;

}
export const useValidation = create<Store>((set) => ({
    validation: {
        isTitle: false,
        isName: false,
        isEmail: false,
        isPhone: false,
    
        isTo: false,
        isFrom: false,

        isAirport: false,
    
        isMontreal: false,
        isMontrealBack: false,
        isMontrealPick: false,
        isMontrealPickBack: false,

        isFlight: false,
        isDeparture: true,

        isDate: false,
        isTime: false,
    
        isReturn: false,
    
        isBackTo: false,
        isBackFrom: false,
        
        isDateBack: false,
        isTimeBack: false,
    
        
        isFlightBack: true,
        isDepartureBack: true,
        
        isCarType: false,
        isPayment: false,

    },

    setIsTitle: (name) => set(state => ({ validation: {...state.validation, isTitle: name }})),
    setIsName: (name) => set(state => ({ validation: {...state.validation, isName: name }})),
    setIsEmail: (name) => set(state => ({ validation: {...state.validation, isEmail: name }})),
    setIsPhone: (name) => set(state => ({ validation: {...state.validation, isPhone: name }})),

    setIsFrom: (name) => set(state => ({ validation: {...state.validation, isFrom: name }})),
    setIsTo: (name) => set(state => ({ validation: {...state.validation, isTo: name }})),

    setIsAirport: (name) => set(state => ({ validation: {...state.validation, isAirport: name }})),
    setIsMontreal: (name) => set(state => ({ validation: {...state.validation, isMontreal: name }})),
    setIsMontrealBack: (name) => set(state => ({ validation: {...state.validation, isMontrealBack: name }})),    
    setIsMontrealPick: (name) => set(state => ({ validation: {...state.validation, isMontrealPick: name }})),
    setIsMontrealPickBack: (name) => set(state => ({ validation: {...state.validation, isMontrealPickBack: name }})),

    setIsFlight: (name) => set(state => ({ validation: {...state.validation, isFlight: name }})),
    setIsDeparture: (name) => set(state => ({ validation: {...state.validation, isDeparture: name }})),

    setIsDate: (name) => set(state => ({ validation: {...state.validation, isDate: name }})),
    setIsTime: (name) => set(state => ({ validation: {...state.validation, isTime: name }})),

    setIsReturn: (name) => set(state => ({ validation: {...state.validation, isReturn: name }})),

    setIsBackTo: (name) => set(state => ({ validation: {...state.validation, isBackTo: name }})),
    setIsBackFrom: (name) => set(state => ({ validation: {...state.validation, isBackFrom: name }})),

    setIsFlightBack: (name) => set(state => ({ validation: {...state.validation, isFlightBack: name }})),
    setIsDepartureBack: (name) => set(state => ({ validation: {...state.validation, isDepartureBack: name }})),

    setIsCarType: (name) => set(state => ({ validation: {...state.validation, isCarType: name }})),
    setIsPayment: (name) => set(state => ({ validation: {...state.validation, isPayment: name }})),

    setIsDateBack: (name) => set(state => ({ validation: {...state.validation, isDateBack: name }})),
    setIsTimeBack: (name) => set(state => ({ validation: {...state.validation, isTimeBack: name }})),
}))