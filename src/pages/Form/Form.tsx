import InfoSection from './Info/InfoSection';
import AddressSection from './Location/LocationSection';
import OptionsSection from './Options/OptionsSection';
import { useSteps } from '../../Store/useSteps';
import Steps from './Steps';
import { useInfo } from '../../Store/useInfo';
import { useLocation } from '../../Store/useLocation';
import { useReturnLocation } from '../../Store/useReturnLocation';
import { useOptions } from '../../Store/useOptions';
import PaymentSection from './Payment/Payment';
import { useValidation } from '../../Store/useValidation';
import { useEffect } from 'react';
import Submit from './Submit/Submit';
import dayjs from 'dayjs';

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
        setIsSubmit,
    } = useValidation()
    useEffect(()=>{
        setIsTitle(false)
        setIsName(false)
        setIsEmail(false)
        setIsPayment(false)

        if(user.gender) setIsTitle(true)
        if(user.name.length > 3) setIsName(true) 
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(pattern.test(user.email)) setIsEmail(true)
        if(user.paymentMethod) setIsPayment(true)

    },[user,options])

    useEffect(()=>{
        setIsFrom(false)
        setIsTo(false)
        setIsDate(false)
        setIsTime(false) 
        setIsBackFrom(false)
        setIsBackTo(false)
        setIsDateBack(false)
        setIsTimeBack(false)

        if(trip.from) setIsFrom(true)
        if(trip.to) setIsTo(true)
        if(trip.date) setIsDate(true)
        if(trip.time.length === 5 ) setIsTime(true)

        if(returnTrip.isReturnTrip && ( returnTrip.from || trip.from )) setIsBackFrom(true)
        if(returnTrip.isReturnTrip && ( returnTrip.to || trip.to )) setIsBackTo(true)
        if(returnTrip.isReturnTrip && returnTrip.date) setIsDateBack(true)
        
        if(returnTrip.isReturnTrip && returnTrip.time.length === 5) setIsTimeBack(true)
    },[trip,returnTrip])

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

            fromLocation: trip.from,
            to: trip.to,
            stops: trip.stops,
            
            date: trip.date,
            time:trip.dateNow ? dayjs().format('HH:mm') : trip.time,

            flight: trip.flight,

            departure: trip.departure,
            airline: trip.airline,

            isReturnTrip: returnTrip.isReturnTrip,


            returnFrom: returnTrip.from,
            returnTo: returnTrip.to,
            returnStops: returnTrip.stops,
            
            returnDate: returnTrip.date,
            returnTime: returnTrip.time,

            returnFlight: returnTrip.flight,
            returnBus: returnTrip.bus,
            returnTrain: returnTrip.train,

            returnDeparture: returnTrip.departure,
            returnAirline: returnTrip.airline,

            carType: options.carType,
            passengers: options.passengers,
            baggage: options.baggage,
            carSeats: options.carSeats,
            sport: options.sport,
            pets: options.pets,

            tripType: trip.tripType,
            paymentMethod: user.paymentMethod,
            notes: user.additionalText,
        }

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

        if(!user.gender) {
            alert('Title required')
            return setIsTitle(false)
        }

        if(user.name.length < 3) {
            alert('Name required')
            return  setIsName(false) 
        } 

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(user.email)) {
            alert('Email required')
            return setIsEmail(false)  
        }
        if(!validation.isPhone) {
            alert('Phone required')
            return setIsPhone(false)
        }
        if(!trip.from) {
            alert('Set pick up address')
            return setIsFrom(false)
        }
        if(!trip.to) {
            alert('Set drop off address')
            return setIsTo(false)
        }

        if(!trip.date) {
            alert('date is required')
            return setIsDate(false)
        }
        if(!trip.time){
            alert('time is required')
            return setIsTime(false) 
        } 
        if(validation.isMontrealPick && !trip.flight) {
            alert('flight is required')
            return setIsFlight(false)
        }
        if(validation.isMontrealPick && (!trip.departure || !trip.airline)){
            alert('departure section is required')
            return setIsDeparture(false) 
        } 
        
        if(validation.isReturn && !returnTrip.from){
            alert('return address is required')
            return setIsBackFrom(false)
        } 
        if(validation.isReturn && !returnTrip.to)  {
            alert('return to address is required')
            return setIsBackTo(true)
        }

        if(validation.isReturn && !returnTrip.date) {
            alert('date is required')
            return setIsDateBack(false)
        }
        if(validation.isReturn && returnTrip.time.length !== 5) {
            alert('time is required')
            return  setIsTimeBack(false)
        }

        
        if(validation.isReturn && validation.isMontrealPickBack && !returnTrip.flight) {
            alert('flight is required')
            return setIsFlightBack(false)
        }
        if(validation.isReturn && validation.isMontrealPickBack && (!returnTrip.departure || !returnTrip.airline)) {
            alert('departure is required')
            return setIsDepartureBack(false)
        }

        if(!user.paymentMethod){
            alert('choice payment method')
            return setIsPayment(false)
        }
        setIsSubmit(true)
        console.log(newOrder, 'order')
        alert('order created')
        
    }
    return (
        <div  className={container}>
            {!validation.isSubmit &&
            <div className="hidden w-full sm:flex-col sm:flex items-center sm:max-w-[576px] h-full">
                {store.steps === 1 && <InfoSection />}
                {store.steps === 2 && <AddressSection />}
                {store.steps === 3 && <OptionsSection />}
                {store.steps === 4 && <PaymentSection sendOrder={sendOrder}/>}
                
                <Steps/>
            </div>}
            {!validation.isSubmit &&
            <div className="sm:hidden flex flex-col items-center">
                <InfoSection />
                <AddressSection />
                <OptionsSection />
                <PaymentSection sendOrder={sendOrder}/>
            </div>}
            {validation.isSubmit && <div className='flex justify-center'>
                <Submit />
            </div>}
            

        </div>
    );
};

export default Form;
const container = 'flex  flex-col w-full bg-white sm:max-width-[767px] sm:border-none sm:px-2 sm:items-center '