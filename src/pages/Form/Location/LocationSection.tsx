
import React, { useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";

const LocationSection = ():React.ReactNode => {
    const [ tabs, setTabs ] = useState(false)
    return (
        <section className={section}>
            <div className={carContainer}>
                <div className={tabs ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} onClick={()=>setTabs(false)}>One-Way</div>
                <div className={!tabs ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} onClick={()=>setTabs(true)}>Return</div>
            </div>
            <div className='flex'>
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


const carCard = 'flex w-1/2 text-gray-600 cursor-pointer justify-center  rounded-t-xl border bg-gray-200 opacity-50 py-2 '
const carCardActive = 'flex w-1/2 text-black cursor-pointer justify-center rounded-t-xl border py-2'
const carContainer = 'flex w-full  border-t-0  rounded-t-lg ' 

const section = 'flex flex-col w-full justify-between py-8 px-1 max-w-[576px] flex-col '