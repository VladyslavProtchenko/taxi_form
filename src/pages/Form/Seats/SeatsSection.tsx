import CarSeatSelect from "./CarSeats/CarSeatsSelect";

import { useMain } from "../../../Store/useMain";
import React from "react";

const SeatsSection = ():React.ReactNode => {
    const {isFrench,setSteps} = useMain()
    return (
        <section className={section}>
            <h1 className={pageNumber}>5/8</h1>
            <div className={content}>
                <div className={contentItem}><CarSeatSelect /></div>
            </div>

            <div className='w-full flex justify-between max-w-[400px] mx-auto mt-auto'>
                <div className={backBtn} onClick={()=>setSteps(3)}>{isFrench? 'Précédent': 'Previous'}</div>
                <div className={nextBtn} onClick={()=>setSteps(5)}>{isFrench? 'Suivant': 'Next'}</div>
            </div>


        </section>
    );
};

export default SeatsSection;

const pageNumber = 'absolute left-2 top-16 text-base text-gray-300'

const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const nextBtn = 'w-1/3 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-full text-white'

const contentItem = '  flex relative w-full mb-3 space-x-1 items-start' 

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 '