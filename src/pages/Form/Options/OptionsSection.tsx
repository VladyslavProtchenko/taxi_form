import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";
import { useOptions } from "../../../Store/useOptions";
import { Select } from "antd";
import { useValidation } from "../../../Store/useValidation";

import { IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { PiJeepLight } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";


const OptionsSection = () => {

    const {user } = useStore()
    const { options, setCarType } = useOptions()
    const { validation } = useValidation()

    return (
        <section className={section}>
            <div className={validation.isCarType ? type : type + ' border-red-500'}>
                <span className='icon'>
                    {options.carType === 'VAN (5-7)'
                    ? <LiaShuttleVanSolid/>
                    :options.carType === 'SUV (max 4)'
                    ?<PiJeepLight/>
                    :options.carType === 'limo (disabled)'
                    ?<AiOutlineStop/>
                    :<IoCarSportOutline/>
                    
                    }
                    </span>
                <Select
                    placeholder='sedan (max 4)' 
                    style={{width:"100%",  height: 30}}
                    onChange={setCarType}
                    options={user.carList.map(item=>(
                        {value: item, label: item}
                    ))}
                />
            </div>
            
            <div className={content}>
                <div className={passengersItem}><PassengersSelect /></div>
                <div className={item}><BagsSelect /></div>
                <div className={item}><CarSeatSelect /></div>
                <div className={item}><SportSelect /></div>
                <div className={item}><PetsSelect/></div>
            </div>
        </section>
    );
};

export default OptionsSection;

const content = 'flex 2xl:divide-x flex-wrap w-full h-min sm:w-full lg:flex-col lg:w-full lg:items-center '

const item = 'flex  relative 2xl:w-1/3 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2 md:w-full lg:w-4/5 xl:w-1/2' 
const passengersItem = ' 2xl:w-1/3  flex relative sm:w-full lg:w-4/5 xl:w-1/2' 
const type = 'flex w-[150px] sm:w-full mb-6  mb-10 border items-center '

const section = 'flex w-full flex-col p-8  sm:flex-col sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1 lg:items-start '