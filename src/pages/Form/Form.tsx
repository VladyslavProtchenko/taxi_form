import InfoSection from './Info/InfoSection';
import AddressSection from './Location/LocationSection';
import OptionsSection from './Options/OptionsSection';
import Steps from './Steps';

import PaymentSection from './Payment/Payment';
import { useValidation } from '../../Store/useValidation';
import { useEffect } from 'react';
import Submit from './Submit/Submit';
import dayjs from 'dayjs';
import { useMain } from '../../Store/useMain';

const Form = () => {
    const { list, activeCarId } = useMain()

    const { 
        validation, 
        setIsName,
        setIsEmail, 
        setIsTitle,
        setIsPhone,
        setIsFrom,
        setIsTo,
        setIsDate,
        setIsTime,
        setIsFlight,
        setIsDeparture,
        setIsBackFrom,
        setIsBackTo,
        setIsDateBack,
        setIsTimeBack,
        setIsFlightBack,
        setIsDepartureBack,
        setIsPayment,
        setIsSubmit,
    } = useValidation()
    useEffect(()=>{
        setIsTitle(false)
        setIsName(false)
        setIsEmail(false)
        setIsPayment(false)

        if(list[activeCarId-1].title) setIsTitle(true)
        if(list[activeCarId-1].name.length > 3) setIsName(true) 
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(pattern.test(list[activeCarId-1].email)) setIsEmail(true)
        if(list[activeCarId-1].paymentMethod) setIsPayment(true)

        setIsFrom(false)
        setIsTo(false)
        setIsDate(false)
        setIsTime(false) 
        setIsBackFrom(false)
        setIsBackTo(false)
        setIsDateBack(false)
        setIsTimeBack(false)

        if(list[activeCarId-1].from) setIsFrom(true)
        if(list[activeCarId-1].to) setIsTo(true)
        if(list[activeCarId-1].date) setIsDate(true)
        if(list[activeCarId-1].time.length === 5 ) setIsTime(true)

        if(list[activeCarId-1].isReturnTrip && ( list[activeCarId-1].fromR || list[activeCarId-1].from )) setIsBackFrom(true)
        if(list[activeCarId-1].isReturnTrip && ( list[activeCarId-1].toR || list[activeCarId-1].to )) setIsBackTo(true)
        if(list[activeCarId-1].isReturnTrip && list[activeCarId-1].dateR) setIsDateBack(true)
        
        if(list[activeCarId-1].isReturnTrip && list[activeCarId-1].timeR.length === 5) setIsTimeBack(true)
    },[list])

    const sendOrder = () => {

        const newOrder = list.map(item=>{
            item.dateNow ? { ...item, date:dayjs().format('HH:mm') } : item
        })

        setIsTitle(true)
        setIsName(true)
        setIsEmail(true)

        setIsFrom(true)
        setIsTo(true)
        setIsDate(true)
        setIsTime(true)

        setIsFlight(true)
        setIsDeparture(true)

        setIsBackFrom(true)
        setIsBackTo(true)
        setIsDateBack(true)
        setIsTimeBack(true)

        setIsFlightBack(true)
        setIsDepartureBack(true)

        setIsPayment(true)

        if(!list[activeCarId-1].title) {
            alert('Title required')
            return setIsTitle(false)
        }

        if(list[activeCarId-1].name.length < 3) {
            alert('Name required')
            return  setIsName(false) 
        } 

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(list[activeCarId-1].email)) {
            alert('Email required')
            return setIsEmail(false)  
        }
        if(!validation.isPhone) {
            alert('Phone required')
            return setIsPhone(false)
        }
        if(!list[activeCarId-1].from) {
            alert('Set pick up address')
            return setIsFrom(false)
        }
        if(!list[activeCarId-1].to) {
            alert('Set drop off address')
            return setIsTo(false)
        }

        if(!list[activeCarId-1].date) {
            alert('date is required')
            return setIsDate(false)
        }
        if(!list[activeCarId-1].time){
            alert('time is required')
            return setIsTime(false) 
        } 
        if(validation.isMontrealPick && !list[activeCarId-1].flight) {
            alert('flight is required')
            return setIsFlight(false)
        }
        if(validation.isMontrealPick && (!list[activeCarId-1].departure || !list[activeCarId-1].airlines)){
            alert('departure section is required')
            return setIsDeparture(false) 
        } 
        
        if(validation.isReturn && !list[activeCarId-1].fromR){
            alert('return address is required')
            return setIsBackFrom(false)
        } 
        if(validation.isReturn && !list[activeCarId-1].toR)  {
            alert('return to address is required')
            return setIsBackTo(true)
        }

        if(validation.isReturn && !list[activeCarId-1].dateR) {
            alert('date is required')
            return setIsDateBack(false)
        }
        if(validation.isReturn && list[activeCarId-1].timeR.length !== 5) {
            alert('time is required')
            return  setIsTimeBack(false)
        }

        
        if(validation.isReturn && validation.isMontrealPickBack && !list[activeCarId-1].flight) {
            alert('flight is required')
            return setIsFlightBack(false)
        }
        if(validation.isReturn && validation.isMontrealPickBack && (!list[activeCarId-1].departure || !list[activeCarId-1].airlines)) {
            alert('departure is required')
            return setIsDepartureBack(false)
        }

        if(!list[activeCarId-1].paymentMethod){
            alert('choice payment method')
            return setIsPayment(false)
        }
        setIsSubmit(true)
        console.log(newOrder, 'order')
        alert('order created')
        
    }
    return (
        <div  className={container}>
            
            {!validation.isSubmit &&
            <div className=" w-full flex-col flex items-center sm:max-w-[576px] h-full">
                {list[activeCarId-1].steps === 1 && <InfoSection />}
                {list[activeCarId-1].steps === 2 && <AddressSection />}
                {list[activeCarId-1].steps === 3 && <OptionsSection />}
                {list[activeCarId-1].steps === 4 && <PaymentSection sendOrder={sendOrder}/>}
                
                {list[activeCarId-1].steps !== 2 && <Steps/>}
            </div>}
            {validation.isSubmit && <div className='flex flex-col items-center justify-center'>
                <Submit />
                <Steps/>
            </div>}
            

        </div>
    );
};

export default Form;
const container = 'flex  flex-col w-full bg-white sm:max-width-[767px] sm:border-none sm:px-2 sm:items-center '