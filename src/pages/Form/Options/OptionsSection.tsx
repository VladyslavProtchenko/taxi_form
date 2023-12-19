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
    const {list, activeCarId, setCarType, isFrench,setSteps} = useMain()
    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)

    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    return (
        <section className={section}>
            <div className={list[activeCarId-1].carType ? type : type + ' border-red-500'}>
                    {carList.map((item,index) => (
                        <div className={(index=== 3) ? typeItem + ' bg-gray-200': (list[activeCarId-1].carType=== index+1) ? typeItemActive : typeItem } key={item} onClick={()=>{
                            if(index<3) setCarType(index+1)
                            }}>
                            {
                                index === 0
                                ? <><IoCarSportOutline className='w-[20px] text-sm'/>{isFrench ? 'Berline': 'Sedan'}</>
                                : index === 1
                                ? <><PiJeepLight className='w-[20px] text-sm'/>{isFrench ? 'VUS': 'SUV'}</> 
                                : index === 2
                                ? <><LiaShuttleVanSolid className='w-[20px] text-sm'/> {'VAN'}</>
                                : <><AiOutlineStop className='w-[20px] text-sm text-red-500'/>{'Limo'}</>
                            }
                        </div>
                    ))}
                <div className={list[activeCarId-1].carType===2 ? trick + ' translate-x-full ': list[activeCarId-1].carType=== 3 ?trick + ' translate-x-[200%] ': trick}></div>
            </div>
            
            <div className={content}>
                <div className={contentItem}><PassengersSelect /><BagsSelect /></div>
                <div className={contentItem}><CarSeatSelect /></div>
                <div className={contentItem}><SportSelect /><PetsSelect/></div>
            </div>
            <div className='w-full flex justify-between max-w-[400px] mx-auto pt-10'>
                <div className={backBtn} onClick={()=>setSteps(2)}>{isFrench? 'Précédent': 'Back'}</div>
                <div className={nextBtn} onClick={()=>{
                    (list[activeCarId-1].adults === 0  && (list[activeCarId-1].type!==2))
                    ? alert('need adults')
                    : setSteps(4)
                }}>{isFrench? 'Suivant': 'Next'}</div>
            </div>


        </section>
    );
};

export default OptionsSection;

const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const nextBtn = 'w-1/3 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-full text-white'

const trick = 'absolute bg-purple-500 top-0 bottom-0 w-1/4 duration-500'
const typeItem = 'flex justify-center z-10 px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'
const typeItemActive = 'flex text-white justify-center z-10 px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'
const type = 'relative flex  border-2 border-purple-500 rounded-full overflow-hidden w-full'

const contentItem = '  flex relative w-full mb-3 space-x-1 items-start' 

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex w-full flex-col mt-10 max-w-[576px] px-10 '