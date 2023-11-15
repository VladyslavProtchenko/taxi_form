import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";
import { useValidation } from "../../../Store/useValidation";

import { IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { PiJeepLight } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";
import { useMain } from "../../../Store/useMain";
import React from "react";


const OptionsSection = ():React.ReactNode => {
    const { store } = useStore()
    const {list, activeCarId, setCarType} = useMain()
    const { validation } = useValidation()

    return (
        <section className={section}>
            <div className={validation.isCarType ? type : type + ' border-red-500'}>
                    {store.carList.map(item => (
                        <div className={list[activeCarId-1].carType === item ? typeItem+' bg-green-400': item === 'limo (disabled)' ? typeItem + ' bg-gray-200  text-gray-500 cursor':typeItem } onClick={()=>{
                                if(item === 'limo (disabled)') return;
                                setCarType(item)
                            }}>
                            { item === 'VAN (5-7)'
                                ? <LiaShuttleVanSolid className='w-1/4 text-sm'/>
                                :item === 'SUV (max 4)'
                                ?<PiJeepLight className='w-1/4 text-sm'/>
                                :item === 'limo (disabled)'
                                ?<AiOutlineStop className='w-1/4 text-sm'/>
                                :<IoCarSportOutline className='w-1/4 text-sm'/> }
                                <div className='truncate sm:ml-0 ml-1'>{item}</div>
                        </div>
                    ))}
            </div>
            
            <div className={content}>
                <div className={passengersItem}>
                    <PassengersSelect /> 
                    <div className='flex w-1/2 flex-col'>
                        <BagsSelect /><CarSeatSelect />
                    </div>
                </div>
                <div className={item}><SportSelect /><PetsSelect/></div>
            </div>
        </section>
    );
};

export default OptionsSection;


const typeItem = 'flex items-center px-3 py-1 cursor-pointer text-sm sm:text-[10px] px-0 w-1/4'
const content = 'flex flex-wrap w-full h-min '

const item = 'flex  relative  w-full pb-2  ' 
const passengersItem = '  flex relative w-full border-b-2 border-gray-500' 
const type = 'flex  self-center border rounded s divide-x overflow-hidden w-full mb-4'

const section = 'flex w-full flex-col p-8 flex-col max-w-[576px] py-8 px-1  '