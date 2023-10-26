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

const TimePicker: React.FC<InputProps> = ({ style, onChange, date,time }) => {
    const ref = useOnclickOutside(() => setIsOpen(false));
    const { setTaxiNow} = useLocation()
    const [hour, setHour] = useState(time.replace(/:/g, '') ? time.slice(0,2) : '')
    const [minute, setMinute] = useState(time.replace(/:/g, '') ? time.slice(3) :  '')
    const [isOpen, setIsOpen] = useState(false)
    const [isTime, setIsTime] = useState(0)

    useEffect(() => {
        
        onChange((hour) + ':' + (minute))
        if(minute && hour) {
            setIsTime(2)
        } else setIsTime(1)
    }, [hour, minute])

    
    const now = dayjs().format('DD/MM/YYYY')
    let hoursNow = '0'
    let minutesNow = '0'

    if (now === date) {
        hoursNow = dayjs().format('HH')
        minutesNow = dayjs().format('mm')
    }

    const minutes = [
        "00","05","10", "15", "20", "25", "30",
        "35", "40", "45",  "50","55","00"
    ]
    const hours = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "00",
    ]
    const filteredMinutes = minutes.filter(item => item > minutesNow);
    const filteredHours = hours.filter(item => item >= hoursNow);
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
                onBlur={()=>{
                    setTaxiNow(false)
                    if(minute && hour) {
                        setIsTime(2)
                    } else {
                        setIsTime(1)
                    }
                }}
                onChange={(e) => {
                    if(minute && hour) {
                        setIsTime(2)
                    } else {
                        setIsTime(1)
                    }
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
                onBlur={()=>{
                    setTaxiNow(false)
                    if(minute && hour) {
                        setIsTime(2)
                    } else {
                        setIsTime(1)
                    }
                }}
                onChange={(e) => {
                    
                    if(minute && hour) {
                        setIsTime(2)
                    } else { setIsTime(1) }
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

const container = 'flex relative bg-white items-center border text-sm relative w-[100px] outline-none hover:border hover:border-blue-800 cursor-text'