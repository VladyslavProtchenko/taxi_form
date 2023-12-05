import { create } from 'zustand'

interface IState {
    
}
interface Store {
    state: IState;
    isFrench: boolean,
    setIsFrench:(value: boolean) => void;
}
export const useDashboard = create<Store>((set) => ({
    state:{},
    isFrench: false,
    setIsFrench: (data) => set(() => ({ isFrench: data}))
}))