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
            <TripContent />
            <div className={returnContainer}>
                <span className='font-thin '>round</span>
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
                <span className='font-thin'>trip</span>

            </div>
            <ReturnTrip />
        </section>
    );
};
export default LocationSection;

const returnContainer = 'flex text-sm items-center flex-col justify-center mx-2'
const button = ' bg-white my-2 font-bold cursor-pointer sm:w-min sm:ml-auto sm:mr-auto sm:justify-center sm:rotate-90 rounded-full text-red-500 hover:text-red-400 p-1 shadow-xl  border'
const buttonActive = 'my-2 bg-white   font-bold cursor-pointer sm:w-min sm:ml-auto sm:mr-auto sm:justify-center sm:rotate-90 rounded-full hover:text-green-300 text-green-400 p-1 shadow-xl border'
const section = 'flex w-full p-8 justify-between max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] sm:flex-col '