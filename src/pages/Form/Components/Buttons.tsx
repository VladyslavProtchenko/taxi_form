import React from 'react';
import { useMain } from '../../../Store/useMain';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface IProps {
    goNext: () => void;
    step: number;

}
const Buttons = ({goNext, step}: IProps): React.ReactNode => {
    const { setSteps, isFrench } = useMain()

    return (
        <div className={buttons}>
            <button className={back} onClick={()=>setSteps(step)}><MdOutlineKeyboardDoubleArrowLeft className='text-2xl'/>{isFrench? 'Précédent': 'Previous'}</button>
            <button className={next} onClick={goNext} >{isFrench? 'Suivant': 'Next'}<MdOutlineKeyboardDoubleArrowRight className='text-2xl'/></button>
        </div>
    );
};

export default Buttons;

const buttons = 'z-20 fixed bottom-[86px] right-1/2 translate-x-1/2 w-full flex justify-between mt-auto mx-auto max-w-[400px] px-5 text-lg text-white'
const back = ' flex items-center justify-center pr-2 w-[120px]  bg-rose-500 active:bg-rose-700 text-center py-3 rounded-xl  cursor-pointer font-bold'
const next = ' flex items-center justify-center w-[120px] bg-purple-500 text-center active:bg-purple-700 py-3 rounded-xl  cursor-pointer font-bold'