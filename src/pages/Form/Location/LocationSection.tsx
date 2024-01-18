
import React, { useEffect, useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import Boost from "./Boost";
import { useStore } from '../../../Store/index';
import { CgArrowLongLeft,CgArrowLongRight } from "react-icons/cg";


const LocationSection = ():React.ReactNode => {
    const [ returnCard, setReturnCard ] = useState(false)
    const { store } = useStore()
    const { list, setIsReturnStatus, isFrench, setIsReturnTrip, activeCarId } = useMain()


    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])
    return (
        <section className={section}>
            <h1 className={pageNumber}>3/8</h1>

            <div className={(list[activeCarId-1].type<3)?'flex flex-col w-full px-5 mt-4': 'hidden'}>
                    <div className='flex w-full '>
                        <div className={returnTabActiveOne}>{
                            returnCard
                            ? isFrench? store.tripTitlesF[1] : store.tripTitles[1]
                            : isFrench? store.tripTitlesF[0] : store.tripTitles[0]
                        }</div>
                        <div 
                            className={activeReturnTripBtn} 
                            onClick={()=>setIsReturnTrip(!list[activeCarId-1].isReturnTrip)}
                        ><span className="font-bold text-[16px] mr-1">{list[activeCarId-1].isReturnTrip ? '-' :'+'}</span>Return</div>
                    </div>
                    {/* } */}
                {list[activeCarId-1].isReturnTrip && <div className="flex py-2 my-2">
                    {!returnCard
                        ? <span 
                            onClick={()=>setReturnCard(true)} 
                            className='flex ml-auto text-gray-800 items-center cursor-pointer hover:text-gray-400'
                        > {isFrench? store.tripTitlesF[1] : store.tripTitles[1]} <CgArrowLongRight className="ml-1"  /></span>
                        : <span 
                            onClick={()=>setReturnCard(false)} 
                            className='flex self-start text-gray-800 items-center cursor-pointer hover:text-gray-400'
                        > <CgArrowLongLeft className="mr-1" />{isFrench? store.tripTitlesF[0] : store.tripTitles[0]}</span>
                    }
                </div>}
            </div>
            
            
            <div className={(!returnCard && (list[activeCarId-1].type<3))? '': 'hidden'} ><TripContent /></div>
            <div className={(returnCard && (list[activeCarId-1].type<3))? '': 'hidden'} ><ReturnTrip /></div>
            <div className={( (list[activeCarId-1].type>2))? '': 'hidden'} ><Boost /></div>
        </section>
    );
};

export default LocationSection;

const pageNumber = 'absolute left-2 top-16 text-base text-gray-300'

const activeReturnTripBtn = 'w-1/2 text-center py-2 cursor-pointer  text-purple-700 rounded-lg hover:underline '
const returnTabActiveOne = 'w-1/2 items-center justify-center z-10 text-white bg-purple-500 rounded-lg flex shadow-xl' 

const section = 'flex flex-col w-full pt-10 max-w-[576px]'