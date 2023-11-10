import dayjs from 'dayjs';
import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { useOptions } from "../../../Store/useOptions";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoPhonePortraitOutline, IoTimeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BsChatSquareText, BsPeople } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { LiaBabyCarriageSolid, LiaSkiingSolid } from "react-icons/lia";
import { PiCreditCard, PiSuitcaseRolling } from "react-icons/pi";
import { MdOutlineStroller, MdPets } from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";


const Submit = () => {
    const { user  } = useInfo()
    const { user:location } = useLocation()
    const { returnTrip } = useReturnLocation()
    const { options } = useOptions()



    return (
        <section className={section}>
            <div className='flex w-full flex-col space-y-2'>
                <div className={returnTrip.isReturnTrip ? InfoCard : InfoCard }>
                    <FiEdit className={edit}/>
                    <div className={header}>
                        Personal info
                    </div>
                    <div className={infoContent}>
                        {(user.gender || user.name)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>name:</span>
                            {user.gender} {user.name}
                        </div>}
                        {(user.extraGender1|| user.extraName1)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {user.extraGender1} {user.extraName1}
                        </div>}
                        {(user.extraGender2 || user.extraName2)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {user.extraGender2} {user.extraName2}
                        </div>}

                        {user.email.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>email:</span> 
                            {user.email} 
                        </div>}
                        {user.extraEmail1.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {user.extraEmail1} 
                        </div>}
                        {user.extraEmail2.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {user.extraEmail2} 
                        </div>}
                        {user.phone && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>phone:</span> 
                            {user.phone} 
                        </div>}
                        {user.extraPhone1 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {user.extraPhone1} 
                        </div>}
                        {user.extraPhone2 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {user.extraPhone2} 
                        </div>}
                    </div>
                </div>

                <div className={returnTrip.isReturnTrip ? InfoCard : InfoCard  }>
                    <FiEdit className={edit}/>
                    <div className={header}>Trip info</div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline  className={locationIcon}/>
                            {location.time.length>2  && 
                            <div className={timeItem}>
                                {location.time}
                            </div>}

                            {location.date && <div className={timeItem}>
                                {dayjs(location.date).format('dddd')}, {location.date}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {location.to &&
                            <div className={locationData}>
                                {location.to}
                            </div>}
                        </div>

                        {location.icon>0 && location.flight &&
                        <div className={contentItem}>
                            {location.departure && <div className={airportsItem}>
                                {location.departure}
                            </div>}
                            {location.airline &&  location.icon == 1  &&  <div className={airportsItem}>
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
                        </div>}

                        {location.stops[1] &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {location.stops[1]}
                            </div>
                        </div>}
                        {(location.stops[2]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {location.stops[2]}
                            </div>
                        </div>}
                        {(location.stops[3]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {location.stops[3]}, 
                            </div>
                        </div>}

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {location.to && <div className={locationData}>
                                {location.to}
                            </div>}
                        </div>

                        {location.icon2>0 && location.flight2 && 
                        <div className={contentItem}>
                            {location.departure2 && <div className={airportsItem}>
                                {location.departure2}
                            </div>}

                            {location.airlineBack &&  location.icon2 == 1 &&  <div className={airportsItem}>
                                {location.airlineBack}
                            </div>}

                            {location.icon2>0 && location.flight2 && 
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
                        </div>}
                    </div>             
                </div>

                <div className={returnTrip.isReturnTrip ? InfoCard : ' hidden'}>
                    {returnTrip.isReturnTrip &&<FiEdit className={edit}/>}
                    {returnTrip.isReturnTrip &&<>
                    <div className={header}> RETURN TRIP </div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline className={locationIcon}/> 
                            {returnTrip.time.length>2 && <div className={timeItem}>
                                {returnTrip.time}
                            </div>}

                            {returnTrip.date && <div className={timeItem}>
                                {returnTrip.date}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(returnTrip.from || location.to) &&<div className={locationData}>
                                {returnTrip.from ? returnTrip.from: location.to}
                            </div>}
                        </div>
                        

                        {returnTrip.icon>0 && returnTrip.flight && <div className={contentItem}>
                            {returnTrip.departure && <div className={airportsItem}>
                                {returnTrip.departure}
                            </div>}

                            {returnTrip.airline &&  returnTrip.icon === 1  &&  
                            <div className={airportsItem}>
                                {returnTrip.airline}
                            </div>}

                            {returnTrip.icon>0 && returnTrip.flight && 
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
                        </div>}
                    
                        
                        {(returnTrip.stops[1]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {returnTrip.stops[1]}
                            </div>
                        </div>}
                        {(returnTrip.stops[2]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {returnTrip.stops[2]}
                            </div>
                        </div>}
                        {(returnTrip.stops[3]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {returnTrip.stops[3]}, 
                            </div>
                        </div>}

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(returnTrip.to || location.from) && <div className={nameBox}>
                                {returnTrip.to ? returnTrip.to : location.from}
                            </div>}
                        </div>    
                        {returnTrip.icon2>0 && returnTrip.flight2 && <div className={contentItem}>
                            {returnTrip.departure2 && <div className={airportsItem}>
                                {returnTrip.departure2}
                            </div>}

                            {returnTrip.airlineBack &&  returnTrip.icon2 == 1 &&  
                            <div className={airportsItem}>
                                {returnTrip.airlineBack}
                            </div>}

                            {returnTrip.icon2>0 && returnTrip.flight2 && 
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
                        </div>}
                    </div>
                    </>}
                </div> 
            </div>
            
            <div className="flex w-full flex-col">
                <div className={returnTrip.isReturnTrip ? InfoCard: InfoCard  }>
                    <FiEdit className={edit}/>
                    <div className={header}> Options </div>

                    <div className={infoContent}>
                        
                        {options.carType && <div className={contentItem}>
                            <IoCarSportOutline className={locationIcon}/> <span className='text-sm text-gray-600 italic pr-2'>car type: </span>{options.carType}
                        </div>}
                        {options.passengers && <div className={contentItem}>
                        <BsPeople className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>adults: </span>
                            {options.passengers.adults},
                        </div>}
                        {(options.passengers.kids.length> 0) && <div className={contentItem}>
                        <span className={kidsIcon}></span>
                        <span className='text-sm text-gray-600 italic pr-2'>Kids: </span>
                            {options.passengers.kids.map(child => (<span className='px-1 rounded border mx-1'>{child.age} years</span>))}
                        </div>}
                        {options.passengers.babies>0   && <div className={contentItem}>
                        <LiaBabyCarriageSolid className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Babies: </span>
                            {options.passengers.babies}
                        </div>}
                        {options.baggage.filter(item=>item.quantity > 0).length > 0 && <div className={contentItem}>
                        <PiSuitcaseRolling className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Baggage: </span>
                            {options.baggage.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))} 
                        </div>}
                        {options.carSeats.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <MdOutlineStroller className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Car seats: </span>
                            {options.carSeats.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>} 
                        {options.sport.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <LiaSkiingSolid className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Sport attributes: </span>
                            {options.sport.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>}
                        {options.pets.filter(item=>item.isActive).length>0  && <div className={contentItem}>
                        <MdPets className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Pets: </span>
                            {options.pets.map(item=> item.isActive && (<span className='px-1 rounded border mx-1'>{`${item.title} ${item.cage ? "(cage)":''}`}</span>) )}
                        </div>}
                    </div>
                </div>

                <div className={returnTrip.isReturnTrip ? InfoCard: InfoCard }>
                    <FiEdit className={edit}/>
                    <div className={header}> Payments </div>

                    <div className={infoContent}>
                        
                        {user.paymentMethod && 
                        <div className={contentItem}>
                            <PiCreditCard className={locationIcon}/>
                            <span className='text-sm text-gray-600 italic pr-2'>Payment method: </span>
                            {user.paymentMethod}
                        </div>}
                        {location.tripType && <div className={contentItem}>
                        <GiPalmTree className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Trip type: </span>
                            {location.tripType}
                        </div>}
                        {user.additionalText && <div className={contentItem}>
                        <BsChatSquareText className={locationIcon}/>

                        <span className='text-sm text-gray-600 italic pr-2'>Additional text: </span>
                            {user.additionalText} 
                        </div>}
                        
                    </div>
                </div>
            </div>    
        </section>
    );
};

export default Submit;


const timeItem = ' mr-4'

const airportsItem = 'shadow px-2 py-1 flex '
const locationIcon = 'min-w-[22px] '
const stopIcon = 'min-w-[22px] text-yellow-400'
const locationData = 'flex'
const contentItem = 'flex w-full border p-2 items-center'
const label = 'text-sm text-gray-600 italic pr-2'
const header = ' mb-2 bg-white px-1 absolute -top-2 left-3'

const card = 'flex items-center p-2 border '
const nameBox = ' flex w-full justify-between '
const edit = 'absolute right-2 -top-2 text-xm text-gray-400 cursor-pointer'

const infoContent = ' flex flex-col w-full space-y-2 text-sm'
const InfoCard = 'flex w-full  py-4 pt-8 px-2  relative text-sm'

const kidsIcon ='w-4 mr-2 h-[16px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[140%]'
const section = 'flex w-full space-y-4  flex-col max-w-[576px] border-none  flex-wrap py-8 px-1 mb-20'

