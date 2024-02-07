import CarSeatSelect from "./CarSeats/CarSeatsSelect";

import { useMain } from "../../../Store/useMain";
import React from "react";

const SeatsSection = ():React.ReactNode => {
    const {isFrench,setSteps} = useMain()
    return (
        <section className={section}>
            <div className={content}>
                <div className={contentItem}><CarSeatSelect /></div>
            </div>

            <div className={btns}>
                <div className={backBtn} onClick={()=>setSteps(4)}>{isFrench? 'Précédent': 'Previous'}</div>
                <div className={nextBtn} onClick={()=>setSteps(6)}>{isFrench? 'Suivant': 'Next'}</div>
            </div>


        </section>
    );
};

export default SeatsSection;

const btns = ' fixed bottom-24 w-full flex justify-between max-w-[400px] px-5 right-1/2 translate-x-1/2'
const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-xl text-white  cursor-pointer'
const nextBtn = 'w-1/3 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-xl text-white  cursor-pointer'

const contentItem = '  flex relative w-full mb-3 space-x-1 items-start' 

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 '