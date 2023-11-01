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

                <Select
                    style={{width:"100%",  height: 30}}
                    placeholder='Select car'
                    onChange={setCarType}
                    defaultValue={options.carType || 'sedan (max 4)'}
                    value={options.carType || 'sedan (max 4)'}
                    options={user.carList.map(item=>(
                        {
                            value: item, 
                            label: (
                            <span className='flex'>
                            {item === 'VAN (5-7)'
                            ? <div className='flex items-center space-x-1'><LiaShuttleVanSolid/><span>{'VAN (5-7)'}</span> </div>
                            :item === 'SUV (max 4)'
                            ?<div className='flex items-center space-x-1'><PiJeepLight/><span>{'SUV (max 4)'}</span> </div>
                            :item === 'limo (disabled)'
                            ?<div className='flex items-center space-x-1'><AiOutlineStop/><span>{'limo (disabled)'}</span> </div>
                            : <div className='flex items-center space-x-1' ><IoCarSportOutline/><span>{'sedan (max 4)'}</span></div>
                            }
                        </span>)
                        }
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

const content = 'flex flex-wrap w-full h-min sm:w-full lg:flex-col lg:w-full lg:items-center '

const item = 'flex  relative 2xl:w-1/3 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2 md:w-full lg:w-4/5 xl:w-1/2' 
const passengersItem = ' 2xl:w-1/3  flex relative sm:w-full lg:w-4/5 xl:w-1/2' 
const type = 'flex w-[200px] sm:w-full mb-6 pl-2 mb-10 border items-center '

const section = 'flex w-full flex-col p-8  sm:flex-col sm:max-w-[576px]  max-w-[1240px] sm:py-8 sm:px-1 lg:items-start '