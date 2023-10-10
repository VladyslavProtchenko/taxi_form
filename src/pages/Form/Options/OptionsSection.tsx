import Select from "../../../UI/components/Select";
import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { IoCarSportOutline } from "react-icons/io5";
import { useStore } from "../../../Store";
import { useOptions } from "../../../Store/useOptions";


const OptionsSection = () => {

    const {user } = useStore()
    const { options, setCarType } = useOptions()

    return (
        <section className={section}>

            <label className={typeWrapper}>
                <div className={icon}>
                <IoCarSportOutline className='mr-2'/>
                </div>
                <Select width={200} subStyle='md:left-0' source={user.carList} value={options.carType ? options.carType: user.carList[0]} onChange={setCarType} placeholder='' />
            </label>
            <label className={passengersItem}>
                <PassengersSelect />
            </label>
            <div className={content}>
                <div className={item}>
                    <BagsSelect />
                </div>

                <div className={item}>
                    <SportSelect />
                </div>

                <div className={item}>
                    <CarSeatSelect />
                </div>

                <div className={item}>
                    <PetsSelect/> 
                </div>
            </div>
        </section>
    );
};

export default OptionsSection;

const content = 'w-2/3 flex flex-wrap divide-x h-min md:flex-col md:w-1/2 sm:w-full sm:divide-none'
const item = 'flex  relative w-1/2 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2 md:w-full' 

const passengersItem = 'flex relative w-1/3 sm:w-full sm:border-b  sm:w-full md:w-1/2 sm:pb-2' 

const icon = 'flex h-[29px] items-center pl-2'
const typeWrapper = 'flex sm:w-full mb-6 items-start w-full mb-10'

const section = 'flex w-full mb-10 px-8 py-4 sm:px-1 flex-wrap  divide-y sm:flex-col sm:w-[320px] border-b lg:w-[1024px] xl:w-[1024px] 2xl:w-[1024px] sm:border-none sm:m-0'
