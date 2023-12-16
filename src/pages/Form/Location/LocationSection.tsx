
import React, { useEffect, useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import { useStore } from "../../../Store";

const LocationSection = ():React.ReactNode => {
    const [ tabs, setTabs ] = useState(false)
    const {store} = useStore()
    const {isFrench, list,setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()
    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(list[activeCarId-1].type)) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])
    return (
        <section className={section}>
            <div className={tabsContainer}>
                <div 
                    className={tabs ? tab  : tabActive} 
                    onClick={()=>{ setTabs(false)}}
                >
                    {isFrench? store.tripTitlesF[0] : store.tripTitles[0]}
                </div>
                <div 
                    className={!tabs ? tab : tabActive } 
                    onClick={()=>{
                        if(['Boost', 'Unlocking door'].includes(list[activeCarId-1].type)) return;
                        if(list[activeCarId-1].isReturnStatus) setTabs(true)
                    }}
                >
                    <div className={!list[activeCarId-1].isReturnTrip? "bg-green-400 py-1 px-3 rounded text-white border border-black active:bg-green-300 ": 'bg-red-500 border border-black active:bg-red-400  py-1 px-3 rounded text-white'} onClick={(e)=>{
                        e.stopPropagation()
                        if(list[activeCarId-1].isReturnStatus && list[activeCarId-1].isReturnTrip) {
                            setIsReturnStatus(false)
                            setTabs(false)
                            return setIsReturnTrip(false)
                        }
                        if(list[activeCarId-1].isReturnStatus && !list[activeCarId-1].isReturnTrip) {
                            setTabs(true);
                            return setIsReturnTrip(true)
                        }
                        if(!list[activeCarId-1].isReturnStatus) {
                            setIsReturnStatus(true)
                            setTabs(true)
                        }
                        
                    }}> 
                        {!list[activeCarId-1].isReturnStatus ? `${!isFrench? 'Need return': 'Besion Retour'}` : list[activeCarId-1].isReturnTrip
                            ?!isFrench   ? 'Disable ': 'Désactiver'
                            :!isFrench    ? 'Activate': 'Activer'
                        }
                    </div>
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


const tab = 'flex w-1/2  cursor-pointer justify-center '
const tabActive = 'flex w-1/2 cursor-pointer justify-center'
const tabsContainer = 'relative flex w-full text-xs text-gray-800 border px-10' 

const section = 'flex flex-col w-full  max-w-[576px]'