import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select } from "antd";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { useStore } from '../../../Store/index';
import { useMain } from "../../../Store/useMain";
import React from "react";
import sky from './../../../assets/day.png'
import sun from './../../../assets/sun.png'
import stars from './../../../assets/stars.jpg'
import train from './../../../assets/train.jpeg'
import boat from './../../../assets/ship.png'
import Buttons from "../Components/Buttons";


interface IObj {[key:number]: string}
const TripContent = ():React.ReactNode => {
    const {  
        isFrench,
        activeCarId,
        list,
        setFrom, 
        setTo, 
        setStops,
        setDate,
        setTime,
        setDeparture,
        setDeparture2,
        setFlight,
        setFlight2,
        setIcon,
        setIcon2,
        setDateNow,
        setTimeType,
        setSteps,
        setValidation,
        setAlert,
    } = useMain()
    
    const { store } = useStore()
    
    const [fullDate, setFullDate] = useState(list[activeCarId -1].date ? dayjs(list[activeCarId -1].date) : dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(0)
    const [ localStops, setLocalStops ] = useState<{[key:number]:string}>({})
    const [ day, setDay ] = useState(true)

    const [isDate, setIsDate] = useState(true)
    const [isFrom, setIsFrom] = useState(true)
    const [isTo, setIsTo] = useState(true)
    const [trigger, setTrigger] = useState(false)

    useEffect(()=>{
        setDate(list[activeCarId-1].date ? list[activeCarId-1].date : dayjs().format('MM/DD/YYYY'))
    },[])

    useEffect(()=>{
        if(!list[activeCarId-1].dateNow) {
            setFullDate(dayjs(list[activeCarId -1].date))
        } else {
            setFullDate(dayjs())
        }
    },[list[activeCarId-1].dateNow])
    useEffect(()=>{
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number

        setIcon(0)
        setIcon2(0)
        setFlight({title:'', prefix:'',number:'' })
        setFlight2({title:'', prefix:'',number:'' })
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(3)
        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5)
        })
        store.airportArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5)
        })

    },[list[activeCarId-1].from, list[activeCarId-1].to])

    useEffect(()=>{
        setStops(localStops)
    },[localStops])

    useEffect(()=>{
        setStop(Object.values(list[activeCarId-1].stops).filter(i=>i.length>0).length)
    },[])

    useEffect(()=>{
        if(list[activeCarId-1].type > 2) return setDateNow(true);
    },[list[activeCarId-1].type])
    
    useEffect(()=>{
        setDay(list[activeCarId-1].time.slice(0,2) > '04' && list[activeCarId-1].time.slice(0,2) < '23')
    },[list[activeCarId-1].time, list[activeCarId-1].timeType])

    useEffect(()=>{setLocalStops(list[activeCarId-1].stops)},[activeCarId, list[activeCarId-1].isReset])

    useEffect(()=>{
        if(trigger){
            setIsDate(list[activeCarId-1].date.length>0)
            setIsFrom(list[activeCarId-1].from.length>0)
            setIsTo(list[activeCarId-1].to.length>0)
        }
    },[list[activeCarId-1]])

    useEffect(()=>{
        const now = dayjs();
        const noon = dayjs().set('hour', 12).set('minute', 0).set('second', 0).set('millisecond', 0);
        if (now.isBefore(noon)) {
            setTimeType(1)
        } else if (now.isAfter(noon)) {
            setTimeType(2)
        } else {
            setTimeType(0)
        }
    }, [])

    function goNext() {
        setTrigger(true)
        setIsDate(list[activeCarId-1].date.length>0)
        setIsFrom(list[activeCarId-1].from.length>0)
        setIsTo(list[activeCarId-1].to.length>0)
        setValidation(1)

        if(list[activeCarId-1].date && list[activeCarId-1].from && list[activeCarId-1].to && !list[activeCarId-1].isReturnTrip) {
            setValidation(2)
            return setSteps(3)
        }
        if(!list[activeCarId-1].date) return setAlert('Need date !')
        if(!list[activeCarId-1].time) return setAlert('Need time !')
        if(!list[activeCarId-1].from) return setAlert('Need Pick Up location !')
        if(!list[activeCarId-1].to) return setAlert('Need Drop off location !')
        
        return setSteps(3)
    }
    
    return (
    <div className={container}>
            <div className={date}>
                <div className={fare}>{day ? isFrench? 'Tarification du jour ': 'Day fare': isFrench? 'Tarification de nuit': 'Night fare'} </div>

                <div className={dateRow}>
                    <div className='flex justify-between mb-5 0'>
                        <div className={!list[activeCarId-1].dateNow ? toggle + ' ' : toggle +' bg-white'} onClick={()=>{
                                    if((list[activeCarId-1].type>2)) return setDateNow(true);
                                    setDateNow(!list[activeCarId-1].dateNow)
                                    if(list[activeCarId-1].dateNow) {
                                        setTime(dayjs().format('hh:mm'))
                                        setDate(dayjs().format('MM/DD/YYYY'))
                                        setFullDate(dayjs())
                                    } else {
                                        (dayjs().format('mm') > '30') 
                                            ? setTime((dayjs().add(1, 'hours').format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                            : setTime((dayjs().format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                        setDate(dayjs().format('MM/DD/YYYY'))
                                    }
                                }}>
                            <div style={{width: isFrench ? 70: 44 }} className={`${list[activeCarId-1].dateNow ? toggleLabelActive : toggleLabel } `}>{isFrench? store.nowLaterF[0]:store.nowLater[0] }</div>
                            <div  style={{width:isFrench ? 40: 44}} className={`${!list[activeCarId-1].dateNow ? toggleLabelActive : toggleLabel } `}>{isFrench? store.nowLaterF[1]:store.nowLater[1] }</div>
                            <div className={list[activeCarId-1].dateNow ? toggleBg + ` bg-rose-500 ${isFrench? ' w-[70px] ': 'w-[44px]'}` :toggleBg + ` translate-x-full bg-green-400 ${isFrench? ' w-[70px] ': 'w-[44px]'}` }></div>
                        </div>

                        <div className={isDate ? dateInput: dateInput+' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                            <div onClick={(e)=>e.stopPropagation()} className={list[activeCarId-1].dateNow? 'absolute z-10 top-0 left-0 right-0 bottom-0 rounded-xl bg-white bg-opacity-50 cursor-not-allowed':'hidden'}></div>
                            <span className='flex items-center pl-1 text-xl '><PiCalendarCheckLight className='text-blue-700'/></span>
                            {list[activeCarId-1].date ? <div className='flex items-center font-bold text-sm text-blue-700'>
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
                    {list[activeCarId-1].dateNow && <div className="absolute z-30 top-[53px] left-0 -right-2 bottom-0  bg-white opacity-25 cursor-not-allowed transition duration-1000 "></div>}

                    <div className='flex relative w-full rounded-lg px-4 z-10 justify-between items-end bg-cover py-2 ' style={{backgroundImage:`url(${day? sky :stars})`, backgroundPosition:`${day? ' ': '0px 0px'}` }} >
                        {!list[activeCarId-1].dateNow && <div className={list[activeCarId-1].timeType===1 ? timeToggle + ' bg-black ':list[activeCarId-1].timeType===1 ? timeToggle+ ' bg-gray-600':timeToggle+ ' bg-white' }>
                            <div className={list[activeCarId-1].timeType===0 ? selectTextActive :selectText } onClick={()=>setTimeType(0)}>{isFrench? 'Choisir':'Select'}</div>
                            <div className={list[activeCarId-1].timeType===1 ? amTextActive : amText} onClick={()=>setTimeType(1)}>am</div>
                            <div className="absolute border-b border-black w-[35px] right-[24px] z-10 rotate-[114deg]"></div>
                            <div className={list[activeCarId-1].timeType===2 ? pmTextActive: pmText} onClick={()=>setTimeType(2)}>PM</div>    
                        </div>}
                        <TimePicker isAm={list[activeCarId-1].timeType} time={list[activeCarId-1].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[activeCarId-1].time}  onChange={setTime} date={list[activeCarId-1].date}/> 
                        {day && <div  className='absolute top-2 left-1/2 w-8 h-8 bg-no-repeat  bg-cover rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}

                    </div>
                </div>
            </div>
            
            <div className={locations}>

                {list[activeCarId-1].icon>0 && <div className={iconsType}>
                    <span className={iconCard}>
                        {
                            list[activeCarId-1].icon == 1
                            ? <MdFlightLand className={ 'text-xl ' }/>
                            :list[activeCarId-1].icon == 2
                            ? <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            :list[activeCarId-1].icon == 3
                            ? <FaBus />
                            :list[activeCarId-1].icon == 4
                            ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                            :<MdLocalHotel className={' text-base'}/>
                        }
                    </span>
                    

                    {list[activeCarId-1].icon>0 && <div className={flightCard }>
                        {list[activeCarId-1].icon === 1 && 
                        <Select 
                            className='favorite max-h-[30px] max-w-[210px]'
                            style={{ borderRadius: 5}} 
                            options={store.flights.map(item=>(
                                {value: item, label: item}
                            ))} 
                            onChange={(e)=>{
                                setFlight({...list[activeCarId-1].flight, title: e})
                            }}
                            placeholder='Airlines'
                        />}
                        <Input
                            value={list[activeCarId-1].flight.number}
                            maxLength={4}
                            placeholder={list[activeCarId-1].icon === 1 ?'####': list[activeCarId-1].icon === 2 ? 'Train#' : list[activeCarId-1].icon === 3 ? "Bus#" : list[activeCarId-1].icon === 4 ? 'Boat#': 'Room#'} 
                            style={{ width:65, paddingLeft:2,paddingBottom:4, paddingRight:0, marginLeft:2,marginRight:2, borderRadius: 0, height: 30, overflow: 'hidden' }} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                setFlight({...list[activeCarId-1].flight, number: e.target.value.replace(/\D/g, '')})
                            }}
                        />
                        {list[activeCarId-1].flight.number.length<3 && list[activeCarId-1].flight.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                    </div>}
                </div>}

                <div className={locationCard}>
                    <div className={isFrom ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                        <span className='icon text-green-500 '><SlLocationPin/></span>
                        <GoogleAddressInput
                            style='w-full placeholder-green' 
                            defaultLocation={list[activeCarId-1].from || ''} 
                            onChange={setFrom}
                            placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                        />
                    </div>
                    {list[activeCarId-1].icon === 1 && 
                    <div className={departureBox}>
                        <Select 
                            className='favorite truncate'
                            style={{borderRadius: 20}} 
                            options={store.departureSections.map(item=>(
                                {value: item, label: item}
                            ))}   
                            onChange={setDeparture} 
                            placeholder='Departure' 
                        />
                    </div>}
                </div>
            
                <div className={extraCardStop}>
                
                    <div className={(stop > 0)? box: box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench
                            ?' 1er  Arrêt'
                            :<><span className='mr-1'> 1st </span> Stop</>
                            }</div>
                        <span className='icon text-orange-400'><SlLocationPin/></span>  
                        <GoogleAddressInput
                            style='w-full placeholder-orange'
                            defaultLocation={localStops[1] || ''} 
                            onChange={(e)=>setLocalStops({...localStops, 1:e})}
                            placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                        />
                    </div>
                    <div className={(stop === 0) ? openStop :'hidden'} onClick={()=>setStop(1)}>+ stop</div> 
                    <div 
                        className={(stop > 0 ) ? closeStop : 'hidden'} 
                        onClick={()=>{
                            if(stop===0) return setStop(1);
                            const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 0)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setLocalStops(data)
                            setStops(data)
                            setStop(stop - 1)
                        }}
                    ><span className='scale-[150%] translate-x-[0.5px] font-bold rotate-45'>+</span></div> 
                </div>
                
                <div className={(stop > 0) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 1 ? box: box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench
                            ? <><span className='mr-1'> 2e </span> Arrêt</>
                            :'2nd Stop'
                        }</div>
                        <span className='icon  text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput
                            style='w-full placeholder-orange'
                            defaultLocation={localStops[2] || ''} 
                            onChange={(e)=>{setLocalStops({...localStops, 2:e})}}
                            placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                        />
                    </div>
                    <div className={(stop === 1) ? openStop : 'hidden'} onClick={()=> setStop(2)} >+ stop</div>
                    <div 
                        className={(stop > 1) ? closeStop : 'hidden'} 
                        onClick={()=>{ 
                            if(stop===1) return setStop(2);
                            const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 1)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setLocalStops(data)
                            setStops(data)
                            setStop(stop - 1)
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div>
                </div>

                <div className={(stop > 1 ) ?  extraCardStop: 'hidden'}>
                        <div className={stop > 2 ? box : box + ' opacity-0 '}>
                            <div className={stopLabel}>{isFrench
                                ? <><span className='mr-1'> 3e </span> Arrêt</>
                                :'3rd Stop'}</div>
                            <span className='icon  text-orange-400'><SlLocationPin/></span>
                            <GoogleAddressInput
                                style='w-full placeholder-orange'
                                defaultLocation={localStops[3] || ''} 
                                onChange={(e)=>{
                                    setLocalStops({...localStops, 3:e})
                                }}
                                placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                            />
                        </div>
                        <div  className={(stop === 2) ? openStop :' hidden '} onClick={()=>setStop(3)} >+ stop</div> 
                        <div 
                            className={(stop > 2) ? closeStop :'hidden'} 
                            onClick={()=>{ 
                                if(stop===2) return setStop(3);
                                const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 2)
                                const data: IObj ={}
                                array.map((item, index) => {
                                    const number  = index+1;
                                    data[number] = item;
                                })
                                setLocalStops(data)
                                setStops(data)
                                setStop(stop - 1)
                            }}
                        ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
                </div>

                <div className={(stop > 2 ) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 3 ? box : box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench
                            ? <><span className='mr-1'> 4e </span> Arrêt</>
                            :'4th Stop'
                        }</div>
                        <span className='icon  text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput
                            style='w-full placeholder-orange'
                            defaultLocation={localStops[4] || ''} 
                            onChange={(e)=>{
                                setLocalStops({...localStops, 4:e})
                            }}
                            placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                        />
                    </div>

                    <div className={(stop === 3) ? openStop :'hidden'} onClick={()=>setStop(4)}>+ stop</div> 
                    <div 
                        className={(stop > 3) ? closeStop :'hidden'} 
                        onClick={()=>{ 
                            if(stop===3) return setStop(4);
                            const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 3)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setLocalStops(data)
                            setStops(data)
                            setStop(stop - 1)
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
                </div>

                <div className={locationCard}>
                    <div className={isTo ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                        <span className='icon text-red-500'><SlLocationPin/></span>
                        <GoogleAddressInput
                            style='w-full placeholder-red' 
                            defaultLocation={list[activeCarId-1].to || ''} 
                            onChange={setTo}
                            placeholder={isFrench? store.locationListF[1]:store.locationList[1]}
                        />
                    </div>
                    {list[activeCarId-1].icon2 ===1 && 
                    <div className={departureBox}>
                    <Select 
                        style={{borderRadius: 5}}
                        className='favorite truncate '
                        options={store.departureSections.map(item=>(
                            {value: item, label: item}
                        ))}   
                        onChange={setDeparture2} 
                        placeholder='Departure' 
                    />
                    </div>}
                </div>

                {list[activeCarId-1].icon2>0 &&  <div className={iconsType}>
                    
                    <span className={iconCard}>
                        {   
                            list[activeCarId-1].icon2 == 1
                            ? <MdFlightTakeoff className={ 'text-xl ' }/>
                            :list[activeCarId-1].icon2 == 2
                            ? <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            :list[activeCarId-1].icon2 == 3
                            ? <FaBus/>
                            :list[activeCarId-1].icon2 == 4
                            ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                            :<MdLocalHotel className={' text-base'}/>
                        }
                    </span>

                    {list[activeCarId-1].icon2>0 && <div className={flightCard }>
                        {list[activeCarId-1].icon2 === 1 && 
                        <Select 
                            className='favorite max-h-[30px] max-w-[210px]'
                            style={{ borderRadius: 5}} 
                            options={store.flights.map(item=>(
                                {value: item, label: item}
                            ))} 
                            onChange={(e)=>{setFlight2({...list[activeCarId-1].flight2, title: e})}}
                            placeholder='Airlines' 
                        />}
                        <Input 
                            value={list[activeCarId-1].flight2.number}
                            maxLength={4}
                            placeholder={list[activeCarId-1].icon2 === 1 ?'####': list[activeCarId-1].icon2 === 2 ? 'Train#' : list[activeCarId-1].icon2 === 3 ? "Bus#" : list[activeCarId-1].icon2 === 4 ? 'Boat#': 'Room#'} 
                            style={{ width:65, paddingLeft:2,paddingBottom:4, paddingRight:0, marginLeft:2,marginRight:2, borderRadius: 0, height: 30, overflow: 'hidden' }} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                setFlight2({...list[activeCarId-1].flight2, number: e.target.value.replace(/\D/g, '')})
                            }}
                        />
                        {list[activeCarId-1].flight2.number.length<3 && list[activeCarId-1].flight2.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                    </div>}
                </div>}
            </div>
            <Buttons goNext={goNext} step={1} />
    </div>
    );
};

export default TripContent;


const stopLabel = 'absolute top-3 -left-16 text-sm z-20 text-gray-400 font bold'
const locations = ' flex flex-col border rounded-xl shadow-xl bg-white p-4 border-purple-500 '
const departureBox = "border border-purple-500 flex items-center w-1/3 rounded-xl py-1"


const box = 'flex relative border border-purple-500   bg-white rounded-xl w-full'


const amText = 'pl-2 flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-black text-white font-bold'

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-black rounded-tl triangle flex items-center py-1 font-bold'

const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-black text-white flex items-center py-1 border-r border-black '

const timeToggle = 'relative font-bold right-2 flex  items-center text-base  cursor-pointer  rounded overflow-hidden border border-black '


const iconCard = 'flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-black shadow-lg'

const iconsType = 'flex mb-2 justify-between w-full py-2'
const flightCard = 'flex relative items-center border border-purple-500 w-4/5 rounded-xl py-1 bg-white'

const closeStop =" my-auto pl-[9px] text-xl px-2 text-center border border-black bg-rose-500 ml-1 rounded flex justify-center items-center cursor-pointer text-black"
const openStop ="absolute top-2 text-purple-500  rounded flex cursor-pointer text-xl"


const setDateBtn = ' border bg-purple-500 active:bg-purple-400 hover:bg-purple-600 shadow cursor-pointer rounded-lg px-3 py-2 flex text-white items-center'
const dateTimeSubmenu ='absolute overflow-hidden z-30 flex flex-col item-star top-[102%]  z-20 w-[300px] pb-2 bg-white shadow-xl shadow-purple-200 rounded-xl right-0'
const dateRow = 'flex relative flex-col w-full   justify-between'

const dateInput = 'relative  flex border bg-white border-purple-500 cursor-pointer h-[40px] relative w-full max-w-[210px] min-w-[170px]  rounded-xl'

const locationCard = 'flex relative items-center w-full space-x-2 mb-2'

const extraCardStop = 'flex relative w-5/6 self-end  rounded mb-2'
const extraCardPickUp = 'flex relative w-3/4 bg-white items-center border border-purple-500 w-full rounded-xl'


const toggleBg = 'absolute top-0 bottom-0 font-bold w-1/2 duration-300 justify-center'
const toggle ='relative  flex  rounded-lg border border-purple-500 duration-500 transition cursor-pointer overflow-hidden' 

const toggleLabel ='flex items-center font-black duration-500 justify-center px-1 py-1 duration-1000 '
const toggleLabelActive ='flex z-20 font-black items-center flex py-1 justify-center  duration-500 duration-1000 px-1 text-white font-bold 	'



const fare = 'py-1 font-bold mb-2 italic text-gray-500 w-full ml-auto text-center  text-xl'

const date = 'flex w-full items-center justify-between mb-4 flex-wrap pt-2 mt-2 border-b pb-4 border border-purple-500 rounded-xl bg-white shadow-xl px-2'
const container = 'relative flex h-full pb-10 flex-col relative w-full px-5 text-xs'
