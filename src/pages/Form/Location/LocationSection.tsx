import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useValidation } from "../../../Store/useValidation";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { CgArrowsExchangeAlt,CgClose } from "react-icons/cg";

const LocationSection = () => {
    const {  returnTrip, setIsReturnTrip } = useReturnLocation()
    const { validation, setIsReturn } = useValidation()
    

    return (
        <section className={section}>
            <div className={carContainer}>
                <div className={ returnTrip.isReturnTrip ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} onClick={()=>setIsReturnTrip(false)}>One-Way</div>
                <div className={!returnTrip.isReturnTrip ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} onClick={()=>setIsReturnTrip(true)}>Return</div>
            </div>
            <div className='flex'>

                {!returnTrip.isReturnTrip && <TripContent />}
                <div className={returnContainer}>
                    <span className='font-thin w-10 sm:text-end'>round</span>
                    <div 
                        className={returnTrip.isReturnTrip ? button : buttonActive } 
                        onClick={()=>{
                            setIsReturnTrip(!returnTrip.isReturnTrip)
                            setIsReturn(!validation.isReturn)
                        }}
                    >
                        {!returnTrip.isReturnTrip && <CgArrowsExchangeAlt className="text-3xl"/>}
                        {returnTrip.isReturnTrip && <CgClose className="text-3xl"/>}
                    </div>
                    <span className='font-thin  w-10'>trip</span>

                </div>
                {returnTrip.isReturnTrip && <ReturnTrip />}
            </div>
        </section>
    );
};
export default LocationSection;

// const addCar = 'flex  py-1 font-bold text-gray-200 hover:text-gray-400 cursor-pointer'
// const removeCar = ' px-2 no-underline'
const carCard = 'flex w-1/2 text-gray-400 cursor-pointer justify-center  rounded-t-xl border bg-gray-200 opacity-50 py-2 '
const carCardActive = 'flex w-1/2 text-gray-400 cursor-pointer justify-center rounded-t-xl border py-2'
const carContainer = 'flex w-full  border-b-0  rounded-t-lg mt-10' 

const returnContainer = 'flex text-sm items-center flex-col justify-center mx-2 sm:flex-row sm:hidden'
const button = ' bg-white my-2 font-bold cursor-pointer sm:w-min o sm:justify-center sm:rotate-90 rounded-full text-red-500 hover:text-red-400 p-1 shadow-xl  border sm:mx-2'
const buttonActive = 'my-2 bg-white   font-bold cursor-pointer sm:w-min sm:justify-center sm:rotate-90 rounded-full hover:text-green-300 text-green-400 p-1 shadow-xl border sm:mx-2'
const section = 'flex flex-col w-full p-8 justify-between max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] sm:flex-col '