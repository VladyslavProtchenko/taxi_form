
import React, { useEffect, useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import Boost from "./Boost";

const LocationSection = ():React.ReactNode => {
    const [ returnCard, setReturnCard ] = useState(false)
    const { list,setType, setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()
    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])
    return (
        <section className={section}>
            <div className={typeContainer}>
                <div className={list[activeCarId-1].type===1 ?typeTabActive: typeTab} onClick={()=>setType(1)}>Transport</div>
                <div className={list[activeCarId-1].type===2 ?typeTabActive: typeTab} onClick={()=>setType(2)}>Delivery</div>
                <div className={list[activeCarId-1].type===3 ?typeTabActive: typeTab} onClick={()=>setType(3)}>Boost</div>
                <div className={list[activeCarId-1].type===4 ?typeTabActive: typeTab} onClick={()=>setType(4)}>Unlocking door</div>
                <div className={tabLine}><div className={
                    list[activeCarId-1].type===1 
                    ? line
                    :list[activeCarId-1].type===2 
                    ? line + ' translate-x-[100%]'
                    :list[activeCarId-1].type===3 
                    ? line + ' translate-x-[200%]'
                    : line + ' translate-x-[300%]'
                }></div></div>
            </div>
            
            <div className={(list[activeCarId-1].type<3)?'flex w-full px-10 mt-4': 'hidden'}>
                {list[activeCarId-1].isReturnTrip && <div className={returnTabsActive}>
                    <div 
                        className={returnCard ? returnTab : returnTabActive }
                        onClick={()=>setReturnCard(false)}
                    >One-Way</div>

                    {list[activeCarId-1].isReturnTrip &&<div 
                        className={returnCard ? returnTabActive : returnTab}
                        onClick={()=>setReturnCard(true)}
                    >Return</div>}

                    <div className={ returnCard ? returnTabBg+ ' translate-x-full':returnTabBg  }></div>
                </div> }

                {!list[activeCarId-1].isReturnTrip &&
                    <div className='flex w-full '>
                    <div className={returnTabActiveOne}>One-Way</div>
                        <div className={activeReturnTripBtn} onClick={()=>setIsReturnTrip(true)}>+ Return</div>
                    </div>}
            </div>
            
            
            <div className={(!returnCard && (list[activeCarId-1].type<3))? '': 'hidden'} ><TripContent /></div>
            <div className={(returnCard && (list[activeCarId-1].type<3))? '': 'hidden'} ><ReturnTrip /></div>
            <div className={( (list[activeCarId-1].type>2))? '': 'hidden'} ><Boost /></div>
        </section>
    );
};

export default LocationSection;

const activeReturnTripBtn = 'w-1/2 text-center py-2 cursor-pointer active:bg-white text-purple-700 rounded-lg hover:shadow-xl '
const returnTabBg = 'absolute w-1/2 bg-purple-500 top-0 bottom-0 rounded-lg duration-300'
const returnTab = 'w-1/2 text-center z-10 duration-500  py-2'
const returnTabActive = 'w-1/2 text-center z-10 text-white duration-500 py-2' 
const returnTabActiveOne = 'w-1/2 items-center justify-center z-10 text-white bg-purple-500 rounded-lg flex shadow-xl' 
const returnTabsActive = 'relative flex bg-white  shadow-xl  rounded-lg w-full cursor-pointer'

const tabLine = 'absolute w-full px-10 top-full left-0'
const line = ' w-1/4 border-b-2 border-purple-500 duration-500'
const typeTab = 'w-1/4 py-1 text-center cursor-pointer text-gray-400 font-bold'
const typeTabActive = 'w-1/4 py-1 text-center cursor-pointer font-bold'
const typeContainer = 'flex relative w-full text-[11px] px-10 mb-10 mt-5'

const section = 'flex flex-col w-full  max-w-[576px]'