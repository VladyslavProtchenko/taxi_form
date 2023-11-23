import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select } from "antd";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight, PiJeepLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BsTrainFrontFill } from "react-icons/bs";
import { useStore } from '../../../Store/index';
import Steps from "../Steps";
import { useMain } from "../../../Store/useMain";
import React from "react";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { AiOutlineStop } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";

interface IObj {[key:number]: string}
const TripContent = ():React.ReactNode => {
    const {  
        type, 
        setType,
        isFrench,
        activeCarId,
        list,
        setFrom, 
        setTo, 
        setStops,
        setDate,
        setTime,
        setDeparture,
        setDeparture2,
        setFlight,
        setFlight2,
        setAirlines,
        setIcon,
        setIcon2,
        setAirlinesBack,
        resetForm,
        setDateNow,
        setCarType,
        setTimeType,
    } = useMain()

    const { store } = useStore()

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(0)
    const [ localStops, setLocalStops ] = useState<{[key:number]:string}>({})
    // const [ amTime, setAmTime ] = useState<number>(0)

    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)
    const [typePos, setTypePost] = useState(1)
    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    useEffect(()=>{
        setDate(dayjs().format('DD/MM/YYYY'))
    },[])

    useEffect(()=>{
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number

        setIcon(0)
        setIcon2(0)
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(3)
        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5)
        })
        store.airportArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5)
        })

    },[list[activeCarId-1].from, list[activeCarId-1].to])

    useEffect(()=>{
        setStops(localStops)
    },[localStops])

    useEffect(()=>{
        if(type === 'Boost' || type === 'Unlocking door') return setDateNow(true);
    },[type])

    useEffect(()=>{setLocalStops(list[activeCarId-1].stops)},[activeCarId])
    return (
    <div className={container}>
        <div className={content}>
            <div className={mainType}>
                {store.typeList.map((item,index)=>(
                    <div 
                        className={ typeItem}
                        onClick={()=> {
                            console.log(index+1)
                            setTypePost(index+1)
                            setType(item)
                        }}
                    >{item}</div>
                ))}
                <div className={trickster+ `${typePos===2? ' translate-x-[100%] ': typePos===3? ' translate-x-[200%] ': typePos===4? ' translate-x-[300%] ':  typePos===5? ' translate-x-[400%] ' : ' border-l-green-300'}`}>
                    {
                        typePos===1
                            ? isFrench? 'Undefined': 'Undefined'
                            : typePos===2
                            ? isFrench? 'Transport': 'Transport'
                            : typePos===3
                            ? isFrench? 'Delivery': 'Delivery'
                            : typePos===4
                            ? isFrench? 'Boost': 'Boost'
                            : isFrench? 'Unlocking door': 'Unlocking door'
                    }
                </div>
            </div>
            <div className={date}>
                <div className={!list[activeCarId-1].dateNow ? toggle+ ' ' : toggle +' bg-white'} onClick={()=>{
                            if(type === 'Boost' || type === 'Unlocking door') return setDateNow(true);
                            setDateNow(!list[activeCarId-1].dateNow)
                            
                            if(list[activeCarId-1].dateNow) {
                                
                                setTime('')
                                setDate('')
                            } else {
                                (dayjs().format('mm') > '30') 
                                    ? setTime((dayjs().add(1, 'hours').format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                    : setTime((dayjs().format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                setDate(dayjs().format('DD/MM/YYYY'))
                            }
                        }}>
                    <span className={!list[activeCarId-1].dateNow ? toggleLabelActive + ' rounded-l ' :toggleLabel+  ' rounded-l   '}>{isFrench? store.nowLaterF[0]:store.nowLater[0] }
                    </span>
                    <span className={list[activeCarId-1].dateNow ? toggleLabelActive + ' rounded-r ' :toggleLabel+  '  rounded-r  pl-[7px]'}>{isFrench? store.nowLaterF[1]:store.nowLater[1] }</span>
                    
                </div>
                <div className={dateRow}>
                    
                    {list[activeCarId-1].dateNow && <div className="absolute z-30 top-0 left-0 right-0 bottom-0 bg-white opacity-75 cursor-not-allowed transition duration-1000 "></div>}
                    <div className={dateInput} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                        <span className='icon text-xl'><PiCalendarCheckLight/></span>
                        {list[activeCarId-1].date ? <div className='flex items-center'>
                            { fullDate.format('dddd')==='Monday'? 'Lundi'
                            :fullDate.format('dddd')==='Tuesday'? 'Mardi'
                            :fullDate.format('dddd')==='Wednesday'? 'Merceredi'
                            :fullDate.format('dddd')==='Thursday'? 'Jeudi'
                            :fullDate.format('dddd')==='Friday'? 'Venderdi'
                            :fullDate.format('dddd')==='Saturday'? 'Samedi'
                            : 'Dimanche'},  
                            {'  '+fullDate.format('MMM')}
                            { '.  '+fullDate.format('D')}{ fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                                    ? 'st'
                                                    :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                                    ?  'nd'
                                                    :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                                    ? 'rd'
                                                    : 'th'
                                                }
                            {' '+fullDate.format('YYYY')}
                        </div>
                        :<div className='flex items-center'>{isFrench? 'Date Requise' :'Required date '}</div>
                        }
                        
                        

                        {isDateOpen && <div className={dateTimeSubmenu}>
                            <DatePicker time={list[activeCarId-1].time} onChange={setDate} getFullDate={setFullDate}/>
                            <div className="flex justify-between pl-8">
                                <div className={setDateBtn} onClick={(e)=> {
                                        e.stopPropagation();
                                        setIsDateOpen(false)
                                    }}>accept</div>
                            </div>
                        </div>}
                    </div>
                    <TimePicker isAm={list[activeCarId-1].timeType} time={list[activeCarId-1].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[activeCarId-1].time}  onChange={setTime} date={list[activeCarId-1].date}/> 
                    <div className={timeToggle}>
                        <div className={list[activeCarId-1].timeType===0 ? amText+' border-green-500 bg-gray-100 ': amText+ ' border-b-white bg-gray-100  opacity-70 '} onClick={()=>setTimeType(0)}>undefined</div>
                        <div className={list[activeCarId-1].timeType===1 ? amText+' border-green-500 bg-blue-500 text-white ': amText+ ' border-b-white bg-blue-500 text-white  opacity-70 '} onClick={()=>setTimeType(1)}>am</div>
                        <div className={list[activeCarId-1].timeType===2 ? amText+' border-green-500 bg-black text-white ': amText+ ' border-b-white bg-black text-white  opacity-70  '} onClick={()=>setTimeType(2)}>pm</div>    
                    </div>
                </div>
            </div>

            <div className={iconsType}>
                
                <div className={icons}>
                    <span className={list[activeCarId-1].icon == 1 ? iconCard : iconCardActive}>
                        <MdFlightLand className={ iconItem + ' text-blue-500 text-xl ' }/>
                    </span>
                    <span className={list[activeCarId-1].icon == 2 ? iconCard : iconCardActive}>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon == 3 ? iconCard: iconCardActive}>
                        <FaBus className={ iconItem+ ' text-yellow-300 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon == 4 ? iconCard : iconCardActive}>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon == 5 ?iconCard : iconCardActive}>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {list[activeCarId-1].icon>0 && <div className={flightCard }>
                    
                    {list[activeCarId-1].icon === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirlines} 
                        placeholder='Airlines'
                    />}
                    
                    {list[activeCarId-1].icon === 1
                        ?<MdFlightLand className='text-xl mx-1 e'/>
                        :list[activeCarId-1].icon === 2
                        ?< BsTrainFrontFill className=' mx-1 '/>
                        :list[activeCarId-1].icon === 3
                        ? <FaBus className=' mx-1 sm:text-sm'/>
                        :list[activeCarId-1].icon === 4
                        ? <FaSailboat className=' mx-1'/>
                        :list[activeCarId-1].icon === 5 
                        ?<MdLocalHotel className='mx-1 '/>
                        :<MdFlightTakeoff className='text-xl mx-1 '/>
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
                        className={list[activeCarId-1].icon === 1 ? ' max-w-[80px]': '' } 
                        style={{ width:`${list[activeCarId-1].icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}} 
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight(e.target.value.replace(/\D/g, ''))}
                    />
                </div>}
            </div>

            <div className={locationCard}>
                <div className={list[activeCarId-1].from ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-green-500'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={list[activeCarId-1].from || ''} 
                        onChange={setFrom}
                        placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                    />
                </div>
                {list[activeCarId-1].icon === 1 && 
                <div className="border flex items-center w-1/3 rounded">
                    <Select 
                        className='favorite truncate'
                        style={{borderRadius: 5}} 
                        options={store.departureSections.map(item=>(
                            {value: item, label: item}
                        ))}   
                        onChange={setDeparture} 
                        placeholder='Departure' 
                    />
                </div>}
            </div>
            {['Boost', 'Unlocking door'].includes(type) && <div className={locationCard}>
                <div className={extraCardPickUp}>
                <div className={list[activeCarId-1].carType ? typeCard : typeCard + ' border-red-500'}>
                    {carList.map(item => (
                        <div className={list[activeCarId-1].carType === item ? typeItem2+' bg-green-400 text-black': item === 'Limo' ? typeItem2 + ' bg-gray-200  text-gray-500 cursor':typeItem2+ ' text-blue-500' } onClick={()=>{
                                if(item === 'limo') return;
                                setCarType(item)
                            }}>
                            { (item === 'VAN') 
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                :(item === 'SUV' ||item === 'VUS')
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                :item === 'Limo'
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate font-bold'>{item}</div>
                        </div>
                    ))}
            </div>
                </div>
                
            </div>}
                
            {['Undefined', 'Transport', 'Delivery'].includes(type) && <div className={extraCardStop}>
                {stop === 0 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-white z-20"></div>}
                <span className='icon text-orange-400'><SlLocationPin/></span>  
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[1] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 1:e})
                    }}
                    placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                />
                <div 
                    className={(stop === 0) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===0) return setStop(1);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 0)
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
            </div>}
            
            {['Undefined', 'Transport', 'Delivery'].includes(type) && <div className={(stop > 0 && list[activeCarId-1].stops[1]) ?  extraCardStop: 'hidden'}>
                {stop === 1 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-white z-20"></div>}
                <span className='icon  text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[2] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 2:e})
                    }}
                    placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                />
                <div 
                    className={(stop === 1) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===1) return setStop(2);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 1)
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
            </div>}

            {['Undefined', 'Transport', 'Delivery'].includes(type) &&
                <div className={(stop > 1  && list[activeCarId-1].stops[2]) ?  extraCardStop: 'hidden'}>
                    {stop === 2 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-white z-20"></div>}
                    <span className='icon  text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={localStops[3] || ''} 
                        onChange={(e)=>{
                            setLocalStops({...localStops, 3:e})
                        }}
                        placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                    />
                    <div 
                        className={(stop === 2) ? openStop :closeStop} 
                        onClick={()=>{ 
                            if(stop===2) return setStop(3);
                            const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 2)
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
                </div>}

            {['Undefined', 'Transport', 'Delivery'].includes(type) && <div className={(stop > 2 && list[activeCarId-1].stops[3]) ?  extraCardStop: 'hidden'}>
                {stop === 3 && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-white z-20"></div>}
                <span className='icon  text-orange-400'><SlLocationPin/></span>
                <GoogleAddressInput
                    style='w-full'
                    defaultLocation={localStops[4] || ''} 
                    onChange={(e)=>{
                        setLocalStops({...localStops, 4:e})
                    }}
                    placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                />

                <div 
                    className={(stop === 3) ? openStop :closeStop} 
                    onClick={()=>{ 
                        if(stop===3) return setStop(4);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 3)
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
            </div>}

            {['Undefined', 'Transport', 'Delivery'].includes(type) && <div className={locationCard}>
                <div className={list[activeCarId-1].to ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-red-500'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={list[activeCarId-1].to || ''} 
                        onChange={setTo}
                        placeholder={isFrench? store.locationListF[1]:store.locationList[1]}
                    />
                </div>
                {list[activeCarId-1].icon2 ===1 && 
                <div className="border flex items-center w-1/3 rounded ">
                <Select 
                    style={{borderRadius: 5}}
                    className='favorite truncate '
                    options={store.departureSections.map(item=>(
                        {value: item, label: item}
                    ))}   
                    onChange={setDeparture2} 
                    placeholder='Departure' 
                />
                </div>}
            </div>}

            {['Undefined', 'Transport', 'Delivery'].includes(type) && <div className={iconsType}>
                
                <div className={icons}>           
                    <span className={list[activeCarId-1].icon2 == 1 ? iconCard + ' rounded-l' : iconCardActive}>
                        <MdFlightTakeoff className={ iconItem + ' text-blue-500 text-xl ' } />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 2 ? iconCard : iconCardActive}>
                        <BsTrainFrontFill className={iconItem + ' text-amber-600 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon2 == 3 ?iconCard : iconCardActive}>
                        <FaBus className={ iconItem+ ' text-yellow-200 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon2 == 4 ?iconCard : iconCardActive}>
                        <FaSailboat className={ iconItem+ ' text-orange-300 '}/>
                    </span>
                    <span className={list[activeCarId-1].icon2 == 5 ?iconCard+ ' rounded-r' : iconCardActive }>
                        <MdLocalHotel className={ iconItem+ ' text-purple-500 '}/>
                    </span>
                </div>

                {list[activeCarId-1].icon2>0 && <div className={flightCard }>
                    {list[activeCarId-1].icon2 === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={setAirlinesBack} 
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].icon2 === 1
                        ?<MdFlightTakeoff className='text-xl mx-1'/>
                        :list[activeCarId-1].icon2 === 2
                        ?<BsTrainFrontFill className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 4
                        ? <FaSailboat className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightLand className='text-xl mx-1'/>
                    }
                    {list[activeCarId-1].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
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
                        className={list[activeCarId-1].icon === 1 ? ' max-w-[80px]': '' } 
                        style={{ width:`${list[activeCarId-1].icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}} 
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setFlight2(e.target.value.replace(/\D/g, ''))}
                    />
                </div>}
            </div>}

            {['Undefined', 'Transport', 'Delivery'].includes(type) &&<div className={type + ' pt-4'}>
                <button className={reset} onClick={resetForm}>{isFrench? 'Réinitialiser': 'Reset'}</button>
            </div>}

            { list[activeCarId-1].steps === 2 && <div className='w-full flex justify-center'><Steps /></div>}
        </div>
    </div>
    );
};

export default TripContent;

const trickster = "absolute flex pl-1 truncate items-center text-center w-1/5 top-0 bottom-0 left-0 border border-green-300 border-l-gray-700 bg-green-400 duration-500"

const typeItem2 = 'flex items-center px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'
const typeCard = 'flex  self-center border border-black rounded s divide-x overflow-hidden w-full'

const content = 'flex flex-col w-full space-y-3 py-10'

const typeItem = ' flex py-1 pl-1 border-black items-center truncate  cursor-pointer w-1/5 hover:text-green-700'
const mainType = ' absolute top-4 overflow-hidden w-[90%] mx-auto text-[10px] justify-between divide-x flex  border border-black rounded'

const amText = 'px-1 border-b-2 '
const timeToggle = ' absolute -top-6 right-0 flex divide-x items-center text-xs  cursor-pointer  rounded overflow-hidden'

const toggle ='flex mr-6 relative items-center rounded border border-black duration-500 transition cursor-pointer mb-2' 
const toggleLabel ='flex  items-center  text-xs  duration-500 transition px-2 bg-green-400  text-black font-bold min-w-[42px] py-1'
const toggleLabelActive ='flex min-w-[42px] items-center py-1 text-xs  duration-500 transition px-2  bg-green-50 text-gray-400'

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 '

const iconCard = 'flex items-center justify-center w-1/5 h-[30px]  bg-green-400 '
const iconCardActive = 'flex items-center justify-center  w-1/5 h-[30px] border-black'
const iconItem = ' '
const icons = 'flex divide-x lg:w-1/3 xl:w-1/3 2xl:w-1/3 j sm:w-2/5 border-black border rounded  overflow-hidden'
const iconsType = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border xl:w-1/2 2xl:w-1/2 lg:w-3/5 rounded sm:w-3/5'

const closeStop ="absolute w-5 h-5 -right-6 bg-red-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"
const openStop ="absolute w-5 h-5 -right-6 bg-green-500 ml-1 border border-black rounded flex  justify-center cursor-pointer text-bold  items-center"


const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'
const dateRow = 'flex relative sm:items-start items-start w-full   justify-between'

const dateInput = 'text-xs flex border h-[40px] relative w-[200px] max-w-[200px] w-full rounded'

const date = 'flex mt-3 mb-2 w-full items-center justify-between border-b-2 border-black pb-6 xl:flex-wrap lg:flex-wrap flex-wrap'
const locationCard = 'flex relative items-center w-full  space-x-2'

const extraCardStop = 'flex relative mr-6  items-center border w-5/6 self-end  rounded'
const extraCardPickUp = 'flex relative w-3/4 items-center border w-full rounded'

const container = 'flex relative  px-4  w-full  relative  rounded-b  border shadow-xl border-t-0'

// const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'