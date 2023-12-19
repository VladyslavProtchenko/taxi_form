import { create } from 'zustand'

interface IUser {
    isPhone: boolean;
    cars: {
        [key: number]: boolean;
    }
}
interface Store {
    validation: IUser;
    setIsPhone:(value: boolean) => void;

    setCars:(value: {[key: number]: boolean;}) => void;

}
export const useValidation = create<Store>((set) => ({
    validation: {
        isPhone: false,
        cars: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        }
    },
    setIsPhone: (name) => set(state => ({ validation: {...state.validation, isPhone: name }})),
    setCars: (name) => set(state => ({ validation: {...state.validation, cars: name }})),
}))