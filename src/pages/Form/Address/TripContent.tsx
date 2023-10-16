import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import Select from "../../../UI/components/Select";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "../../../Store/useLocation";
import { useReturnLocation } from "../../../Store/useReturnLocation";

import { MdOutlineFlightLand,MdOutlineFlightTakeoff  } from "react-icons/md";
import { GiControlTower } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";


import { Input } from "antd";
import Required from "../../../UI/components/Required";

const TripContent = () => {
    const {  user:userTrip, setIsReturnTrip } = useReturnLocation()
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
    } = useLocation()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState({first:false,second:false,last: false,})
    const [isFrom, setIsFrom] = useState(0)
    const [isTo, setIsTo] = useState(0)
    const [isFlight, setIsFlight] = useState(0)
    
    console.log(isFrom,isTo,isFlight)
    
    useEffect(() =>{
        if(user.pickUpLocation)setIsFrom(2)
        if(user.dropOffLocation) setIsTo(2)
    },[user.pickUpLocation, user.dropOffLocation ])


    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)']

    return (
    <div className={container}>
        <div className={location}>
            <div className={extraCard}>
                <Required />
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput
                    onBlur={()=> {
                        if(user.pickUpLocation){
                            setIsFrom(2)
                        } else {
                            setIsFrom(1)
                        }}
                    }
                    style='w-[200px] border-r' 
                    defaultLocation={user.pickUpLocation ? user.pickUpLocation : ''} 
                    onChange={setPickUpLocation}
                    placeholder='Pick up location'
                />
                <Select
                    width={100}
                    placeholder='favorite locations'
                    source={
                        user.defaultLocations.filter(item => !item.includes(user.dropOffLocation)).length > 0 
                        ? user.defaultLocations.filter(item => !item.includes(user.dropOffLocation))
                        : user.defaultLocations
                        } 
                    onChange={setPickUpLocation}
                />
            </div>
            {stop.first && 
            <div className={extraCardStop}>
                <span className='icon'><SlLocationPin/></span>  
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={''} 
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
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={''} 
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
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={ ''} 
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

            <div className={extraCard}> 
                <Required />
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-[200px] border-r' 
                    onBlur={()=> {
                        if(user.dropOffLocation){
                            setIsTo(2)
                        } else {
                            setIsTo(1)
                        }}
                    }
                    defaultLocation={user.dropOffLocation ? user.dropOffLocation : ''} 
                    onChange={setDropOffLocation}
                    placeholder='Drop off location'
                />
                <Select
                    width={100}
                    style={favorite} 
                    placeholder='favorites locations truncate' 
                    source={
                        user.defaultLocations.filter(item => !item.includes(user.pickUpLocation)).length > 0
                        ? user.defaultLocations.filter(item => !item.includes(user.pickUpLocation))
                        : user.defaultLocations}
                    value={user.dropOffLocation} 
                    onChange={setDropOffLocation}   
                />
            </div>
        </div>

        <div className={date}>
            <div className={dateTime}>
                <div className={dateInput} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                    <Required />
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
                <div className='short'>
                {(user.pickUpLocation == isAirport[0] || user.pickUpLocation == isAirport[1] )
                    ?< MdOutlineFlightLand className='text-2xl ml-1'/>
                    :<MdOutlineFlightTakeoff className='text-2xl ml-1'/>}
                    <Input placeholder='#flight' style={{width:100, borderRadius: 0, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            if(user.pickUpLocation == isAirport[0] || user.pickUpLocation == isAirport[1]){
                                user.flight.length < 4 ? setIsFlight(1) : setIsFlight(2);
                            }
                            setFlight(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div onClick={()=>setTaxiNow(!user.taxiNow)} className={taxi}>
                <input type="checkbox" checked={user.taxiNow} className='cursor-pointer'/>
                <span>Taxi now!</span>
            </div>

            {(user.pickUpLocation == isAirport[0] || user.pickUpLocation == isAirport[1] || user.dropOffLocation == isAirport[0] || user.dropOffLocation == isAirport[1] ) &&  
                <div className={airportSection}>
                    <span className={airportContainer}>
                        <span className='icon'><GiControlTower /></span>
                        <Select width={150} source={user.flights}  onChange={setAirline} placeholder='Airlines' />
                        <Select width={150} source={user.departureSections}  onChange={setDepartureSection} placeholder='Departure' />
                    </span>
                </div>}
        </div>

        <div className={userTrip.isReturnTrip ? front : back } onClick={()=>setIsReturnTrip(!userTrip.isReturnTrip)}>
            <h1>{!userTrip.isReturnTrip ? ' + ' : ' - '}Return trip</h1>
        </div>

        {/* <span className='shortxl'>
                        <span className='icon '><PiBriefcaseMetal /></span>
                        <Select width={100} source={user.tripList} onChange={setTripType} placeholder='Trip type' /></span> */}
    </div>
    );
};

export default TripContent;


const back = 'absolute left-1/2 -bottom-10  -translate-x-1/2  px-2 py-1  sm:hidden flex items-center  hover:text-green-300 text-green-400 text-sm font-bold cursor-pointer'
const front = ' absolute left-1/2 -bottom-10 -translate-x-1/2  px-2 py-1 sm:hidden flex sm:  items-center hover:text-red-300 text-red-400 text-sm font-bold  cursor-pointer'

const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const favorite =  'border border-yellow-200 text-gray-400 w-[100px]' 

const closeStop ="absolute w-4 h-4 -right-6 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"

const airportContainer ='flex w-full border sm:max-w-[380px] sm:space-between items-center'
const dateInput = 'text-xs flex items-center border py-1 relative w-[200px] sm:max-w-[200px] sm:w-full '


const airportSection = 'flex sm:items-center sm:justify-center w-full'
const taxi = 'flex text-xs cursor-pointer space-x-2 w-full mb-auto mt-2 max-w-[400px] sm:pb-6'
const dateTime = 'flex justify-between sm:mb-2 sm:justify-center space-x-2 sm:items-start'


const extraCardStop = 'flex relative items-center border w-full mr-12 max-w-[250px] sm:max-w-[310px] self-end max-w-[240px] sm:w-[240px] sm:max-w-[240px] sm:mr-[20%]'
const extraCard = 'flex relative items-center border w-full max-w-[350px] sm:max-w-[310px]'

const date = 'flex flex-col w-1/3  justify-between sm:mb-4 sm:px-0 sm:order-first sm:w-full sm:items-start sm:space-y-6 lg:w-1/2 lg:order-first lg:items-start'
const location ='flex flex-col w-1/3 items-center space-y-2 sm:mb-4 sm:px-0 sm:order-last sm:w-full sm:space-y-3 sm:max-w-[426px] sm:items-start sm:mt-10 lg:w-1/2 lg:mt-6 lg:items-start'
const container = 'flex relative w-full sm:flex-col sm:items-center sm:space-y-10 lg:flex-col lg:items-start lg:space-y-10'