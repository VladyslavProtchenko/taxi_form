import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import React from 'react';
interface IDate {
    onChange:(date:string) => void;
    getFullDate?: (date: dayjs.Dayjs) => void;
    time:string;
}

export default function DatePicker({onChange, getFullDate}:IDate):React.ReactNode {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

    const handleDate = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
            const parsedDate = dayjs(date);
            setDate(parsedDate);
            if(getFullDate) getFullDate(parsedDate)
            onChange(parsedDate.format('DD/MM/YYYY'))
        }

    return (
        <div className="relative" >
            <div className={pickUpTime}>
                <span className='font-bold'>{date.format('dddd')},  
                {'  '+date.format('MMM')}
                {'.  '+date.format('D')}{ date.format('DD') === '01' || date.format('DD') === '21' || date.format('DD') === '31'
                                            ? 'st'
                                            :  date.format('DD') === '02' || date.format('DD') === '22' || date.format('DD') === '32'
                                            ?  'nd'
                                            :  date.format('DD') === '03' || date.format('DD') === '23' || date.format('DD') === '33'
                                            ? 'rd'
                                            : 'th'
                                        }
                {' '+date.format('YYYY')}</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    className='sm:w-[280px] mt-8 '
                    minDate={dayjs()}
                    
                    onChange={handleDate}
                />
            </LocalizationProvider>
        </div>
    );
}

const pickUpTime = 'absolute z-10 top-4 left-6 text-lg flex max-w-[300px]'