import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import useOnclickOutside from "react-cool-onclickoutside";
import { useLocation } from "../../Store/useLocation";


interface InputProps {
    onChange: (value: string) => void;
    date?: string;
    time: string;
    style?:string;
}

const TimePicker: React.FC<InputProps> = ({ style, onChange, date, time }) => {
    const minutes = [
        "00","05","10", "15", "20", "25", "30",
        "35", "40", "45",  "50","55","00"
    ]
    const hours = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "00",
    ]
    const { user } = useLocation()
    
    let hoursNow = dayjs().format('HH')
    let minutesNow = dayjs().format('mm')

    const ref = useOnclickOutside(() => setIsOpen(false));

    const [hour, setHour] = useState(time.replace(/:/g, '') ? time.slice(0,2) : '')
    const [minute, setMinute] = useState(time.replace(/:/g, '') ? time.slice(3) :  '')
    const [isOpen, setIsOpen] = useState(false)
    const [isTime, setIsTime] = useState(0)
    const [filteredMinutes, setFilteredMinutes] = useState(minutes.filter(item => item > minutesNow))
    const [filteredHours, setFilteredHours] = useState(hours.filter(item => item >= hoursNow))

    useEffect(()=>{
        if (dayjs().format('DD/MM/YYYY') === date){

            setFilteredMinutes(minutes.filter(item => item > dayjs().format('mm')))
            setFilteredHours(hours.filter(item => item >= dayjs().format('HH')))
        }
        if(!user.dateNow && JSON.stringify(dayjs().format('DD/MM/YYYY')) === JSON.stringify(date)) {
            if(user.time < dayjs().format('HH:mm')) {
                setMinute(dayjs().add(30, 'minutes').format('mm'))
                setHour(dayjs().add(1, 'hours').format('HH'))
                onChange(dayjs().add(30, 'minutes').add(1, 'hours').format('HH:mm'))
            }

            if(dayjs().format('mm') > '30') setFilteredHours(hours.filter(item => item >= dayjs().add(1, 'hours').format('HH') ))
            setFilteredMinutes(minutes.filter(item => item > dayjs().add(30, 'minutes').format('mm') ))
            
        }
        if(dayjs().format('DD/MM/YYYY') !== date) {
            setFilteredMinutes(minutes)
            setFilteredHours(hours)
        }
    },[date, user.dateNow, user.date, user.time])


    useEffect(() => {
        onChange((hour) + ':' + (minute))
        if(minute && hour) {
            setIsTime(2)
        } else setIsTime(1)
    }, [hour, minute])

    


    return (
        <div className={container + `${(isTime === 1) ? ' error' :(isTime=== 2) ? ' ' : ' '}` + ' '+ style} onClick={() => setIsOpen(true)} ref={ref}>
            <IoMdTime className='cursor-pointer text-lg ml-2' onClick={() => setIsOpen(true)}/>
            <input
                className={input}
                type="text"
                value={hour}
                placeholder='hh'
                maxLength={2}
                autoFocus={false}
                onBlur={()=>{ (minute && hour) ?setIsTime(2):setIsTime(1) }}
                onChange={(e) => {
                    (minute && hour) ? setIsTime(2): setIsTime(1)

                    const newValue = e.target.value.replace(/[^0-9]/g, '')
                    if (+newValue > 23) return setHour('00')
                    setHour(newValue)
                }}
            /> :
            <input
                className={input2}
                type="text"
                placeholder='mm'
                value={minute}
                autoFocus={false}
                maxLength={2}
                onBlur={()=>{ (minute && hour) ? setIsTime(2): setIsTime(1) }}
                onChange={(e) => {
                    (minute && hour)?setIsTime(2) : setIsTime(1) 

                    const newValue = e.target.value.replace(/[^0-9]/g, '')
                    if (+newValue > 59) return setMinute('59')
                    setMinute(newValue)
                }}
            />
            
            {isOpen && <div className={submenu} >

                <div className="overflow-scroll border-r">
                    {[...filteredHours,"00"].map((item, index) =>
                            <div
                                key={index + item}
                                className=" px-4 cursor-pointer hover:bg-gray-100"
                                onClick={() => setHour(item)}
                            >{item}</div>
                        )}
                </div>
                <div className="overflow-scroll " >
                    {[...filteredMinutes,"00"].map((item, index) =>
                        <div
                            key={index + item}
                            className=" px-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => setMinute(item)}
                        >{item}</div>)}
                </div>

                <button
                    className={button}
                    onClick={(e)=>{
                        e.stopPropagation();
                        setIsOpen(false)
                    }}
                >OK</button>
            </div>}
        </div>
    );
};

export default TimePicker;

const input ='pr-2 py-1 text-end pr-[2px] w-[24px] outline-none'
const input2 ='pr-2 py-1 pl-[2px] w-[35px] outline-none'
const button ='absolute top-[130px] left-2 bg-blue-600 px-2 text-xs text-white active:bg-blue-400'
const submenu = "absolute flex shadow top-[104%] overflow-hidden pb-6 max-h-[150px] bg-white z-20"

const container = 'flex relative bg-white items-center border text-sm relative w-[100px] outline-none hover:border hover:border-blue-800 cursor-text rounded'