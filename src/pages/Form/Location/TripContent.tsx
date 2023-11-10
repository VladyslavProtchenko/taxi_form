import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select } from "antd";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";
import { IStore } from "../../../Store/useLocation";
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
import { useStore } from '../../../Store/index';

interface IObj {[key:number]: string}
const TripContent = ({ 
    user, 
    setFrom, 
    setTo, 
    setStops,
    setDate,
    setTime,
    setDeparture,
    setDeparture2,
    setFlight,
    setFlight2,
    setAirline,
    setIcon,
    setIcon2,
    setAirlineBack,
    resetLocation,
    setDateNow,
}:IStore) => {
    const {user:info, resetData, setResetPhone, setIsCars} = useInfo()

    const { user: store} = useStore()
    const { resetReturn } = useReturnLocation()
    const { resetOptions } = useOptions()
    const { validation} = useValidation()


    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(0)
    const [ localStops, setLocalStops ] = useState<{[key:number]:string}>({})

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

        setIcon(0)
        setIcon2(0)
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item =>{
            if(user.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(1)
        })
        store.busArray.map(item =>{
            if(user.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(3)

        })
        store.trainArray.map(item =>{
            if(user.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2)
        })
        store.boatArray.map(item =>{
            if(user.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4)
        })
        store.hotelArray.map(item =>{
            if(user.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5)
        })
        store.airportArray.map(item =>{
            if(user.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(1)
        })
        store.busArray.map(item =>{
            if(user.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(3)

        })
        store.trainArray.map(item =>{
            if(user.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2)
        })
        store.boatArray.map(item =>{
            if(user.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4)
        })
        store.hotelArray.map(item =>{
            if(user.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5)
        })

    },[user.from, user.to])

    useEffect(()=>{
        setStops(localStops)
    },[localStops])




    return (
    <div className={container}>
        <h1 className={label}>One-Way</h1>

        <ul className={tabsContainer}>
            <li 
                className={defaultTab}
                onClick={()=>{
                    setIsCars({1:true, 2:false, 3:false, 4:false, 5:false})
                }}
            >1</li>
            <li 
                className={info.isCars[2] ? activeTab + ' border-t' : info.isCars[3] ? tab + ' border-b border-t rounded-tr rounded-br ' : info.isCars[1] ? tab + ' rounded-tr border-t' : tab + ' border-y-gray-100'}
                onClick={()=>{
                    setIsCars({1:true, 2:true, 3:false, 4:false, 5:false})
                }}
            >2</li>
            <li 
                className={info.isCars[3] ? activeTab + '' : info.isCars[4] ? tab + ' border-b rounded-br pt-[9px]' : info.isCars[2] ? tab + ' border-t rounded-tr': tab + ' pt-[9px]'}
                onClick={()=>{
                    setIsCars({1:true, 2:false, 3:true, 4:false, 5:false})
                }}
            >3</li>
            <li 
                className={info.isCars[4] ? activeTab : info.isCars[3] ? tab + ' border-t rounded-tr': tab + ' pt-[9px]'}
                onClick={()=>{
                    setIsCars({1:true, 2:false, 3:false, 4:true, 5:false})
                }}
            >4</li>
            <li className={info.isCars[4] ? 'h-full bg-gray-100 rounded-tr border-r border-t rounded' : ' rounded h-full border-r bg-gray-100'}></li>
        </ul>

        <div className={content}>

            <div className={date}>
                <div className={!user.dateNow ? toggle+ ' ' : toggle +' bg-white'} onClick={()=>{
                            setDateNow(!user.dateNow)
                        }}>
                    <span className={!user.dateNow ? toggleLabelActive + ' rounded-l' :toggleLabel+  ' rounded-l'}>Now
                    </span>
                    <span className={user.dateNow ? toggleLabelActive + ' rounded-r' :toggleLabel+  '  rounded-r  pl-[7px]'}>Later</span>
                    
                </div>
                <div className={dateRow}>
                    
                    {user.dateNow && <div className="absolute z-30 top-0 left-0 right-0 bottom-0 bg-white opacity-75 cursor-not-allowed transition duration-1000 "></div>}
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
                        <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' }/>
                    </span>
                    <span className={user.icon == 2 ? iconCard : iconCardActive}>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={user.icon == 3 ? iconCard: iconCardActive}>
                        <FaBus className={ iconItem+ ' text-yellow-300 '}/>
                    </span>
                    <span className={user.icon == 4 ? iconCard : iconCardActive}>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '}/>
                    </span>
                    <span className={user.icon == 5 ?iconCard : iconCardActive}>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {user.icon>0 && <div className={flightCard }>
                    
                    {user.icon === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={user.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirline} 
                        placeholder='Airlines'
                    />}
                    
                    {user.icon === 1
                        ?<MdFlightLand className='text-xl mx-1 e'/>
                        :user.icon === 2
                        ?< BsTrainFrontFill className=' mx-1 '/>
                        :user.icon === 3
                        ? <FaBus className=' mx-1 sm:text-sm'/>
                        :user.icon === 4
                        ? <FaSailboat className=' mx-1'/>
                        :user.icon === 5 
                        ?<MdLocalHotel className='mx-1 '/>
                        :<MdFlightTakeoff className='text-xl mx-1 '/>
                    }   
                    {user.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {user.airline.toLowerCase().includes('canada') 
                            ? 'AC'
                            : user.airline.toLowerCase().includes('transat') 
                            ? 'TS'
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
                        defaultLocation={user.from || ''} 
                        onChange={setFrom}
                        placeholder='Pick up location'
                    />
                </div>
                {user.icon === 1 && 
                <div className="border flex items-center w-1/3 rounded">
                    <Select 
                        className='favorite truncate'
                        style={{borderRadius: 5}} 
                        options={user.departureSections.map(item=>(
                            {value: item, label: item}
                        ))}   
                        onChange={setDeparture} 
                        placeholder='Departure' 
                    />
                </div>}
            </div>
                
            <div className={extraCardStop}>
                {stop === 0 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon text-orange-400'><SlLocationPin/></span>  
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[1] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 1:e})
                    }}
                    placeholder='Stop'
                />
                <div 
                    className={(stop === 0) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===0) return setStop(1);
                        const array = Object.values(user.stops).filter((_, index) => index !== 0)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })

                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                    >{(stop === 0) ? '+' :'-'}</div> 
            </div>
            
            <div className={(stop > 0) ?  extraCardStop: 'hidden'}>
                {stop === 1 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon  text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[2] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 2:e})
                    }}
                    placeholder='Stop'
                />
                <div 
                    className={(stop === 1) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===1) return setStop(2);
                        const array = Object.values(user.stops).filter((_, index) => index !== 1)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                >{(stop === 1) ? '+' :'-'}</div> 
            </div>

            <div className={(stop > 1) ?  extraCardStop: 'hidden'}>
                {stop === 2 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon  text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[3] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 3:e})
                    }}
                    placeholder='Stop'
                />
                <div 
                    className={(stop === 2) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===2) return setStop(3);
                        const array = Object.values(user.stops).filter((_, index) => index !== 2)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                >{(stop === 2) ? '+' :'-'}</div> 
            </div>

            <div className={(stop > 2) ?  extraCardStop: 'hidden'}>
                {stop === 3 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon  text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[4] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 4:e})
                    }}
                    placeholder='Stop'
                />

                <div 
                    className={(stop === 3) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===3) return setStop(4);
                        const array = Object.values(user.stops).filter((_, index) => index !== 3)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                    >{(stop === 3) ? '+' :'-'}</div> 
            </div>

            <div className={locationCard}>
                <div className={validation.isTo ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-red-500'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={user.to || ''} 
                        onChange={setTo}
                        placeholder='Drop off location'
                    />
                </div>
                {user.icon2 ===1 && 
                <div className="border flex items-center w-1/3 rounded ">
                <Select 
                    style={{borderRadius: 5}}
                    className='favorite truncate '
                    options={user.departureSections.map(item=>(
                        {value: item, label: item}
                    ))}   
                    onChange={setDeparture2} 
                    placeholder='Departure' 
                />
                </div>}
            </div>

            <div className={type}>
                
                <div className={icons}>           
                    <span className={user.icon2 == 1 ? iconCard + ' rounded-l' : iconCardActive}>
                        <MdFlightTakeoff className={ iconItem + ' text-blue-500 text-xl ' } />
                    </span>
                    <span className={user.icon2 == 2 ? iconCard : iconCardActive}>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={user.icon2 == 3 ?iconCard : iconCardActive}>
                        <FaBus className={ iconItem+ ' text-yellow-200 '}/>
                    </span>
                    <span className={user.icon2 == 4 ?iconCard : iconCardActive}>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '}/>
                    </span>
                    <span className={user.icon2 == 5 ?iconCard+ ' rounded-r' : iconCardActive }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {user.icon2>0 && <div className={flightCard }>
                    {user.icon2 === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
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
                    {user.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {user.airlineBack.toLowerCase().includes('canada') 
                            ? 'AC'
                            : user.airlineBack.toLowerCase().includes('transat') 
                            ? 'TS'
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

            <div className={type + ' pt-4'}>
                <button className={reset} onClick={resetForm}>Reset</button>
            </div>
        </div>
    </div>
    );
};

export default TripContent;

const defaultTab = 'px-4 py-2 cursor-pointer pt-3 bg-white'
const tab = 'px-4 py-2  cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-black bg-gray-100 border-r box-border' 
const activeTab = 'px-4 py-2 cursor-pointer  border-white'
const tabsContainer = 'flex flex-col mr-2 font-bold h-full mb-0 rounded overflow-hidden'

const content = 'flex flex-col w-full space-y-3 py-10'

const toggle ='flex mr-6 relative items-center rounded border border-black duration-500 transition cursor-pointer xl:mb-2 lg:mb-2 sm:mb-2' 
const toggleLabel ='flex  items-center  text-xs  duration-500 transition px-2 bg-green-400  text-black font-bold w-[42px] py-1'
const toggleLabelActive ='flex w-[42px] items-center py-1 text-xs  duration-500 transition px-2  bg-green-50 text-gray-400'

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 '

const iconCard = 'flex items-center justify-center w-1/5 h-[30px]  bg-green-400 '
const iconCardActive = 'flex items-center justify-center  w-1/5 h-[30px] border-black'
const iconItem = ' '
const icons = 'flex divide-x lg:w-1/3 xl:w-1/3 2xl:w-1/3 j sm:w-2/5 border-black border rounded  overflow-hidden'
const type = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border xl:w-1/2 2xl:w-1/2 lg:w-3/5 rounded sm:w-3/5'

const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"
const openStop ="absolute w-5 h-5 -right-6 bg-green-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"


const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'
const dateRow = 'flex relative sm:items-start items-start w-full   justify-between'


const dateInput = 'text-xs flex border sm:h-[40px] relative w-[200px] sm:max-w-[200px] sm:w-full rounded'

const date = 'flex mt-3 sm:mb-2 w-full items-center justify-between border-b-2 border-black pb-6 xl:flex-wrap lg:flex-wrap sm:flex-wrap'
const locationCard = 'flex relative items-center w-full  space-x-2'

const extraCardStop = 'flex relative mr-6  items-center border w-[90%] 2xl:w-[90%] xl:w-[90%] lg:w-[90%]  2xl:max-w-[350px] xl:max-w-[350px] lg:max-w-[350px] sm:max-w-[230px] self-end rounded'
const extraCardPickUp = 'flex relative w-3/4 items-center border w-full rounded'

const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'
const container = 'flex relative border pr-4  w-full rounded relative  sm:rounded-b sm:border-t-0 shadow-xl'