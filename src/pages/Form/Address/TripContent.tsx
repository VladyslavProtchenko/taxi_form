import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select } from "antd";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";
import { useLocation } from "../../../Store/useLocation";
import { useValidation } from "../../../Store/useValidation";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus,FaTrain } from "react-icons/fa";
import { FaSailboat, FaHotel } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";

const TripContent = () => {
    const { validation, setIsMontreal,setIsMontrealPick,setIsAirport } = useValidation()
    const { 
        user, 
        setPickUpLocation, 
        setDropOffLocation, 
        setStopFirst, 
        setStopSecond, 
        setStopLast, 
        setDate,
        setTime,
        setDeparture,
        setDeparture2,
        setFlight,
        setAirline,
        setIsFlight,
        setIcon,
    } = useLocation()
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState({first:false,second:false,last: false,})
    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport']

    useEffect(()=>{
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number
        if(user.pickUpLocation.toLowerCase().includes('yul')
            || user.pickUpLocation.toLowerCase().includes('montréal airport') 
            || user.pickUpLocation.toLowerCase().includes(isAirport[0].toLowerCase())
            || user.pickUpLocation.toLowerCase().includes(isAirport[1].toLowerCase())
            || user.pickUpLocation.toLowerCase().includes(isAirport[2].toLowerCase())
            || user.dropOffLocation.toLowerCase().includes('montréal airport') 
            || user.dropOffLocation.toLowerCase().includes('yul') 
            || user.dropOffLocation.toLowerCase().includes(isAirport[0].toLowerCase())
            || user.dropOffLocation.toLowerCase().includes(isAirport[1].toLowerCase())
            || user.dropOffLocation.toLowerCase().includes(isAirport[2].toLowerCase())
        ){ 
            setIsMontreal(true)
        } else { 
            setIsMontreal(false) 
        }

        if(user.pickUpLocation.toLowerCase().includes('yul')
            || user.pickUpLocation.toLowerCase().includes('montréal airport') 
            || user.pickUpLocation.toLowerCase().includes(isAirport[0].toLowerCase())
            || user.pickUpLocation.toLowerCase().includes(isAirport[1].toLowerCase())
            || user.pickUpLocation.toLowerCase().includes(isAirport[2].toLowerCase())
        ) {
            setIsMontrealPick(true)
            setIsFlight(true)
        }else{
            setIsFlight(false)
            setIsMontrealPick(false)
        }
        if(user.pickUpLocation.toLowerCase().includes('airport')|| user.dropOffLocation.toLowerCase().includes('airport')) {
            setIsAirport(true)
        } else {
            setIsAirport(false)        
        }
    },[user.pickUpLocation, user.dropOffLocation])

    return (
    <div className={container}>
        <div className={date}>
            <div className={validation.isDate ? dateInput : dateInput +' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                <span className='icon text-xl'><PiCalendarCheckLight/></span>
                <div className='flex items-center'>
                {fullDate.format('dddd')},  
                {'  '+fullDate.format('MMM')}
                {'.  '+fullDate.format('D')}{ fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                            ? 'st'
                                            :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                            ?  'nd'
                                            :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                            ? 'rd'
                                            : 'th'
                                        }
                {' '+fullDate.format('YYYY')}</div>
                {isDateOpen && <div className={dateTimeSubmenu}>
                    <DatePicker time={user.time} onChange={setDate} getFullDate={setFullDate}/>
                    <div className="flex justify-between pl-8">
                        <div className={setDateBtn} onClick={(e)=> {
                                e.stopPropagation();
                                setIsDateOpen(false)
                            }}>accept</div>
                    </div>
                </div>}
            </div>
            <TimePicker timeNow={user.taxiNow ? dayjs().format('HH,mm') : '' } onChange={setTime} date={user.date}/> 
        </div>

        <div className={type}>
            
            <div className={icons}>
                <MdFlightTakeoff className={user.icon == 1 ? iconItem+' text-gray-900 text-xl': iconItem+ ' text-xl '} onClick={()=>{setIcon(1)}}/>
                <FaTrain className={user.icon == 2 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(2)}}/>
                <FaBus className={user.icon == 3 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(3)}}/>
                <FaSailboat className={user.icon == 4 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(4)}}/>
                <FaHotel className={user.icon == 5 ? iconItem+' text-gray-900': iconItem} onClick={()=>{setIcon(5)}}/>
            </div>

            {user.icon && <div className={flightCard }>
                {user.icon === 1 && 
                <Select 
                    className='favorite w-1/2 max-h-[30px]'
                    style={{width: '100px'}} 
                    options={user.flights.map(item=>(
                        {value: item, label: item}
                    ))} 
                    onChange={setAirline} 
                    placeholder='Airlines' 
                />}
                
                {user.icon === 1
                    ?<MdFlightTakeoff className='text-xl mx-1'/>
                    :user.icon === 2
                    ?< FaTrain className=' mx-1'/>
                    :user.icon === 3
                    ? <FaBus className=' mx-1'/>
                    :user.icon === 4
                    ? <FaSailboat className=' mx-1'/>
                    :user.icon === 5 
                    ?<FaHotel className='mx-1'/>
                    :<MdFlightLand className='text-xl mx-1'/>
                }   
                {user.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                    {user.airline.toLowerCase().includes('canada') 
                        ? 'AC'
                        : user.airline.toLowerCase().includes('transat') 
                        ? 'TC'
                        : user.airline.toLowerCase().includes('quatar') 
                        ? 'QR'
                        : ''
                    }
                </div>}
                <Input placeholder='#' className={user.icon === 1 ? ' max-w-[80px]': '' } style={{ width:'100%', paddingLeft:0, borderRadius: 0, height: 30}} onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value)}/>
            </div>}
        </div>
        <div className={locationCard}>
            <div className={validation.isFrom ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                <span className='icon text-green-500'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full' 
                    defaultLocation={user.pickUpLocation || ''} 
                    onChange={setPickUpLocation}
                    placeholder='Pick up location'
                />
            </div>
            <div className="border flex items-center w-1/3 ">
                <Select 
                    className='favorite truncate'
                    style={{}} 
                    options={user.departureSections.map(item=>(
                        {value: item, label: item}
                    ))}   
                    onChange={setDeparture} 
                    placeholder='Departure' 
                />
            </div>
        </div>
            
        {stop.first && 
        <div className={extraCardStop}>
            <span className='icon text-orange-400'><SlLocationPin/></span>  
            <GoogleAddressInput
                style='w-[200px]'
                defaultLocation={user.stopFirst || ''} 
                onChange={setStopFirst}
                placeholder='Stop'
            />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                    setStopFirst('')
                    setStop({ ...stop, first: false }) 
                }}
            >-</div>
        </div>}

        {stop.second &&  
        <div className={extraCardStop}>
            <span className='icon  text-orange-400'><SlLocationPin/></span>
            <GoogleAddressInput 
                defaultLocation={user.stopSecond || ''} 
                style='w-[200px]'
                onChange={setStopSecond}
                placeholder='Second stop'
            />
            <div 
                className={closeStop}  
                onClick={()=>{ 
                    setStopSecond('')
                    setStop({ ...stop, second: false }) 
                }}
            >-</div> 
        </div>}

        {stop.last &&  
        <div className={extraCardStop}>
            <span className='icon  text-orange-400'><SlLocationPin/></span>
            <GoogleAddressInput
                style='w-[200px]'
                defaultLocation={user.stopLast || ''} 
                onChange={setStopLast}
                placeholder='Last stop'
            />
            <div 
                className={closeStop}  
                onClick={()=>{ 
                    setStopLast('')
                    setStop({ ...stop, last: false }) 
                }}
            >-</div> 
        </div>}

        {(!stop.first || !stop.second || !stop.last) 
        && <div className={addExtraBtn} onClick={()=>{
            if(!stop.first) return setStop({ ...stop, first: true })
            if(!stop.second) return setStop({ ...stop, second: true })
            if(!stop.last) return setStop({ ...stop, last: true })
        }}>
            <span className={addCircle}>+</span>add stop
        </div>}

        <div className={locationCard}>
            <div className={validation.isTo ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                <span className='icon text-green-500'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full' 
                    defaultLocation={user.dropOffLocation || ''} 
                    onChange={setDropOffLocation}
                    placeholder='Drop off location'
                />
            </div>
            <div className="border flex items-center w-1/3 ">
            <Select 
                className='favorite truncate'
                options={user.departureSections.map(item=>(
                    {value: item, label: item}
                ))}   
                onChange={setDeparture2} 
                placeholder='Departure' 
            />
            </div>
        </div>
    </div>
    );
};

export default TripContent;

const iconItem = 'text-gray-300 active:text-gray-400 hover:text-gray-500 cursor-pointer'
const icons = 'flex w-1/3 justify-around pt-1'
const type = 'flex items-center justify-between w-full 2xl:w-3/4  space-x-4 '
const flightCard = 'flex relative items-center border 2xl:w-3/4 lg:w-3/5 w-1/2'

const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const closeStop ="absolute w-4 h-4 -right-6 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"

const dateInput = 'text-xs flex border py-1 relative w-[200px] sm:max-w-[200px] sm:w-full'

const date = 'flex sm:mb-2 w-full 2xl:w-3/4 space-x-2 items-start  justify-between'
const locationCard = 'flex relative items-center w-full 2xl:w-3/4 space-x-2'

const extraCardStop = 'flex relative items-center border w-full max-w-[250px] sm:max-w-[310px] ml-[100px] sm:ml-[5%]  lg:ml-[5%]  max-w-[240px] sm:w-[240px] sm:max-w-[240px] sm:mr-[20%]'
const extraCardPickUp = 'flex relative w-3/4 items-center border w-full 2xl:w-3/4'

const container = 'flex border p-10 border-gray-600 flex-col w-[48%] sm:w-full relative space-y-3'