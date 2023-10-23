import InfoSection from './Info/InfoSection';
import AddressSection from './Address/AddressSection';
import OptionsSection from './Options/OptionsSection';
import { useSteps } from '../../Store/useSteps';
import Steps from './Steps';
import { useInfo } from '../../Store/useInfo';
import { useLocation } from '../../Store/useLocation';
import { useReturnLocation } from '../../Store/useReturnLocation';
import { useOptions } from '../../Store/useOptions';
import PaymentSection from './Payment/Payment';
import { useValidation } from '../../Store/useValidation';


const Form = () => {
    const { store } = useSteps()
    const {user} = useInfo()
    const {user:trip} = useLocation()
    const {returnTrip} = useReturnLocation()
    const {options} = useOptions()
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

    const sendOrder = () => {

        const newOrder = {
            gender: user.gender,
            gender2: user.extraGender1,
            gender3: user.extraGender2,

            name: user.name,
            name2: user.extraName1,
            name3: user.extraName2,


            email: user.email,
            email2: user.extraEmail1,
            email3: user.extraEmail2,

            phone: user.phone,
            phone2: user.extraPhone1,
            phone3: user.extraPhone2,

            fromLocation: trip.pickUpLocation,
            to: trip.dropOffLocation,
            stop1: trip.stopFirst,
            stop2: trip.stopSecond,
            stop3: trip.stopLast,
            
            date: trip.date,
            time: trip.time,

            flight: trip.flight,
            bus: trip.bus,
            train: trip.train,

            departure: trip.departureSection,
            airline: trip.airline,


            isReturnTrip: returnTrip.isReturnTrip,


            returnFrom: returnTrip.from,
            returnTo: returnTrip.to,
            returnStop1: returnTrip.stop1,
            returnStop2: returnTrip.stop2,
            returnStop3: returnTrip.stop3,
            
            returnDate: returnTrip.date,
            returnTime: returnTrip.time,

            returnFlight: returnTrip.flight,
            returnBus: returnTrip.bus,
            returnTrain: returnTrip.train,

            returnDeparture: returnTrip.departure,
            returnAirline: returnTrip.airlines,

            carType: options.carType,
            passengers: options.passengers,
            baggage: options.baggage,
            carSeats: options.carSeats,
            sport: options.sport,
            pets: options.pets,

            tripType: trip.date,
            paymentMethod: user.paymentMethod,
            notes: user.additionalText,
        }

        setIsTitle(true)
        setIsName(true)
        setIsEmail(true)
        setIsPhone(true)

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

        
        if(user.name.length < 3) {
            alert('Name required')
            return  setIsName(false) 
        } 
        if(!user.gender) {
            alert('Title required')
            return setIsTitle(false)
        }
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(user.email)) {
            alert('Email required')
            return setIsEmail(false)  
        }
[]
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

        if(!user.paymentMethod) return setIsPayment(false)

        console.log(newOrder)
        alert('order created')
    }

    return (
        <div  className={container}>
            <div className="hidden w-full sm:flex-col sm:flex items-center sm:max-w-[576px] h-full">
                {store.steps === 1 && <InfoSection />}
                {store.steps === 2 && <AddressSection />}
                {store.steps === 3 && <OptionsSection />}
                {store.steps === 4 && <div className='flex w-full h-5/6 justify-center items-center'>
                        <div>Order sent</div>
                    </div>}
                <Steps/>
            </div>
            
            <div className="sm:hidden flex flex-col items-center">
                <InfoSection />
                <AddressSection />
                <OptionsSection />
                <PaymentSection sendOrder={sendOrder}/>
            </div>

        </div>
    );
};

export default Form;

const container = 'flex  flex-col w-full h-[100&]] bg-white sm:max-width-[767px] sm:border-none sm:px-2'