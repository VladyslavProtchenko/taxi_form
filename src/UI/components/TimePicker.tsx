import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import useOnclickOutside from "react-cool-onclickoutside";


interface InputProps {
    onChange: (value: string) => void;
    date: string;
}

const TimePicker: React.FC<InputProps> = ({ onChange, date }) => {

    const ref = useOnclickOutside(() => setIsOpen(false));

    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        onChange((hour) + ':' + (minute))
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
        <div className={container} onClick={() => setIsOpen(true)} ref={ref}>
            <input
                className={input}
                type="text"
                value={hour}
                placeholder='hh'
                maxLength={2}
                autoFocus={false}
                onChange={(e) => {
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
                onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '')
                    if (+newValue > 59) return setMinute('59')
                    setMinute(newValue)
                }}
            />
            <IoMdTime className='cursor-pointer ' onClick={() => setIsOpen(true)}/>
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

const input ='pr-2 py-1 text-end pr-[2px] w-[36px] outline-none'
const input2 ='pr-2 py-1 pl-[2px] w-[35px] outline-none'
const button ='absolute top-[130px] left-2 bg-blue-600 px-2 text-xs text-white active:bg-blue-400'
const submenu = "absolute flex shadow top-[104%] overflow-hidden pb-6 max-h-[150px] bg-white z-20"

const container = 'flex relative bg-white items-center border text-sm relative w-[100px] outline-none hover:border hover:border-blue-800 cursor-text'