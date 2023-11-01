import { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "antd";
import dayjs from "dayjs";
import useOnclickOutside from "react-cool-onclickoutside";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import { useStore } from "../../../Store";

import { useValidation } from "../../../Store/useValidation";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useLocation } from "../../../Store/useLocation";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { GiControlTower } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BsTrainFrontFill } from "react-icons/bs";


const TripContent = () => {
    const { returnTrip, setFrom, setTo,setIcon, setIcon2, setStop1, setStop2, setStop3, setDate,setTime,setDeparture,setDeparture2,setFlight,setFlight2,setAirlines,setAirlinesBack,setIsFlight } = useReturnLocation()
    const { user: mainUser } = useLocation()
    const { user: userStore } = useStore()
    const { validation, setIsMontrealBack, setIsMontrealPickBack } =useValidation()
    const [trigger, setTrigger] = useState({ 1: 1, 2: 1 })
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)

    useEffect(()=>{
        if(trigger[1]) setFrom(mainUser.dropOffLocation)
        if(trigger[2]) setTo(mainUser.pickUpLocation)
    },[trigger,mainUser.dropOffLocation, mainUser.pickUpLocation])

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

    useEffect(()=>{
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number
        if(returnTrip.from.toLowerCase().includes('yul')
            || returnTrip.from.toLowerCase().includes('montréal airport') 
            || returnTrip.from.toLowerCase().includes(isAirport[0].toLowerCase())
            || returnTrip.from.toLowerCase().includes(isAirport[1].toLowerCase())
            || returnTrip.from.toLowerCase().includes(isAirport[2].toLowerCase())
            || returnTrip.to.toLowerCase().includes('montréal airport') 
            || returnTrip.to.toLowerCase().includes('yul') 
            || returnTrip.to.toLowerCase().includes(isAirport[0].toLowerCase())
            || returnTrip.to.toLowerCase().includes(isAirport[1].toLowerCase())
            || returnTrip.to.toLowerCase().includes(isAirport[2].toLowerCase())
        ){ 
            setIsMontrealBack(true)
        } else { 
            setIsMontrealBack(false) 
        }

        if(returnTrip.from.toLowerCase().includes('yul')
            || returnTrip.from.toLowerCase().includes('montréal airport') 
            || returnTrip.from.toLowerCase().includes(isAirport[0].toLowerCase())
            || returnTrip.from.toLowerCase().includes(isAirport[1].toLowerCase())
            || returnTrip.from.toLowerCase().includes(isAirport[2].toLowerCase())
        ) {
            setIsMontrealPickBack(true)
            setIsFlight(true)
        }else{
            setIsFlight(false)
            setIsMontrealPickBack(false)
        }

    },[returnTrip.from, returnTrip.to])

    return (
    <div className={container}>

        <div className={date}>
            <div className={validation.isDateBack ? dateInput : dateInput +' border-red-500'}  onClick={()=> setIsDateOpen(true)} ref={ref}> 
                <span className='icon text-xl'><PiCalendarCheckLight/></span>
                    {returnTrip.date ? 
                    <div className='flex items-center'>
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
                    {' '+fullDate.format('YYYY')} </div>:  <div className='flex items-center'>Choice return date</div> }
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
            <TimePicker time={returnTrip.time} onChange={setTime} date={returnTrip.time}/>
        </div>

        <div className={type}>
            <div className={icons}>
                <MdFlightLand className={returnTrip.icon == 1 ? iconItem+' text-gray-900 text-xl': iconItem+ ' text-xl '} onClick={()=>{setIcon(1)}}/>
                <BsTrainFrontFill className={returnTrip.icon == 2 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(2)}}/>
                <FaBus className={returnTrip.icon == 3 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(3)}}/>
                <FaSailboat className={returnTrip.icon == 4 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(4)}}/>
                <MdLocalHotel className={returnTrip.icon == 5 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(5)}}/>
            </div>

            <div className={flightCard }>
                {returnTrip.icon === 1 && <Select 
                    className='favorite w-1/2 max-h-[30px]'
                    style={{width: '100px'}} 
                    options={mainUser.flights.map(item=>(
                        {value: item, label: item}
                    ))} 
                    onChange={setAirlines} 
                    placeholder='Airlines' 
                />}
                
                {returnTrip.icon === 1
                    ?<MdFlightLand className='text-xl mx-1'/>
                    :returnTrip.icon === 2
                    ?<BsTrainFrontFill className=' mx-1'/>
                    :returnTrip.icon === 3
                    ? <FaBus className=' mx-1'/>
                    :returnTrip.icon === 4
                    ? <FaSailboat className=' mx-1'/>
                    :returnTrip.icon === 5 
                    ?<MdLocalHotel className='mx-1'/>
                    :<MdFlightTakeoff className='text-xl mx-1'/>
                }   
                {returnTrip.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                    {returnTrip.airline.toLowerCase().includes('canada') 
                        ? 'AC'
                        : returnTrip.airline.toLowerCase().includes('transat') 
                        ? 'TC'
                        : returnTrip.airline.toLowerCase().includes('quatar') 
                        ? 'QR'
                        : ''
                    }
                </div>}
                <Input 
                    placeholder={returnTrip.icon === 1 ?'####': returnTrip.icon === 2 ? 'Train#' : returnTrip.icon === 3 ? "Bus#" : returnTrip.icon === 4 ? 'Boat#': 'Room#'} 
                    style={{width:`${returnTrip.icon === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value)}
                />
            </div>
        </div>

        <div className={locationCard}>
            <div className={validation.isBackFrom ? extraCard : extraCard + ' border-red-500'}>
                <span className='icon text-green-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full' 
                    defaultLocation={
                        returnTrip.from
                        ? returnTrip.from
                        : mainUser.dropOffLocation && trigger[1] 
                        ? mainUser.dropOffLocation
                        : ''
                    }
                    onChange={(e)=> {
                        setFrom(e)
                        setTrigger({...trigger, 1: 0})
                    }}
                    placeholder='Pick up location'
                />
            </div>
            <div className="border flex items-center w-1/3 ">
                <Select placeholder='Departure' className='favorite' style={{ height: 30}}onChange={setDeparture}options={mainUser.departureSections.map(item=>({value: item, label: item}))}/>
            </div>
        </div>

        {stop.first  &&
        <div className={extraCardStop}> 
                <span className='icon text-orange-400'><SlLocationPin/></span> 
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
            <span className='icon text-orange-400'><SlLocationPin/></span>
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
            <span className='icon text-orange-400'><SlLocationPin/></span>
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
            <span className={addCircle}>+</span>
        </div>}

        <div className={locationCard}>
            <div className={validation.isBackFrom ? extraCard : extraCard + ' border-red-500'}>
                <span className='icon text-red-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    defaultLocation={
                        returnTrip.to 
                        ?  returnTrip.to
                        : mainUser.pickUpLocation && trigger[2]
                        ? mainUser.pickUpLocation 
                        : ''
                    } 
                    style='w-full' 
                    onChange={(e)=> {
                        setTo(e)
                        setTrigger({...trigger, 2: 0})
                    }}
                    placeholder='Drop off location'
                />
            </div>
            <div className="border flex items-center w-1/3 ">
                <Select placeholder='Departure' className='favorite ' style={{ height: 30}}onChange={setDeparture2}options={mainUser.departureSections.map(item=>({value: item, label: item}))}/>
            </div>
        </div>

        <div className={type}>
            
            <div className={icons}>
                <MdFlightTakeoff className={returnTrip.icon2 == 1 ? iconItem+' text-gray-900 text-xl': iconItem+ ' text-xl '} onClick={()=>{setIcon2(1)}}/>
                <BsTrainFrontFill className={returnTrip.icon2 == 2 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon2(2)}}/>
                <FaBus className={returnTrip.icon2 == 3 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon2(3)}}/>
                <FaSailboat className={returnTrip.icon2 == 4 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon2(4)}}/>
                <MdLocalHotel className={returnTrip.icon2 == 5 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon2(5)}}/>
            </div>

            <div className={flightCard }>
                {returnTrip.icon2 === 1 && <Select 
                    className='favorite w-1/2 max-h-[30px]'
                    style={{width: '100px'}} 
                    options={mainUser.flights.map(item=>(
                        {value: item, label: item}
                    ))} 
                    onChange={setAirlinesBack} 
                    placeholder='Airlines' 
                />}
                
                {returnTrip.icon2 === 1
                    ?<MdFlightTakeoff className='text-xl mx-1'/>
                    :returnTrip.icon2 === 2
                    ?< BsTrainFrontFill className=' mx-1'/>
                    :returnTrip.icon2 === 3
                    ? <FaBus className=' mx-1'/>
                    :returnTrip.icon2 === 4
                    ? <FaSailboat className=' mx-1'/>
                    :returnTrip.icon2 === 5 
                    ?<MdLocalHotel className='mx-1'/>
                    :<MdFlightLand className='text-xl mx-1'/>
                }   
                {returnTrip.icon2 === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                    {returnTrip.airlineBack.toLowerCase().includes('canada') 
                        ? 'AC'
                        : returnTrip.airlineBack.toLowerCase().includes('transat') 
                        ? 'TC'
                        : returnTrip.airlineBack.toLowerCase().includes('quatar') 
                        ? 'QR'
                        : ''
                    }
                </div>}
                <Input 
                    placeholder={returnTrip.icon2 === 1 ?'####': returnTrip.icon2 === 2 ? 'Train#' : returnTrip.icon2 === 3 ? "Bus#" : returnTrip.icon2 === 4 ? 'Boat#': 'Room#'} 
                    style={{width:`${returnTrip.icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight2(e.target.value)}/>
            </div>
        </div>

        {(validation.isMontrealPickBack || (validation.isFlight && validation.isMontrealBack)) &&   
        <div className={airportSection}>
            <span className={airportContainer}>
                <span className='icon'><GiControlTower /></span>
                <Select placeholder='Airlines' style={{ width:'50%' , height: 30}}onChange={setAirlines}options={userStore.flights.map(item=>({value: item, label: item}))}/>
            </span >
        </div>}

        {!returnTrip.isReturnTrip && <div className='absolute top-0 left-0 right-0 bottom-0 bg-white opacity-90'></div>}
    </div>
    );
};


export default TripContent;


const iconItem = 'text-gray-300 active:text-gray-400 hover:text-gray-500 cursor-pointer'
const icons = 'flex w-1/3 justify-around pt-1'
const type = 'flex items-center justify-between w-full  space-x-4'
const flightCard = 'flex relative items-center border w-1/2 lg:w-3/5  '

const addCircle = " w-5 h-5 flex justify-center bg-green-400 ml-2 -translate-y-1 rounded-full border border-black cursor-pointer font-bold text-black opacity-20 hover:opacity-100 duration-300 "
const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded-full flex  justify-center cursor-pointer text-bold  items-center"
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'


const dateInput = 'text-xs flex border py-1 relative w-full max-w-[200px] sm:max-w-[200px] sm:w-full '

const airportContainer ='flex w-full border sm:max-w-[380px] sm:space-between items-center'
const airportSection = 'flex sm:items-center sm:justify-center w-full max-w-[350px]'
const date = 'flex space-x-2 sm:items-start items-start w-full   justify-between'

const locationCard = 'flex relative items-center w-full  space-x-2'
const extraCard = 'flex relative items-center border w-full '
const extraCardStop = 'flex relative mr-6  items-center border w-[90%] max-w-[350px] sm:max-w-[300px] self-end'

const container = 'flex flex-col border p-10 space-y-3 relative w-[48%] sm:w-full rounded shadow-xl'