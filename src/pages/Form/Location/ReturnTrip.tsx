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
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { useMain } from "../../../Store/useMain";
import React from "react";
interface IObj {[key:number]: string}
import sky from './../../../assets/day.png'
import sun from './../../../assets/sun.png'
import stars from './../../../assets/stars.jpg'
import train from './../../../assets/train.jpeg'
import boat from './../../../assets/ship.png'
import Buttons from "../Components/Buttons";
import SelectAmPm from "../Components/SelectAmPm";
import IconsFilter from "../../../services/IconsFilter";



const ReturnTrip = ():React.ReactNode  => {
    const {
        list,
        isFrench,
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
        resetReturn,
        setTimeTypeR,
        setSteps,
        setIsReset,
        setAlert,
        setValidation
    } =useMain()
    const { store } = useStore()
    
    const [ day, setDay ] = useState(true)
    const [trigger, setTrigger] = useState({ 1: 1, 2: 1 })
    const [stopTrigger, setStopTrigger] = useState(true)
    const [fullDate, setFullDate] = useState(list[activeCarId -1].dateR ? dayjs(list[activeCarId -1].dateR) : dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(3)
    const [isDateR, setIsDateR] = useState(true)
    const [isFromR, setIsFromR] = useState(true)
    const [isToR, setIsToR] = useState(true)

    

    useEffect(()=>{
        if(list[activeCarId-1].isReset[3]) {
            setTrigger({1:0,2:0})
        }
        if( list[activeCarId-1].fromR
            || list[activeCarId-1].toR 
            || list[activeCarId-1].stopsR[1]
            || list[activeCarId-1].stopsR[2]
            || list[activeCarId-1].stopsR[3]
            || list[activeCarId-1].stopsR[4] 
            || list[activeCarId-1].dateR 
            || list[activeCarId-1].timeR 
            && list[activeCarId-1].isReset[3]
        ) {
            return setIsReset({...list[activeCarId-1].isReset, 3: false })
        }
    },[list[activeCarId-1].timeR, list[activeCarId-1].dateR, list[activeCarId-1].fromR, list[activeCarId-1].toR, list[activeCarId-1].stopsR ])

    useEffect(()=>{
        setDay(list[activeCarId-1].timeR.slice(0,2) > '04' && list[activeCarId-1].timeR.slice(0,2) < '23')
    },[list[activeCarId-1].timeR,list[activeCarId-1].timeTypeR])

    useEffect(()=>{
        if(trigger[1] ) setFromR(list[activeCarId-1].to)
        if(trigger[2] ) setToR(list[activeCarId-1].from)
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
    },[stopTrigger, list[activeCarId-1].stops,list[activeCarId-1].isReset ])

    useEffect(()=>{
        if(trigger){
            setIsDateR(list[activeCarId-1].dateR.length>0)
            setIsFromR(list[activeCarId-1].fromR.length>0)
            setIsToR(list[activeCarId-1].toR.length>0)
        }
    },[list[activeCarId-1]])

    useEffect(()=>{
        setIconR(0)
        setIcon2R(0)
        IconsFilter(store, list[activeCarId-1].fromR, list[activeCarId-1].toR, setIconR, setIcon2R)

    },[list[activeCarId-1].from,list[activeCarId-1].fromR, list[activeCarId-1].to,list[activeCarId-1].toR])

    function goNext() {
        if(!list[activeCarId-1].isReturnTrip) {
            setValidation(4)
            return setSteps(4)
        }

        if(!list[activeCarId-1].dateR && list[activeCarId-1].isReturnTrip) {
            setValidation(3)
            return setAlert('need return date !')
        }
        if(!list[activeCarId-1].timeR && list[activeCarId-1].isReturnTrip ) {
            setValidation(3)
            return setAlert('need return time !')
        }
        if(!list[activeCarId-1].fromR && list[activeCarId-1].isReturnTrip) {
            setValidation(3)
            return setAlert('need return pick up location !')
        }
        if(!list[activeCarId-1].toR && list[activeCarId-1].isReturnTrip) {
            setValidation(3)
            return setAlert('need return drop of location !')
        }
        if(
            list[activeCarId-1].date 
            && list[activeCarId-1].from 
            && list[activeCarId-1].to 
            && list[activeCarId-1].isReturnTrip
            && list[activeCarId-1].dateR
            && list[activeCarId-1].timeR
            && list[activeCarId-1].fromR 
            && list[activeCarId-1].toR 
        ) {
            setValidation(4)
            return setSteps(4)
        }
    }

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
            
            <div className={date}>
            <div className={fare}>{day ? isFrench? 'Tarification jour ': 'Day fare': isFrench? 'Tarification nuit': 'Night fare'} </div>

            <div className={dateRow}>
                <div className="flex pb-3 justify-end w-[200px] text-blue-700">

                    <div className={isDateR ? dateInput : dateInput +' border-red-500'}  onClick={()=> setIsDateOpen(true)} ref={ref}> 
                        <span className='flex items-center text-xl '><PiCalendarCheckLight/></span>
                            {list[activeCarId-1].dateR ? 
                            <div className='flex items-center text-sm  truncate font-bold'>
                                {fullDate.format('dddd')==='Monday'? isFrench ?'Lundi' : 'Monday'
                                :fullDate.format('dddd')==='Tuesday'? isFrench ? 'Mardi':'Tuesday'
                                :fullDate.format('dddd')==='Wednesday'?isFrench ? 'Merceredi':'Wednesday'
                                :fullDate.format('dddd')==='Thursday'?isFrench ? 'Jeudi':'Thursday'
                                :fullDate.format('dddd')==='Friday'?isFrench ? 'Venderdi':'Friday'
                                :fullDate.format('dddd')==='Saturday'?isFrench ? 'Samedi':'Saturday'
                                : isFrench ?'Dimanche': 'Sunday'},
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
                            {' '+fullDate.format('YYYY')} </div>:  <div className='flex items-center text-sm font-bold'>{isFrench? 'Choicir une date de Retour':'Choose return date'}</div> }
                        {isDateOpen && <div className={dateTimeSubmenu}>
                            <DatePicker value={list[activeCarId-1].dateR} isReturn={true} time={list[activeCarId-1].timeR} onChange={setDateR} getFullDate={setFullDate}/>
                            <div className="flex justify-between pl-8">
                                <div className={setDateBtn} onClick={(e)=> {
                                        e.stopPropagation();
                                        setIsDateOpen(false)
                                    }}>accept</div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='flex justify-between items-center'>

                    <SelectAmPm type={list[activeCarId-1].timeTypeR} onChange={setTimeTypeR}/>
                    <div className='flex w-1/2 relative  px-2 justify-end items-end bg-cover rounded-lg py-2 ' style={{backgroundImage:`url(${day? sky :stars})`, backgroundPosition:`${day? ' ': '0px 0px'}` }} >
                        <TimePicker isAm={list[activeCarId-1].timeTypeR} time={list[activeCarId-1].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[activeCarId-1].timeR}  onChange={setTimeR} date={list[activeCarId-1].dateR}/> 
                        {day && <div  className='absolute top-2 left-1/2 w-8 h-8 bg-no-repeat  bg-cover rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}
                    </div>
                </div>

            </div>
            </div>

            <div className={locations}>
                <div className={btns}>
                    <button className={reset} onClick={resetCard}>{isFrench? 'Réinitialiser Adresses': 'Reset Addresses'}</button>
                    <button className={revert} onClick={setBackSection}>{isFrench? 'Mêmes adresses que l’Aller' : 'Same Addresses as One-Way'}</button>
                </div>

                {list[activeCarId-1].iconR>0 && <div className={type}>
                    <span className={iconCard}>
                        {   
                            list[activeCarId-1].iconR == 1
                            ? <MdFlightLand className={ 'text-xl ' }/>
                            :list[activeCarId-1].iconR == 2
                            ? <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            :list[activeCarId-1].iconR == 3
                            ? <FaBus />
                            :list[activeCarId-1].iconR == 4
                            ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                            :<MdLocalHotel className={' text-base'}/>
                        }
                    </span>

                    {list[activeCarId-1].iconR > 0 && <div className={flightCard }>
                        {list[activeCarId-1].iconR === 1 && 
                        <Select 
                            className='favorite max-h-[30px] max-w-[210px]'
                            style={{ borderRadius: 5}} 
                            options={store.flights.map(item=>({value: item, label: item}))} 
                            onChange={(e)=>{setFlightR({...list[activeCarId-1].flightR, title: e})}}
                            placeholder='Airlines' 
                        />}
                        
                        
                        <Input 
                            value={list[activeCarId-1].flightR.number}
                            maxLength={4}
                            placeholder={list[activeCarId-1].iconR === 1 ?'####': list[activeCarId-1].iconR === 2 ? 'Train#' : list[activeCarId-1].iconR === 3 ? "Bus#" : list[activeCarId-1].iconR === 4 ? 'Boat#': 'Room#'} 
                            style={{ width:65, paddingLeft:2,paddingBottom:4, paddingRight:0, marginLeft:2,marginRight:2, borderRadius: 0, height: 30, overflow: 'hidden' }} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                setFlightR({...list[activeCarId-1].flightR, number: e.target.value.replace(/\D/g, '')})
                            }}
                        />
                        {list[activeCarId-1].flightR.number.length<3 && list[activeCarId-1].flightR.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                    </div>} 
                </div>}

                <div className={locationCard}>
                    <div className={isFromR ? extraCard : extraCard + ' border-red-500'}>
                        <span className='icon text-green-400'><SlLocationPin/></span>
                        <GoogleAddressInput 
                            style='w-full placeholder-green' 
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
                            placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                        />
                    </div>
                    {list[activeCarId-1].iconR === 1 && <div className={departureBox}>
                        <Select placeholder='Departure' className='favorite' style={{ height: 30, borderRadius: 5}}onChange={setDepartureR}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                    </div>}
                </div>

                <div className={extraCardStop}>
                    <div className={(stop > 0)? box: box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench? '1er Arrêt':<><span className='mr-1'> 1st </span> Stop</>}</div>
                        <span className='icon text-orange-400'><SlLocationPin/></span> 
                        <GoogleAddressInput
                            style='w-full placeholder-orange'
                            defaultLocation={list[activeCarId-1].stopsR[1]} 
                            onChange={(e)=>{
                                setStopTrigger(false)
                                setStopsR({...list[activeCarId-1].stopsR, 1: e})
                            }}
                            placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                        />
                    </div>
                    <div 
                        className={(stop === 0) ? openStop : 'hidden'} 
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
                    >+ stop</div>
                    <div 
                        className={(stop > 0) ? closeStop : 'hidden'} 
                        onClick={()=>{ 
                            if(stop===0) return setStop(1);
                            const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 0)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setStopsR(data)
                            setStop(stop - 1)
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 

                </div>
                
                <div className={(stop > 0 ) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 1 ? box: box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench? <><span className='mr-1'> 2e </span> Arrêt</>:'2nd Stop'}</div>
                        <span className='icon text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput 
                            style='w-full placeholder-orange'
                            defaultLocation={list[activeCarId-1].stopsR[2]} 
                            onChange={(e)=>{
                                setStopTrigger(false)
                                setStopsR({...list[activeCarId-1].stopsR, 2: e})
                            }}
                            placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                        />
                    </div>
                        <div  className={(stop === 1) ? openStop :'hidden'} onClick={()=> setStop(2)} >+ stop</div> 

                        <div 
                            className={(stop > 1) ? closeStop : 'hidden'} 
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
                        ><span className='scale-[150%] font-bold rotate-45'>+</span></div>  
                </div>

                
                <div className={(stop > 1 ) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 2 ? box : box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench
                            ? <><span className='mr-1'> 3e </span> Arrêt</>
                            :'3rd Stop'}</div>
                        <span className='icon text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput 
                            style='w-full placeholder-orange'
                            defaultLocation={list[activeCarId-1].stopsR[3]} 
                            onChange={(e)=>{
                                setStopTrigger(false)
                                setStopsR({...list[activeCarId-1].stopsR, 3: e})
                            }}
                            placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                        />
                    </div>
                    <div className={(stop === 2) ? openStop :'hidden'} onClick={()=> setStop(3)}>+ stop</div> 
                    <div 
                        className={(stop > 2) ? closeStop :'hidden'} 
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
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
                </div>
                
                <div className={(stop > 2  ) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 3 ? box : box + ' opacity-0 '}>
                        <div className={stopLabel}>{isFrench
                            ? <><span className='mr-1'> 4e </span> Arrêt</>
                            :'4th Stop'
                        }</div>
                        <span className='icon text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput 
                            style='w-full placeholder-orange'
                            defaultLocation={list[activeCarId-1].stopsR[4]} 
                            onChange={(e)=>{
                                setStopTrigger(false)
                                setStopsR({...list[activeCarId-1].stopsR, 4: e})
                            }}
                            placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                        />
                    </div>
                    <div className={(stop === 3) ? openStop :'hidden'}onClick={()=>setStop(4)} >+ stop</div> 
                    <div 
                        className={(stop > 3) ? closeStop :'hidden'} 
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
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
                </div>

                <div className={locationCard}>
                    <div className={isToR ? extraCard : extraCard + ' border-red-500'}>
                        <span className='icon text-red-400'><SlLocationPin/></span>
                        <GoogleAddressInput 
                            defaultLocation={
                                list[activeCarId-1].toR 
                                ?  list[activeCarId-1].toR
                                : list[activeCarId-1].from && trigger[2]
                                ? list[activeCarId-1].from 
                                : ''
                            } 
                            style='w-full placeholder-red' 
                            onChange={(e)=> {
                                setToR(e)
                                setTrigger({...trigger, 2: 0})
                            }}
                            placeholder={isFrench? store.locationListF[1]:store.locationList[1]}
                        />
                    </div>
                    {list[activeCarId-1].icon2 === 1 && 
                    <div className={departureBox}>
                        <Select placeholder='Departure' className='favorite ' style={{ height: 30, borderRadius: 5}}onChange={setDeparture2R}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                    </div>}
                </div>

                {(list[activeCarId-1].icon2R >0) &&<div className={type}>
                    
                    <span className={iconCard}>
                        {   
                            list[activeCarId-1].icon2R == 1
                            ? <MdFlightTakeoff className={ 'text-xl ' }/>
                            :list[activeCarId-1].icon2R == 2
                            ? <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            :list[activeCarId-1].icon2R == 3
                            ? <FaBus />
                            :list[activeCarId-1].icon2R == 4
                            ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                            :<MdLocalHotel className={' text-base'}/>
                        }
                    </span>

                    {list[activeCarId-1].icon2R>0 && <div className={flightCard }>
                        {list[activeCarId-1].icon2R === 1 && <Select 
                            className='favorite max-h-[30px] max-w-[210px]'
                            style={{ borderRadius:5}} 
                            options={store.flights.map(item=>(
                                {value: item, label: item}
                            ))} 
                            onChange={(e)=>{
                                setFlight2R({...list[activeCarId-1].flight2R, title: e})
                            }} 
                            placeholder='Airlines' 
                        />}
                        
                        <Input 
                            value={list[activeCarId-1].flight2R.number}
                            maxLength={4}
                            placeholder={list[activeCarId-1].icon2R === 1 ?'####': list[activeCarId-1].icon2R === 2 ? 'Train#' : list[activeCarId-1].icon2R === 3 ? "Bus#" : list[activeCarId-1].icon2R === 4 ? 'Boat#': 'Room#'} 
                            style={{ width:65, paddingLeft:2,paddingBottom:4, paddingRight:0, marginLeft:2,marginRight:2, borderRadius: 0, height: 30, overflow: 'hidden' }} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                setFlight2R({...list[activeCarId-1].flight2R, number: e.target.value.replace(/\D/g, '')})

                            }
                        }/>
                        {list[activeCarId-1].flight2R.number.length<3 && list[activeCarId-1].flight2R.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                    </div> }
                </div>}
            </div>

            <Buttons goNext={goNext} step={2} />

    </div>
    );
};

export default ReturnTrip;

const stopLabel = 'absolute top-3 -left-16 text-sm z-20 text-gray-400 font-bold'
const locations = ' flex flex-col border rounded-xl shadow-xl bg-white p-4 pt-0 border-purple-500 '
const revert = 'px-2 py-1 border-2 border-orange-500 text-orange-500 rounded-lg active:bg-orange-500 active:text-white'
const reset = 'px-2 py-1  text-rose-500 rounded-lg font-bold  border-2 border-rose-500'
const type = 'flex items-center py-2 justify-between w-full mb-2'
const btns = 'flex items-center  w-full py-2 justify-between border-b mb-2 border-purple-500'


const extraCard = 'flex relative w-3/4 bg-white items-center border border-purple-500 w-full rounded-xl'

const departureBox = "border border-purple-500 flex items-center w-1/3 rounded-xl py-1"

const box = 'flex relative border border-purple-500   bg-white rounded-xl w-full'

const iconCard = 'flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-black shadow-lg'

const flightCard = 'flex relative items-center border border-purple-500 w-4/5 rounded-xl py-1 bg-white'

const closeStop =" my-auto pl-[9px] px-2  text-xl text-center border border-black bg-rose-500 ml-1 rounded flex justify-center items-center cursor-pointer text-black"
const openStop ="absolute top-2 text-purple-500 text-xl rounded flex cursor-pointer"


const setDateBtn = ' border bg-purple-500 active:bg-purple-400 hover:bg-purple-600 shadow cursor-pointer rounded-lg px-3 py-2 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl shadow-purple-200 rounded-xl overflow-hidden'
const dateRow = 'flex relative w-full justify-between flex-col'

const dateInput = 'flex border bg-white border-purple-500 pl-[2px] cursor-pointer h-[40px] relative max-w-[210px] w-full rounded-xl'

const locationCard = 'flex relative items-center w-full space-x-2 mb-2'

const extraCardStop = 'flex relative w-5/6 self-end  rounded mb-2'

const fare = 'py-1 font-bold mb-2 italic text-gray-500 w-full ml-auto text-center  text-xl'

const date = 'flex w-full items-center justify-between mb-4 flex-wrap pt-2 mt-2 border-b pb-4 border border-purple-500 rounded-xl bg-white shadow-xl px-2'
const container = 'flex  h-full pb-28 flex-col relative w-full px-5 text-xs pb-20'