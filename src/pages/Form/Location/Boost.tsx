import { useEffect, useState } from "react";
import dayjs from "dayjs";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight} from "react-icons/pi";
import { useStore } from '../../../Store/index';
import { useMain } from "../../../Store/useMain";
import React from "react";
import sky from './../../../assets/day.png'
import sun from './../../../assets/sun.png'
import stars from './../../../assets/stars.jpg'


const Boost = ():React.ReactNode => {
    const {  
        isFrench,
        activeCarId,
        list,
        setFrom, 
        setDate,
        setTime,
        setDateNow,
        setTimeType,
        setFilled,
        setSteps,
    } = useMain()
    
    const { store } = useStore()
    
    const [fullDate, setFullDate] = useState(list[activeCarId -1].date ? dayjs(list[activeCarId -1].date) : dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));

    const [ day, setDay ] = useState(true)


    const [isDate, setIsDate] = useState(true)
    const [isFrom, setIsFrom] = useState(true)
    const [_, setChangedList] = useState(isFrench? store.typeListF: store.typeList)


    useEffect(()=>{
        setChangedList(isFrench? store.typeListF: store.typeList)
    },[isFrench])


    useEffect(()=>{
        setDate(list[activeCarId-1].date ? list[activeCarId-1].date : dayjs().format('MM/DD/YYYY'))
    },[])

    useEffect(()=>{
        if(list[activeCarId-1].type > 2) return setDateNow(true);
    },[list[activeCarId-1].type])
    
    useEffect(()=>{
        setDay(list[activeCarId-1].time.slice(0,2) > '04' && list[activeCarId-1].time.slice(0,2) < '23')
    },[list[activeCarId-1].time,list[activeCarId-1].timeType])


    function goNext() {
        setIsDate(list[activeCarId-1].date.length>0)
        setIsFrom(list[activeCarId-1].from.length>0)
        if(isDate && isFrom &&  list[activeCarId-1].time) {
            setFilled(true, activeCarId)
            setSteps(5)
        }
    }
    return (
    <div className={container}>
            <div className={date}>
                <div className={fare}>{day ? isFrench? 'Tarification jour ': 'Day fare': isFrench? 'Tarification nuit': 'Night fare'} </div>

                <div className={dateRow}>
                    <div className='flex flex-col w-1/2'>
                        <div className={!list[activeCarId-1].dateNow ? toggle+ ' ' : toggle +' bg-white'} onClick={()=>{
                                    setDateNow(!list[activeCarId-1].dateNow)
                                    if(list[activeCarId-1].dateNow) {
                                        setTime('')
                                        setDate('')
                                    } else {
                                        (dayjs().format('mm') > '30') 
                                            ? setTime((dayjs().add(1, 'hours').format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                            : setTime((dayjs().format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                        setDate(dayjs().format('DD/MM/YYYY'))
                                    }
                                }}>
                            <span className={list[activeCarId-1].dateNow ? toggleLabelActive :toggleLabel}>{isFrench? store.nowLaterF[0]:store.nowLater[0] }</span>
                            <span className={!list[activeCarId-1].dateNow ? toggleLabelActive :toggleLabel}>{isFrench? store.nowLaterF[1]:store.nowLater[1] }</span>
                            <div className={list[activeCarId-1].dateNow ? toggleBg :toggleBg + ' translate-x-full' }></div>
                        </div>

                        <div className={isDate ? dateInput: dateInput+' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                            <span className='icon text-xl'><PiCalendarCheckLight/></span>
                            {list[activeCarId-1].date ? <div className='flex items-center'>
                                {fullDate.format('dddd')==='Monday'? isFrench ?'Lundi' : 'Monday'
                                :fullDate.format('dddd')==='Tuesday'? isFrench ? 'Mardi':'Tuesday'
                                :fullDate.format('dddd')==='Wednesday'?isFrench ? 'Merceredi':'Wednesday'
                                :fullDate.format('dddd')==='Thursday'?isFrench ? 'Jeudi':'Thursday'
                                :fullDate.format('dddd')==='Friday'?isFrench ? 'Venderdi':'Friday'
                                :fullDate.format('dddd')==='Saturday'?isFrench ? 'Samedi':'Saturday'
                                : isFrench ?'Dimanche': 'Sunday'},  
                                {'  '+fullDate.format('MMM')}
                                { '.  '+fullDate.format('D')}{ fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                                        ? 'st'
                                                        :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                                        ?  'nd'
                                                        :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                                        ? 'rd'
                                                        : 'th'
                                                    }
                                {' '+fullDate.format('YYYY')}
                            </div>
                            :<div className='flex items-center'>{isFrench? 'Date Requise' :'Required date '}</div>}
                            
                            

                            {isDateOpen && <div className={dateTimeSubmenu}>
                                <DatePicker value={list[activeCarId-1].date || ''}  time={list[activeCarId-1].time} onChange={setDate} getFullDate={setFullDate}/>
                                <div className="flex justify-between pl-8">
                                    <div className={setDateBtn} onClick={(e)=> {
                                            e.stopPropagation();
                                            setIsDateOpen(false)
                                        }}>Accept</div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    {list[activeCarId-1].dateNow && <div className="absolute z-30 top-[30px] left-0 right-1/2 bottom-0  bg-white opacity-75 cursor-not-allowed transition duration-1000 "></div>}

                    <div className='flex flex-col h-[85px] z-10 relative w-1/2 rounded-lg px-2 justify-end items-end bg-cover py-2 -translate-y-[6px] mx-1' style={{backgroundImage:`url(${day? sky :stars})`, backgroundPosition:`${day? ' ': '0px 0px'}` }} >
                        <TimePicker isAm={list[activeCarId-1].timeType} time={list[activeCarId-1].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[activeCarId-1].time}  onChange={setTime} date={list[activeCarId-1].date}/> 
                        {!list[activeCarId-1].dateNow && <div className={list[activeCarId-1].timeType===1 ? timeToggle + ' bg-gray-600 ':list[activeCarId-1].timeType===1 ? timeToggle+ ' bg-gray-600':timeToggle+ ' bg-white' }>
                            <div className={list[activeCarId-1].timeType===0 ? selectTextActive :selectText } onClick={()=>setTimeType(0)}>{isFrench? 'Choisir':'Select'}</div>
                            <div className={list[activeCarId-1].timeType===1 ? amTextActive : amText} onClick={()=>setTimeType(1)}>am</div>
                            <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                            <div className={list[activeCarId-1].timeType===2 ? pmTextActive: pmText} onClick={()=>setTimeType(2)}>PM</div>    
                        </div>}
                        {day && <div  className='absolute top-8 left-2 w-8 h-8 bg-no-repeat  bg-cover rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}

                    </div>
                </div>
            </div>

            <div className={locationCard}>
                <div className={isFrom ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-green-500 '><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={list[activeCarId-1].from || ''} 
                        onChange={setFrom}
                        placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                    />
                </div>
            </div>
            <div className={nextBtn} onClick={goNext} >Order</div>
    </div>
    );
};

export default Boost;


const nextBtn = 'w-1/3 mb-20 bg-purple-500 mt-10 self-end text-center active:bg-purple-700 py-3 rounded-full text-white'


const amText = 'pl-2 flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600  rounded-tl triangle flex items-center py-1 '

const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-gray-600 text-white flex items-center py-1 border-r border-black '

const timeToggle = ' absolute top-1 font-bold right-2 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '

const setDateBtn = ' border bg-purple-500 active:bg-purple-400 hover:bg-purple-600 shadow cursor-pointer rounded-lg px-3 py-2 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl shadow-purple-200 rounded-xl sm:-left-[10px]'
const dateRow = 'flex relative   w-full   justify-between'

const dateInput = 'text-xs flex border bg-white border-purple-500 cursor-pointer h-[40px] relative w-[200px] max-w-[200px] w-full rounded-xl'

const locationCard = 'flex relative items-center w-full space-x-2 mb-2'

const extraCardPickUp = 'flex relative w-3/4 bg-white items-center border border-purple-500 w-full rounded-xl'


const toggleBg = 'absolute bg-purple-500 top-0 bottom-0 w-1/2 duration-300'
const toggle ='relative flex self-start  items-center rounded-lg border border-purple-500 duration-500 transition cursor-pointer mb-2 overflow-hidden' 

const toggleLabel ='flex  items-center text-xs duration-500 px-2 min-w-[42px] py-1 duration-1000'
const toggleLabelActive ='flex min-w-[42px] z-20 items-center py-1 text-xs  duration-500 duration-1000 px-2 text-white font-bold '

const fare = 'py-1 mb-2 italic text-gray-400 w-full text-end'

const date = 'flex w-full items-center justify-between mb-4 flex-wrap pt-4 border-b pb-4'
const container = 'flex flex-col relative w-full px-10 text-xs mt-12'
