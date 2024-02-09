import React from 'react';
import InfoSection from './Info/InfoSection';
import LocationSection from './Location/LocationSection';
import PassengersSection from './Passengers/PassengersSection';

import PaymentSection from './Payment/Payment';
import { useEffect } from 'react';
import Submit from './Submit/Submit';
import { useMain } from '../../Store/useMain';
import Type from './Type/TypeSection';
import BagsSection from './Seats/SeatsSection';
import SportSection from './Sport/SportSection';
import ReturnSection from './Location/ReturnSection';
import dayjs from 'dayjs';

const Form = (): React.ReactNode => {
    const { list,submit, activeCarId ,setIsCars,setTime, setDate, setFilled } = useMain()
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    useEffect(()=>{

        let cars = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        }

        list.map((item,index)=>{

            if(item.type>2
                && item.from 
                && item.name.length > 3 
                && item.title 
                && pattern.test(item.email)
                && item.phone.length >= 11
            ){
                
                if(item.from 
                    && item.name.length > 3 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                ) {
                    return cars = {...cars, [index+1]: true}
                } else {
                    return cars = {...cars, [index+1]: false}
                }
            } else{
                
                if(item.isReturnTrip 
                    && item.name.length > 3 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                    && item.isReturnTrip 
                    && item.dateR 
                    && item.timeR.length===5 
                    && item.fromR 
                    && item.toR 
                    && item.from 
                    && item.to
                    && (item.adults>0 || (!item.adults && list[activeCarId-1].type ===2))
                ){
                        return cars = {...cars, [index+1]: true}
                } else if(
                    !item.isReturnTrip 
                    && item.name.length > 2 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                    && item.from 
                    && item.to
                    && (item.adults>0 || (!item.adults && list[activeCarId-1].type ===2))
                ){

                    return cars = {...cars, [index+1]: true}
                } else {
                    if(item.filled) setFilled(false, item.id)
                    cars = {...cars, [index+1]: false}
                }
            }
        })
        setIsCars(cars)
    },[list])

    useEffect(()=>{
        const days = dayjs().format('MM/DD/YYYY')
        const time = dayjs().format('hh:mm')
        
        setTime(time)
        setDate(days)
    },[activeCarId])

    return (
        <div className={container}>
            {!submit ? <>
                {list[activeCarId-1].steps === 0 && <Type />}
                {list[activeCarId-1].steps === 1 && <InfoSection />}
                {list[activeCarId-1].steps === 2 && <LocationSection />}
                {list[activeCarId-1].steps === 3 && <ReturnSection />}

                {list[activeCarId-1].steps === 4 && <PassengersSection />}
                {list[activeCarId-1].steps === 5 && <BagsSection />}
                {list[activeCarId-1].steps === 6 && <SportSection />}
                {list[activeCarId-1].steps === 7 && <PaymentSection/>}
            </> : <Submit/>}
        </div>
    );
};

export default Form;

const container = 'flex flex-col items-center w-full '