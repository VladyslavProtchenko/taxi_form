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

    email: string;
    extraEmail1: string;
    extraEmail2: string;

    phone: string;
    extraPhone1: string;
    extraPhone2: string;

    paymentMethod: string;
    additionalText: string;

    resetPhone: boolean;
}

interface IStore {
    user: IUser;
    setGender: (value: string) => void;
    setExtraGender1: (value: string) => void;
    setExtraGender2: (value: string) => void;

    setName: (name: string) => void;
    setExtraName1: (name: string) => void;
    setExtraName2: (name: string) => void;

    setEmail: (email: string) => void;
    setExtraEmail1: (email: string) => void;
    setExtraEmail2: (email: string) => void;

    setPhone: (phone: string) => void;
    setExtraPhone1: (phone: string) => void;
    setExtraPhone2: (phone: string) => void;

    setPaymentMethod: (method: string) => void;
    setAdditionalText: (text: string) => void;
    resetData: () => void;
    setResetPhone: (data: boolean) => void;
}

export const useInfo = create<IStore>()(
    persist(
        (set) => ({
            user: {
                // genderList: ['Monsieur', 'Madame','Mademoiselle' ,'Non défini',]
                genderList: ['Mr.', 'Msr.', 'Miss.', 'undefined' ],
                gender: '',
                extraGender1: '',
                extraGender2: '',

                name: '',
                extraName1: '',
                extraName2: '',

                email: '@',
                extraEmail1: '@',
                extraEmail2: '@',

                phone: '',
                extraPhone1: '',
                extraPhone2: '',

                paymentMethod: 'Cash',
                additionalText: '',

                resetPhone: false,
            },

            setGender: (data) => set((state) => ({ user: { ...state.user, gender: data } })),
            setExtraGender1: (data) => set((state) => ({ user: { ...state.user, extraGender1: data } })),
            setExtraGender2: (data) => set((state) => ({ user: { ...state.user, extraGender2: data } })),

            setName: (name) => set((state) => ({ user: { ...state.user, name } })),
            setExtraName1: (name) => set((state) => ({ user: { ...state.user, extraName1: name } })),
            setExtraName2: (name) => set((state) => ({ user: { ...state.user, extraName2: name } })),

            setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
            setExtraEmail1: (email) => set((state) => ({ user: { ...state.user, extraEmail1: email } })),
            setExtraEmail2: (email) => set((state) => ({ user: { ...state.user, extraEmail2: email } })),

            setPhone: (phone) => set((state) => ({ user: { ...state.user, phone } })),
            setExtraPhone1: (phone) => set((state) => ({ user: { ...state.user, extraPhone1: phone } })),
            setExtraPhone2: (phone) => set((state) => ({ user: { ...state.user, extraPhone2: phone } })),

            setPaymentMethod: (method) => set((state) => ({ user: { ...state.user, paymentMethod: method } })),
            setAdditionalText: (text) => set((state) => ({ user: { ...state.user, additionalText: text } })),
            resetData: () => set(() => ({ user: { 
                genderList: ['Mr.', 'Msr.', 'null', 'undefined', 'object', 'infinity'],
                gender: '',
                extraGender1: '',
                extraGender2: '',

                name: '',
                extraName1: '',
                extraName2: '',

                email: '@',
                extraEmail1: '@',
                extraEmail2: '@',

                phone: '',
                extraPhone1: '',
                extraPhone2: '',

                paymentMethod: 'Cash',
                additionalText: '',
                resetPhone: false,
            } })),
            setResetPhone: (data) => set((state) => ({ user: { ...state.user, resetPhone: data  } })),
        }),
        {
            name: 'info'
        }
    )
);
