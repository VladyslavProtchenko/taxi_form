import { ChangeEvent, useEffect, useState } from "react";
import { Input,  Select } from "antd";
import dayjs from "dayjs";
import useOnclickOutside from "react-cool-onclickoutside";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import { useStore } from "../../../Store";


import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BsTrainFrontFill } from "react-icons/bs";
// import { useInfo } from "../../../Store/useInfo";
import Steps from "../Steps";
import { useMain } from "../../../Store/useMain";
import React from "react";
interface IObj {[key:number]: string}


const ReturnTrip = ():React.ReactNode  => {
    const {
        list,
        activeCarId,
        setFromR, 
        setToR, 
        setIconR, 
        setIcon2R, 
        setStopsR, 
        setDateR,
        setTimeR,
        setDepartureR,
        setDeparture2R,
        setFlightR,
        setFlight2R, 
        setAirlinesR, 
        setAirlinesBackR, 
        resetReturn 
    } =useMain()
    const { store } = useStore()
    

    const [trigger, setTrigger] = useState({ 1: 1, 2: 1 })
    const [stopTrigger, setStopTrigger] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(3)


    useEffect(()=>{
        if(trigger[1]) setFromR(list[activeCarId-1].to)
        if(trigger[2]) setToR(list[activeCarId-1].from)
    },[trigger,list[activeCarId-1].to, list[activeCarId-1].from])


    useEffect(()=>{
        //I get all stops revert it ans complete in new array, I want to display stops order without holes im order! so we need make a sort every time when stops changes
        if(stopTrigger) {
            const values = Object.values(list[activeCarId-1].stops).filter(value=>value).reverse()
            setStop(values.length)
            const data: IObj ={}
            values.map((item, index) => {
                const number  = index+1;
                data[number] = item;
                if(item) { setStopsR(data) }
            })
        }
    },[stopTrigger, list[activeCarId-1].stops])

    useEffect(()=>{
        setIconR(0)
        setIcon2R(0)
        store.airportArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIconR(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIconR(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(5)
        })
        store.airportArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2R(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2R(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(5)
        })

    },[list[activeCarId-1].from, list[activeCarId-1].to])

    function setBackSection(){
        setTrigger({ 1: 1, 2: 1 })
        setStopTrigger(true)
    }
    function resetCard(){
        setTrigger({ 1: 0, 2: 0 })
        setStopTrigger(false)
        resetReturn();
    }
    return (
    <div className={container}>
        <div className={content}>
            <div className={date+ ' pt-[46px]'}>
                <div className={list[activeCarId-1].dateR ? dateInput : dateInput +' border-red-500'}  onClick={()=> setIsDateOpen(true)} ref={ref}> 
                    <span className='icon text-xl'><PiCalendarCheckLight/></span>
                        {list[activeCarId-1].dateR ? 
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
                        <DatePicker time={list[activeCarId-1].timeR} onChange={setDateR} getFullDate={setFullDate}/>
                        <div className="flex justify-between pl-8">
                            <div className={setDateBtn} onClick={(e)=> {
                                    e.stopPropagation();
                                    setIsDateOpen(false)
                                }}>accept</div>
                        </div>
                    </div>}
                </div>
                <TimePicker time={list[activeCarId-1].timeR} onChange={setTimeR} date={list[activeCarId-1].dateR}/>
            </div>

            <div className={type}>
                <div className={icons}>
                    
                    <span className={list[activeCarId-1].icon == 1 ? iconCard : iconCardActive  }>
                        <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' } />
                    </span>
                    <span className={list[activeCarId-1].icon == 2 ? iconCard : iconCardActive  }>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon == 3 ? iconCard : iconCardActive }>
                        <FaBus className={ iconItem+ ' text-yellow-200 '} />
                    </span>
                    <span className={list[activeCarId-1].icon == 4 ? iconCard : iconCardActive  }>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '} />
                    </span>
                    <span className={list[activeCarId-1].icon == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {list[activeCarId-1].icon > 0 && <div className={flightCard }>
                    {list[activeCarId-1].icon === 1 && <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirlinesR} 
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].icon === 1
                        ?<MdFlightLand className='text-xl mx-1'/>
                        :list[activeCarId-1].icon === 2
                        ?<BsTrainFrontFill className=' mx-1'/>
                        :list[activeCarId-1].icon === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].icon === 4
                        ? <FaSailboat className=' mx-1'/>
                        :list[activeCarId-1].icon === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightLand className='text-xl mx-1'/>
                    }   
                    {list[activeCarId-1].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {list[activeCarId-1].airlines.toLowerCase().includes('canada') 
                            ? 'AC'
                            : list[activeCarId-1].airlines.toLowerCase().includes('transat') 
                            ? 'TS'
                            : list[activeCarId-1].airlines.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>}
                    <Input 
                        value={list[activeCarId-1].flight}
                        maxLength={4}
                        placeholder={list[activeCarId-1].icon === 1 ?'####': list[activeCarId-1].icon === 2 ? 'Train#' : list[activeCarId-1].icon === 3 ? "Bus#" : list[activeCarId-1].icon === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${list[activeCarId-1].icon === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 5, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlightR(e.target.value.replace(/\D/g, ''))}
                    />
                </div>} 
            </div>

            <div className={locationCard}>
                <div className={list[activeCarId-1].fromR ? extraCard : extraCard + ' border-red-500'}>
                    <span className='icon text-green-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full ' 
                        defaultLocation={
                            list[activeCarId-1].fromR
                            ? list[activeCarId-1].fromR
                            : list[activeCarId-1].to && trigger[1] 
                            ? list[activeCarId-1].to
                            : ''
                        }
                        onChange={(e)=> {
                            setFromR(e)
                            setTrigger({...trigger, 1: 0})
                        }}
                        placeholder='Pick up location'
                    />
                </div>
                {list[activeCarId-1].icon === 1 && <div className="border flex items-center w-1/3 rounded">
                    <Select placeholder='Departure' className='favorite' style={{ height: 30, borderRadius: 5}}onChange={setDepartureR}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            
            <div className={extraCardStop}>
                {stop === 0 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon text-orange-400'><SlLocationPin/></span> 
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={list[activeCarId-1].stopsR[1]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStopsR({...list[activeCarId-1].stopsR, 1: e})
                    }}
                    placeholder='First Stop'
                />
                    
                <div 
                    className={(stop === 0) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===0) return setStop(1);
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 0)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopTrigger(false)
                        setStopsR(data)
                        setStop(stop - 1)
                    }}
                    >{(stop === 0) ? '+' :'-'}</div> 
            </div>

            
            <div className={(stop > 0) ?  extraCardStop: 'hidden'}>
                {stop === 1 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}
                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full'
                    defaultLocation={list[activeCarId-1].stopsR[2]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStopsR({...list[activeCarId-1].stopsR, 2: e})
                    }}
                    placeholder='Second Stop'
                />
            <div 
                className={(stop === 1) ? openStop :closeStop} 
                onClick={()=>{
                        if(stop===1) return setStop(2) 
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 1)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopTrigger(false)
                        setStopsR(data)
                        setStop(stop -1)
                    }}
                >{(stop === 1) ? '+' :'-'}</div> 
            </div>

            
            <div className={(stop > 1) ?  extraCardStop: 'hidden'}>
                {stop === 2 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}

                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full'
                    defaultLocation={list[activeCarId-1].stopsR[3]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStopsR({...list[activeCarId-1].stopsR, 3: e})
                    }}
                    placeholder='Third Stop'
                />
            <div 
                className={(stop === 2) ? openStop :closeStop} 
                onClick={()=>{ 
                        if(stop===2) return setStop(3)
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 2)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopTrigger(false)
                        setStopsR(data)
                        setStop(stop -1) 
                    }}
                    >{(stop === 2) ? '+' :'-'}</div> 
            </div>

            
            <div className={(stop > 2) ?  extraCardStop: 'hidden'}>
                {stop === 3 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-90 bg-white z-20"></div>}

                <span className='icon text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput 
                    style='w-full '
                    defaultLocation={list[activeCarId-1].stopsR[4]} 
                    onChange={(e)=>{
                        setStopTrigger(false)
                        setStopsR({...list[activeCarId-1].stopsR, 4: e})
                    }}
                    placeholder='Fourth Stop'
                />
            <div 
                className={(stop === 3) ? openStop :closeStop} 
                onClick={()=>{ 
                    if(stop===3) return setStop(4)
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 3)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopTrigger(false)
                        setStopsR(data)
                        setStop(stop -1) 
                    }}
                >{(stop === 3) ? '+' :'-'}</div> 
            </div>

            <div className={locationCard}>
                <div className={list[activeCarId-1].toR ? extraCard : extraCard + ' border-red-500'}>
                    <span className='icon text-red-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        defaultLocation={
                            list[activeCarId-1].toR 
                            ?  list[activeCarId-1].toR
                            : list[activeCarId-1].from && trigger[2]
                            ? list[activeCarId-1].from 
                            : ''
                        } 
                        style='w-full' 
                        onChange={(e)=> {
                            setToR(e)
                            setTrigger({...trigger, 2: 0})
                        }}
                        placeholder='Drop off location'
                    />
                </div>
                {list[activeCarId-1].icon2 === 1 && 
                <div className="border flex items-center w-1/3 rounded">
                    <Select placeholder='Departure' className='favorite ' style={{ height: 30, borderRadius: 5}}onChange={setDeparture2R}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            <div className={type}>
                
                <div className={icons}>
                    <span className={list[activeCarId-1].icon2 == 1 ? iconCard : iconCardActive  }>
                        <MdFlightTakeoff className={ iconItem + ' text-blue-500 text-xl' } />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 2 ? iconCard : iconCardActive  }>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '} />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 3 ? iconCard : iconCardActive  }>
                        <FaBus className={ iconItem+ ' text-yellow-200 '} />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 4 ? iconCard : iconCardActive  }>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '} />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {list[activeCarId-1].icon2>0 && <div className={flightCard }>
                    {list[activeCarId-1].icon2 === 1 && <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius:5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirlinesBackR} 
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].icon2 === 1
                        ?< MdFlightLand className='text-xl mx-1'/>
                        :list[activeCarId-1].icon2 === 2
                        ?< BsTrainFrontFill className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 4
                        ? <FaSailboat className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightTakeoff className='text-xl mx-1'/>
                    }   
                    {list[activeCarId-1].icon2 === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {list[activeCarId-1].airlinesBack.toLowerCase().includes('canada') 
                            ? 'AC'
                            : list[activeCarId-1].airlinesBack.toLowerCase().includes('transat') 
                            ? 'TS'
                            : list[activeCarId-1].airlinesBack.toLowerCase().includes('quatar') 
                            ? 'QR'
                            : ''
                        }
                    </div>}
                    <Input 
                        value={list[activeCarId-1].flight2}
                        maxLength={4}
                        placeholder={list[activeCarId-1].icon2 === 1 ?'####': list[activeCarId-1].icon2 === 2 ? 'Train#' : list[activeCarId-1].icon2 === 3 ? "Bus#" : list[activeCarId-1].icon2 === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${list[activeCarId-1].icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight2R(e.target.value.replace(/\D/g, ''))}/>
                </div> }
            </div>


            <div className={btns}>
                <button className={reset} onClick={resetCard}>Reset</button>
                <button className={revert} onClick={setBackSection}>Return</button>
            </div>
            {list[activeCarId-1].steps=== 2 && <div className='w-full flex justify-center'><Steps /></div>}
        </div>
        {!list[activeCarId-1].isReturnTrip && <div className='absolute -top-2 left-0 right-0 bottom-0 bg-white opacity-90'></div>}
    </div>
    );
};


export default ReturnTrip;


// const defaultTab = 'px-4 py-2 cursor-pointer pt-3 bg-white'
// const tab = 'px-4 py-2  cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-black bg-gray-100 border-r box-border' 
// const activeTab = 'px-4 py-2 cursor-pointer  border-white'
// const tabsContainer = 'hidden sm:flex flex-col mr-2 font-bold h-full mb-0  overflow-hidden'
const content = ' relative flex flex-col w-full  space-y-3 py-10'

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 '
const revert = 'px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-300 active:bg-orange-500 '

const iconCard = 'flex items-center justify-center w-1/5 h-[30px] bg-green-400'
const iconCardActive = 'flex items-center justify-center  w-1/5 h-[30px] border-black'
const iconItem = ' '
const icons = 'flex divide-x lg:w-1/3 xl:w-1/3 2xl:w-1/3 j sm:w-2/5 border-black border rounded  overflow-hidden'
const type = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border xl:w-1/2 2xl:w-1/2 lg:w-3/5 rounded sm:w-3/5'

const btns = 'flex items-center  w-full  space-x-4 pt-4'
const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"
const openStop ="absolute w-5 h-5 -right-6 bg-green-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"

const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const dateInput = 'text-xs flex border py-1 h-[40px] relative w-full max-w-[200px] rounded'
const date = 'flex items-start mb-2  w-full justify-between border-b-2 border-black pb-6'

const locationCard = 'flex relative items-center w-full  space-x-2'
const extraCard = 'flex relative items-center border w-full rounded'
const extraCardStop = 'flex relative mr-6  items-center border w-5/6 self-end  rounded'

const container = 'flex relative  px-4  w-full rounded-b relative border shadow-xl border-t-0'

// const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'