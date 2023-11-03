import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Radio, RadioChangeEvent, Select } from "antd";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";
import { useLocation } from "../../../Store/useLocation";
import { useValidation } from "../../../Store/useValidation";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BsTrainFrontFill } from "react-icons/bs";
import { useInfo } from "../../../Store/useInfo";
import { useReturnLocation } from "../../../Store/useReturnLocation";
import { useOptions } from "../../../Store/useOptions";


const TripContent = () => {
    const {resetData, setResetPhone} = useInfo()
    const { resetReturn } = useReturnLocation()
    const { resetOptions } = useOptions()
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
        setFlight2,
        setAirline,
        setIsFlight,
        setIcon,
        setIcon2,
        setAirlineBack,
        resetLocation,
        setDateNow,
    } = useLocation()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState({first:false,second:false,last: false,})
    const isAirport = ['Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport']

    function resetForm() {
        resetData();
        setResetPhone(true);
        resetLocation();
        resetReturn();
        resetOptions();
        localStorage.setItem('user', JSON.stringify({
            genderList: ['Mr.', 'Msr.', 'null', 'undefined', 'object', 'infinity'],
            gender: '',
            extraGender1: '',
            extraGender2: '',

            name: '',
            extraName1: '',
            extraName2: '',

            email: '@',
            extraEmail1: '@',
            extraEmail2: '@',

            phone: '',
            extraPhone1: '',
            extraPhone2: '',

            paymentMethod: 'Cash',
            additionalText: '',
        }))
    }

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
        <h1 className={label}>One-Way</h1>

        <div className={date}>
            <div className='flex pb-2'>
            <Radio.Group onChange={(e: RadioChangeEvent)=> setDateNow(e.target.value)} value={user.dateNow}>
                <Radio value={true}>Now: ( {dayjs().format('HH:mm /  dddd MMM.YYYY')} )</Radio>
                <Radio value={false}>Later </Radio>
            </Radio.Group>
            </div>
            <div className={dateRow}>
                {user.dateNow && <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-white opacity-50 cursor-not-allowed"></div>}
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
                <TimePicker time={user.dateNow ? dayjs().add(30,'minutes').format('HH:mm'): user.time}  onChange={setTime} date={user.date}/> 
            </div>
        </div>

        <div className={type}>
            
            <div className={icons}>
                <span className={user.icon == 1 ? iconCard : iconCardActive}>
                    <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' } onClick={()=>{setIcon(1)}}/>
                </span>
                <span className={user.icon == 2 ? iconCard : iconCardActive}>
                    <BsTrainFrontFill className={iconItem + ' text-amber-700 '} onClick={()=>{setIcon(2)}}/>
                </span>
                <span className={user.icon == 3 ? iconCard: iconCardActive}>
                    <FaBus className={ iconItem+ ' text-yellow-400 '} onClick={()=>{setIcon(3)}}/>
                </span>
                <span className={user.icon == 4 ? iconCard : iconCardActive}>
                    <FaSailboat className={ iconItem+ ' text-orange-400 '} onClick={()=>{setIcon(4)}}/>
                </span>
                <span className={user.icon == 5 ?iconCard : iconCardActive}>
                    <MdLocalHotel className={ iconItem+ ' text-purple-500 '} onClick={()=>{setIcon(5)}}/>
                </span>
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
                    ?<MdFlightLand className='text-xl mx-1'/>
                    :user.icon === 2
                    ?< BsTrainFrontFill className=' mx-1'/>
                    :user.icon === 3
                    ? <FaBus className=' mx-1'/>
                    :user.icon === 4
                    ? <FaSailboat className=' mx-1'/>
                    :user.icon === 5 
                    ?<MdLocalHotel className='mx-1'/>
                    :<MdFlightTakeoff className='text-xl mx-1'/>
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
                <Input
                    value={user.flight}
                    maxLength={4}
                    placeholder={user.icon === 1 ?'####': user.icon === 2 ? 'Train#' : user.icon === 3 ? "Bus#" : user.icon === 4 ? 'Boat#': 'Room#'} 
                    className={user.icon === 1 ? ' max-w-[80px]': '' } 
                    style={{ width:`${user.icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}} 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value.replace(/\D/g, ''))}
                />
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
            <span className={addCircle}>+</span>
        </div>}

        <div className={locationCard}>
            <div className={validation.isTo ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                <span className='icon text-red-500'><SlLocationPin/></span>
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

        <div className={type}>
            
            <div className={icons}>           
                <span className={user.icon2 == 1 ? iconCard : iconCardActive}>
                    <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' } onClick={()=>{setIcon2(1)}}/>
                </span>
                <span className={user.icon2 == 2 ? iconCard : iconCardActive}>
                    <BsTrainFrontFill className={iconItem + ' text-amber-700 '} onClick={()=>{setIcon2(2)}}/>
                </span>
                <span className={user.icon2 == 3 ?iconCard : iconCardActive}>
                    <FaBus className={ iconItem+ ' text-yellow-400 '} onClick={()=>{setIcon2(3)}}/>
                </span>
                <span className={user.icon2 == 4 ?iconCard : iconCardActive}>
                    <FaSailboat className={ iconItem+ ' text-orange-400 '} onClick={()=>{setIcon2(4)}}/>
                </span>
                <span className={user.icon2 == 5 ?iconCard : iconCardActive }>
                    <MdLocalHotel className={ iconItem+ ' text-purple-500 '} onClick={()=>{setIcon2(5)}}/>
                </span>
            </div>

            {user.icon2 && <div className={flightCard }>
                {user.icon2 === 1 && 
                <Select 
                    className='favorite w-1/2 max-h-[30px]'
                    style={{width: '100px'}} 
                    options={user.flights.map(item=>(
                        {value: item, label: item}
                    ))} 
                    onChange={setAirlineBack} 
                    placeholder='Airlines' 
                />}
                
                {user.icon2 === 1
                    ?<MdFlightTakeoff className='text-xl mx-1'/>
                    :user.icon2 === 2
                    ?<BsTrainFrontFill className=' mx-1'/>
                    :user.icon2 === 3
                    ? <FaBus className=' mx-1'/>
                    :user.icon2 === 4
                    ? <FaSailboat className=' mx-1'/>
                    :user.icon2 === 5 
                    ?<MdLocalHotel className='mx-1'/>
                    :<MdFlightLand className='text-xl mx-1'/>
                }
                {user.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                    {user.airlineBack.toLowerCase().includes('canada') 
                        ? 'AC'
                        : user.airlineBack.toLowerCase().includes('transat') 
                        ? 'TC'
                        : user.airlineBack.toLowerCase().includes('quatar') 
                        ? 'QR'
                        : ''
                    }
                </div>}
                <Input 
                    value={user.flight2}
                    maxLength={4}
                    placeholder={user.icon2 === 1 ?'####': user.icon2 === 2 ? 'Train#' : user.icon2 === 3 ? "Bus#" : user.icon2 === 4 ? 'Boat#': 'Room#'} 
                    className={user.icon === 1 ? ' max-w-[80px]': '' } 
                    style={{ width:`${user.icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}} 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight2(e.target.value.replace(/\D/g, ''))}
                />
            </div>}
        </div>


        <div className={type+ 'pt-4'}>
        <button className={reset} onClick={resetForm}>Reset</button>
        </div>
    </div>
    );
};

export default TripContent;

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 ml-auto'

const iconCard = 'flex items-center justify-center border w-[30px] h-[30px] rounded bg-gradient-to-b from-green-200 to-green-400 border-green-400'
const iconCardActive = 'flex items-center justify-center border w-[30px] h-[30px] rounded   border-white '
const iconItem = 'cursor-pointer '
const icons = 'flex w-1/3 justify-around pt-1'
const type = 'flex items-center justify-between w-full space-x-4 '
const flightCard = 'flex relative items-center border lg:w-3/5 w-1/2'

const addCircle = " w-5 h-5 flex justify-center bg-green-400 ml-2 -translate-y-1 rounded-full border border-black cursor-pointer font-bold text-black opacity-20 hover:opacity-100 duration-300 "
const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded-full flex  justify-center cursor-pointer text-bold  items-center"
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'


const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'
const dateRow = 'flex relative sm:items-start items-start w-full   justify-between border-b-2 pb-6'


const dateInput = 'text-xs flex border py-1 relative w-[200px] sm:max-w-[200px] sm:w-full'

const date = 'flex flex-col sm:mb-2 w-full items-start  justify-between border-b-2 pb-6'
const locationCard = 'flex relative items-center w-full  space-x-2'

const extraCardStop = 'flex relative mr-6  items-center border w-[90%] max-w-[350px] sm:max-w-[300px] self-end'
const extraCardPickUp = 'flex relative w-3/4 items-center border w-full '

const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400'
const container = 'flex relative border p-10  flex-col w-[48%] sm:w-full relative space-y-3 rounded shadow-xl'