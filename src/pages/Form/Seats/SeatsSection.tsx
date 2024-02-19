import CarSeatSelect from "./CarSeats/CarSeatsSelect";

import { useMain } from "../../../Store/useMain";
import React, { useEffect } from "react";
import Buttons from "../Components/Buttons";

const SeatsSection = ():React.ReactNode => {
    
    const {list, activeCarId,setIsReset, setSteps, setValidation } = useMain()

    useEffect(()=>{
        if(list[activeCarId-1].isReset[5] &&  list[activeCarId-1].carSeats.filter(item=>item.quantity>0).length) {
            return setIsReset({...list[activeCarId-1].isReset, 5: false })
        } 
    },[list[activeCarId-1].carSeats])

    return (
        <section className={section}>
            <CarSeatSelect />
            <Buttons goNext={()=>{
                setValidation(6)
                setSteps(6)}} step={4} />
        </section>
    );
};

export default SeatsSection;


const section = 'flex h-full w-full flex-col mt-36 mb-10 max-w-[576px] px-10 '