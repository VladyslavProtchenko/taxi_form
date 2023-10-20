import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "../../../Store/useLocation";
import { useReturnLocation } from "../../../Store/useReturnLocation";

import { MdOutlineFlightLand,MdOutlineFlightTakeoff  } from "react-icons/md";
import { GiControlTower } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus,FaTrain } from "react-icons/fa";


import { Input, Select } from "antd";
import Required from "../../../UI/components/Required";
import { useStore } from "../../../Store";
import { useValidation } from "../../../Store/useValidation";

const TripContent = () => {
    const {  returnTrip, setIsReturnTrip } = useReturnLocation()
    const { validation, setIsMontreal,setIsMontrealPick,setIsAirport, setIsReturn } = useValidation()
    const { 
        user, 
        setPickUpLocation, 
        setDropOffLocation, 
        setStopFirst, 
        setStopSecond, 
        setStopLast, 
        setDate,
        setTime,
        setDepartureSection,
        setFlight,
        setAirline,
        setTaxiNow,
        setIsFlight,
        
    } = useLocation()

    const { user: info } = useStore()

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
        <div className={location}>
            <div className={validation.isFrom ? extraCard : extraCard +' border-red-500'}>
                <span className='icon text-green-500'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-[200px]' 
                    defaultLocation={user.pickUpLocation || ''} 
                    onChange={setPickUpLocation}
                    placeholder='Pick up location'
                />
                <Select
                    placeholder='favorite locations'
                    style={{ width:200 , height: 30}}
                    className='favorite pl-6 truncate'
                    onChange={setPickUpLocation}
                    options={(
                        info.defaultLocations.filter(item => !item.includes(user.dropOffLocation)).length > 0 
                        ? info.defaultLocations.filter(item => !item.includes(user.dropOffLocation))
                        : info.defaultLocations
                    ).map(item=>(
                        {value: item, label: item}
                    ))}
                />
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

            <div className={validation.isTo ? extraCard : extraCard +' border-red-500'}> 
                <span className='icon  text-red-500'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-[200px]' 
                    defaultLocation={user.dropOffLocation || ''} 
                    onChange={setDropOffLocation}
                    placeholder='Drop off location'
                />

                <Select
                    placeholder='favorite locations'
                    style={{ width:200 , height: 30}}
                    className='favorite truncate pl-6'
                    onChange={setDropOffLocation}
                    options={
                        (info.defaultLocations.filter(item => !item.includes(user.pickUpLocation)).length > 0
                        ? info.defaultLocations.filter(item => !item.includes(user.pickUpLocation))
                        : info.defaultLocations).map(item=>(
                            {value: item, label: item}
                        ))
                    }
                />
            </div>
        </div>
        
        <div className={date}>
            <div className={dateTime}>
                <div className={validation.isDate ? dateInput : dateInput +' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                    <span className='icon text-xl'><PiCalendarCheckLight/></span>
                    <span>{fullDate.format('dddd')},  
                    {'  '+fullDate.format('MMM')}
                    {'.  '+fullDate.format('D')}{ fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                                ? 'st'
                                                :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                                ?  'nd'
                                                :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                                ? 'rd'
                                                : 'th'
                                            }
                    {' '+fullDate.format('YYYY')}</span>
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
                
                <div 
                    className={
                        !user.isFlight ? 'short opacity-50 border'
                        : !validation.isMontrealPick 
                        ? 'short border'
                        : user.flight.length < 3 
                        ? 'short + border-red-500 border' 
                        : 'short border'  
                    }
                >
                    {(user.dropOffLocation.toLowerCase().includes('airport'))
                        ?<MdOutlineFlightTakeoff className='text-2xl ml-1'/>
                        :(user.pickUpLocation.toLowerCase().includes('airport'))
                        ?< MdOutlineFlightLand className='text-2xl ml-1'/>
                        :(user.dropOffLocation.toLowerCase().includes('bus'))
                        ? <FaBus className='text-xl ml-1'/>
                        :(user.dropOffLocation.toLowerCase().includes('train'))
                        ? <FaTrain className='text-xl ml-1'/>
                        :< MdOutlineFlightLand className='text-2xl ml-1'/>               
                    }   
                    <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                        {user.airline.toLowerCase().includes('canada') 
                            ? 'AC'
                            : user.airline.toLowerCase().includes('transat') 
                            ? 'TC'
                            : user.airline.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>
                    <Input placeholder='#' disabled={(!user.isFlight)} style={{width:100, paddingLeft:0, borderRadius: 0, height: 30}}onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value)}/>
                </div>
                
            </div>
            <div className={checkboxes}>
                <div onClick={()=>setTaxiNow(!user.taxiNow)} className={checkCard}>
                    <input type="checkbox" checked={user.taxiNow} className='cursor-pointer'/>
                    <span>Taxi now!</span>
                </div>

                {(validation.isMontreal || validation.isAirport) && <div onClick={()=>{
                        if(validation.isMontrealPick) return;
                        setIsFlight(!user.isFlight)
                    }} className={checkCard}>
                    <input type="checkbox" checked={(user.isFlight)} className='cursor-pointer'/>
                    <span>set flight</span>
                </div>}
            </div>
            

            {((validation.isMontreal &&  user.isFlight) || validation.isMontrealPick) &&
            <div className={airportSection}>
                <span className={validation.isDeparture ?  airportContainer : airportContainer + ' border-red-500' }>
                {validation.isMontrealPick && <Required />}
                <span className='icon'><GiControlTower /></span>
                    <Select 
                        style={{width: '50%'}} 
                        options={user.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirline} 
                        placeholder='Airlines' 
                    />
                    <Select 
                        style={{width: '50%'}} 
                        options={user.departureSections.map(item=>(
                            {value: item, label: item}
                        ))}   
                        onChange={setDepartureSection} 
                        placeholder='Departure' 
                    />
                </span>
            </div>}
        </div>

        <div className={returnTrip.isReturnTrip ? front : back } onClick={()=>{
                setIsReturnTrip(!returnTrip.isReturnTrip)
                setIsReturn(!validation.isReturn)
            }}>
            <h1>{!returnTrip.isReturnTrip ? ' + ' : ' - '}Return trip</h1>
        </div>

    </div>
    );
};

export default TripContent;


const checkboxes = 'flex w-full sm:mb-8 2xl:mb-auto'
const checkCard = 'flex text-xs cursor-pointer space-x-2 w-full mb-auto mt-2 max-w-[400px] sm:pl-2'

const back = 'absolute left-1/2 -bottom-10  -translate-x-1/2  px-2 py-1  sm:hidden flex items-center  hover:text-green-300 text-green-400 text-sm font-bold cursor-pointer'
const front = ' absolute left-1/2 -bottom-10 -translate-x-1/2  px-2 py-1 sm:hidden flex sm:  items-center hover:text-red-300 text-red-400 text-sm font-bold  cursor-pointer'

const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const closeStop ="absolute w-4 h-4 -right-6 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"

const airportContainer ='flex relative w-full border sm:max-w-[380px] sm:space-between items-center sm:items-center'
const dateInput = 'text-xs flex items-center border py-1 relative w-[200px] sm:max-w-[200px] sm:w-full '


const airportSection = 'flex w-full '
const dateTime = 'flex justify-between sm:mb-2 sm:justify-center space-x-2 '


const extraCardStop = 'flex relative items-center border w-full mr-12 max-w-[250px] sm:max-w-[310px] self-end max-w-[240px] sm:w-[240px] sm:max-w-[240px] sm:mr-[20%]'
const extraCard = 'flex relative items-center border w-full max-w-[350px] sm:max-w-[310px]'

const date = ' flex flex-col 2xl:w-1/3 justify-between sm:mb-4 sm:px-0 sm:order-first sm:w-full sm:items-start'
const location ='flex flex-col 2xl:w-1/3 items-center space-y-2 sm:mb-4 sm:px-0 sm:order-last sm:w-full sm:items-start sm:space-y-3 sm:max-w-[426px] sm:mt-10 sm:self-start lg:mt-6 lg:items-start xl:w-1/2 xl:items-start'
const container = 'flex relative w-full sm:flex-col  sm:space-y-10 lg:flex-col lg:items-start lg:space-y-10 sm:items-center'