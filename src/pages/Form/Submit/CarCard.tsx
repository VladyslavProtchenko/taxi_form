import React, { useState } from 'react';
import { ITaxi, useMain } from '../../../Store/useMain';
import dayjs from 'dayjs';

import { SlLocationPin } from "react-icons/sl";
import { IoCarSportOutline, IoTimeOutline } from "react-icons/io5";
// import { FiEdit } from "react-icons/fi";
// import { BsChatSquareText, BsPeople } from "react-icons/bs";
// import { TfiEmail } from "react-icons/tfi";
// import { LiaShuttleVanSolid, LiaSkiingSolid } from "react-icons/lia";
// import { PiCreditCard, PiJeepLight, PiSuitcaseRolling } from "react-icons/pi";
// import { MdOutlineStroller, MdPets } from "react-icons/md";
// import { GiPalmTree } from "react-icons/gi";
import { useStore } from '../../../Store';
import { AiOutlineStop } from 'react-icons/ai';
import { LiaShuttleVanSolid } from 'react-icons/lia';
import { PiJeepLight } from 'react-icons/pi';

const CarCard = ({item}:{item: ITaxi}):React.ReactNode => {
    const [open, setOpen] = useState(false)
    const {store} = useStore()
    const { setFilled, isFrench } = useMain()

    

    
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
                <div className='flex  px-2 py-1  text-[10px] border-b'>{dayjs(item.date.split('/').reverse().join('-')).format('dddd')}, {item.date}, {item.time}</div>
                <div className="flex px-2 text-[10px] truncate mt-1">{item.from} </div>
                <div className="flex px-2 text-[10px] truncate mt-1"> {item.to}</div>
            </div>
            <div className="flex flex-col ml-auto justify-between">
                <button className={submit2} onClick={()=>setFilled(false, item.id)}>remove</button>
                <button className={submit} onClick={()=>alert('taxi is ordered')}>submit</button>
            </div>
        </div>
        
        <div className={open ? " flex w-full flex-col  mt-4 ":  ' hidden '}>
            <div className='flex w-full flex-col space-y-2'>
                <div className={InfoCard}>
                    <div className={header}>
                        Personal info
                    </div>
                    <div className={headers}>
                        <div className={headItem}>
                            <div className='mb-2 '>Names</div>
                            {item.name.length>3 && <div className={text}>{item.name}</div>}
                            {item.name2.length>3 && <div className={text}>{item.name2}</div>}
                            {item.name3.length>3 && <div className={text}>{item.name3}</div>}
                        </div>

                        <div className={headItem}>
                            <div className='mb-2 '>E-mails</div>
                            {item.email.length>6 && <div className={text}>{item.email}</div>}
                            {item.email2.length>6 && <div className={text}>{item.email2}</div>}
                            {item.email3.length>6 && <div className={text}>{item.email3}</div>}
                        </div>

                        <div className={headItem}>
                            <div className='mb-2 '>Phones</div>
                            {item.phone && <div className={text}>{item.phone}</div>}
                            {item.phone2 && <div className={text}>{item.phone2}</div>}
                            {item.phone3 && <div className={text}>{item.phone3}</div>}
                        </div>
                    </div>
                </div>

                <div className={InfoCard}>
                    <div className={header}>Trip info</div>

                    <div className={trip}>
                        <div className={tripItem}>
                            <h1 className={tripHeader}>{isFrench? store.tripTitlesF[0]: store.tripTitles[0]}</h1>

                            <div className={tripContent}>
                                {<div className={'flex items-start mb-2'}><IoTimeOutline className={icon+ ' mt-[2px]' }/>
                                    <div className='flex flex-col items-start justify-start'>
                                        <span>{dayjs(item.date.split('/').reverse().join('-')).format('dddd')}, {item.date}</span>
                                        <span className='w-full'>{item.time}</span> 
                                    </div>
                                </div>}
                                <div className={text}><SlLocationPin className={icon+ ' text-green-400'}/>{item.from}</div>
                                {Object.values(item.stops).filter(i=>i).map(item=>(
                                    <div className={text+ ' ml-3'}><SlLocationPin className={stopIcon}/>{item}</div>
                                ))}
                                <div className={text}><SlLocationPin className={icon+ ' text-red-400'}/>{item.to}</div>
                                
                            </div>
                        </div>

                        {item.isReturnTrip && <div className={tripItem}>
                            <h1 className={tripHeader}>{isFrench? store.tripTitlesF[1]: store.tripTitles[1]}</h1>

                            <div className={tripContent}>
                                {<div className={text}><IoTimeOutline className={icon}/>{dayjs(item.dateR.split('/').reverse().join('-')).format('dddd')}, {item.dateR}, <span>{item.timeR}</span></div>}
                                <div className={text}><SlLocationPin className={icon+ ' text-green-400'}/>{item.fromR}</div>
                                {Object.values(item.stopsR).map(item=>(
                                    <div className={text+ ' ml-3'}><SlLocationPin className={stopIcon}/>{item}</div>
                                ))}
                                <div className={text}><SlLocationPin className={icon+ ' text-red-400'}/>{item.toR}</div>
                                
                            </div>
                        </div>}
                    </div>
                    
                </div>


                <div className={InfoCard}>
                    <div className={header}>Options</div>
                    <div className={options}>
                    <div className={item.carType ? type : type + ' border-red-500'}>
                        {store.carList.map(car => (
                            <div className={item.carType === car ? typeItem+' bg-green-400': car === 'limo' ? typeItem + ' bg-gray-200  text-gray-500 cursor':typeItem } onClick={()=>{ }}>
                                { car === 'VAN'
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                :car === 'SUV'
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                :car === 'limo'
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate flex '>{car}</div>
                            </div>
                        ))}
                    </div>
                    <div className={type2}>
                        <div className={item.passengers.adults ? typeItem2 + ' bg-green-400': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{isFrench? 'Adultes': 'Adults'}</div>
                        </div>
                        <div className={item.passengers.kids.length ? typeItem2 + ' bg-green-400': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{isFrench? 'Enfants': 'Kids'}</div>
                        </div>
                        <div className={item.passengers.babies ? typeItem2 + ' bg-green-400': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{isFrench? 'Bébés': 'Babies'}</div>
                        </div>
                    </div>

                    <div className='flex w-3/4 divide-x'>
                        <div className={optionItem}>
                            <div className={text}>{item.passengers.adults}</div>
                        </div>
                        <div className={optionItem}>
                            {
                                item.passengers.kids.map(kid=>(
                                    <div className={text}>{kid.age} years</div>

                                ))
                            }
                        </div>
                        <div className={optionItem}>
                            <div className={text}>{item.passengers.babies}</div>
                        </div>
                    </div>
                </div>
                    
                    
                </div>


            </div> 
            
            {/* <div className="flex w-full flex-col">
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
                        {item.pets.filter(item=>item.quantity>0).length>0  && <div className={contentItem}>
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
            </div>  */}
        </div>
    </div>
    );
};

export default CarCard;


const type = 'flex border rounded border-black divide-x overflow-hidden w-full mb-4'
const type2 = 'flex border rounded border-black divide-x overflow-hidden w-3/4 mb-4'
const typeItem = 'flex items-center px-2 py-1 cursor-pointer text-sm sm:text-[10px] px-0 w-1/4'
const typeItem2 = 'flex items-center px-2 py-1 cursor-pointer text-sm sm:text-[10px] px-0 w-1/3'

const optionItem = 'flex w-1/3 flex-col items-center'
const options = 'flex w-full text-xs flex-col space-y-3'

const icon = 'mr-1 min-w-[12px] h-3'
const text= 'flex items-center truncate overflow-hidden mb-1'
const tripContent = ''
const tripItem = 'w-1/2'
const tripHeader = 'flex justify-center'
const trip = 'flex space-x-1 w-full text-xs'

const headItem = 'flex w-1/3  text-xs px-2 flex-col'
const headers = 'flex divide-x w-full'

const submit2 ='text-sm bg-red-400 rounded px-1 text-white py-[2px] text-xs'
const submit ='text-sm bg-green-400 rounded px-1 text-white py-[2px] text-xs'
const car = 'relative flex flex-col border w-full px-2 py-2 items-center '


const stopIcon = 'min-w-[22px] text-yellow-400'

const header = ' mb-2 bg-white px-1 absolute -top-2 left-3 text-xs'

const InfoCard = 'flex w-full  py-4 pt-4 border-t   relative text-sm'

// const kidsIcon ='w-4 mr-2 h-[16px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[140%]'
