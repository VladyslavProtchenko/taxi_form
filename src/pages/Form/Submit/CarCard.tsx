import React, { useState } from 'react';
import { ITaxi } from '../../../Store/useMain';
import dayjs from 'dayjs';

import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoPhonePortraitOutline, IoTimeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BsChatSquareText, BsPeople } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { LiaSkiingSolid } from "react-icons/lia";
import { PiCreditCard, PiSuitcaseRolling } from "react-icons/pi";
import { MdOutlineStroller, MdPets } from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";

const CarCard = ({item}:{item: ITaxi}):React.ReactNode => {
    const [open, setOpen] = useState(false)

    return (
        <div className={car}>
        <div className="flex w-full">
            <div className='flex flex-col w-1/6'>
                <h1 className='text-sm text-gray-600 mb-0 pt-1'> {item.carType.split(' ')[0]}</h1>
                <div 
                    className="text-xs mt-auto text-blue-400 cursor-pointer "
                    onClick={()=>setOpen(!open)}
                >info...</div>
            </div>
            

            <div className='flex flex-col w-1/2 pr-2'>
                <div className='flex  px-2 py-1  text-[10px] border-b'>{item.date}, {item.time}</div>
                <div className="flex px-2 text-[10px] truncate mt-1">{item.from} </div>
                <div className="flex px-2 text-[10px] truncate mt-1"> {item.to}</div>
            </div>
            <div className="flex flex-col ml-auto justify-between">
                <button className={submit2}>remove</button>
                <button className={submit}>submit</button>
            </div>
        </div>
        
        <div className={open ? " flex w-full flex-col  mt-4 ":  ' hidden '}>
            <div className='flex w-full flex-col space-y-2'>
                <div className={item.isReturnTrip ? InfoCard : InfoCard }>
                    <div className={header}>
                        Personal info
                    </div>
                    <div className={infoContent}>
                        {(item.title && item.name)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>name:</span>
                            {item.title} {item.name}
                        </div>}
                        {(item.title2 && item.name2)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {item.title2} {item.name2}
                        </div>}
                        {(item.title3 && item.name3)  && 
                        <div className={card}>
                            <BsPeople className={locationIcon}/>
                            <span className={label}>extra name:</span>
                            {item.title3} {item.name3}
                        </div>}

                        {item.email.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>email:</span> 
                            {item.email} 
                        </div>}
                        {item.email2.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {item.email2} 
                        </div>}
                        {item.email3.length>4 && 
                        <div className={card}>
                            <TfiEmail className={locationIcon}/>
                            <span className={label}>extra email:</span> 
                            {item.email3} 
                        </div>}
                        {item.phone && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>phone:</span> 
                            {item.phone} 
                        </div>}
                        {item.phone2 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {item.phone2} 
                        </div>}
                        {item.phone3 && 
                        <div className={card}>
                            <IoPhonePortraitOutline className={locationIcon}/>
                            <span className={label}>extra phone:</span> 
                            {item.phone3} 
                        </div>}
                    </div>
                </div>

                <div className={item.isReturnTrip ? InfoCard : InfoCard  }>
                    <div className={header}>Trip info</div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline  className={locationIcon}/>
                            {item.time.length>2  && 
                            <div className={timeItem}>
                                {item.time}
                            </div>}

                            {item.date && <div className={timeItem}>
                                {dayjs(item.date).format('dddd')}, {item.date}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {item.to &&
                            <div className={locationData}>
                                {item.to}
                            </div>}
                        </div>

                        {item.icon>0 && item.flight &&
                        <div className={contentItem}>
                            {item.departure && <div className={airportsItem}>
                                {item.departure}
                            </div>}
                            {item.airlines &&  item.icon == 1  &&  <div className={airportsItem}>
                                {item.airlines}
                            </div>}
                            {item.icon && item.flight && 
                            <div className={airportsItem}>
                                {item.icon == 1 
                                    ? 'Flight#'+ item.flight
                                    : item.icon == 2
                                    ? 'Train#'+ item.flight
                                    : item.icon == 3
                                    ? 'Bus#'+ item.flight
                                    : item.icon == 4
                                    ? 'Boat#'+ item.flight
                                    : item.icon == 5
                                    ? 'Room#'+ item.flight
                                    : ''
                                }   
                            </div>}
                        </div>}

                        {Object.values(item.stops).map(item=>(
                            <div className={contentItem + ' pl-10'}>
                                <SlLocationPin className={stopIcon}/>
                                <div className={nameBox}>
                                    {item}
                                </div>
                            </div>
                        ))
                        }

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {item.to && <div className={locationData}>
                                {item.to}
                            </div>}
                        </div>

                        {item.icon2>0 && item.flight2 && 
                        <div className={contentItem}>
                            {item.departure2 && <div className={airportsItem}>
                                {item.departure2}
                            </div>}

                            {item.airlinesBack &&  item.icon2 == 1 &&  <div className={airportsItem}>
                                {item.airlinesBack}
                            </div>}

                            {item.icon2>0 && item.flight2 && 
                            <div className={airportsItem}>
                                {item.icon2 == 1 
                                    ? 'Flight#'+ item.flight2
                                    : item.icon2 == 2
                                    ? 'Train#'+ item.flight2
                                    : item.icon2 == 3
                                    ? 'Bus#'+ item.flight2
                                    : item.icon2 == 4
                                    ? 'Boat#'+ item.flight2
                                    : item.icon2 == 5
                                    ? 'Room#'+ item.flight2
                                    : ''
                                }   
                            </div>}
                        </div>}
                    </div>             
                </div>

                <div className={item.isReturnTrip ? InfoCard : ' hidden'}>
                    {item.isReturnTrip &&<FiEdit className={edit}/>}
                    {item.isReturnTrip &&<>
                    <div className={header}> RETURN TRIP </div>
                    <div className={infoContent}>
                        <div className={contentItem}>
                            <IoTimeOutline className={locationIcon}/> 
                            {item.timeR.length>2 && <div className={timeItem}>
                                {item.timeR}
                            </div>}

                            {item.dateR && <div className={timeItem}>
                                {item.dateR}
                            </div>}
                        </div>

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(item.fromR || item.to) &&<div className={locationData}>
                                {item.fromR ? item.fromR: item.to}
                            </div>}
                        </div>
                        

                        {item.iconR>0 && item.flightR && <div className={contentItem}>
                            {item.departureR && <div className={airportsItem}>
                                {item.departureR}
                            </div>}

                            {item.airlinesR &&  item.iconR === 1  &&  
                            <div className={airportsItem}>
                                {item.airlinesR}
                            </div>}

                            {item.iconR>0 && item.flightR && 
                            <div className={airportsItem }>
                                {item.iconR == 1 
                                    ? 'Flight#'+ item.flightR
                                    : item.iconR == 2
                                    ? 'Train#'+ item.flightR
                                    : item.iconR == 3
                                    ? 'Bus#'+ item.flightR
                                    : item.iconR == 4
                                    ? 'Boat#'+ item.flightR
                                    : item.iconR == 5
                                    ? 'Room#'+ item.flightR
                                    : ''
                            }   
                            </div>}
                        </div>}
                    
                        
                        {Object.values(item.stopsR).map(item=>(
                            <div className={contentItem+ ' pl-10 '}>
                                <SlLocationPin className={stopIcon}/>
                                <div className={nameBox}>
                                    {item}
                                </div>
                            </div>
                        ))}
                    

                        <div className={contentItem}>
                            <SlLocationPin className={locationIcon}/>
                            {(item.toR || item.from) && <div className={nameBox}>
                                {item.toR ? item.toR : item.from}
                            </div>}
                        </div>    
                        {item.icon2R>0 && item.flight2R && <div className={contentItem}>
                            {item.departure2R && <div className={airportsItem}>
                                {item.departure2R}
                            </div>}

                            {item.airlinesBackR &&  item.icon2R == 1 &&  
                            <div className={airportsItem}>
                                {item.airlinesBackR}
                            </div>}

                            {item.icon2R>0 && item.flight2R && 
                            <div className={airportsItem}>
                                {item.icon2R == 1 
                                    ? 'Flight#'+ item.flight2R
                                    : item.icon2R == 2
                                    ? 'Train#'+ item.flight2R
                                    : item.icon2R == 3
                                    ? 'Bus#'+ item.flight2R
                                    : item.icon2 == 4
                                    ? 'Boat#'+ item.flight2R
                                    : item.icon2R == 5
                                    ? 'Room#'+ item.flight2R
                                    : ''
                                }   
                            </div>}
                        </div>}
                    </div>
                    </>}
                </div> 
            </div> 
            
            <div className="flex w-full flex-col">
                <div className={item.isReturnTrip ? InfoCard: InfoCard  }>
                    <div className={header}> Options </div>

                    <div className={infoContent}>
                        
                        {item.carType && <div className={contentItem}>
                            <IoCarSportOutline className={locationIcon}/> <span className='text-sm text-gray-600 italic pr-2'>car type: </span>{item.carType}
                        </div>}
                        {item.passengers && <div className={contentItem}>
                        <BsPeople className={locationIcon}/>
                            <div className='border-r pr-1 border-black'><span className={optionsItem}>adults - </span> {item.passengers.adults}</div>
                            {item.passengers.kids.length && <div className='px-1 border-r border-black'><span className={optionsItem}>Kids - </span> {item.passengers.kids.length}</div>}
                            {item.passengers.babies>0 && <div className='px-1 border-r border-black'><span className={optionsItem}>Babies - </span> {item.passengers.babies}</div>}
                        </div>}

                        {item.baggage.filter(item=>item.quantity > 0).length > 0 && <div className={contentItem}>
                        <PiSuitcaseRolling className={locationIcon}/>
                        <span className={optionsItem}>Baggage: </span>
                            {item.baggage.map(item=>item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))} 
                        </div>}
                        {item.carSeats.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <MdOutlineStroller className={locationIcon}/>
                        <span className={optionsItem}>Car seats: </span>
                            {item.carSeats.map(item=>  item.quantity>0 && (<span className='px-1 rounded border mx-1 truncate'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>} 
                        {item.sport.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
                        <LiaSkiingSolid className={locationIcon}/>
                        <span className={optionsItem}>Sport attributes: </span>
                            {item.sport.map(item=>  item.quantity>0 && (<span className='px-1 rounded border mx-1'>{item.quantity + ' x ' + item.title}</span>))}
                        </div>}
                        {item.pets.filter(item=>item.isActive).length>0  && <div className={contentItem}>
                        <MdPets className={locationIcon}/>
                        <span className={optionsItem}>Pets: </span>
                            {item.pets.map(item=> (<span className='px-1 rounded border mx-1'>{`${item.title} ${item.cage ? "(cage)":''}`}</span>) )}
                        </div>}
                    </div>
                </div>

                <div className={item.isReturnTrip ? InfoCard: InfoCard }>
                    <div className={header}> Payments </div>

                    <div className={infoContent}>
                        
                        {item.paymentMethod && 
                        <div className={contentItem}>
                            <PiCreditCard className={locationIcon}/>
                            <span className={optionsItem}>Payment method: </span>
                            {item.paymentMethod}
                        </div>}
                        {item.tripType && <div className={contentItem}>
                        <GiPalmTree className={locationIcon}/>
                        <span className={optionsItem}>Trip type: </span>
                            {item.tripType}
                        </div>}
                        {item.additionalText && <div className={contentItem}>
                        <BsChatSquareText className={locationIcon}/>

                        <span className={optionsItem}>Additional text: </span>
                            {item.additionalText} 
                        </div>}
                        
                    </div>
                </div>
            </div> 
        </div>
    </div>
    );
};

export default CarCard;

const submit2 ='text-sm bg-red-400 rounded px-1 text-white py-[2px] text-xs'
const submit ='text-sm bg-green-400 rounded px-1 text-white py-[2px] text-xs'
const car = 'relative flex flex-col border w-full px-2 py-2 items-center '

const timeItem = ' mr-4'

const optionsItem ='text-xs text-gray-600 italic pr-2'
const airportsItem = 'shadow px-2 py-1 flex '
const locationIcon = 'min-w-[22px] '
const stopIcon = 'min-w-[22px] text-yellow-400'
const locationData = 'flex'
const contentItem = 'flex w-full text-xs px-2 items-center'
const label = 'text-xs text-gray-600 italic pr-2'
const header = ' mb-2 bg-white px-1 absolute -top-2 left-3 text-xs'

const card = 'flex items-center px-2 text-xs'
const nameBox = ' flex w-full justify-between '
const edit = 'absolute right-2 -top-2 text-xm text-gray-400 cursor-pointer'

const infoContent = ' flex flex-col w-full space-y-2 text-sm'
const InfoCard = 'flex w-full  py-4 pt-4 border-t px-2  relative text-sm'

// const kidsIcon ='w-4 mr-2 h-[16px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[140%]'
