import { ChangeEvent, useEffect, useState } from "react";
import { Input,  Select } from "antd";
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
import { FaBus } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BsTrainFrontFill } from "react-icons/bs";
interface IObj {[key:number]: string}


const TripContent = () => {
    const { returnTrip, setFrom, setTo,setIcon, setIcon2, setStops, setDate,setTime,setDeparture,setDeparture2,setFlight,setFlight2,setAirlines,setAirlinesBack,resetReturn } = useReturnLocation()
    const { user: mainUser } = useLocation()
    const { user: userStore } = useStore()
    const { validation } =useValidation()
    const [trigger, setTrigger] = useState({ 1: 1, 2: 1 })
    const [stopTrigger, setStopTrigger] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(0)
    // const [currentCard, setCurrentCard] = useState<IObj>({})
    const [cars, setCars] = useState(1)


    useEffect(()=>{
        if(trigger[1]) setFrom(mainUser.to)
        if(trigger[2]) setTo(mainUser.from)
    },[trigger,mainUser.to, mainUser.from])

    useEffect(()=>{
        //I get all stops revert it ans complete in new array, I want to display stops order without holes im order! so we need make a sort every time when stops changes
        if(stopTrigger) {
            const values = Object.values(mainUser.stops).filter(value=>value).reverse()
            setStop(values.length)
            const data: IObj ={}
            values.map((item, index) => {
                const number  = index+1;
                data[number] = item;
                if(item) { setStops(data) }
            })
        }

    },[stopTrigger, mainUser.stops])

    useEffect(()=>{
        setIcon(0)
        setIcon2(0)
        userStore.airportArray.map(item =>{
            if(returnTrip.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(1)
        })
        userStore.busArray.map(item =>{
            if(returnTrip.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(3)

        })
        userStore.trainArray.map(item =>{
            if(returnTrip.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2)
        })
        userStore.boatArray.map(item =>{
            if(returnTrip.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4)
        })
        userStore.hotelArray.map(item =>{
            if(returnTrip.from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5)
        })
        userStore.airportArray.map(item =>{
            if(returnTrip.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(1)
        })
        userStore.busArray.map(item =>{
            if(returnTrip.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(3)

        })
        userStore.trainArray.map(item =>{
            if(returnTrip.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2)
        })
        userStore.boatArray.map(item =>{
            if(returnTrip.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4)
        })
        userStore.hotelArray.map(item =>{
            if(returnTrip.to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5)
        })

    },[returnTrip.from, returnTrip.to])

    function setBackSection(){
        setTrigger({ 1: 1, 2: 1 })
        setStopTrigger(true)
    }
    function resetCard(){
        setTrigger({ 1: 0, 2: 0 })
        setStopTrigger(false)
        resetReturn();
    }

    // function dragStartHandler(e, data:IObj){
    //     setCurrentCard(data)
    //     console.log(data, 'data')
    // }
    // function dragLeaveHandler(e){

    //     e.target.style.opacity = '100%';

    // }
    // function dragEndHandler(e){
    //     e.preventDefault()

    //     e.target.style.opacity = '100%';
    // }
    // function dragOverHandler(e){
    //     e.stopPropagation()

    //     e.preventDefault()
    //     e.target.style.opacity = '10%';
    // }
    // function dragDropHandler(e:any, data:IObj){
    //     e.preventDefault()
    //     console.log(data, 'data')
    // }


    return (
    <div className={container}>
        <h1 className={returnTrip.isReturnTrip ? label : 'hidden'}>Return</h1>
        <ul className={tabsContainer}>
            <li 
                className={defaultTab}
                onClick={()=>{
                    setCars(1)
                }}
            >1</li>
            <li 
                className={cars>= 2 ? activeTab : cars ===1 ? tab + ' rounded-tr': tab}
                onClick={()=>{
                    setCars(2)
                }}
            >2</li>
            <li 
                className={cars>= 3 ? activeTab : cars ===2 ? tab + ' rounded-tr': tab}
                onClick={()=>{
                    setCars(3)
                }}
            >3</li>
            <li 
                className={cars>= 4 ? activeTab : cars ===3 ? tab + ' rounded-tr': tab}
                onClick={()=>{
                    setCars(4)
                }}
            >4</li>
            <li 
                className='h-full bg-gray-100'
                
            ></li>
        </ul>
        <div className={content}>

            <div className={date+ ' xl:pt-8 lg:pt-8 sm:pt-8'}>
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
                        {' '+fullDate.format('YYYY')} </div>:  <div className='flex items-center'>Choose return date</div> }
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
                <TimePicker time={returnTrip.time} onChange={setTime} date={returnTrip.date}/>
            </div>

            <div className={type}>
                <div className={icons}>
                    
                    <span className={returnTrip.icon == 1 ? iconCard : iconCardActive  }>
                        <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' } />
                    </span>
                    <span className={returnTrip.icon == 2 ? iconCard : iconCardActive  }>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={returnTrip.icon == 3 ? iconCard : iconCardActive }>
                        <FaBus className={ iconItem+ ' text-yellow-200 '} />
                    </span>
                    <span className={returnTrip.icon == 4 ? iconCard : iconCardActive  }>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '} />
                    </span>
                    <span className={returnTrip.icon == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {returnTrip.icon > 0 && <div className={flightCard }>
                    {returnTrip.icon === 1 && <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
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
                        :<MdFlightLand className='text-xl mx-1'/>
                    }   
                    {returnTrip.icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                        {returnTrip.airline.toLowerCase().includes('canada') 
                            ? 'AC'
                            : returnTrip.airline.toLowerCase().includes('transat') 
                            ? 'TS'
                            : returnTrip.airline.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>}
                    <Input 
                        value={returnTrip.flight}
                        maxLength={4}
                        placeholder={returnTrip.icon === 1 ?'####': returnTrip.icon === 2 ? 'Train#' : returnTrip.icon === 3 ? "Bus#" : returnTrip.icon === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${returnTrip.icon === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 5, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value.replace(/\D/g, ''))}
                    />
                </div>} 
            </div>

            <div className={locationCard}>
                <div className={validation.isBackFrom ? extraCard : extraCard + ' border-red-500'}>
                    <span className='icon text-green-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full ' 
                        defaultLocation={
                            returnTrip.from
                            ? returnTrip.from
                            : mainUser.to && trigger[1] 
                            ? mainUser.to
                            : ''
                        }
                        onChange={(e)=> {
                            setFrom(e)
                            setTrigger({...trigger, 1: 0})
                        }}
                        placeholder='Pick up location'
                    />
                </div>
                {returnTrip.icon === 1 && <div className="border flex items-center w-1/3 rounded">
                    <Select placeholder='Departure' className='favorite' style={{ height: 30, borderRadius: 5}}onChange={setDeparture}options={mainUser.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            {stop >0 &&
            <div 
                className={extraCardStop} 
                // draggable={true} 
                // onDragStart={(e: React.DragEvent)=>dragStartHandler(e,returnTrip. stops[1])}
                // onDragLeave={(e: React.DragEvent)=>dragLeaveHandler(e)}
                // onDragEnd={(e: React.DragEvent)=>dragEndHandler(e)}
                // onDragOver={(e: React.DragEvent)=>dragOverHandler(e)}
                // onDrop={(e: React.DragEvent)=>dragDropHandler(e, returnTrip. stops[1])}
            >
                <span className='icon text-orange-400'><SlLocationPin/></span> 
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={returnTrip.stops[1]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStops({...returnTrip.stops, 1: e})
                    }}
                    placeholder='Stop'
                />
                    
                <div 
                    className={closeStop} 
                    onClick={()=>{ 
                        setStops({...returnTrip.stops})
                        setStop(stop -1)  
                    }}
                >-</div>
            </div>}

            { stop>1  && 
            <div 
                    className={extraCardStop} 
                    // draggable={true} 
                    // onDragStart={(e: React.DragEvent<HTMLDivElement>)=>dragStartHandler(e,returnTrip. stops[2])}
                    // onDragLeave={(e: React.DragEvent<HTMLDivElement>)=>dragLeaveHandler(e)}
                    // onDragEnd={(e: React.DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
                    // onDragOver={(e: React.DragEvent<HTMLDivElement>)=>dragOverHandler(e)}
                    // onDrop={(e: React.DragEvent<HTMLDivElement>)=>dragDropHandler(e, returnTrip. stops[2])}
                >
                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full'
                    defaultLocation={returnTrip.stops[2]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStops({...returnTrip.stops, 2: e})
                    }}
                    placeholder='Stop'
                />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                        setStops({...returnTrip.stops})
                        setStop(stop -1)  
                    }}
                >-</div> 
            </div>}

            {stop>2  &&
            <div 
                    className={extraCardStop} 
                    draggable={true} 
                    // onDragStart={(e: React.DragEvent<HTMLDivElement>)=>dragStartHandler(e,returnTrip. stops[3])}
                    // onDragLeave={(e: React.DragEvent<HTMLDivElement>)=>dragLeaveHandler(e)}
                    // onDragEnd={(e: React.DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
                    // onDragOver={(e: React.DragEvent<HTMLDivElement>)=>dragOverHandler(e)}
                    // onDrop={(e: React.DragEvent<HTMLDivElement>)=>dragDropHandler(e, returnTrip. stops[3])}
                >
                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full'
                    defaultLocation={returnTrip.stops[3]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStops({...returnTrip.stops, 3: e})
                    }}
                    placeholder='Stop'
                />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                        setStops({...returnTrip.stops})
                        setStop(stop -1) 
                    }}
                >-</div> 
            </div>}

            {stop>3  &&
                    <div 
                    className={extraCardStop} 
                    draggable={true} 
                    // onDragStart={(e: React.DragEvent<HTMLDivElement>)=>dragStartHandler(e,returnTrip. stops[4])}
                    // onDragLeave={(e: React.DragEvent<HTMLDivElement>)=>dragLeaveHandler(e)}
                    // onDragEnd={(e: React.DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
                    // onDragOver={(e: React.DragEvent<HTMLDivElement>)=>dragOverHandler(e)}
                    // onDrop={(e: React.DragEvent<HTMLDivElement>)=>dragDropHandler(e, returnTrip. stops[4])}
                >
                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full '
                    defaultLocation={returnTrip.stops[4]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStops({...returnTrip.stops, 4: e})
                    }}
                    placeholder='Stop'
                />
            <div 
                className={closeStop} 
                onClick={()=>{ 
                    setStops({...returnTrip.stops})
                        setStop(stop -1) 
                    }}
                >-</div> 
            </div>}

            {(stop < 4) && <div className={addExtraBtn} onClick={()=>{
                setStop(stop+1)
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
                            : mainUser.from && trigger[2]
                            ? mainUser.from 
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
                {returnTrip.icon2 === 1 && 
                <div className="border flex items-center w-1/3 rounded">
                    <Select placeholder='Departure' className='favorite ' style={{ height: 30, borderRadius: 5}}onChange={setDeparture2}options={mainUser.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            <div className={type}>
                
                <div className={icons}>
                    <span className={returnTrip.icon2 == 1 ? iconCard : iconCardActive  }>
                        <MdFlightTakeoff className={ iconItem + ' text-blue-500 text-xl' } />
                    </span>
                    <span className={returnTrip.icon2 == 2 ? iconCard : iconCardActive  }>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '} />
                    </span>
                    <span className={returnTrip.icon2 == 3 ? iconCard : iconCardActive  }>
                        <FaBus className={ iconItem+ ' text-yellow-200 '} />
                    </span>
                    <span className={returnTrip.icon2 == 4 ? iconCard : iconCardActive  }>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '} />
                    </span>
                    <span className={returnTrip.icon2 == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {returnTrip.icon2>0 && <div className={flightCard }>
                    {returnTrip.icon2 === 1 && <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius:5}} 
                        options={mainUser.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirlinesBack} 
                        placeholder='Airlines' 
                    />}
                    
                    {returnTrip.icon2 === 1
                        ?< MdFlightLand className='text-xl mx-1'/>
                        :returnTrip.icon2 === 2
                        ?< BsTrainFrontFill className=' mx-1'/>
                        :returnTrip.icon2 === 3
                        ? <FaBus className=' mx-1'/>
                        :returnTrip.icon2 === 4
                        ? <FaSailboat className=' mx-1'/>
                        :returnTrip.icon2 === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightTakeoff className='text-xl mx-1'/>
                    }   
                    {returnTrip.icon2 === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[1px] pr-[1px]'>
                        {returnTrip.airlineBack.toLowerCase().includes('canada') 
                            ? 'AC'
                            : returnTrip.airlineBack.toLowerCase().includes('transat') 
                            ? 'TS'
                            : returnTrip.airlineBack.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>}
                    <Input 
                        value={returnTrip.flight2}
                        maxLength={4}
                        placeholder={returnTrip.icon2 === 1 ?'####': returnTrip.icon2 === 2 ? 'Train#' : returnTrip.icon2 === 3 ? "Bus#" : returnTrip.icon2 === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${returnTrip.icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight2(e.target.value.replace(/\D/g, ''))}/>
                </div> }
            </div>


            <div className={btns}>
                <button className={reset} onClick={resetCard}>Reset</button>
                <button className={revert} onClick={setBackSection}>Return</button>
            </div>
        </div>
        {!returnTrip.isReturnTrip && <div className='absolute -top-2 left-0 right-0 bottom-0 bg-white opacity-90'></div>}
    </div>
    );
};


export default TripContent;


const defaultTab = 'px-2 py-[2px] cursor-pointer pt-3 bg-white'
const tab = 'px-2 py-[2px]  cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-black bg-gray-100' 
const activeTab = 'px-2 py-[2px] cursor-pointer '
const tabsContainer = 'flex flex-col w-[80px] mr-4 text-sm  h-full mb-0'
const content = 'flex flex-col w-full  space-y-3 py-10'

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 '
const revert = 'px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-300 active:bg-orange-500 '

const iconCard = 'flex items-center justify-center w-1/5 h-[30px] bg-green-400'
const iconCardActive = 'flex items-center justify-center  w-1/5 h-[30px] border-black'
const iconItem = ' '
const icons = 'flex divide-x lg:w-1/3 xl:w-1/3 2xl:w-1/3 j sm:w-1/2 border-black border rounded  overflow-hidden'
const type = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border xl:w-1/2 2xl:w-1/2 lg:w-3/5 rounded sm:w-1/2'

const btns = 'flex items-center  w-full  space-x-4 pt-4'
const addCircle = " w-5 h-5 flex justify-center bg-green-400 ml-2 -translate-y-1 rounded border border-black cursor-pointer font-bold text-black "
const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"
const addExtraBtn = 'flex text-xs self-start ml-10 cursor-pointer ml-1 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'


const dateInput = 'text-xs flex border py-1 relative w-full max-w-[200px] sm:max-w-[200px] sm:w-full rounded'

const date = 'flex sm:items-start items-start w-full   justify-between border-b-2 border-black pb-6'

const locationCard = 'flex relative items-center w-full  space-x-2'
const extraCard = 'flex relative items-center border w-full rounded'
const extraCardStop = 'flex relative mr-6  items-center border w-[90%] max-w-[350px] sm:max-w-[300px] ml-auto rounded'

const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'
const container = 'flex relative border pr-10  w-[48%] sm:w-full  relative  rounded-b border-t-0 shadow-xl'
