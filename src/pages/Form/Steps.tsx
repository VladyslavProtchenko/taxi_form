import React from 'react';
import { useMain } from '../../Store/useMain';
import { useValidation } from '../../Store/useValidation';
import { useState, useEffect } from 'react';

const Steps = ():React.ReactNode => {
    
    const { activeCarId, list, setSteps, } = useMain()
    const { validation, setIsSubmit } = useValidation()
    const [activePage, setActivePage] = useState(1)

    useEffect(()=>{
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setActivePage(1)
        if(!list[activeCarId-1].isReturnTrip 
            &&  list[activeCarId-1].from 
            && list[activeCarId-1].to
            && list[activeCarId-1].title 
            && pattern.test(list[activeCarId-1].email)
            && (list[activeCarId-1].phone.length >= 11)
            && (list[activeCarId-1].name.length > 3)
        ){ 
            return  setActivePage(3) 
        }

        if(list[activeCarId-1].isReturnTrip 
            && list[activeCarId-1].dateR 
            && list[activeCarId-1].timeR.length===5 
            && list[activeCarId-1].fromR 
            && list[activeCarId-1].toR 
            && list[activeCarId-1].from 
            && list[activeCarId-1].to
            && list[activeCarId-1].title 
            && pattern.test(list[activeCarId-1].email)
            && (list[activeCarId-1].phone.length >= 11)
            && (list[activeCarId-1].name.length > 3)
        ) {
            return setActivePage(3)
        }

        if((list[activeCarId-1].name.length > 3) 
            && list[activeCarId-1].title 
            && pattern.test(list[activeCarId-1].email)
            && (list[activeCarId-1].phone.length >= 11)
        ) 
        { return setActivePage(2) }

    },[list, activeCarId])

    return (
        <div className={buttons +' text-gray-300 active:text-gray-300'}>
            {list[activeCarId-1].steps != 1 && 
            <div 
                className={navBtn}
                onClick={() =>{
                    if(validation.isSubmit) {
                        setIsSubmit(false)
                        return setSteps(1)
                    }

                    if(list[activeCarId-1].steps <=1 ) return setSteps(1)
                    setSteps(list[activeCarId-1].steps - 1)
                }}
            >back</div>}

            {list[activeCarId-1].steps != 4 && <div 
                className={navBtn + `${list[activeCarId-1].steps === 1? ' ml-auto': ''}`}
                onClick={() =>{
                    list[activeCarId-1].steps === 1 && activePage >= 2 
                    ? setSteps(list[activeCarId-1].steps + 1)
                    : list[activeCarId-1].steps === 2 && activePage >= 3
                    ? setSteps(list[activeCarId-1].steps + 1) 
                    : list[activeCarId-1].steps === 3 && activePage >= 3
                    ? setSteps(list[activeCarId-1].steps + 1) 
                    : setSteps(list[activeCarId-1].steps) 
                    
                }}
            >next</div>}
        </div>
    );
};

export default Steps;

const navBtn = ' flex items-center text-xl text-white active:text-gray-500 px-4 py-1 cursor-pointer bg-red-500 active:bg-red-400 rounded'
const buttons = 'flex max-w-[320px] w-full justify-between px-3 mt-4 mb-4'
