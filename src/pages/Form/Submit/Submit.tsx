import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { useOptions } from "../../../Store/useOptions";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoTimeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

const Submit = () => {
    const { user  } = useInfo()
    const { user:location } = useLocation()
    const { returnTrip } = useReturnLocation()
    const { options } = useOptions()

    return (
        <section className={section}>
            <div className={personalInfo}>
                <FiEdit className={edit}/>
                <div className={header}>
                    Personal info
                </div>
                <div className={infoContent}>

                    {(user.gender || user.name)  && 
                    <div className={nameBox}>
                        <span className={label}>name:</span>
                        {user.gender} {user.name}
                    </div>}
                    
                    {user.email.length>4 && 
                    <div className={nameBox}>
                        <span className={label}>email:</span> 
                        {user.email} 
                    </div>}
                    {user.phone && 
                    <div className={nameBox}>
                        <span className={label}>phone:</span> 
                        {user.phone} 
                    </div>}
                </div>
            </div>

            <div className={tripInfo}>
                <FiEdit className={edit}/>
                <div className={header}>Trip info</div>

                <div className={infoContent}>

                    <div className={contentItem+' pb-3'}>
                        <IoTimeOutline  className={locationIcon}/>
                        {location.time.length>2  && 
                        <div className={timeItem}>
                            {location.time}
                        </div>}

                        {location.date && <div className={timeItem}>
                            {location.date}
                        </div>}
                    </div>

                    <div className={locations + ' pb-5'}>
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
                    <div className={contentItem + ' pb-3'}>
                        <div className={nameBox}>
                            stops: {location.stopFirst}, {location.stopSecond}, {location.stopLast}, 
                        </div>
                    </div>}

                    <div className={locations}>
                        {location.dropOffLocation && <div className={locationData}>
                            <SlLocationPin className={locationIcon}/>
                            {location.dropOffLocation}
                        </div>}
                        <div className={airports}>
                            {location.departure2 && <div className={airportsItem}>
                                {location.departure2}
                            </div>}

                            {location.airlineBack &&  location.icon2 == 1 &&  <div className={airportsItem}>
                                {location.airlineBack}
                            </div>}

                            {location.icon2 && location.flight && 
                            <div className={airportsItem}>
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
            </div>

            <div className={tripInfo}>
                {returnTrip.isReturnTrip &&<FiEdit className={edit}/>}
                {returnTrip.isReturnTrip &&<>
                <div className={header}> RETURN TRIP </div>
                <div className={infoContent}>
                    <div className={contentItem+' pb-3'}>
                        <IoTimeOutline className={locationIcon}/> 
                        {returnTrip.time.length>2 && <div className={timeItem}>
                            {returnTrip.time}
                        </div>}

                        {returnTrip.date && <div className={timeItem}>
                            {returnTrip.date}
                        </div>}
                    </div>

                    <div className={locations+' pb-5'}>
                        {(returnTrip.from || location.dropOffLocation) &&<div className={locationData}>
                            <SlLocationPin className={locationIcon}/>{returnTrip.from ? returnTrip.from: location.dropOffLocation}
                        </div>}

                        <div className={airports+ ' mb-3'}>
                            {returnTrip.departure && <div className={airportsItem}>
                                {returnTrip.departure}
                            </div>}

                            {returnTrip.airline &&  returnTrip.icon === 1  &&  
                            <div className={airportsItem}>
                                {returnTrip.airline}
                            </div>}

                            {returnTrip.icon && returnTrip.flight && 
                            <div className={airportsItem }>
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
                        
                    </div>
                
                    {(returnTrip.stop1 || returnTrip.stop2 || returnTrip.stop3) &&
                    <div className={contentItem + ' pb-3'}>
                        <div className={nameBox}>
                            stops: {returnTrip.stop1}, {returnTrip.stop2}, {returnTrip.stop3}, 
                        </div>
                    </div>}

                    <div className={locations}>
                        
                        {(returnTrip.to || location.pickUpLocation) && <div className={nameBox}>
                            <SlLocationPin className={locationIcon}/>{returnTrip.to ? returnTrip.to : location.pickUpLocation}
                        </div>}
                        <div className={airports}>
                            {returnTrip.departure2 && <div className={airportsItem}>
                                {returnTrip.departure2}
                            </div>}

                            {returnTrip.airlineBack &&  returnTrip.icon2 == 1 &&  
                            <div className={airportsItem}>
                                {returnTrip.airlineBack}
                            </div>}

                            {returnTrip.icon2 && returnTrip.flight2 && 
                            <div className={airportsItem}>
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
                    </div>    
                </div>
                </>}
            </div>

            <div className={optionsInfo}>
                <FiEdit className={edit}/>
                <div className={header}> Options </div>

                <div className={optionsContent}>
                    
                    {options.carType && <div className={nameBox}>
                        <IoCarSportOutline className={locationIcon}/>{options.carType}
                    </div>}
                    {options.passengers && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Adults: </span>
                        {options.passengers.adults},
                    </div>}
                    {options.passengers.kids.length>0 && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Kids: </span>
                        {options.passengers.kids.map(child => `${child.age} years, `)}
                    </div>}
                    {options.passengers.babies && <div className={nameBox}>
                    <span className='text-sm text-gray-600 italic pr-2'>Babies: </span>
                        {options.passengers.babies}
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

            <div className={paymentInfo}>
                <FiEdit className={edit}/>
                <div className={header}> Payments </div>

                <div className={optionsContent}>
                    
                    {user.paymentMethod && 
                    <div className={nameBox}>
                        <span className='text-sm text-gray-600 italic pr-2'>Payment method: </span>
                        {user.paymentMethod}
                    </div>}
                    {location.tripType && <div className={contentItem}>
                    <span className='text-sm text-gray-600 italic pr-2'>Trip type: </span>
                        {location.tripType}
                    </div>}
                    {user.additionalText && <div className={contentItem}>
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

const optionsContent = 'flex flex-col w-full'
const airportsItem = 'shadow px-2 py-1 flex '
const airports = 'flex'
const locationIcon = 'min-w-[22px] '
const locationData = 'flex'
const contentItem = 'flex w-full'
const locations = 'flex flex-col space-y-2'
const label = 'text-sm text-gray-600 italic pr-2'
const header = ' mb-2 bg-white px-1 absolute -top-2 left-3'

// const nameSection = 'flex space-x-4 '
const nameBox = ' flex w-full justify-between'
const edit = 'absolute right-2 top-2 text-xm text-gray-400 cursor-pointer'

const infoContent = ' flex flex-col w-full space-y-2 text-sm'

const personalInfo = 'flex w-full 2xl:w-1/3 py-4 pt-8 border px-6 rounded relative text-sm'
const tripInfo = 'flex w-full 2xl:w-1/3 xl:w-1/2 py-4 flex-shrink pt-8 border px-6 rounded relative text-sm'
const optionsInfo = 'flex w-full 2xl:w-1/2 lg:w-1/2 py-4 pt-8 border px-6 rounded relative text-sm'
const paymentInfo = 'flex w-full 2xl:w-1/2 lg:w-1/2 py-4 pt-8 border px-6 rounded relative text-sm'
const section = 'flex w-full py-8   sm:max-w-[576px] sm:border-none max-w-[1240px] flex-wrap sm:py-8 sm:px-1 lg:items-start mb-20'
