import { useInfo } from '../../Store/useInfo';
import { useReturnLocation } from '../../Store/useReturnLocation';
import { useSteps } from '../../Store/useSteps';
import { useValidation } from '../../Store/useValidation';
import { useNavigate } from "react-router-dom";
import { useLocation } from '../../Store/useLocation';

const Steps = () => {
    const navigate = useNavigate()

    const {  returnTrip, setIsReturnTrip } = useReturnLocation()
    const { store, setSteps } = useSteps()
    const {user} = useInfo()
    const {user:trip} = useLocation()

    const { 
        validation, 
        setIsName,
        setIsEmail, 
        setIsTitle,
        setIsPhone,
        setIsFrom,
        setIsTo,
        setIsDate,
        setIsTime,
        setIsFlight,
        setIsDeparture,
        setIsBackFrom,
        setIsBackTo,
        setIsDateBack,
        setIsTimeBack,
        setIsFlightBack,
        setIsDepartureBack,
        setIsPayment,
    } = useValidation()
    
    function nextStep() {

        setIsTitle(true)
        setIsName(true)
        setIsEmail(true)

        setIsFrom(true)
        setIsTo(true)
        setIsDate(true)
        setIsTime(true)

        setIsFlight(true)
        setIsDeparture(true)

        setIsBackFrom(true)
        setIsBackTo(true)
        setIsDateBack(true)
        setIsTimeBack(true)

        setIsFlightBack(true)
        setIsDepartureBack(true)
        setIsPayment(true)
        if(store.steps === 1 ) {
            if(user.name.length < 3) {return  setIsName(false) } 
            if(!user.gender) {return setIsTitle(false)}
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!pattern.test(user.email)) {return setIsEmail(false) }
            if(!validation.isPhone) return setIsPhone(false)
            return setSteps(store.steps + 1)
        }

        if(store.steps === 2 ) {
            if(!trip.pickUpLocation) {
                alert('Set pick up address')
                return setIsFrom(false)
            }
            if(!trip.dropOffLocation) {
                alert('Set drop off address')
                return setIsTo(false)
            }
    
            if(!trip.date) return setIsDate(false)
            if(!trip.time) return setIsTime(false)
            if(validation.isMontrealPick && !trip.flight) return setIsFlight(false)
            if(validation.isMontrealPick && (!trip.departureSection || !trip.airline)) return setIsDeparture(false)
            
            if(validation.isReturn && !returnTrip.from) return setIsBackFrom(false)
            if(validation.isReturn && !returnTrip.to)  return setIsBackTo(true)
    
            if(validation.isReturn && !returnTrip.date) return setIsDateBack(false)
            if(validation.isReturn && !returnTrip.time) return  setIsTimeBack(false)
    
            
            if(validation.isReturn && validation.isMontrealPickBack && !returnTrip.flight) return setIsFlightBack(false)
            if(validation.isReturn && validation.isMontrealPickBack && (!returnTrip.departure || !returnTrip.airlines)) return setIsDepartureBack(false)
            return setSteps(store.steps + 1)
        }
        if(store.steps === 4 ) {
            if(!user.paymentMethod) return setIsPayment(false)
            navigate('/success'); 
        }

        if(store.steps >= 4 ){return setSteps(4)}
        setSteps(store.steps + 1)
    }

    return (
        <div className={buttons}>
            {store.steps != 1 && 
            <div 
                className={navBtn} 
                onClick={() =>{ 
                    if(store.steps <=1 ) {return setSteps(1)} 
                    setSteps(store.steps - 1) }}
            >back</div>
            }
            {store.steps === 2 &&
                <div 
                    className={returnBtn} 
                    onClick={() => setIsReturnTrip(!returnTrip.isReturnTrip)} 
                >return trip</div>
            }
            {store.steps != 4 && 
                <div 
                    className={(store.steps === 1)? navBtn+' ml-auto': navBtn} 
                    onClick={nextStep}
                >next</div>
            }
        </div>
    );
};

export default Steps;

const navBtn = ' px-2 py-1 bg-yellow-200  rounded active:bg-yellow-100 active:text-gray-500'
const returnBtn = 'self-center   text-green-300 active:text-green-500'
const buttons = 'flex max-w-[320px] w-full justify-between px-3 '
