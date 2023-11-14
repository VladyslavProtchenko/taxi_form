import React from 'react';
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

const Form = (): React.ReactNode => {
    const { list, activeCarId ,setIsCars, isCars} = useMain()

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
        setIsPayment,
        setIsSubmit,
        setIsFromR,
        setIsDateR,
        setIsTimeR,
        setIsToR,
    } = useValidation()


    useEffect(()=>{
        setIsCars({...isCars, 1:false})
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(' work')
        console.log(list[0])
        if(list[0].isReturnTrip 
            && list[0].name.length > 3 
            && list[0].title 
            && pattern.test(list[0].email)
            && list[0].phone.length >= 11
            && list[0].isReturnTrip 
            && list[0].dateR 
            && list[0].timeR 
            && list[0].fromR 
            && list[0].toR 
            && list[0].from 
            && list[0].to){
                console.log('return work')
                setIsCars({...isCars, 1: true})

        } else if(
            !list[0].isReturnTrip 
            && list[0].name.length > 3 
            && list[0].title 
            && pattern.test(list[0].email)
            && list[0].phone.length >= 11
            &&  list[0].from 
            && list[0].to){
                console.log('trip work')

            setIsCars({...isCars, 1: true})
        }
    },[list[0]])

    useEffect(()=>{
        setIsCars({...isCars, 2:false})
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(' work')
        console.log(list[1])
        if(list[1].isReturnTrip 
            && list[1].name.length > 3 
            && list[1].title 
            && pattern.test(list[1].email)
            && list[1].phone.length >= 11
            && list[1].isReturnTrip 
            && list[1].dateR 
            && list[1].timeR 
            && list[1].fromR 
            && list[1].toR 
            && list[1].from 
            && list[1].to
            && isCars[1]){
                console.log('return work')
                setIsCars({...isCars, 1: true, 2:true})

        } else if(
            !list[1].isReturnTrip 
            && list[1].name.length > 3 
            && list[1].title 
            && pattern.test(list[1].email)
            && list[1].phone.length >= 11
            &&  list[1].from 
            && list[1].to
            && isCars[1]){
                console.log('trip work')
            setIsCars({...isCars, 1: true, 2:true})
        }
    },[list[1]])

    useEffect(()=>{
        setIsCars({...isCars, 3:false})
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(list[2].isReturnTrip 
            && list[2].name.length > 3 
            && list[2].title 
            && pattern.test(list[2].email)
            && list[2].phone.length >= 11
            && list[2].isReturnTrip 
            && list[2].dateR 
            && list[2].timeR 
            && list[2].fromR 
            && list[2].toR 
            && list[2].from 
            && list[2].to
            && isCars[2]){
                setIsCars({...isCars, 3:true})

        } else if(
            !list[2].isReturnTrip 
            && list[2].name.length > 3 
            && list[2].title 
            && pattern.test(list[2].email)
            && list[2].phone.length >= 11
            &&  list[2].from 
            && list[2].to
            && isCars[2]){
            setIsCars({...isCars,  3:true})
        }
    },[list[2]])

    useEffect(()=>{
        setIsCars({...isCars, 4:false})
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(list[3].isReturnTrip 
            && list[3].name.length > 3 
            && list[3].title 
            && pattern.test(list[3].email)
            && list[3].phone.length >= 11
            && list[3].isReturnTrip 
            && list[3].dateR 
            && list[3].timeR 
            && list[3].fromR 
            && list[3].toR 
            && list[3].from 
            && list[3].to
            && isCars[3]){
                setIsCars({...isCars, 4:true})

        } else if(
            !list[3].isReturnTrip 
            && list[3].name.length > 3 
            && list[3].title 
            && pattern.test(list[3].email)
            && list[3].phone.length >= 11
            &&  list[3].from 
            && list[3].to
            && isCars[3]){
            setIsCars({...isCars,  4:true})
        }
    },[list[3]])

    useEffect(()=>{
        setIsCars({...isCars, 5:false})
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(list[4].isReturnTrip 
            && list[4].name.length > 3 
            && list[4].title 
            && pattern.test(list[4].email)
            && list[4].phone.length >= 11
            && list[4].isReturnTrip 
            && list[4].dateR 
            && list[4].timeR 
            && list[4].fromR 
            && list[4].toR 
            && list[4].from 
            && list[4].to
            && isCars[4]){
                setIsCars({...isCars, 5:true})

        } else if(
            !list[4].isReturnTrip 
            && list[4].name.length > 3 
            && list[4].title 
            && pattern.test(list[4].email)
            && list[4].phone.length >= 11
            &&  list[4].from 
            && list[4].to
            && isCars[4]){
            setIsCars({...isCars,  5:true})
        }
    },[list[4]])


    const sendOrder = () => {

        const newOrder = list.map(item=>{
            item.dateNow ? { ...item, time:dayjs().format('HH:mm'), date: dayjs().format('DD/MM/YYYY') } : item
        })

        setIsTitle(true)
        setIsName(true)
        setIsEmail(true)

        setIsFrom(true)
        setIsTo(true)
        setIsDate(true)
        setIsTime(true)

        setIsFromR(true)
        setIsToR(true)
        setIsDateR(true)
        setIsTimeR(true)

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

        console.log(list[activeCarId-1].dateNow, 'date now')
        
        if(!list[activeCarId-1].date && !list[activeCarId-1].dateNow) {
            alert('date is required')
            return setIsDate(false)
        }
        if(!list[activeCarId-1].time){
            alert('time is required')
            return setIsTime(false) 
        } 

        
        if(list[activeCarId-1].isReturnTrip && !list[activeCarId-1].fromR){
            alert('return address is required')
            return setIsFromR(false)
        } 
        if(list[activeCarId-1].isReturnTrip && !list[activeCarId-1].toR)  {
            alert('return to address is required')
            return setIsToR(true)
        }

        if(list[activeCarId-1].isReturnTrip && !list[activeCarId-1].dateR) {
            alert('date is required')
            return setIsDateR(false)
        }
        if(list[activeCarId-1].isReturnTrip && list[activeCarId-1].timeR.length !== 5) {
            alert('time is required')
            return  setIsTimeR(false)
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
            <>
                {list[activeCarId-1].steps === 1 && <InfoSection />}
                {list[activeCarId-1].steps === 2 && <AddressSection />}
                {list[activeCarId-1].steps === 3 && <OptionsSection />}
                {list[activeCarId-1].steps === 4 && <PaymentSection sendOrder={sendOrder}/>}
                
                {list[activeCarId-1].steps !== 2 && <Steps/>}
            </>}
            {validation.isSubmit && <div className='flex flex-col items-center justify-center'>
                <Submit />
                <Steps/>
            </div>}
            

        </div>
    );
};

export default Form;
const container = 'flex w-[85%] flex-col bg-white  border-none items-center '