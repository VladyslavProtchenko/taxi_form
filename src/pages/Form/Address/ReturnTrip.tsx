import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import Select from "../../../UI/components/Select";
import { useStore } from "../../../Store";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";

import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useLocation } from "../../../Store/useLocation";
import { Input } from "antd";
import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { MdOutlineFlightLand,MdOutlineFlightTakeoff  } from "react-icons/md";
import { GiControlTower } from "react-icons/gi";
import { FaBus,FaTrain } from "react-icons/fa";

import Required from "../../../UI/components/Required";
import React from "react";



const TripContent = () => {
    const { returnTrip, setFrom, setTo, setStop1, setStop2, setStop3, setDate,setTime,setDeparture,setFlight,setAirlines,setIsFlight } = useReturnLocation()
    const { user: mainUser } = useLocation()
    const { user: userStore } = useStore()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)

    const [isFrom, setIsFrom] = useState(0)
    const [isTo, setIsTo] = useState(0)

    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport']

    const [stop, setStop] = useState({
        first:false,
        second:false,
        last: false,
    })
    //Here i do check if we have stops, we need ser revert stops! 
    //If we remove stops, we need remove return stops, if the empty! if now we cant remove them!

    useEffect(() =>{
        if(!returnTrip.stop1 ) setStop({...stop, first: false})
        if(!returnTrip.stop2 ) setStop({...stop, second: false})
        if(!returnTrip.stop3 ) setStop({...stop, last: false})
        if(!returnTrip.stop1 && !returnTrip.stop2 && !returnTrip.stop3) setStop({first:false, second:false, last: false,})
        

        if(mainUser.stopFirst || mainUser.stopSecond || mainUser.stopLast) {
            if(returnTrip.stop2) return setStop({...stop,first: true})
            setStop({...stop, first: true, second: false})
        }

        if((mainUser.stopFirst && mainUser.stopSecond) || (mainUser.stopLast && mainUser.stopSecond) || (mainUser.stopFirst && mainUser.stopLast)) {
            if(returnTrip.stop3) return setStop({...stop, second: true})
            setStop({...stop, second: true, last: false})
        }
        
        if(mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) {
            setStop({first: true, second:true, last: true})
        }

    },[mainUser.stopFirst, mainUser.stopSecond, mainUser.stopLast])

    useEffect(() =>{
        if(returnTrip.from)setIsFrom(2)
        if(returnTrip.to) setIsTo(2)
    },[returnTrip.from, returnTrip.to ])


    return (
    <div className={container}>
        <div className={location}>
            <div className={extraCard}>
                <Required />
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    defaultLocation={
                        returnTrip.from
                        ?  returnTrip.from
                        : mainUser.pickUpLocation 
                        ? mainUser.pickUpLocation
                        : ''
                    }
                    style={isFrom === 1 ? ' error': isFrom === 2 ? 'success' : 'default' + 'w-[200px] ' } 
                    onBlur={()=> {
                        if(returnTrip.from){
                            setIsFrom(2)
                        } else {
                            setIsFrom(1)
                        }}
                    }
                    onChange={setFrom}
                    placeholder='Pick up location'
                />
                <Select 
                    width={100}
                    placeholder='favorites'
                    source={
                        userStore.defaultLocations.filter(item => !item.includes(returnTrip.to)).length > 0 
                        ? userStore.defaultLocations.filter(item => !item.includes(returnTrip.to))
                        : userStore.defaultLocations
                        } 
                    value={''} 
                    onChange={setFrom}
                />
            </div>

            {stop.first  &&
            <div className={extraCardStop}> 
                    <span className='icon'><SlLocationPin/></span> 
                    <GoogleAddressInput
                        style='w-[200px]'
                        defaultLocation={
                                returnTrip.stop1
                                ? returnTrip.stop1
                                :(returnTrip.stop2 && mainUser.stopFirst && !mainUser.stopLast) 
                                ? ''
                                : mainUser.stopLast
                                ? mainUser.stopLast
                                : mainUser.stopSecond
                                ? mainUser.stopSecond
                                : mainUser.stopFirst
                                ? mainUser.stopFirst 
                                : ''
                            } 
                        onChange={setStop1}
                        placeholder='Stop'
                    />
                <div 
                    className={closeStop} 
                    onClick={()=>{ 
                        setStop1('')
                        setStop({ ...stop, first: false }) 
                    }}
                >-</div>
            </div>}

            {stop.second  && 
            <div className={extraCardStop}>
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={
                        returnTrip.stop2
                        ? returnTrip.stop2
                        : (mainUser.stopLast && mainUser.stopSecond && mainUser.stopFirst) 
                        ? mainUser.stopSecond
                        : (mainUser.stopLast && mainUser.stopSecond) 
                        ?  mainUser.stopSecond
                        : (mainUser.stopFirst && mainUser.stopLast)
                        ? mainUser.stopFirst
                        : (mainUser.stopFirst && mainUser.stopSecond)
                        ? mainUser.stopFirst 
                        : ''
                    } 
                    onChange={setStop2}
                    placeholder='Second stop'
                />
                <div 
                    className={closeStop} 
                    onClick={()=>{ 
                        setStop2('')
                        setStop({ ...stop, second: false }) 
                    }}
                >-</div> 
            </div>}

            {stop.last  &&
            <div className={extraCardStop}>
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={
                        returnTrip.stop3 
                        ? returnTrip.stop3 
                        : (returnTrip.stop2 && returnTrip.stop1 || returnTrip.stop2 && mainUser.stopFirst ) 
                        ? mainUser.stopFirst 
                        : (mainUser.stopLast && mainUser.stopSecond && mainUser.stopFirst)
                        ? mainUser.stopFirst 
                        : ''
                    } 
                    onChange={setStop3}
                    placeholder='Last stop'
                />
                <div 
                    className={closeStop} 
                    onClick={()=>{
                        setStop3('')
                        setStop({ ...stop, last: false }) 
                    }}
                >-</div> 
            </div>}

            {(!stop.first || !stop.second || !stop.last) && <div className={addExtraBtn} onClick={()=>{
                if(!stop.first) return setStop({ ...stop, first: true })
                if(!stop.second) return setStop({ ...stop, second: true })
                if(!stop.last) return setStop({ ...stop, last: true })
            }}>
                <span className={addCircle}>+</span>add stop
                </div>}

            <div className={extraCard}>
                <Required />
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    defaultLocation={
                        returnTrip.to
                        ?  returnTrip.to
                        : mainUser.pickUpLocation 
                        ? mainUser.pickUpLocation 
                        : ''
                    } 
                    style={isTo === 1 ? ' error': isTo === 2 ? 'success' : 'default' + 'w-[200px] ' } 
                    onBlur={()=> {
                        if(returnTrip.to){
                            setIsTo(2)
                        } else {
                            setIsTo(1)
                        }}
                    }
                    onChange={setTo}
                    placeholder='Drop off location'
                />
                <Select 
                    width={100}
                    placeholder='favorites' 
                    source={
                        userStore.defaultLocations.filter(item => !item.includes(returnTrip.from)).length > 0
                        ? userStore.defaultLocations.filter(item => !item.includes(returnTrip.from))
                        : userStore.defaultLocations}
                    value={''} 
                    onChange={setTo}
                />
            </div>
        </div>

        <div className={date}>
            <div className={dateTime}>
                <div className={dateInput} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                    <Required />
                    <span className='icon text-xl'><PiCalendarCheckLight/></span>
                        {returnTrip.date ? <span >
                            {fullDate.format('dddd')},  
                            {'  '+fullDate.format('MMM')}
                            {'.  '+fullDate.format('D')}
                            { fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                ? 'st'
                                :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                ?  'nd'
                                :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                ? 'rd'
                                : 'th'
                            }
                        {' '+fullDate.format('YYYY')} </span>:  'Choice return data' }
                    {isDateOpen && <div className={dateTimeSubmenu}>
                        <DatePicker time={returnTrip.time} onChange={setDate} getFullDate={setFullDate}/>
                        <div className="flex justify-between pl-8">
                            <div className={setDateBtn} onClick={(e)=> {
                                    e.stopPropagation();
                                    setIsDateOpen(false)
                                }}>accept</div>
                        </div>
                    </div>}
                </div>
                <TimePicker onChange={setTime} date={returnTrip.time}/>

                {returnTrip.isReturnFlight 
                ?<div className='short'>
                    {(returnTrip.to.toLowerCase().includes('airport'))
                        ?<MdOutlineFlightTakeoff className='text-2xl ml-1'/>
                        :(returnTrip.to.toLowerCase().includes('bus'))
                        ? <FaBus className='text-xl ml-1'/>
                        :(returnTrip.to.toLowerCase().includes('train'))
                        ? <FaTrain className='text-xl ml-1'/>
                        :< MdOutlineFlightLand className='text-2xl ml-1'/>                  
                    }
                    <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                        {returnTrip.airlines.toLowerCase().includes('canada') 
                            ? 'AC'
                            : returnTrip.airlines.toLowerCase().includes('transat') 
                            ? 'TC'
                            : returnTrip.airlines.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>
                    <Input placeholder='#flight' style={{width:100, borderRadius: 0, height: 30}}onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value)}/>
                </div>
                : <div className="min-w-[110px] h-[32px]"></div>
                }
            </div>
            <div className={checkboxes}>
                <div onClick={()=>setIsFlight(!returnTrip.isReturnFlight)} className={checkCard}>
                    <input type="checkbox" checked={returnTrip.isReturnFlight} className='cursor-pointer'/>
                    <span>set flight</span>
                </div>
            </div>

            {(returnTrip.from.toLowerCase().includes('yul')
                || returnTrip.from.toLowerCase().includes('montréal airport') 
                || returnTrip.from.toLowerCase().includes(isAirport[0].toLowerCase())
                || returnTrip.from.toLowerCase().includes(isAirport[1].toLowerCase())
                || returnTrip.from.toLowerCase().includes(isAirport[2].toLowerCase())
                || returnTrip.to.toLowerCase().includes('montréal airport') 
                || returnTrip.to.toLowerCase().includes('yul') 
                || returnTrip.to.toLowerCase().includes(isAirport[0].toLowerCase())
                || returnTrip.to.toLowerCase().includes(isAirport[1].toLowerCase())
                || returnTrip.to.toLowerCase().includes(isAirport[2].toLowerCase())
            ) &&   
            <div className={airportSection}>
                <span className={airportContainer}>
                    <span className='icon'><GiControlTower /></span>
                    <Select width={150} source={userStore.flights}  onChange={setAirlines} placeholder='Airlines' />
                    <Select width={150} source={mainUser.flights}  onChange={setDeparture} placeholder='Departure' />
                </span >
            </div>}
        </div>
    </div>
    );
};


export default TripContent;


const checkboxes = 'flex w-full mb-auto w-1/2 self-end'
const checkCard = 'flex text-xs cursor-pointer space-x-2 w-full mb-auto mt-2 max-w-[400px] sm:pl-2'

const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'


const closeStop ="absolute w-4 h-4 -right-6 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"


const dateInput = 'text-xs flex items-center border py-1 relative w-full max-w-[200px] sm:max-w-[200px] sm:w-full '

const airportContainer ='flex w-full border sm:max-w-[380px] sm:space-between items-center'
const airportSection = 'flex sm:items-center sm:justify-center w-full'
const dateTime = 'flex justify-between sm:justify-center space-x-2 sm:items-start'

const extraCard = 'flex relative items-center border w-full max-w-[350px] sm:max-w-[310px]'
const extraCardStop = 'flex relative items-center border w-full mr-12 max-w-[250px] sm:max-w-[310px] self-end max-w-[240px] sm:w-[240px] sm:max-w-[240px] sm:mr-[20%]'

const date = 'flex flex-col 2xl:w-1/3 justify-between sm:mb-4 sm:px-0 sm:order-first sm:w-full sm:items-start sm:space-y-1 lg:w-full lg:order-first lg:items-start xl:w-1/2'
const location ='flex flex-col 2xl:w-1/3 items-center space-y-2 sm:mb-4 sm:px-0 sm:order-last sm:w-full sm:space-y-3 sm:max-w-[426px] sm:items-start sm:mt-10 lg:w-1/2 lg:mt-6 lg:items-start xl:items-start xl:w-1/2'
const container = 'flex relative w-full sm:flex-col sm:items-center sm:space-y-10 lg:flex-col lg:items-start lg:space-y-10'