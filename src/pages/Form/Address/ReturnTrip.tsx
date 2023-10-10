import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import Select from "../../../UI/components/Select";
import { useStore } from "../../../Store";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useLocation } from "../../../Store/useLocation";
import Input from "../../../UI/components/Input";

const TripContent = () => {
    const { user, setRetPickUpLocation, setRetDropOffLocation, setRetStopFirst, setRetStopSecond, setRetStopLast, setRetDate,setRetTime,setRetDepartureSection,setRetFlight,setRetTripType,setRetAirlines} = useReturnLocation()
    const { user: mainUser } = useLocation()
    const { user: userStore } = useStore()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
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

    return (
    <div className={container}>
        <div className={location}>
            <div className={extraCard}>
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={
                        user.retPickUpLocation
                        ?  user.retPickUpLocation
                        : mainUser.dropOffLocation 
                        ? mainUser.dropOffLocation 
                        : ''
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
            <div className={extraCard+ ' self-end'}>    
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
            <div className={extraCard+ ' self-end'}>
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
            <div className={extraCard+ ' self-end'}>
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
                <GoogleAddressInput 
                    style='w-[200px]'
                    defaultLocation={
                        user.retDropOffLocation
                        ?  user.retDropOffLocation
                        : mainUser.pickUpLocation 
                        ? mainUser.pickUpLocation 
                        : ''
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
                    <div className={pickUpTime}>
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
                    </div> 
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
            </div>

            {(user.retPickUpLocation === isAirport[0] || user.retDropOffLocation === isAirport[0])}
            <div className={airportSection}>
                <Select style='w-[100px] border sm:w-full' source={userStore.tripList} value={user.retTripType} onChange={setRetTripType} placeholder='Trip type' />
                <Select style="w-[100px] border sm:w-full" source={mainUser.flights} value={user.retDepartureSection} onChange={setRetDepartureSection} placeholder='Departure' />
                <Select style="w-[100px] border sm:w-full" source={userStore.flights} value={user.retAirlines} onChange={setRetAirlines} placeholder='Airlines' />
            </div>
        </div>

        <div className='sm:self-end sm:mb-10'>
            <Input
                placeholder='flight#' 
                width={100}
                onChange={setRetFlight} 
                value={ 
                        user.retAirlines.toLocaleLowerCase().includes('air canada')
                        ? 'AC'+user.retFlight
                        : user.retFlight
                    }
            />
        </div>
    </div>
    );
};


export default TripContent;


const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs cursor-pointer ml-3 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const pickUpTime = 'flex '
const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'


const closeStop ="w-4 h-4 bg-red-500 ml-1 text-black border border-black rounded-full flex justify-center cursor-pointer text-bold items-center"
const extraCard = ' flex relative items-center'


const dateInput = 'text-xs flex items-center border px-2 py-1 relative w-[200px]'
const dateTime = 'flex justify-between sm:mb-6'

const airportSection = 'flex  justify-between'

const date = 'flex flex-col w-1/3 justify-between sm:w-full sm:mb-4 sm:px-0 md:w-1/2 sm:order-first'
const location ='flex flex-col w-1/3 space-y-8 sm:w-full md:w-1/2 sm:order-last'
const container = 'flex mb-10 sm:flex-col sm:py-2 pt-4'