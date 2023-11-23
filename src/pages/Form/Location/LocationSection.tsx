
import React, { useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useStore } from "../../../Store";
import { useMain } from "../../../Store/useMain";

const LocationSection = ():React.ReactNode => {
    const [ tabs, setTabs ] = useState(false)
    const [ need, setNeed ] = useState(false)
    const {store} = useStore()
    const {isFrench, type, list, setIsReturnTrip, activeCarId } = useMain()

    return (
        <section className={section}>
            <div className={carContainer}>
                <div className='absolute w-20 h-[27px]  bg-white bottom-0 right-1/2 translate-x-1/2'></div>
                <div 
                    className={tabs ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} 
                    onClick={()=>{
                        setTabs(false)
                    }}
                >
                    {isFrench? store.tripTitlesF[0] : store.tripTitles[0]}
                </div>
                <div 
                    className={!tabs ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} 
                    onClick={()=>{
                        if(['Boost', 'Unlocking door'].includes(type)) return;
                        if(need) setTabs(true)
                    }}
                >
                    <div className={!list[activeCarId-1].isReturnTrip? "bg-green-400 py-1 px-3 rounded text-white": 'bg-red-500 py-1 px-3 rounded text-white'} onClick={(e)=>{
                        e.stopPropagation()
                        if(need && list[activeCarId-1].isReturnTrip) {
                            setNeed(false)
                            setTabs(false)
                            console.log('work 1',tabs)

                            return setIsReturnTrip(false)
                        }

                        if(need && !list[activeCarId-1].isReturnTrip) {
                            console.log('work 2',tabs)
                            setTabs(true);
                            return setIsReturnTrip(true)
                        };

                        if(!need) {
                            console.log('work 3',tabs)
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