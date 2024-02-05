import SportSelect from "./SportSelect/SportSelect";
import PetsSelect from "./PetsSelect/PetsSelect";

import { useMain } from "../../../Store/useMain";
import React from "react";


const SportSection = ():React.ReactNode => {
    const {isFrench,setSteps} = useMain()


    return (
        <section className={section}>
            <div className={content}>

                <PetsSelect />
                <SportSelect />
            </div>

            <div className={btns}>
                <div className={backBtn} onClick={()=>setSteps(5)}>{isFrench? 'Précédent': 'Previous'}</div>
                <div className={nextBtn} onClick={()=>setSteps(7)}>{isFrench? 'Suivant': 'Next'}</div>
            </div>


        </section>
    );
};

export default SportSection;

const btns = ' fixed bottom-20 w-full flex justify-between max-w-[400px] px-5 right-1/2 translate-x-1/2'
const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const nextBtn = 'w-1/3 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-full text-white'


const content = 'flex  flex-col w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 pb-20'