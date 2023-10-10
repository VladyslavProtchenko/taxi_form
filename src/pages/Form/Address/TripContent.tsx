import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import Select from "../../../UI/components/Select";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "../../../Store/useLocation";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import Input from "../../../UI/components/Input";

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
        setTripType,
        setDepartureSection,
        setFlight,
        setAirline,
    } = useLocation()



    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));

    const [stop, setStop] = useState({
        first:false,
        second:false,
        last: false,
    })

    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)']

    return (
    <div className={container}>
        <div className={location}>
                <div className={extraCard}>
                    <GoogleAddressInput
                        style="w-[200px]"
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
                <div className={extraCard+ ' self-end'}>    
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
                <div className={extraCard+ ' self-end'}>
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
                <div className={extraCard+ ' self-end'}>
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
                    <GoogleAddressInput 
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
                    <div className={pickUpTime}>
                        <span className=''>{fullDate.format('dddd')},  
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
                    </div>
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
                <TimePicker onChange={setTime} date={user.date}/>
            </div>

            {(user.pickUpLocation == isAirport[0] || user.pickUpLocation == isAirport[1] || user.dropOffLocation == isAirport[0] || user.dropOffLocation == isAirport[1] )}
            <div className={airportSection}>
                <Select width={100} source={user.tripList} onChange={setTripType} placeholder='Trip type' />
                <Select width={100} source={user.departureSections}  onChange={setDepartureSection} placeholder='choose departure' />
                <Select width={100} source={user.flights}  onChange={setAirline} placeholder='Airlines' />
            </div>
        </div>   
        <div className='sm:self-end sm:mb-10'>
            <Input 
                placeholder='flight#' 
                width={100}
                onChange={setFlight}
                isCanada={user.airline.toLocaleLowerCase().includes('air canada')}
            />
        </div>    
        
        <div className={userTrip.isReturnTrip ? front : back } onClick={()=>setIsReturnTrip(!userTrip.isReturnTrip)}>
            <h1>{!userTrip.isReturnTrip ? ' + ' : ' - '}Return trip</h1>
        </div>
    </div>
    );
};

export default TripContent;



const back = 'absolute left-1/2 -bottom-10  -translate-x-1/2  px-2 py-1  sm:hidden flex items-center  hover:text-green-300 text-green-400 text-sm font-bold cursor-pointer'
const front = ' absolute left-1/2 -bottom-10 -translate-x-1/2  px-2 py-1 sm:hidden flex sm:  items-center hover:text-red-300 text-red-400 text-sm font-bold  cursor-pointer'

const addCircle = ' w-4 h-4 flex items-center justify-center bg-green-300 rounded-full border text-black border-black mr-1'
const addExtraBtn = 'flex text-xs cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const pickUpTime = 'flex '
const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const favorite =  'border border-yellow-200 text-gray-400 w-[100px]' 

const closeStop ="w-4 h-4 bg-red-500 ml-1 border border-black rounded-full flex justify-center cursor-pointer text-bold  items-center"
const extraCard = ' flex relative items-center'


const dateInput = 'text-xs flex items-center border px-2 py-1 relative w-[200px]'
const dateTime = 'flex justify-between sm:mb-6'

const airportSection = 'flex justify-between'

const date = 'flex flex-col w-1/3 justify-between sm:w-full sm:mb-4 sm:px-0 md:w-1/2 sm:order-first'
const location ='flex flex-col w-1/3 space-y-4 sm:w-full md:w-1/2 sm:order-last'
const container = 'relative flex mb-10 sm:flex-col sm:py-2  pb-5'