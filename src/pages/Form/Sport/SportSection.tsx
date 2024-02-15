import SportSelect from "./SportSelect/SportSelect";
import PetsSelect from "./PetsSelect/PetsSelect";

import { useMain } from "../../../Store/useMain";
import React, { useEffect } from "react";
import Buttons from "../Components/Buttons";


const SportSection = ():React.ReactNode => {
    const {setSteps,activeCarId,list,setIsReset,setValidation} = useMain()

    useEffect(()=>{
        if(
            list[activeCarId-1].isReset[6] 
            &&  list[activeCarId-1].sport.filter(item=>item.quantity>0).length
            ||  list[activeCarId-1].pets.filter(item=>item.quantity>0).length
            ) {
            return setIsReset({...list[activeCarId-1].isReset, 6: false })
        } 
    },[list[activeCarId-1].sport,list[activeCarId-1].pets])

    return (
        <section className={section}>
            <div className={content}>
                <PetsSelect />
                <SportSelect />
            </div>

            <Buttons goNext={()=>{
                setValidation(7)
                setSteps(7)
                }} step={5} />

        </section>
    );
};

export default SportSection;

const content = 'flex  flex-col w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 pb-20'