import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { useOptions } from "../../../Store/useOptions";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { BsCash } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoTimeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

const Submit = () => {
    const { user  } = useInfo()
    const { user:location } = useLocation()
    const {  } = useReturnLocation()
    const { options } = useOptions()

    return (
        <section className={section}>

            <div className={block}>
                <FiEdit className={edit}/>
                <div className={header}>
                    Personal info
                </div>
                <div className={content}>
                    {(user.gender || user.name)  && <div className={nameBox}>
                        {/* <span className={label}>name:</span> */}
                        {user.gender} {user.name}
                    </div>}
                    
                    {user.email.length>4 && <div className={nameBox}>
                        {/* <span className={label}>email:</span>  */}
                        {user.email} 
                    </div>}
                    {user.phone && <div className={nameBox}>
                        {/* <span className={label}>phone:</span>  */}
                        {user.phone} 
                    </div>}
                </div>
            </div>

            <div className={block}>
                <FiEdit className={edit}/>
                <div className={header}>Trip info</div>

                <div className={content}>

                    <div className={contentItem}>
                        <IoTimeOutline  className={locationIcon}/>
                        {location.time.length>2  && 
                        <div className={timeItem}>
                            {location.time}
                        </div>}

                        {location.date && <div className={timeItem}>
                            {location.date}
                        </div>}
                    </div>

                    <div className={locations}>
                        {location.pickUpLocation &&
                        <div className={locationData}>
                            <SlLocationPin className={locationIcon}/>
                            {location.pickUpLocation}
                        </div>}
                        
                        <div className={airports}>
                            {location.departure && <div className={airportsItem}>
                                {location.departure}
                            </div>}
                            {location.airline&&  location.icon == 1  &&  <div className={airportsItem}>
                                {location.airline}
                            </div>}
                            {location.icon && location.flight && 
                            <div className={airportsItem}>
                                {location.icon == 1 
                                    ? 'Flight#'+ location.flight
                                    : location.icon == 2
                                    ? 'Train#'+ location.flight
                                    : location.icon == 3
                                    ? 'Bus#'+ location.flight
                                    : location.icon == 4
                                    ? 'Boat#'+ location.flight
                                    : location.icon == 5
                                    ? 'Room#'+ location.flight
                                    : ''
                                }   
                            </div>}
                        </div>
                        

                        

                        
                    </div>

                    {(location.stopFirst || location.stopSecond || location.stopLast) &&
                    <div className={contentItem}>
                        <div className={nameBox}>
                            stops: {location.stopFirst}, {location.stopSecond}, {location.stopLast}, 
                        </div>
                    </div>}

                    <div className={contentItem}>
                    <SlLocationPin className={locationIcon}/>
                        {location.dropOffLocation && <div className={nameBox}>
                        {/* <span className='text-sm text-gray-600 italic pr-2'>to:</span> */}
                            {location.dropOffLocation}
                        </div>}

                        {location.departure2 && <div className={nameBox}>
                            {location.departure2}
                        </div>}

                        {location.airlineBack &&  location.icon2 == 1 &&  <div className={nameBox}>
                            {location.airlineBack}
                        </div>}

                        {location.icon2 && location.flight && 
                        <div className={nameBox}>
                            {location.icon2 == 1 
                                ? 'Flight#'+ location.flight2
                                : location.icon2 == 2
                                ? 'Train#'+ location.flight2
                                : location.icon2 == 3
                                ? 'Bus#'+ location.flight2
                                : location.icon2 == 4
                                ? 'Boat#'+ location.flight2
                                : location.icon2 == 5
                                ? 'Room#'+ location.flight2
                                : ''
                            }   
                        </div>}

                    </div>
                </div>
                
            </div>
            {/* <div className={block}>
                <FiEdit className={edit}/>
                {returnTrip.isReturnTrip &&<>
                <div className={header}> RETURN TRIP </div>

                <div className={nameSection}>
                    <IoTimeOutline/> 
                    {returnTrip.time.length>2 && <div className={nameBox}>
                        {returnTrip.time}
                    </div>}

                    {returnTrip.date && <div className={nameBox}>
                        {returnTrip.date}
                    </div>}
                </div>

                <div className={nameSection}>
                    <SlLocationPin/>
                    {(returnTrip.from || location.dropOffLocation) &&<div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>from: </span>
                        {returnTrip.from ? returnTrip.from: location.dropOffLocation}
                    </div>}

                    {returnTrip.departure && <div className={nameBox}>
                        {returnTrip.departure}
                    </div>}

                    {returnTrip.airline &&  returnTrip.icon == 1  &&  <div className={nameBox}>
                        {returnTrip.airline}
                    </div>}

                    {returnTrip.icon && returnTrip.from && 
                    <div className={nameBox}>
                        {returnTrip.icon == 1 
                            ? 'Flight#'+ returnTrip.flight
                            : returnTrip.icon == 2
                            ? 'Train#'+ returnTrip.flight
                            : returnTrip.icon == 3
                            ? 'Bus#'+ returnTrip.flight
                            : returnTrip.icon == 4
                            ? 'Boat#'+ returnTrip.flight
                            : returnTrip.icon == 5
                            ? 'Room#'+ returnTrip.flight
                            : ''
                    }   
                    </div>}
                </div>
                
                {(returnTrip.stop1 || returnTrip.stop2 || returnTrip.stop3) &&
                <div className={nameSection}>
                    <div className={nameBox}>
                        stops: {returnTrip.stop1}, {returnTrip.stop2}, {returnTrip.stop3}, 
                    </div>
                </div>}

                <div className={nameSection}>
                    <SlLocationPin/>
                    {(returnTrip.to || location.pickUpLocation) && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>to: </span>
                        {returnTrip.to ? returnTrip.to : location.pickUpLocation}
                    </div>}

                    {returnTrip.departure2 && <div className={nameBox}>
                        {returnTrip.departure2}
                    </div>}

                    {returnTrip.airlineBack &&  returnTrip.icon2 == 1 &&  
                    <div className={nameBox}>
                        {returnTrip.airlineBack}
                    </div>}

                    {returnTrip.icon2 && returnTrip.to && 
                    <div className={nameBox}>
                        {returnTrip.icon2 == 1 
                            ? 'Flight#'+ returnTrip.flight2
                            : returnTrip.icon2 == 2
                            ? 'Train#'+ location.flight2
                            : returnTrip.icon2 == 3
                            ? 'Bus#'+ returnTrip.flight2
                            : returnTrip.icon2 == 4
                            ? 'Boat#'+ returnTrip.flight2
                            : returnTrip.icon2 == 5
                            ? 'Room#'+ returnTrip.flight2
                            : ''
                        }   
                    </div>}
                </div>
            </>}
            </div> */}
            <div className={block}>
                <FiEdit className={edit}/>
                <div className={header}> Options </div>

                <div className={content}>
                    
                    {options.carType && <div className={nameBox}>
                        <IoCarSportOutline/>{options.carType}
                    </div>}
                    {options.passengers && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Passengers: adults: </span>
                        {options.passengers.adults},
                    </div>}
                    {options.passengers.kids.length>0 && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Kids: </span>
                        {options.passengers.kids.map(child => `${child.age} years, `)}
                    </div>}
                    {options.baggage.filter(item=>item.quantity > 0).length > 0 && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Baggage: </span>
                        {options.baggage.map(item=> item.isActive && item.quantity>0 && item.title + ' - ' + item.quantity)}, 
                    </div>}
                    {options.carSeats.filter(item=>item.quantity>0).length>0  && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Car seats: </span>
                        {options.carSeats.map(item=> item.isActive && item.quantity>0 && item.title + ' - ' + item.quantity+', ')}
                    </div>} 
                    {options.sport.filter(item=>item.quantity>0).length>0  && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Sport attributes: </span>
                        {options.sport.map(item=> item.isActive && item.quantity>0 && item.title + ' - ' + item.quantity)}, 
                    </div>}
                    {options.pets.filter(item=>item.isActive).length>0  && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Pets: </span>
                        {options.pets.map(item=> item.isActive &&  `${item.title} ${item.cage ? "(cage)":''}`)}
                    </div>}
                </div>
            </div>
            <div className={block}>
                <FiEdit className={edit}/>
                <div className={header}> Payments </div>

                <div className={content}>
                    
                    {user.paymentMethod && <div className={nameBox}>
                        <BsCash/><span className='text-sm text-gray-600 italic pr-2'>Payment method: </span>
                        {user.paymentMethod}
                    </div>}
                    {location.tripType && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Trip type: </span>
                        {location.tripType}
                    </div>}
                    {user.additionalText && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Additional text: </span>
                        {user.additionalText} 
                    </div>}
                    
                </div>
            </div>
        </section>
    );
};

export default Submit;

const timeItem = ' mr-4'

const airportsItem = 'shadow px-2 py-1'
const airports = 'flex'
const locationIcon = 'min-w-[22px]'
const locationData = 'flex'
const contentItem = 'flex '
const locations = 'flex flex-col space-y-2'
// const label = 'text-sm text-gray-600 italic pr-2'
const content = ' flex space-y-3 font-light xl:flex 2xl:flex'
const header = 'px-4 mb-2 text-xl'
const block = 'border p-2 px-6 rounded relative'

// const nameSection = 'flex space-x-4 '
const nameBox = ' flex '
const edit = 'absolute right-3 top-3'
const section = 'flex flex-col w-full py-8 space-y-3   sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1 lg:items-start mb-20'
