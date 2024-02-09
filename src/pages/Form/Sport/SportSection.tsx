import SportSelect from "./SportSelect/SportSelect";
import PetsSelect from "./PetsSelect/PetsSelect";

import { useMain } from "../../../Store/useMain";
import React from "react";
import Buttons from "../Components/Buttons";


const SportSection = ():React.ReactNode => {
    const {setSteps} = useMain()

    return (
        <section className={section}>
            <div className={content}>

                <PetsSelect />
                <SportSelect />
            </div>

            <Buttons goNext={()=>setSteps(7)} step={5} />

        </section>
    );
};

export default SportSection;

const content = 'flex  flex-col w-full h-min rounded mt-6'
const section = 'flex h-full w-full flex-col mt-10 mb-10 max-w-[576px] px-10 pb-20'