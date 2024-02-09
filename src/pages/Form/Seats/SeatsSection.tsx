import CarSeatSelect from "./CarSeats/CarSeatsSelect";

import { useMain } from "../../../Store/useMain";
import React from "react";
import Buttons from "../Components/Buttons";

const SeatsSection = ():React.ReactNode => {
    const {setSteps} = useMain()
    return (
        <section className={section}>
            <div className={content}>
                <div className={contentItem}><CarSeatSelect /></div>
            </div>
            <Buttons goNext={()=>setSteps(6)} step={4} />
        </section>
    );
};

export default SeatsSection;

const contentItem = '  flex relative w-full mb-3 space-x-1 items-start' 

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 '