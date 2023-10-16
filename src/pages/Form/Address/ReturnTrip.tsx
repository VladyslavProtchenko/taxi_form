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

import Required from "../../../UI/components/Required";






const TripContent = () => {
    const { user, setRetPickUpLocation, setRetDropOffLocation, setRetStopFirst, setRetStopSecond, setRetStopLast, setRetDate,setRetTime,setRetDepartureSection,setRetFlight,setRetAirlines } = useReturnLocation()
    const { user: mainUser } = useLocation()
    const { user: userStore } = useStore()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)

    const [isFrom, setIsFrom] = useState(0)
    const [isTo, setIsTo] = useState(0)
    const [isFlight, setIsFlight] = useState(0)
    console.log(isFlight)

    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)']

    const [stop, setStop] = useState({
        first:false,
        second:false,
        last: false,
    })
    //Here i do check if we have stops, we need ser revert stops! 
    //If we remove stops, we need remove return stops, if the empty! if now we cant remove them!

    useEffect(() =>{
        if(!user.retStopFirst ) setStop({...stop, first: false})
        if(!user.retStopSecond ) setStop({...stop, second: false})
        if(!user.retStopLast ) setStop({...stop, last: false})
        if(!user.retStopFirst && !user.retStopSecond && !user.retStopLast) setStop({first:false, second:false, last: false,})
        

        if(mainUser.stopFirst || mainUser.stopSecond || mainUser.stopLast) {
            if(user.retStopSecond) return setStop({...stop,first: true})
            setStop({...stop, first: true, second: false})
        }

        if((mainUser.stopFirst && mainUser.stopSecond) || (mainUser.stopLast && mainUser.stopSecond) || (mainUser.stopFirst && mainUser.stopLast)) {
            if(user.retStopLast) return setStop({...stop, second: true})
            setStop({...stop, second: true, last: false})
        }
        
        if(mainUser.stopFirst && mainUser.stopSecond && mainUser.stopLast) {
            setStop({first: true, second:true, last: true})
        }

    },[mainUser.stopFirst, mainUser.stopSecond, mainUser.stopLast])

    useEffect(() =>{
        if(user.retPickUpLocation)setIsFrom(2)
        if(user.retDropOffLocation) setIsTo(2)
    },[user.retPickUpLocation, user.retDropOffLocation ])


    return (
    <div className={container}>
        <div className={location}>
            <div className={extraCard}>
                <Required />
                <span className='icon'><SlLocationPin/></span>
                <GoogleAddressInput 
                    defaultLocation={
                        user.retPickUpLocation
                        ?  user.retPickUpLocation
                        : mainUser.dropOffLocation 
                        ? mainUser.dropOffLocation 
                        : ''
                    }
                    style={isFrom === 1 ? ' error': isFrom === 2 ? 'success' : 'default' + 'w-[200px] ' } 
                    onBlur={()=> {
                        if(user.retPickUpLocation){
                            setIsFrom(2)
                        } else {
                            setIsFrom(1)
                        }}
                    }
                    onChange={setRetPickUpLocation}
                    placeholder='Pick up location'
                />
                <Select 
                    width={100}
                    placeholder='favorites'
                    source={
                        userStore.defaultLocations.filter(item => !item.includes(user.retDropOffLocation)).length > 0 
                        ? userStore.defaultLocations.filter(item => !item.includes(user.retDropOffLocation))
                        : userStore.defaultLocations
                        } 
                    value={''} 
                    onChange={setRetPickUpLocation}
                />
            </div>

            {stop.first  &&
            <div className={extraCardStop}> 
                    <span className='icon'><SlLocationPin/></span> 
                    <GoogleAddressInput
                        style='w-[200px]'
                        defaultLocation={
                                user.retStopFirst
                                ? user.retStopFirst
                                :(user.retStopSecond && mainUser.stopFirst && !mainUser.stopLast) 
                                ? ''
                                : mainUser.stopLast
                                ? mainUser.stopLast
                                : mainUser.stopSecond
                                ? mainUser.stopSecond
                                : mainUser.stopFirst
                                ? mainUser.stopFirst 
                                : ''
                            } 
                        onChange={setRetStopFirst}
                        placeholder='Stop'
                    />
                <div 
                    className={closeStop} 
                    onClick={()=>{ 
                        setRetStopFirst('')
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
                        user.retStopSecond
                        ? user.retStopSecond
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
                    onChange={setRetStopSecond}
                    placeholder='Second stop'
                />
                <div 
                    className={closeStop} 
                    onClick={()=>{ 
                        setRetStopSecond('')
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
                        user.retStopLast 
                        ? user.retStopLast 
                        : (user.retStopSecond && user.retStopFirst || user.retStopSecond && mainUser.stopFirst ) 
                        ? mainUser.stopFirst 
                        : (mainUser.stopLast && mainUser.stopSecond && mainUser.stopFirst)
                        ? mainUser.stopFirst 
                        : ''
                    } 
                    onChange={setRetStopLast}
                    placeholder='Last stop'
                />
                <div 
                    className={closeStop} 
                    onClick={()=>{
                        setRetStopLast('')
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
                        user.retDropOffLocation
                        ?  user.retDropOffLocation
                        : mainUser.pickUpLocation 
                        ? mainUser.pickUpLocation 
                        : ''
                    } 
                    style={isTo === 1 ? ' error': isTo === 2 ? 'success' : 'default' + 'w-[200px] ' } 
                    onBlur={()=> {
                        if(user.retDropOffLocation){
                            setIsTo(2)
                        } else {
                            setIsTo(1)
                        }}
                    }
                    onChange={setRetDropOffLocation}
                    placeholder='Drop off location'
                />
                <Select 
                    width={100}
                    placeholder='favorites' 
                    source={
                        userStore.defaultLocations.filter(item => !item.includes(user.retPickUpLocation)).length > 0
                        ? userStore.defaultLocations.filter(item => !item.includes(user.retPickUpLocation))
                        : userStore.defaultLocations}
                    value={''} 
                    onChange={setRetDropOffLocation}
                />
            </div>
        </div>

        <div className={date}>
            <div className={dateTime}>
                <div className={dateInput} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                    <Required />
                    <span className='icon text-xl'><PiCalendarCheckLight/></span>
                        {user.retDate ? <span >
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
                        <DatePicker time={user.retTime} onChange={setRetDate} getFullDate={setFullDate}/>
                        <div className="flex justify-between pl-8">
                            <div className={setDateBtn} onClick={(e)=> {
                                    e.stopPropagation();
                                    setIsDateOpen(false)
                                }}>accept</div>
                        </div>
                    </div>}
                </div>
                <TimePicker onChange={setRetTime} date={user.retDate}/>
                <div className='short'>
                    {(user.retPickUpLocation == isAirport[0] || user.retPickUpLocation == isAirport[1] )
                    ?< MdOutlineFlightLand className='text-2xl ml-1'/>
                    :<MdOutlineFlightTakeoff className='text-2xl ml-1'/>}
                    <Input placeholder='#flight' style={{width:100, borderRadius: 0, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            if(user.retPickUpLocation == isAirport[0] || user.retPickUpLocation == isAirport[1]){
                                user.retFlight.length < 4 ? setIsFlight(1) : setIsFlight(2);
                            }
                            setRetFlight(e.target.value)
                        }}
                    />
                </div>
            </div>

            {(user.retPickUpLocation === isAirport[0] || user.retDropOffLocation === isAirport[0]) && 
            <div className={airportSection}>
                <span className={airportContainer}>
                    <span className='icon'><GiControlTower /></span>
                    <Select width={150} source={userStore.flights}  onChange={setRetAirlines} placeholder='Airlines' />
                    <Select width={150} source={mainUser.flights}  onChange={setRetDepartureSection} placeholder='Departure' />
                </span >
            </div>}
        </div>
    </div>
    );
};


export default TripContent;


const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'


const closeStop ="absolute w-4 h-4 -right-6 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"


const dateInput = 'text-xs flex items-center border py-1 relative w-[200px] sm:max-w-[200px] sm:w-full '

const airportContainer ='flex w-full border sm:max-w-[380px] sm:space-between items-center'
const airportSection = 'flex sm:items-center sm:justify-center w-full'
const dateTime = 'flex justify-between sm:mb-2 sm:justify-center space-x-2 sm:items-start'

const extraCard = 'flex relative items-center border w-full max-w-[350px] sm:max-w-[310px]'
const extraCardStop = 'flex relative items-center border w-full mr-12 max-w-[250px] sm:max-w-[310px] self-end max-w-[240px] sm:w-[240px] sm:max-w-[240px] sm:mr-[20%]'

const date = 'flex flex-col w-1/3  justify-between sm:mb-4 sm:px-0 sm:order-first sm:w-full sm:items-start sm:space-y-6 lg:w-1/2 lg:order-first lg:items-start'
const location ='flex flex-col w-1/3 items-center space-y-2 sm:mb-4 sm:px-0 sm:order-last sm:w-full sm:space-y-3 sm:max-w-[426px] sm:items-start sm:mt-10 lg:w-1/2 lg:mt-6 lg:items-start'
const container = 'flex relative w-full sm:flex-col sm:items-center sm:space-y-10 lg:flex-col lg:items-start lg:space-y-10'