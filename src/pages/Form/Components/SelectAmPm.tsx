import React from 'react';
import { useMain } from '../../../Store/useMain';

interface IProps {
    type: number;
    onChange: (value: number) => void;
} 
const SelectAmPm = ({type, onChange}: IProps):React.ReactNode => {
    const { isFrench } =useMain()
    
    return (
        <div className={type===1 ? timeToggle + ' bg-black ': type===1 ? timeToggle+ ' bg-black':timeToggle+ ' bg-white' }>
            <div className={type===0 ? selectTextActive :selectText } onClick={()=>onChange(0)}>{isFrench? 'Choisir':'Select'}</div>
            <div className={type===1 ? amTextActive : amText} onClick={()=>onChange(1)}>am</div>
            <div className="absolute border-b border-black w-[35px] right-[24px] z-10 rotate-[114deg]"></div>
            <div className={type===2 ? pmTextActive: pmText} onClick={()=>onChange(2)}>PM</div>    
        </div>
    );
};

export default SelectAmPm;

const amText = 'pl-2 flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-black text-white font-bold'

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-black  rounded-tl triangle flex items-center py-1 font-bold'

const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-black text-white flex items-center py-1 border-r border-black '

const timeToggle = ' font-bold relative flex  items-center text-base  cursor-pointer  rounded overflow-hidden border border-black '
