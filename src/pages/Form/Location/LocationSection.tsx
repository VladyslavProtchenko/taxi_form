
import React, { useEffect } from "react";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import Boost from "./Boost";


const LocationSection = ():React.ReactNode => {
    const { list, setIsReturnStatus,setIsReset, setIsReturnTrip, activeCarId } = useMain()

    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])

    useEffect(()=>{
        if( list[activeCarId-1].from.length > 0 
            || list[activeCarId-1].to.length > 0 
            || list[activeCarId-1].stops[1]
            || list[activeCarId-1].stops[2]
            || list[activeCarId-1].stops[3]
            || list[activeCarId-1].stops[4] 
            && list[activeCarId-1].isReset[2]) {
            return setIsReset({...list[activeCarId-1].isReset, 2: false })
        }
    },[list[activeCarId-1].time,list[activeCarId-1].date, list[activeCarId-1].from, list[activeCarId-1].to, list[activeCarId-1].stops])

    return (
        <section className={section}>
            <div className={(list[activeCarId-1].type<3)? 'h-full': 'hidden'} ><TripContent /></div>
            <div className={((list[activeCarId-1].type>2))? 'h-full': 'hidden'} ><Boost /></div>
        </section>
    );
};

export default LocationSection;

const section = 'relative flex h-full flex-col w-full pt-10 max-w-[576px] pb-20'