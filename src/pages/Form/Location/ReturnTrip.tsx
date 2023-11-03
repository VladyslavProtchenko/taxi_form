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
    const [stopTrigger, setStopTrigger] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [stop, setStop] = useState({
        1:true,
        2:true,
        3:true,
    })

    useEffect(()=>{
        if(trigger[1]) setFrom(mainUser.dropOffLocation)
        if(trigger[2]) setTo(mainUser.pickUpLocation)
    },[trigger,mainUser.dropOffLocation, mainUser.pickUpLocation])

    useEffect(()=>{
        if(stopTrigger) {
            (mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) 
            ? setStop1(mainUser.stopLast)
            : (mainUser.stopFirst && !mainUser.stopSecond && mainUser.stopLast) 
            ? setStop1(mainUser.stopLast)
            : (!mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) 
            ? setStop1(mainUser.stopLast)
            : (!mainUser.stopFirst && !mainUser.stopSecond && mainUser.stopLast) 
            ? setStop1(mainUser.stopLast)
            : (mainUser.stopFirst && mainUser.stopSecond)
            ? setStop1(mainUser.stopSecond)
            : mainUser.stopFirst
            ? setStop1(mainUser.stopFirst)
            : (mainUser.stopFirst && !mainUser.stopSecond && !mainUser.stopLast) 
            ? setStop1(mainUser.stopFirst)
            : (!mainUser.stopFirst && mainUser.stopSecond && !mainUser.stopLast) 
            ? setStop1(mainUser.stopSecond)
            : setStop1('');
            
            (mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast)
            ? setStop2(mainUser.stopSecond)
            : (mainUser.stopFirst && !mainUser.stopSecond && mainUser.stopLast) 
            ? setStop2(mainUser.stopFirst)
            : (!mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) 
            ? setStop2(mainUser.stopSecond)
            : (mainUser.stopFirst && mainUser.stopSecond && !mainUser.stopLast) 
            ? setStop2(mainUser.stopFirst)
            : setStop2('');

            (mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) 
            ? setStop3(mainUser.stopFirst) 
            : setStop3('');

            
            (returnTrip.stop1 && returnTrip.stop2 && returnTrip.stop3)
            ? setStop({ 1:true, 2:true, 3:true}) 
            : ((!returnTrip.stop1 && returnTrip.stop2 && returnTrip.stop3) || (returnTrip.stop1 && !returnTrip.stop2 && returnTrip.stop3) || (returnTrip.stop1 && returnTrip.stop2 && !returnTrip.stop3))
            ? setStop({ 1:true, 2:true, 3:false}) 
            : ((!returnTrip.stop1 && !returnTrip.stop2 && returnTrip.stop3) || (returnTrip.stop1 && !returnTrip.stop2 && !returnTrip.stop3) || (!returnTrip.stop1 && returnTrip.stop2 && !returnTrip.stop3))
            ? setStop({ 1:true, 2:false, 3:false})
            : setStop({ 1:false, 2:false, 3:false});
        }

    },[stopTrigger, mainUser.stopLast,mainUser.stopSecond,mainUser.stopFirst, returnTrip.stop1,returnTrip.stop2,returnTrip.stop3])


    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport']



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
        <h1 className={returnTrip.isReturnTrip ? label : 'hidden'}>Return</h1>

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
                
                <span className={returnTrip.icon == 1 ? iconCard+ ' border-black ':iconCard+  ' border border-white '}>
                    <MdFlightLand className={ iconItem + ' text-blue-500 text-xl -translate-y-[2px]' } onClick={()=>{setIcon(1)}}/>
                </span>
                <span className={returnTrip.icon == 2 ? iconCard+ ' border-black ':iconCard+  '  border-white '}>
                    <BsTrainFrontFill className={iconItem + ' text-amber-700 '} onClick={()=>{setIcon(2)}}/>
                </span>
                <span className={returnTrip.icon == 3 ?iconCard+  ' border-black':iconCard+  ' border-white'}>
                    <FaBus className={ iconItem+ ' text-yellow-400 '} onClick={()=>{setIcon(3)}}/>
                </span>
                <span className={returnTrip.icon == 4 ?iconCard+  '  border-black':iconCard+  ' border-white '}>
                    <FaSailboat className={ iconItem+ ' text-orange-400 '} onClick={()=>{setIcon(4)}}/>
                </span>
                <span className={returnTrip.icon == 5 ?iconCard+  '  border-black':iconCard+  '  border-white'}>
                    <MdLocalHotel className={ iconItem+ ' text-purple-500 '} onClick={()=>{setIcon(5)}}/>
                </span>
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

        {stop[1]  &&
        <div className={extraCardStop}> 
                <span className='icon text-orange-400'><SlLocationPin/></span> 
                <GoogleAddressInput
                    style='w-[200px]'
                    defaultLocation={returnTrip.stop1} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStop1(e)
                    }}
                    placeholder='Stop'
                />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                    setStop1('')
                    setStop({ ...stop, 1: false }) 
                }}
            >-</div>
        </div>}

        { stop[2]  && 
        <div className={extraCardStop}>
            <span className='icon text-orange-400'><SlLocationPin/></span>
            <GoogleAddressInput 
                style='w-[200px]'
                defaultLocation={returnTrip.stop2} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStop2(e)
                    }}
                placeholder='Second stop'
            />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                    setStop2('')
                    setStop({ ...stop, 2: false }) 
                }}
            >-</div> 
        </div>}

        {stop[3]  &&
        <div className={extraCardStop}>
            <span className='icon text-orange-400'><SlLocationPin/></span>
            <GoogleAddressInput 
                style='w-[200px]'
                defaultLocation={returnTrip.stop3} 
                onChange={(e)=>{
                    setStopTrigger(false)
                    setStop3(e)
                }}
                placeholder='Last stop'
            />
            <div 
                className={closeStop} 
                onClick={()=>{
                    setStop3('')
                    setStop({ ...stop, 3: false }) 
                }}
            >-</div> 
        </div>}

        {(!stop[1] || !stop[2] || !stop[3]) && <div className={addExtraBtn} onClick={()=>{
            if(!stop[1]) return setStop({ ...stop, 1: true })
            if(!stop[2]) return setStop({ ...stop, 2: true })
            if(!stop[3]) return setStop({ ...stop, 3: true })
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
                <span className={returnTrip.icon2 == 1 ? iconCard+ ' border-black ':iconCard+  ' border border-white '}>
                    <MdFlightLand className={ iconItem + ' text-blue-500 text-xl -translate-y-[2px]' } onClick={()=>{setIcon2(1)}}/>
                </span>
                <span className={returnTrip.icon2 == 2 ? iconCard+ ' border-black ':iconCard+  '  border-white '}>
                    <BsTrainFrontFill className={iconItem + ' text-amber-700 '} onClick={()=>{setIcon2(2)}}/>
                </span>
                <span className={returnTrip.icon2 == 3 ?iconCard+  ' border-black':iconCard+  ' border-white'}>
                    <FaBus className={ iconItem+ ' text-yellow-400 '} onClick={()=>{setIcon2(3)}}/>
                </span>
                <span className={returnTrip.icon2 == 4 ?iconCard+  '  border-black':iconCard+  ' border-white '}>
                    <FaSailboat className={ iconItem+ ' text-orange-400 '} onClick={()=>{setIcon2(4)}}/>
                </span>
                <span className={returnTrip.icon2 == 5 ?iconCard+  '  border-black':iconCard+  '  border-white'}>
                    <MdLocalHotel className={ iconItem+ ' text-purple-500 '} onClick={()=>{setIcon2(5)}}/>
                </span>
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

        {!returnTrip.isReturnTrip && <div className='absolute -top-2 left-0 right-0 bottom-0 bg-white opacity-90'></div>}
    </div>
    );
};


export default TripContent;

const iconCard = ' border px-2 pt-[2px] rounded'

const iconItem = 'text-gray-300 active:text-gray-400 hover:text-gray-500 cursor-pointer'
const icons = 'flex w-1/3 justify-around pt-1 pl-3'
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
const date = 'flex space-x-2 sm:items-start items-start w-full   justify-between border-b-2 pb-6'

const locationCard = 'flex relative items-center w-full  space-x-2'
const extraCard = 'flex relative items-center border w-full '
const extraCardStop = 'flex relative mr-6  items-center border w-[90%] max-w-[350px] sm:max-w-[300px] self-end'

const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400'
const container = 'flex relative flex-col border p-10 space-y-3 relative w-[48%] sm:w-full rounded shadow-xl'