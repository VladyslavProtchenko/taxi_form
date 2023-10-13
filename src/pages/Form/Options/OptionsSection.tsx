import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { IoCarSportOutline } from "react-icons/io5";
import { useStore } from "../../../Store";
import { useOptions } from "../../../Store/useOptions";
import { Select } from "antd";


const OptionsSection = () => {

    const {user } = useStore()
    const { setCarType } = useOptions()

    return (
        <section className={section}>
            <div className={type}>
                <span className='icon'><IoCarSportOutline/></span>
                <Select
                    placeholder='sedan (max 4)' 
                    className='sm:w-full'
                    style={{width:200,  height: 30}}
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

const content = 'flex flex-wrap w-full h-min md:flex-col sm:w-full'
const item = 'flex  relative w-1/3 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2 md:w-full' 

const passengersItem = ' w-1/3 flex relative sm:w-full' 
const type = 'flex w-[150px] sm:w-full mb-6 items-start mb-10 border items-center'
const section = 'flex w-full flex-col p-8  sm:flex-col sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1 '