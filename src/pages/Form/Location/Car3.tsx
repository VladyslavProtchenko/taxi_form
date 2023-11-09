import { useLocation3 } from "../../../Store/useLocation3";
import { useReturnLocation3 } from "../../../Store/useReturnLocation3";
import { useValidation } from "../../../Store/useValidation";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { CgArrowsExchangeAlt, CgClose } from 'react-icons/cg';

const TripWrapper = () =>{
    const { 
        user, 
        setFrom, 
        setTo, 
        setStops,
        setDate,
        setTime,
        setDeparture,
        setDeparture2,
        setFlight,
        setFlight2,
        setAirline,
        setIcon,
        setIcon2,
        setAirlineBack,
        resetLocation,
        setDateNow,
    } = useLocation3()

    return <TripContent 
                user={user}
                setFrom={setFrom}
                setTo={setTo}
                setStops={setStops}
                setDate={setDate}
                setTime={setTime}
                setDeparture={setDeparture}
                setDeparture2={setDeparture2}
                setFlight={setFlight}
                setFlight2={setFlight2}
                setAirline={setAirline}
                setIcon={setIcon}
                setIcon2={setIcon2}
                setAirlineBack={setAirlineBack}
                resetLocation={resetLocation}
                setDateNow={setDateNow}
            />
}

const BackWrapper = () =>{
    const { returnTrip, setFrom, setTo,setIcon, setIcon2, setStops, setDate,setTime,setDeparture,setDeparture2,setFlight,setFlight2,setAirlines,setAirlinesBack,resetReturn, setIsReturnTrip} = useReturnLocation3()
    const { user } = useLocation3()
    return <ReturnTrip 
                mainUser={user}
                returnTrip={returnTrip}
                setFrom={setFrom}
                setTo={setTo}
                setIcon={setIcon}
                setIcon2={setIcon2}
                setStops={setStops}
                setDate={setDate}
                setTime={setTime}
                setDeparture={setDeparture}
                setDeparture2={setDeparture2}
                setFlight={setFlight}
                setFlight2={setFlight2}
                setAirlines={setAirlines}
                setAirlinesBack={setAirlinesBack}
                resetReturn={resetReturn}
                setIsReturnTrip={setIsReturnTrip} 
            />
}


const Car3 = () => {
    const { validation, setIsReturn } = useValidation()
    const { returnTrip,setIsReturnTrip } = useReturnLocation3()

    return (
        <>
            <div className={carContainer}>
                <div className={ returnTrip.isReturnTrip ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} onClick={()=>setIsReturnTrip(false)}>One-Way</div>
                <div className={!returnTrip.isReturnTrip ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} onClick={()=>setIsReturnTrip(true)}>Return</div>
            </div>
            <div className='flex'>
            <div className={!returnTrip.isReturnTrip ? 'flex w-full' : 'hidden'} >
                    <TripWrapper />
                </div>
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
                <div className={returnTrip.isReturnTrip ? 'flex w-full' : 'hidden'} >
                    <BackWrapper />
                </div>
            </div>
        </>
    );
};

export default Car3;


const carCard = 'flex w-1/2 text-gray-600 cursor-pointer justify-center  rounded-t-xl border bg-gray-200 opacity-50 py-2 '
const carCardActive = 'flex w-1/2 text-black cursor-pointer justify-center rounded-t-xl border py-2'
const carContainer = 'hidden sm:flex w-full  border-b-0  rounded-t-lg mt-10' 

const returnContainer = 'flex text-sm items-center flex-col justify-center mx-2 sm:flex-row sm:hidden'
const button = ' bg-white my-2 font-bold cursor-pointer sm:w-min o sm:justify-center sm:rotate-90 rounded-full text-red-500 hover:text-red-400 p-1 shadow-xl  border sm:mx-2'
const buttonActive = 'my-2 bg-white   font-bold cursor-pointer sm:w-min sm:justify-center sm:rotate-90 rounded-full hover:text-green-300 text-green-400 p-1 shadow-xl border sm:mx-2'
