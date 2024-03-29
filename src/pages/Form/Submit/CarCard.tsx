import React, { useState } from 'react';
import { ITaxi, useMain } from '../../../Store/useMain';
import dayjs from 'dayjs';

import { SlLocationPin } from "react-icons/sl";
import {  IoCarSportOutline, IoTimeOutline } from "react-icons/io5";
import { GiPalmTree } from "react-icons/gi";
import { useStore } from '../../../Store';
import { AiOutlineStop } from 'react-icons/ai';
import { LiaShuttleVanSolid } from 'react-icons/lia';
import { PiCreditCard, PiJeepLight } from 'react-icons/pi';
import { BsChatSquareText } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const CarCard = ({item}:{item: ITaxi}):React.ReactNode => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false)
    const {store} = useStore()
    const {list,setList, setSubmit,setFilled,setIsEdit, setActiveCarId,setSteps } = useMain()
    const [openModal, setOpenModal] = useState(false)
    const carTypes:{[key:number]:string} = {
        1: 'Sedan',
        2: 'SUV',
        3: "VAN",
    }
    const numbers:{[key:number]:string} = {
        1:"first_car",
        2:"second_car",
        3:"third_car",
        4:"fourth_car",
        5:"fifth_car"
    }

    const removeTaxi = (id:number) => {
        if(list.length === 1 ) {
            setFilled(false, id)
            setSubmit(false)
            return setSteps(0)
        }
        if( id === 1 ) {
            const newList = list.filter(i=>i.id!==1).map(item => {
                const newId = (item.id-1)
                return {...item,  id:newId}
            })
            
            setList(newList)
            setActiveCarId(1)
            setOpenModal(false)
            return setSubmit(true)
        }

        const newList = list.filter(i=>i.id!==id)
        setList(newList)
        setActiveCarId(1)
        setOpenModal(false)
    }

    const getFullDate = () => {
        return dayjs(item.date.split('/').reverse().join('-')).format('dddd') 
            + ' ' + item.date
            + ' ' +item.time
            + ' ' +((!item.dateNow && item.timeType===1) 
            ? 'am'
            : (!item.dateNow && item.timeType===2)
            ? 'pm'
            : '')
    } 

    return ( 
    <div className={container}>
        
        <div className={openModal? modal: ' hidden'}>
            <h1>{t('modal_text')}</h1>
            <div className={modalButtons}>
                <button className={green} onClick={()=>removeTaxi(item.id)}>Yes</button>
                <button className={red} onClick={()=>setOpenModal(false)}>No</button>
            </div>
        </div>
        <div className={content}>
            <h1 className={carTitle}> {t(numbers[item.id])}</h1>

            <h2 className={dateTitle}>{getFullDate()}</h2>
            <div className={typeTitle}>{carTypes[item.carType]}</div>
            
            <div className={locations}>
                <div className={locationsLine}></div>
                <div className="flex flex-col mb-1 w-full">
                    <div className="flex truncate mt-1 w-full">{item.from} </div>
                    <div className="flex  truncate mt-1 w-full"> {item.to}</div>
                </div>
            </div>
            <button className={removeBtn} onClick={()=>setOpenModal(true)}>{t('delete')}</button>
            
            <div className={btns}>
                <div className={btn+ ' border-purple-500 text-purple-500 '} onClick={()=>setOpen(!open)}>{open? ' hide': 'Full info'}</div>
                <div className={btn+ ' border-blue-500 text-blue-500 '}  
                    onClick={()=>{
                        setIsEdit(true);
                        setActiveCarId(item.id)
                        setSteps(1)
                        setSubmit(false)
                    }}
                >Edit</div>
            </div>
        </div>
        
        <div className={open ? submenu : ' hidden '}>
            <div className='flex w-full flex-col space-y-2'>
                <div className={InfoCard}>
                    <div className={header}>
                        Personal info
                    </div>
                    <div className={headers}>
                        <div className={headItem}>
                            <div className='mb-2 text-purple-500'>Names</div>
                            {item.name.length>3 && <div className={text}>{item.name}</div>}
                            {item.name2.length>3 && <div className={text}>{item.name2}</div>}
                            {item.name3.length>3 && <div className={text}>{item.name3}</div>}
                        </div>

                        <div className={headItem}>
                            <div className='mb-2 text-purple-500'>E-mails</div>
                            {item.email.length>6 && <div className={text}>{item.email}</div>}
                            {item.email2.length>6 && <div className={text}>{item.email2}</div>}
                            {item.email3.length>6 && <div className={text}>{item.email3}</div>}
                        </div>

                        <div className={headItem}>
                            <div className='mb-2 text-purple-500'>Phones</div>
                            {item.phone && <div className={text}>+{ item.phone[0]}{item.phone[1]} {item.phone[2]} { item.phone[3]}{item.phone[4]} { item.phone[5]}{item.phone[6]} { item.phone[7]}{item.phone[8]} { item.phone[9]}{item.phone[10]} {item.phone[11]}{item.phone[12]}  {item.phone[13]}{item.phone[14]} </div>}
                            {item.phone2 && <div className={text}>+{ item.phone2[0]}{item.phone2[1]} {item.phone2[2]} { item.phone2[3]}{item.phone2[4]} { item.phone2[5]}{item.phone2[6]} { item.phone2[7]}{item.phone2[8]} { item.phone2[9]}{item.phone2[10]} {item.phone2[11]}{item.phone2[12]}  {item.phone2[13]}{item.phone2[14]} </div>}
                            {item.phone3 && <div className={text}>+{ item.phone3[0]}{item.phone3[1]} {item.phone3[2]} { item.phone3[3]}{item.phone3[4]} { item.phone3[5]}{item.phone3[6]} { item.phone3[7]}{item.phone3[8]} { item.phone3[9]}{item.phone3[10]} {item.phone3[11]}{item.phone3[12]}  {item.phone3[13]}{item.phone3[14]} </div>}
                        </div>
                    </div>
                </div>

                <div className={InfoCard}>
                    <div className={header}>Trip info</div>

                    <div className={trip}>
                        <div className={tripItem}>
                            <h1 className={tripHeader}>{t('one-way')}</h1>

                            <div className={tripContent}>
                                {<div className={'flex items-start mb-2'}><IoTimeOutline className={icon+ ' mt-[2px]' }/>
                                    <div className='flex flex-col items-start justify-start'>
                                        <span>{dayjs(item.date.split('/').reverse().join('-')).format('dddd')}, {item.date}</span>
                                        <span className='w-full'>{item.time}</span> 
                                    </div>
                                </div>}
                                <div className={text}><SlLocationPin className={icon+ ' text-green-400'}/>{item.from}</div>
                                <div className='flex'>
                                    <div className='px-1'>{item.flight.title}</div>
                                    <div className='px-1'>{item.flight.prefix}</div>
                                    <div className='px-1 '>{item.flightR.number? '#'+item.flightR.number : ''}</div>
                                </div>
                                {Object.values(item.stops).filter(i=>i).map(item=>(<div key={item} className={text+ ' ml-3'}><SlLocationPin className={stopIcon}/>{item}</div>))}
                                {item.to && <div className={text}><SlLocationPin className={icon+ ' text-red-400'}/>{item.to}</div>}
                                <div className='flex'>
                                    <div className='px-1'>{item.flight2.title}</div>
                                    <div className='px-1'>{item.flight2.prefix}</div>
                                    <div className='px-1 '>{item.flight2.number? '#'+item.flight2.number : ''}</div>
                                </div>
                            </div>
                        </div>

                        {item.isReturnTrip && <div className={tripItem}>
                            <h1 className={tripHeader}>{t('return')}</h1>

                            <div className={tripContent}>
                                {<div className={'flex items-start mb-2'}><IoTimeOutline className={icon + ' mt-[2px]' }/>
                                    <div className='flex flex-col items-start justify-start'>
                                        <span>{dayjs(item.dateR.split('/').reverse().join('-')).format('dddd')}, </span>
                                        <span>{item.dateR}</span>
                                        <span className='w-full'>{item.timeR}</span> 
                                    </div>
                                </div>}
                                
                                <div className={text}><SlLocationPin className={icon+ ' text-green-400'}/>{item.fromR}</div>
                                <div className='flex'>
                                    <div className='px-1'>{item.flightR.title}</div>
                                    <div className='px-1'>{item.flightR.prefix}</div>
                                    <div className='px-1 '>{item.flightR.number? '#'+item.flightR.number : ''}</div>
                                </div>
                                {Object.values(item.stopsR).map(item=>(
                                    item.length> 1 ? <div className={text+ ' ml-3'}><SlLocationPin className={stopIcon}/>{item}</div> :<></>
                                ))}
                                <div className={text}><SlLocationPin className={icon+ ' text-red-400'}/>{item.toR}</div>
                                <div className='flex'>
                                    <div className='px-1'>{item.flight2R.title}</div>
                                    <div className='px-1'>{item.flight2R.prefix}</div>
                                    <div className='px-1 '>{item.flight2R.number? '#'+item.flight2R.number : ''}</div>
                                </div>
                                
                            </div>
                        </div>}
                    </div>
                    
                </div>


                <div className={InfoCard}>
                    <div className={header}>Options</div>
                    <div className={options}>
                    <div className={ type }>
                        {store.carList.map((car,index) => (
                            <div className={item.carType === (index+1) ? typeItem + ' bg-purple-500 text-white': index === 3 ? typeItem + ' bg-gray-200  text-gray-500 cursor': typeItem }>
                                { index === 2
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                : index === 1
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                : index=== 3
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate flex '>{car}</div>
                            </div>
                        ))}
                    </div>

                    {(list[item.id-1].type<3) && <div className={titles}>
                        <div className={item.adults ? typeItem2 + ' bg-purple-500 text-white': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{t('adults')}</div>
                        </div>
                        <div className={item.kids.length ? typeItem2 + ' bg-purple-500 text-white': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{t('kids')}</div>
                        </div>
                        <div className={item.babies ? typeItem2 + ' bg-purple-500 text-white': typeItem2 } onClick={()=>{ }}>
                            <div className='truncate flex justify-center w-full'>{t('babies')}</div>
                        </div>
                    </div>}

                    {(list[item.id-1].type<3) && <div className='flex w-3/4 divide-x'>
                        <div className={optionItem}>
                            <div className={text}>{item.adults}</div>
                        </div>
                        <div className={optionItem}>
                            {item.kids.map(kid=>( <div className={text}>{kid} years</div> ))}
                        </div>
                        <div className={optionItem}>
                            <div className={text}>{item.babies}</div>
                        </div>
                    </div>}


                    {(list[item.id-1].type<3) && <div className={titles2}>
                        {item.baggage.map(bag =>( <div className={bag.quantity> 0?'w-1/5 flex justify-center bg-purple-500 text-white' : 'w-1/5 flex justify-center'}>{bag.title}</div> ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className='flex w-full divide-x'>
                        {item.baggage.map(bag =>(<div className={'w-1/5 flex justify-center'}>{bag.quantity} </div>))}
                    </div>}
                    

                    {(list[item.id-1].type<3) && <div className={titles2 + ' justify-between'}>
                        {item.carSeats.map(bag =>(
                            <div className={bag.quantity> 0?' w-[14%] flex pl-1 bg-purple-500 text-white truncate ' : ' pl-1 truncate w-[14%] flex'}>
                                {bag.title}
                            </div>
                        ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className='flex w-full divide-x justify-between'>
                        {item.carSeats.map(bag =>(
                            <div className={'w-[14%] flex justify-center'}>
                                {bag.quantity}
                            </div>
                        ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className={titles2 + ' justify-between'}>
                        {item.sport.map(bag =>(
                            <div className={bag.quantity> 0?' w-1/4 flex justify-center bg-purple-500 text-white' : 'w-1/4 flex justify-center'}>
                                {bag.title}
                            </div>
                        ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className='flex w-full divide-x justify-between'>
                        {item.sport.map(bag =>(
                            <div className={'w-1/4 flex justify-center'}>
                                {bag.quantity}
                            </div>
                        ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className={titles2 + ' justify-between'}>
                        {item.pets.map(bag =>(
                            <div className={bag.quantity> 0?' w-1/5 flex justify-center bg-purple-500 text-white' : 'w-1/5 flex justify-center'}>
                                {bag.title}
                            </div>
                        ))}
                    </div>}

                    {(list[item.id-1].type<3) && <div className='flex w-full divide-x justify-between'>
                        {item.pets.map(bag =>(
                            <div className={'w-1/5 flex justify-center'}>
                                {bag.quantity}
                            </div>
                        ))}
                    </div>}
                </div>
                    
                    
                </div>

                <div className={ InfoCard }>
                    <div className={header}> Payments </div>

                    <div className='flex-col  w-full'>
                        <div className="flex justify-between mb-2">
                            {item.paymentMethod && 
                            <div className={contentItem + ' w-1/2 '}>
                                <PiCreditCard className={'locationIcon'}/>
                                <span className={'optionsItem'}></span>
                                {item.paymentMethod}
                            </div>}
                            {item.tripType && <div className={contentItem + ' w-1/2 '}>
                            <GiPalmTree className={'locationIcon'}/>
                            <span className={'optionsItem'}></span>
                                {item.tripType}
                            </div>}
                        </div>
                        
                        <div className={item.additionalText ? contentItem: 'hidden'}>
                            <BsChatSquareText className='locationIcon'/><span className='optionsItem'></span>{item.additionalText} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CarCard;

const btns = 'flex justify-between w-full px-4'
const submenu = "flex w-full flex-col  mt-4"
const locations = 'flex w-full pr-4'
const locationsLine = "flex flex-col items-center justify-around ml-2 mr-1 w-1  my-2 mt-[12px] border border-r-white border-purple-500 "

const carTitle = "text-gray-500 mb-0 text-base"
const dateTitle = 'text-sm mb-0 pt-1 roboto w-full '
const typeTitle = 'flex  px-2  text-gray-500 italic text-[10px] '
const content = "flex w-full flex-col"
const modalButtons = 'flex space-x-2 self-end mt-4'
const modal = 'absolute flex flex-col bg-white shadow-lg shadow-purple-700 p-4 rounded-xl'
const contentItem= 'flex items-center space-x-2'

const btn = 'text-base mt-3  border text-center rounded cursor-pointer roboto text-thin px-2'
const red ='text-sm border-2 border-rose-500 rounded-lg px-3 text-rose-500 text-xs'
const green ='text-sm border-2 border-green-500 rounded-lg px-3 text-green-500 text-xs'

const type = 'flex border rounded border-black divide-x overflow-hidden w-full mb-4'
const titles = 'flex border rounded border-black divide-x overflow-hidden w-3/4 mb-4'
const titles2 = 'flex border rounded border-black divide-x overflow-hidden w-ful mb-4'
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

const removeBtn ='absolute rounded text-base top-2 right-2 text-rose-600 py-[2px] '

const stopIcon = 'min-w-[22px] text-yellow-400'
const header = ' mb-2 bg-white px-1 absolute -top-2 left-3 text-xs'
const InfoCard = 'flex w-full  py-4 pt-4 border-t   relative text-sm'
const container = 'relative flex flex-col shadow-xl rounded-lg w-full px-2 py-2 items-center bg-white rounded mb-4'