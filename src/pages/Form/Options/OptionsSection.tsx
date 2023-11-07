import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";
import { useOptions } from "../../../Store/useOptions";
import { useValidation } from "../../../Store/useValidation";

import { IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { PiJeepLight } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";


const OptionsSection = () => {

    const { user } = useStore()
    const { options, setCarType } = useOptions()
    const { validation } = useValidation()

    console.log(options.carType)
    return (
        <section className={section}>
            <div className={validation.isCarType ? type : type + ' border-red-500'}>
                    {user.carList.map(item => (
                        <div className={options.carType === item ? typeItem+' bg-green-400': item === 'limo (disabled)' ? typeItem + ' bg-gray-200  text-gray-500 cursor':typeItem } onClick={()=>{
                                if(item === 'limo (disabled)') return;
                                setCarType(item)
                            }}>
                            { item === 'VAN (5-7)'
                                ? <LiaShuttleVanSolid/>
                                :item === 'SUV (max 4)'
                                ?<PiJeepLight/>
                                :item === 'limo (disabled)'
                                ?<AiOutlineStop/>
                                :<IoCarSportOutline/> }
                                <span className='ml-1'>{item}</span>
                        </div>
                    ))}
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


const typeItem = 'flex items-center px-3 py-1 cursor-pointer text-sm'
const content = 'flex flex-wrap w-full h-min sm:w-full lg:flex-col lg:w-full lg:items-center '

const item = 'flex  relative 2xl:w-1/3 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2 md:w-full lg:w-4/5 xl:w-1/2' 
const passengersItem = ' 2xl:w-1/3  flex relative sm:w-full lg:w-4/5 xl:w-1/2' 
const type = 'flex lg:self-center sm:self-center border rounded self-start divide-x overflow-hidden '

const section = 'flex w-full flex-col p-8  sm:flex-col sm:max-w-[576px]  max-w-[1240px] sm:py-8 sm:px-1 lg:items-start '