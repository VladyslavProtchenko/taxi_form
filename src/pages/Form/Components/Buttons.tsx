import React from 'react';
import { useMain } from '../../../Store/useMain';

interface IProps {
    goNext: () => void;
    step: number;

}
const Buttons = ({goNext, step}: IProps): React.ReactNode => {

    const { setSteps, isFrench } = useMain()

    return (
        <div className={btns}>
            <div className={backBtn} onClick={()=>setSteps(step)}>{isFrench? '<< Précédent': '<< Previous'}</div>
            <div className={nextBtn} onClick={goNext} >{isFrench? 'Suivant >>': 'Next >>'}</div>
        </div>
    );
};

export default Buttons;

const btns = 'z-20 fixed bottom-24 right-1/2 translate-x-1/2 w-full flex justify-between mt-auto mx-auto max-w-[400px] px-5'
const backBtn = 'w-1/3 px-1 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-xl text-lg text-white cursor-pointer font-bold'
const nextBtn = 'w-1/3 px-1 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-xl text-lg text-white cursor-pointer font-bold'