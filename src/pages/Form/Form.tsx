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
        // validation, 
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

        if(user.name.length < 3) return setIsName(false)
        if(!user.gender) return setIsTitle(false)

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(user.email)) return setIsEmail(false)

        console.log(newOrder)
    }

    return (
        <div  className={container}>
            <div className="hidden w-full sm:flex-col sm:flex items-center sm:max-w-[576px]">
                {store.steps === 1 && <InfoSection />}
                {store.steps === 2 && <AddressSection />}
                {store.steps === 3 && <OptionsSection />}
                {store.steps === 4 && <h1>finish</h1>}
                {<Steps />} 
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

const container = 'flex pb-16 flex-col w-full bg-white sm:max-width-[767px] sm:border-none sm:px-2 sm:items-center'