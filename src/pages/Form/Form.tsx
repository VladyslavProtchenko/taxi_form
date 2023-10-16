import InfoSection from './Info/InfoSection';
import AddressSection from './Address/AddressSection';
import OptionsSection from './Options/OptionsSection';
import { useSteps } from '../../Store/useSteps';
import Steps from './Steps';
// import { useInfo } from '../../Store/useInfo';
// import { useLocation } from '../../Store/useLocation';
// import { useReturnLocation } from '../../Store/useReturnLocation';
// import { useOptions } from '../../Store/useOptions';
import PaymentSection from './Payment/Payment';

const Form = () => {
    const { store } = useSteps()
    // const {user} = useInfo()
    // const {user:trip} = useLocation()
    // const {user:returnTrip} = useReturnLocation()
    // const {options} = useOptions()

    // const sendOrder = () => {

    //     const newOrder = {
    //         gender: user.gender,
    //         extraGender1: user.extraGender1,
    //         extraGender2: user.extraGender2,

    //         name: user.name,
    //         extraName: user.extraName1,
    //         extraName2: user.extraName2,

    //         email: user.email,
    //         extraEmail: user.extraEmail1,
    //         extraEmail2: user.extraEmail2,

    //         phone: user.phone,
    //         extraPhone: user.extraPhone1,
    //         extraPhone2: user.extraPhone2,

    //         fromLocation: trip.pickUpLocation,
    //         to: trip.dropOffLocation,
    //         stop1: trip.stopFirst,
    //         stop2: trip.stopSecond,
    //         stop3: trip.stopLast,
            
    //         date: trip.date,
    //         time: trip.time,

    //         tripType: trip.date,
    //         departure: trip.departureSection,
    //         flight: trip.flight,

    //         isReturnTrip: returnTrip.isReturnTrip,

    //         returnFromLocation: trip.pickUpLocation,
    //         returnTo: trip.dropOffLocation,
    //         returnStop1: trip.stopFirst,
    //         returnStop2: trip.stopSecond,
    //         returnStop3: trip.stopLast,
            
    //         returnDate: trip.date,
    //         returnTime: trip.time,

    //         returnTripType: trip.date,
    //         returnDeparture: trip.departureSection,
    //         returnFlight: trip.flight,

    //         carType: options.carType,
    //         passengers: options.passengers,
    //         baggage: options.baggage,
    //         carSeats: options.carSeats,
    //         sport: options.sport,
    //         pets: options.pets,
    //     } 
    //     console.log(newOrder)
    // }

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
                <PaymentSection />
            </div>


            {/* <div className="flex text-xs text-gray-400 space-x-5 flex-wrap max-w-[1024px] sm:max-w-[576px]">

                <span>gender: { user.gender}</span>
                <span>extra gender: {user.extraGender1}</span>
                <span>extra gender 2: {user.extraGender2}</span>

                <span>name: {user.name}</span>
                <span>extra name: {user.extraName1}</span>
                <span>extra name 2: {user.extraName2}</span>


                <span>email: {user.email}</span>
                <span>extra email: {user.extraEmail1}</span>
                <span>extra email 2: {user.extraEmail2}</span>

                <span>phone: {user.phone}</span>
                <span>extra phone: {user.extraPhone1}</span>
                <span>extra phone 2: {user.extraPhone2}</span>


                <span>Pick up location: {trip.pickUpLocation}</span>
                <span>Stop 1 location: {trip.stopFirst}</span>
                <span>Stop 2 location: {trip.stopSecond}</span>
                <span>Stop 3 location: {trip.stopLast}</span>
                <span>Drop off location: {trip.dropOffLocation}</span>

                <span>Date: {trip.date}</span>
                <span>Time: {trip.time}</span>

                <span>Trip type: {trip.tripType}</span>
                <span>departure: {trip.departureSection}</span>
                <span>flight: {trip.flight}</span>


                <span>Return pick up location: {returnTrip.retPickUpLocation}</span>
                <span>Return Stop 1 location: {returnTrip.retStopFirst}</span>
                <span>Return Stop 2 location: {returnTrip.retStopSecond}</span>
                <span>Return Stop 3 location: {returnTrip.retStopLast}</span>
                <span>Return Drop off location: {returnTrip.retDropOffLocation}</span>

                <span>Return Date: {returnTrip.retDate}</span>
                <span>Return Time: {returnTrip.retTime}</span>

                <span>Return Trip type: {returnTrip.retTripType}</span>
                <span>Return departure: {returnTrip.retDepartureSection}</span>
                <span>Return flight: {returnTrip.retFlight}</span>


                <span>Car type: {options.carType}</span>
                <span>Passengers:{options.passengers.adults + options.passengers.kids.length + options.passengers.babies}</span>
                <span>Kids: {options.passengers.kids.length}</span>
                <span>Babies: {options.passengers.babies}</span>

                <span>Baggage: {options.baggage[0].title} : {options.baggage[0].quantity} </span>
                <span>Baggage: {options.baggage[1].title} : {options.baggage[1].quantity} </span>
                <span>Baggage: {options.baggage[2].title} : {options.baggage[2].quantity} </span>
                <span>Baggage: {options.baggage[3].title} : {options.baggage[3].quantity} </span>

                <span>Seats: {options.carSeats[0].title} : {options.carSeats[0].quantity} </span>
                <span>Seats: {options.carSeats[1].title} : {options.carSeats[1].quantity} </span>
                <span>Seats: {options.carSeats[2].title} : {options.carSeats[2].quantity} </span>
                <span>Seats: {options.carSeats[3].title} : {options.carSeats[3].quantity} </span>

                <span>sport: {options.sport[0].title} : {options.sport[0].quantity} </span>
                <span>sport: {options.sport[1].title} : {options.sport[1].quantity} </span>
                <span>sport: {options.sport[2].title} : {options.sport[2].quantity} </span>
                <span>sport: {options.sport[3].title} : {options.sport[3].quantity} </span>

                <span>pets: {options.pets[0].isActive && options.pets[0].title} </span>
                <span>pets: {options.pets[1].isActive && options.pets[1].title} </span>
                <span>pets: {options.pets[2].isActive && options.pets[2].title} </span>
                <span>pets: {options.pets[3].isActive && options.pets[3].title} </span>
            </div>  */}
        </div>
    );
};

export default Form;

const container = 'flex pb-16 flex-col w-full bg-white sm:max-width-[767px] sm:border-none sm:px-2 sm:items-center'