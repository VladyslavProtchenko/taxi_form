import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
    genderList: string[];

    gender: string;
    extraGender1: string;
    extraGender2: string;

    name: string;
    extraName1: string;
    extraName2: string;
    extraName3: string;

    email: string;
    extraEmail1: string;
    extraEmail2: string;
    extraEmail3: string;

    phone: string;
    extraPhone1: string;
    extraPhone2: string;
    extraPhone3: string;

    paymentMethod: string;
    additionalText: string;
}

interface IStore {
    user: IUser;
    setGender: (value: string) => void;
    setExtraGender1: (value: string) => void;
    setExtraGender2: (value: string) => void;

    setName: (name: string) => void;
    setExtraName1: (name: string) => void;
    setExtraName2: (name: string) => void;
    setExtraName3: (name: string) => void;

    setEmail: (email: string) => void;
    setExtraEmail1: (email: string) => void;
    setExtraEmail2: (email: string) => void;
    setExtraEmail3: (email: string) => void;

    setPhone: (phone: string) => void;
    setExtraPhone1: (phone: string) => void;
    setExtraPhone2: (phone: string) => void;
    setExtraPhone3: (phone: string) => void;

    setPaymentMethod: (method: string) => void;
    setAdditionalText: (text: string) => void;
}

export const useInfo = create<IStore>()(
    persist(
        (set) => ({
            user: {
                genderList: ['Mr.', 'Msr.', 'null', 'undefined', 'object', 'infinity'],
                gender: '',
                extraGender1: '',
                extraGender2: '',

                name: '',
                extraName1: '',
                extraName2: '',
                extraName3: '',

                email: '',
                extraEmail1: '',
                extraEmail2: '',
                extraEmail3: '',

                phone: '',
                extraPhone1: '',
                extraPhone2: '',
                extraPhone3: '',

                paymentMethod: '',
                additionalText: '',
            },

            setGender: (data: string) => set((state) => ({ user: { ...state.user, gender: data } })),
            setExtraGender1: (data: string) => set((state) => ({ user: { ...state.user, extraGender1: data } })),
            setExtraGender2: (data: string) => set((state) => ({ user: { ...state.user, extraGender2: data } })),

            setName: (name: string) => set((state) => ({ user: { ...state.user, name } })),
            setExtraName1: (name: string) => set((state) => ({ user: { ...state.user, extraName1: name } })),
            setExtraName2: (name: string) => set((state) => ({ user: { ...state.user, extraName2: name } })),
            setExtraName3: (name: string) => set((state) => ({ user: { ...state.user, extraName3: name } })),

            setEmail: (email: string) => set((state) => ({ user: { ...state.user, email } })),
            setExtraEmail1: (email: string) => set((state) => ({ user: { ...state.user, extraEmail1: email } })),
            setExtraEmail2: (email: string) => set((state) => ({ user: { ...state.user, extraEmail2: email } })),
            setExtraEmail3: (email: string) => set((state) => ({ user: { ...state.user, extraEmail3: email } })),

            setPhone: (phone: string) => set((state) => ({ user: { ...state.user, phone } })),
            setExtraPhone1: (phone: string) => set((state) => ({ user: { ...state.user, extraPhone1: phone } })),
            setExtraPhone2: (phone: string) => set((state) => ({ user: { ...state.user, extraPhone2: phone } })),
            setExtraPhone3: (phone: string) => set((state) => ({ user: { ...state.user, extraPhone3: phone } })),

            setPaymentMethod: (method: string) => set((state) => ({ user: { ...state.user, paymentMethod: method } })),
            setAdditionalText: (text: string) => set((state) => ({ user: { ...state.user, additionalText: text } })),

        }),
        {
            name: 'info'
        }
    )
);
