
import React, { useEffect } from "react";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import Boost from "./Boost";


const LocationSection = ():React.ReactNode => {
    const { list, setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()

    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])

    return (
        <section className={section}>
            <div className={(list[activeCarId-1].type<3)? 'h-full': 'hidden'} ><TripContent /></div>
            <div className={((list[activeCarId-1].type>2))? 'h-full': 'hidden'} ><Boost /></div>
        </section>
    );
};

export default LocationSection;

const section = 'relative flex h-full flex-col w-full pt-10 max-w-[576px] pb-20'