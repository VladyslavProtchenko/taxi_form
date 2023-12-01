
import React, { useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useStore } from "../../../Store";
import { useMain } from "../../../Store/useMain";

const LocationSection = ():React.ReactNode => {
    const [ tabs, setTabs ] = useState(false)
    const [ need, setNeed ] = useState(false)
    const {store} = useStore()
    const {isFrench, list, setIsReturnTrip, activeCarId } = useMain()

    return (
        <section className={section}>
            <div className={carContainer}>
                <div className='absolute w-20 h-[27px]  bg-white bottom-0 right-1/2 translate-x-1/2'></div>
                <div 
                    className={tabs ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} 
                    onClick={()=>{ setTabs(false)}}
                >
                    {isFrench? store.tripTitlesF[0] : store.tripTitles[0]}
                </div>
                <div 
                    className={!tabs ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} 
                    onClick={()=>{
                        if(['Boost', 'Unlocking door'].includes(list[activeCarId-1].type)) return;
                        if(need) setTabs(true)
                    }}
                >
                    <div className={!list[activeCarId-1].isReturnTrip? "bg-green-400 py-1 px-3 rounded text-white border-2 border-green-500 active:bg-green-300 ": 'bg-red-500 border-2 border-red-700 active:bg-red-400  py-1 px-3 rounded text-white'} onClick={(e)=>{
                        e.stopPropagation()
                        if(need && list[activeCarId-1].isReturnTrip) {
                            setNeed(false)
                            setTabs(false)
                            return setIsReturnTrip(false)
                        }
                        if(need && !list[activeCarId-1].isReturnTrip) {
                            setTabs(true);
                            return setIsReturnTrip(true)
                        }
                        if(!need) {
                            setNeed(true)
                            setTabs(true)
                        }
                        
                    }}> {
                        !need 
                        ? `${!isFrench? 'Need return': 'Besion Retour'}`
                        : list[activeCarId-1].isReturnTrip
                        ? !isFrench? 'Disable ': 'Disable'
                        :  isFrench? 'Activate': 'Activate'
                        }
                    </div>
                    {/* {isFrench? store.tripTitlesF[1] : store.tripTitles[1]} */}
                </div>
            </div>
            <div className='flex bg-white'>
                <div className={!tabs ? 'flex w-full  flex-coll ' : 'hidden w-full '} >
                <TripContent />
                </div>
                <div className={tabs ? 'flex w-full flex-col' : 'hidden w-full '} >
                <ReturnTrip />
                </div>
            </div>
        </section>
    );
};

export default LocationSection;


const carCard = 'flex w-1/2 text-gray-600 z-10 cursor-pointer justify-center  rounded-t-xl border bg-gray-50 py-2 '
const carCardActive = 'flex w-1/2 text-black z-10 cursor-pointer justify-center rounded-t-xl border py-2 bg-white'
const carContainer = 'relative flex w-full  border-t-0  rounded-t-lg ' 

const section = 'flex flex-col w-full justify-between py-8 px-1 max-w-[576px] flex-col '