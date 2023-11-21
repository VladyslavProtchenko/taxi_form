import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";

import { IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { PiJeepLight } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";
import { useMain } from "../../../Store/useMain";
import React, { useEffect, useState } from "react";


const OptionsSection = ():React.ReactNode => {
    const { store } = useStore()
    const {list, activeCarId, setCarType, isFrench} = useMain()
    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)

    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    return (
        <section className={section}>
            <div className={list[activeCarId-1].carType ? type : type + ' border-red-500'}>
                    {carList.map(item => (
                        <div className={list[activeCarId-1].carType === item ? typeItem+' bg-green-400 text-black': item === 'Limo' ? typeItem + ' bg-gray-200  text-gray-500 cursor':typeItem+ ' text-blue-500' } onClick={()=>{
                                if(item === 'limo') return;
                                setCarType(item)
                            }}>
                            { (item === 'VAN') 
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                :(item === 'SUV' ||item === 'VUS')
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                :item === 'Limo'
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate font-bold'>{item}</div>
                        </div>
                    ))}
            </div>
            
            <div className={content}>
                <div className={contentItem}><PassengersSelect /><BagsSelect /></div>
                <div className={contentItem}><CarSeatSelect /></div>
                <div className={contentItem}><SportSelect /><PetsSelect/></div>
            </div>
        </section>
    );
};

export default OptionsSection;


const typeItem = 'flex items-center px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'

const contentItem = '  flex relative w-full mb-3 space-x-1' 
const type = 'flex  self-center border border-black rounded s divide-x overflow-hidden w-full'

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex w-full flex-col  flex-col max-w-[576px] py-8 '