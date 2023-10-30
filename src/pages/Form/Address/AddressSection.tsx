import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useValidation } from "../../../Store/useValidation";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { CgArrowsExchangeAlt,CgClose } from "react-icons/cg";

const AddressSection = () => {
    const {  returnTrip, setIsReturnTrip } = useReturnLocation()
    const { validation, setIsReturn } = useValidation()
    
    return (
        <section className={section}>
            <TripContent />
            <div 
                className={returnTrip.isReturnTrip ? button + ' text-red-500 hover:text-red-400' : button + ' hover:text-green-300 text-green-400 ' } 
                onClick={()=>{
                    setIsReturnTrip(!returnTrip.isReturnTrip)
                    setIsReturn(!validation.isReturn)
                }}
            >
                {!returnTrip.isReturnTrip && <CgArrowsExchangeAlt className="text-3xl"/>}
                {returnTrip.isReturnTrip && <CgClose className="text-3xl"/>}
            </div>
            
            <ReturnTrip />
        </section>
    );
};
export default AddressSection;

const button = ' bg-white flex items-center  text-sm font-bold cursor-pointer sm:w-min sm:ml-auto sm:mr-auto sm:justify-center sm:rotate-90'
const section = 'flex w-full p-8 justify-between max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] sm:flex-col '