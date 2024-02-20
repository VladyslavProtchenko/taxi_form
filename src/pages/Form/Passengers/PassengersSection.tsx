import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";

import { IoCarSportOutline } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import { useMain } from "../../../Store/useMain";
import React, { useEffect, useState } from "react";
import BagsSelect from "./BagsSelect/BagsSelect";
import Buttons from "../Components/Buttons";
import suv from '../../../assets/suv.png';
import suvWhite from '../../../assets/suvWhite.png';
import van from '../../../assets/van.png';
import vanWhite from '../../../assets/vanWhite.png';

const PassengersSection = ():React.ReactNode => {
    const { store } = useStore()
    const {list,setValidation, activeCarId, setCarType,setIsReset, isFrench,setSteps,setAlert } = useMain()
    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)

    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    const goNext =() => {
        (list[activeCarId-1].adults === 0  && (list[activeCarId-1].type!==2))
        ? setAlert('Need at last 1 adult')
        : setValidation(5);setSteps(5);
    }
    useEffect(()=>{
        if(list[activeCarId-1].isReset[4]
            &&  list[activeCarId-1].kids.length
            ||  list[activeCarId-1].babies
            ||  list[activeCarId-1].baggage.filter(item=>item.quantity>0).length
            ) {
            return setIsReset({...list[activeCarId-1].isReset, 4: false })
        } else if(
            list[activeCarId-1].isReset[4]
            &&  list[activeCarId-1].adults > 1
            ||  list[activeCarId-1].adults ===0
        ) {
            return setIsReset({...list[activeCarId-1].isReset, 4: false })
        }
        
    },[list[activeCarId-1].adults, list[activeCarId-1].kids, list[activeCarId-1].babies, list[activeCarId-1].baggage])

    return (
        <section className={section}>

            <div className={list[activeCarId-1].carType ? type : type + ' border-red-500'}>
                    {carList.map((item,index) => (
                        <div className={(index=== 3) ? typeItem + ' bg-gray-200': (list[activeCarId-1].carType=== index+1) ? typeItemActive : typeItem } key={item} onClick={()=>{
                            if(index<3) setCarType(index+1)
                            }}>
                            {
                                index === 0
                                ? <div className='items-center text-sm font-bold flex '><IoCarSportOutline className='w-[25px] mr-[2px] text-4xl'/>{isFrench ? 'Berline': 'Sedan'}</div>
                                : index === 1
                                ? <div className='items-center text-sm font-bold flex'><div style={{backgroundImage:`url(${list[activeCarId-1].carType ===2 ? suvWhite: suv})` }} className={'w-10 bg-center  h-5 bg-contain bg-no-repeat mr-[2px]'} ></div>{isFrench ? 'VUS': 'SUV'}</div> 
                                : index === 2
                                ? <div className='items-center text-sm font-bold flex '><div style={{backgroundImage:`url(${list[activeCarId-1].carType ===3 ? vanWhite: van})` }} className={'w-9 bg-center h-5 bg-contain bg-no-repeat mr-[2px]'} ></div>{'VAN'}</div>
                                : <div className='items-center text-sm font-bold flex '><AiOutlineStop className='w-[25px] mr-[2px] text-4xl text-red-500'/>{'Limo'}</div>
                            }
                        </div>
                    ))}
                <div className={list[activeCarId-1].carType===2 ? trick + ' translate-x-full ': list[activeCarId-1].carType=== 3 ?trick + ' translate-x-[200%] ': trick}></div>
            </div>
            
            <PassengersSelect />
            <BagsSelect />
            <Buttons goNext={goNext} step={list[activeCarId-1].isReturnTrip ? 3: 2} />
        </section>
    );
};

export default PassengersSection;

const trick = 'absolute bg-purple-500 top-0 bottom-0 w-1/4 duration-500'
const typeItem = 'flex justify-center z-10 px-2 py-1 cursor-pointer  px-0 w-1/4 duration-1000'
const typeItemActive = 'flex text-white justify-center z-10 px-2 py-1 cursor-pointer duration-1000 px-0 w-1/4'
const type = 'relative flex mb-10 border-2 border-purple-500 rounded-xl overflow-hidden w-full'



const section = ' flex h-full w-full flex-col mt-10 max-w-[576px] pt-4 pb-20 px-10 '