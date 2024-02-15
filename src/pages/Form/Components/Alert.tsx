import React, { useEffect, useState } from 'react';
import { useMain } from '../../../Store/useMain';

const Alert = (): React.ReactNode => {
    const { alert, setAlert } = useMain()
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        setOpen(alert.length>0)
    },[alert])
    

    return (
        <div className={open? box: 'hidden'}>
            <div className={modal}>
                {alert? alert: 'Thanks'}
                <button className={button} onClick={()=>{
                    setOpen(false)
                    setAlert('')
                    }}> ok</button>
            </div>
        </div>

    );
};

export default Alert;

const box = ' flex justify-center items-center bg-white bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-50'
const button =' px-5 mt-2  bg-purple-500 text-white rounded-lg'
const modal = ' items-center justify-center pt-4 w-4/5 h-[100px] max-w-[400px] shadow-2xl flex flex-col text-xl bg-white px-4 py-2  z-40 flex  font-bold rounded-xl '