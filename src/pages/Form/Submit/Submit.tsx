import dayjs from 'dayjs';

import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoPhonePortraitOutline, IoTimeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BsChatSquareText, BsPeople } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { LiaBabyCarriageSolid, LiaSkiingSolid } from "react-icons/lia";
import { PiCreditCard, PiSuitcaseRolling } from "react-icons/pi";
import { MdOutlineStroller, MdPets } from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";
import { useMain } from '../../../Store/useMain';


const Submit = () => {
    const { activeCarId, list } =useMain()

    return (
        <section className={section}>
            <div className='flex w-full flex-col space-y-2'>
                <div className={list[activeCarId-1].isReturnTrip ? InfoCard : InfoCard }>
                    <FiEdit className={edit}/>
                    <div className={header}>
                        Personal info
                    </div>
                    <div className={infoContent}>
                        {(list[activeCarId-1].title || list[activeCarId-1].name)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>name:</span>
                            {list[activeCarId-1].title} {list[activeCarId-1].name}
                        </div>}
                        {(list[activeCarId-1].title2|| list[activeCarId-1].name2)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {list[activeCarId-1].title2} {list[activeCarId-1].name2}
                        </div>}
                        {(list[activeCarId-1].title3 || list[activeCarId-1].name3)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {list[activeCarId-1].title3} {list[activeCarId-1].name3}
                        </div>}

                        {list[activeCarId-1].email.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>email:</span> 
                            {list[activeCarId-1].email} 
                        </div>}
                        {list[activeCarId-1].email2.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {list[activeCarId-1].email2} 
                        </div>}
                        {list[activeCarId-1].email3.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {list[activeCarId-1].email3} 
                        </div>}
                        {list[activeCarId-1].phone && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>phone:</span> 
                            {list[activeCarId-1].phone} 
                        </div>}
                        {list[activeCarId-1].phone2 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {list[activeCarId-1].phone2} 
                        </div>}
                        {list[activeCarId-1].phone3 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {list[activeCarId-1].phone3} 
                        </div>}
                    </div>
                </div>

                <div className={list[activeCarId-1].isReturnTrip ? InfoCard : InfoCard  }>
                    <FiEdit className={edit}/>
                    <div className={header}>Trip info</div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline  className={locationIcon}/>
                            {list[activeCarId-1].time.length>2  && 
                            <div className={timeItem}>
                                {list[activeCarId-1].time}
                            </div>}

                            {list[activeCarId-1].date && <div className={timeItem}>
                                {dayjs(list[activeCarId-1].date).format('dddd')}, {list[activeCarId-1].date}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {list[activeCarId-1].to &&
                            <div className={locationData}>
                                {list[activeCarId-1].to}
                            </div>}
                        </div>

                        {list[activeCarId-1].icon>0 && list[activeCarId-1].flight &&
                        <div className={contentItem}>
                            {list[activeCarId-1].departure && <div className={airportsItem}>
                                {list[activeCarId-1].departure}
                            </div>}
                            {list[activeCarId-1].airlines &&  list[activeCarId-1].icon == 1  &&  <div className={airportsItem}>
                                {list[activeCarId-1].airlines}
                            </div>}
                            {list[activeCarId-1].icon && list[activeCarId-1].flight && 
                            <div className={airportsItem}>
                                {list[activeCarId-1].icon == 1 
                                    ? 'Flight#'+ list[activeCarId-1].flight
                                    : list[activeCarId-1].icon == 2
                                    ? 'Train#'+ list[activeCarId-1].flight
                                    : list[activeCarId-1].icon == 3
                                    ? 'Bus#'+ list[activeCarId-1].flight
                                    : list[activeCarId-1].icon == 4
                                    ? 'Boat#'+ list[activeCarId-1].flight
                                    : list[activeCarId-1].icon == 5
                                    ? 'Room#'+ list[activeCarId-1].flight
                                    : ''
                                }   
                            </div>}
                        </div>}

                        {list[activeCarId-1].stops[1] &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stops[1]}
                            </div>
                        </div>}
                        {(list[activeCarId-1].stops[2]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stops[2]}
                            </div>
                        </div>}
                        {(list[activeCarId-1].stops[3]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stops[3]}, 
                            </div>
                        </div>}

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {list[activeCarId-1].to && <div className={locationData}>
                                {list[activeCarId-1].to}
                            </div>}
                        </div>

                        {list[activeCarId-1].icon2>0 && list[activeCarId-1].flight2 && 
                        <div className={contentItem}>
                            {list[activeCarId-1].departure2 && <div className={airportsItem}>
                                {list[activeCarId-1].departure2}
                            </div>}

                            {list[activeCarId-1].airlinesBack &&  list[activeCarId-1].icon2 == 1 &&  <div className={airportsItem}>
                                {list[activeCarId-1].airlinesBack}
                            </div>}

                            {list[activeCarId-1].icon2>0 && list[activeCarId-1].flight2 && 
                            <div className={airportsItem}>
                                {list[activeCarId-1].icon2 == 1 
                                    ? 'Flight#'+ list[activeCarId-1].flight2
                                    : list[activeCarId-1].icon2 == 2
                                    ? 'Train#'+ list[activeCarId-1].flight2
                                    : list[activeCarId-1].icon2 == 3
                                    ? 'Bus#'+ list[activeCarId-1].flight2
                                    : list[activeCarId-1].icon2 == 4
                                    ? 'Boat#'+ list[activeCarId-1].flight2
                                    : list[activeCarId-1].icon2 == 5
                                    ? 'Room#'+ list[activeCarId-1].flight2
                                    : ''
                                }   
                            </div>}
                        </div>}
                    </div>             
                </div>

                <div className={list[activeCarId-1].isReturnTrip ? InfoCard : ' hidden'}>
                    {list[activeCarId-1].isReturnTrip &&<FiEdit className={edit}/>}
                    {list[activeCarId-1].isReturnTrip &&<>
                    <div className={header}> RETURN TRIP </div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline className={locationIcon}/> 
                            {list[activeCarId-1].timeR.length>2 && <div className={timeItem}>
                                {list[activeCarId-1].timeR}
                            </div>}

                            {list[activeCarId-1].dateR && <div className={timeItem}>
                                {list[activeCarId-1].dateR}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(list[activeCarId-1].fromR || list[activeCarId-1].to) &&<div className={locationData}>
                                {list[activeCarId-1].fromR ? list[activeCarId-1].fromR: list[activeCarId-1].to}
                            </div>}
                        </div>
                        

                        {list[activeCarId-1].iconR>0 && list[activeCarId-1].flightR && <div className={contentItem}>
                            {list[activeCarId-1].departureR && <div className={airportsItem}>
                                {list[activeCarId-1].departureR}
                            </div>}

                            {list[activeCarId-1].airlinesR &&  list[activeCarId-1].iconR === 1  &&  
                            <div className={airportsItem}>
                                {list[activeCarId-1].airlinesR}
                            </div>}

                            {list[activeCarId-1].iconR>0 && list[activeCarId-1].flightR && 
                            <div className={airportsItem }>
                                {list[activeCarId-1].iconR == 1 
                                    ? 'Flight#'+ list[activeCarId-1].flightR
                                    : list[activeCarId-1].iconR == 2
                                    ? 'Train#'+ list[activeCarId-1].flightR
                                    : list[activeCarId-1].iconR == 3
                                    ? 'Bus#'+ list[activeCarId-1].flightR
                                    : list[activeCarId-1].iconR == 4
                                    ? 'Boat#'+ list[activeCarId-1].flightR
                                    : list[activeCarId-1].iconR == 5
                                    ? 'Room#'+ list[activeCarId-1].flightR
                                    : ''
                            }   
                            </div>}
                        </div>}
                    
                        
                        {(list[activeCarId-1].stopsR[1]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stopsR[1]}
                            </div>
                        </div>}
                        {(list[activeCarId-1].stopsR[2]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stopsR[2]}
                            </div>
                        </div>}
                        {(list[activeCarId-1].stopsR[3]) &&
                        <div className={contentItem}>
                            <SlLocationPin className={stopIcon}/>
                            <div className={nameBox}>
                                {list[activeCarId-1].stopsR[3]}, 
                            </div>
                        </div>}

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(list[activeCarId-1].toR || list[activeCarId-1].from) && <div className={nameBox}>
                                {list[activeCarId-1].toR ? list[activeCarId-1].toR : list[activeCarId-1].from}
                            </div>}
                        </div>    
                        {list[activeCarId-1].icon2R>0 && list[activeCarId-1].flight2R && <div className={contentItem}>
                            {list[activeCarId-1].departure2R && <div className={airportsItem}>
                                {list[activeCarId-1].departure2R}
                            </div>}

                            {list[activeCarId-1].airlinesBackR &&  list[activeCarId-1].icon2R == 1 &&  
                            <div className={airportsItem}>
                                {list[activeCarId-1].airlinesBackR}
                            </div>}

                            {list[activeCarId-1].icon2R>0 && list[activeCarId-1].flight2R && 
                            <div className={airportsItem}>
                                {list[activeCarId-1].icon2R == 1 
                                    ? 'Flight#'+ list[activeCarId-1].flight2R
                                    : list[activeCarId-1].icon2R == 2
                                    ? 'Train#'+ list[activeCarId-1].flight2R
                                    : list[activeCarId-1].icon2R == 3
                                    ? 'Bus#'+ list[activeCarId-1].flight2R
                                    : list[activeCarId-1].icon2 == 4
                                    ? 'Boat#'+ list[activeCarId-1].flight2R
                                    : list[activeCarId-1].icon2R == 5
                                    ? 'Room#'+ list[activeCarId-1].flight2R
                                    : ''
                                }   
                            </div>}
                        </div>}
                    </div>
                    </>}
                </div> 
            </div>
            
            <div className="flex w-full flex-col">
                <div className={list[activeCarId-1].isReturnTrip ? InfoCard: InfoCard  }>
                    <FiEdit className={edit}/>
                    <div className={header}> Options </div>

                    <div className={infoContent}>
                        
                        {list[activeCarId-1].carType && <div className={contentItem}>
                            <IoCarSportOutline className={locationIcon}/> <span className='text-sm text-gray-600 italic pr-2'>car type: </span>{list[activeCarId-1].carType}
                        </div>}
                        {list[activeCarId-1].passengers && <div className={contentItem}>
                        <BsPeople className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>adults: </span>
                            {list[activeCarId-1].passengers.adults},
                        </div>}
                        {(list[activeCarId-1].passengers.kids.length> 0) && <div className={contentItem}>
                        <span className={kidsIcon}></span>
                        <span className='text-sm text-gray-600 italic pr-2'>Kids: </span>
                            {list[activeCarId-1].passengers.kids.map(child => (<span className='px-1 rounded border mx-1'>{child.age} years</span>))}
                        </div>}
                        {list[activeCarId-1].passengers.babies>0   && <div className={contentItem}>
                        <LiaBabyCarriageSolid className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Babies: </span>
                            {list[activeCarId-1].passengers.babies}
                        </div>}
                        {list[activeCarId-1].baggage.filter(item=>item.quantity > 0).length > 0 && <div className={contentItem}>
                        <PiSuitcaseRolling className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Baggage: </span>
                            {list[activeCarId-1].baggage.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))} 
                        </div>}
                        {list[activeCarId-1].carSeats.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <MdOutlineStroller className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Car seats: </span>
                            {list[activeCarId-1].carSeats.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>} 
                        {list[activeCarId-1].sport.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <LiaSkiingSolid className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Sport attributes: </span>
                            {list[activeCarId-1].sport.map(item=> item.isActive && item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>}
                        {list[activeCarId-1].pets.filter(item=>item.isActive).length>0  && <div className={contentItem}>
                        <MdPets className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Pets: </span>
                            {list[activeCarId-1].pets.map(item=> item.isActive && (<span className='px-1 rounded border mx-1'>{`${item.title} ${item.cage ? "(cage)":''}`}</span>) )}
                        </div>}
                    </div>
                </div>

                <div className={list[activeCarId-1].isReturnTrip ? InfoCard: InfoCard }>
                    <FiEdit className={edit}/>
                    <div className={header}> Payments </div>

                    <div className={infoContent}>
                        
                        {list[activeCarId-1].paymentMethod && 
                        <div className={contentItem}>
                            <PiCreditCard className={locationIcon}/>
                            <span className='text-sm text-gray-600 italic pr-2'>Payment method: </span>
                            {list[activeCarId-1].paymentMethod}
                        </div>}
                        {list[activeCarId-1].tripType && <div className={contentItem}>
                        <GiPalmTree className={locationIcon}/>
                        <span className='text-sm text-gray-600 italic pr-2'>Trip type: </span>
                            {list[activeCarId-1].tripType}
                        </div>}
                        {list[activeCarId-1].additionalText && <div className={contentItem}>
                        <BsChatSquareText className={locationIcon}/>

                        <span className='text-sm text-gray-600 italic pr-2'>Additional text: </span>
                            {list[activeCarId-1].additionalText} 
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

