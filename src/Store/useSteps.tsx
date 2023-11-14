import { create } from 'zustand'

interface IStore {
    steps: number;
}
interface Store {
    store: IStore;
    setSteps:(value: number) => void;
}
export const useSteps = create<Store>((set) => ({
    store: {
        steps: 1,
    },
    setSteps: (data) => set((state) => ({ store: {...state.store, steps: data } })),
}))