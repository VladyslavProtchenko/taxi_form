import React from 'react';
import InfoSection from './Info/InfoSection';
import AddressSection from './Location/LocationSection';
import OptionsSection from './Options/OptionsSection';
import Steps from './Steps';

import PaymentSection from './Payment/Payment';
import { useValidation } from '../../Store/useValidation';
import { useEffect } from 'react';
import Submit from './Submit/Submit';
import { useMain } from '../../Store/useMain';

const Form = (): React.ReactNode => {
    const { list, activeCarId ,setIsCars, isCars, type} = useMain()
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { validation,setIsSubmit } = useValidation()

    useEffect(()=>{
        
        if(['Boost', 'Unlocking door'].includes(type)
            && list[0].from 
            && list[0].name.length > 3 
            && list[0].title 
            && pattern.test(list[0].email)
            && list[0].phone.length >= 11
        ){
            if(list[0].from 
                && list[0].name.length > 3 
                && list[0].title 
                && pattern.test(list[0].email)
                && list[0].phone.length >= 11
            ) {
                return setIsCars({...isCars, 1: true})
            } else {
                return setIsCars({...isCars, 1: false})
            }
            
        } else{
            if(list[0].isReturnTrip 
                && list[0].name.length > 3 
                && list[0].title 
                && pattern.test(list[0].email)
                && list[0].phone.length >= 11
                && list[0].isReturnTrip 
                && list[0].dateR 
                && list[0].timeR.length===5 
                && list[0].fromR 
                && list[0].toR 
                && list[0].from 
                && list[0].to
                && list[0].adults){
                    setIsCars({...isCars, 1: true})
            } else if(
                !list[0].isReturnTrip 
                && list[0].name.length > 3 
                && list[0].title 
                && pattern.test(list[0].email)
                && list[0].phone.length >= 11
                &&  list[0].from 
                && list[0].to
                && list[0].adults  ){
                setIsCars({...isCars, 1: true})
            } else {
                setIsCars({...isCars, 1: false})
            }
        }
    },[list[0]])

    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(type)
            && list[1].from 
            && list[1].name.length > 3 
            && list[1].title 
            && pattern.test(list[1].email)
            && list[1].phone.length >= 11
        ){
            if(list[1].from 
                && list[1].name.length > 3 
                && list[1].title 
                && pattern.test(list[1].email)
                && list[1].phone.length >= 11
            ) {
                return setIsCars({...isCars, 1: true})
            } else {
                return setIsCars({...isCars, 1: false})
            }
        } else{
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
                && isCars[1]
                && list[1].adults
            ){
                    setIsCars({...isCars, 1: true, 2:true})

            } else if(
                !list[1].isReturnTrip 
                && list[1].name.length > 3 
                && list[1].title 
                && pattern.test(list[1].email)
                && list[1].phone.length >= 11
                &&  list[1].from 
                && list[1].to
                && isCars[1]
                && list[1].adults){
                setIsCars({...isCars, 1: true, 2:true})
            }else {
                setIsCars({...isCars, 2: false})
            }
        }
    },[list[1]])

    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(type)
            && list[2].from 
            && list[2].name.length > 3 
            && list[2].title 
            && pattern.test(list[2].email)
            && list[2].phone.length >= 11
        ){
            if(list[2].from 
                && list[2].name.length > 3 
                && list[2].title 
                && pattern.test(list[2].email)
                && list[2].phone.length >= 11
            ) {
                return setIsCars({...isCars, 1: true})
            } else {
                return setIsCars({...isCars, 1: false})
            }
            
        } else{
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
                && isCars[2]
                && list[2].adults){
                    setIsCars({...isCars, 3:true})

            } else if(
                !list[2].isReturnTrip 
                && list[2].name.length > 3 
                && list[2].title 
                && pattern.test(list[2].email)
                && list[2].phone.length >= 11
                &&  list[2].from 
                && list[2].to
                && isCars[2]
                && list[2].adults){
                setIsCars({...isCars,  3:true})
            }else {
                setIsCars({...isCars, 3: false})
            }
        }
    },[list[2]])

    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(type)
            && list[3].from 
            && list[3].name.length > 3 
            && list[3].title 
            && pattern.test(list[3].email)
            && list[3].phone.length >= 11
        ){
            if(list[3].from 
                && list[3].name.length > 3 
                && list[3].title 
                && pattern.test(list[3].email)
                && list[3].phone.length >= 11
            ) {
                return setIsCars({...isCars, 1: true})
            } else {
                return setIsCars({...isCars, 1: false})
            }
            
        } else{
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
                && isCars[3]
                && list[3].adults){
                    setIsCars({...isCars, 4:true})

            } else if(
                !list[3].isReturnTrip 
                && list[3].name.length > 3 
                && list[3].title 
                && pattern.test(list[3].email)
                && list[3].phone.length >= 11
                &&  list[3].from 
                && list[3].to
                && isCars[3]
                && list[3].adults){
                setIsCars({...isCars,  4:true})
            }else {
                setIsCars({...isCars, 4: false})
            }
        }
    },[list[3]])
    
    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(type)
            && list[4].from 
            && list[4].name.length > 3 
            && list[4].title 
            && pattern.test(list[4].email)
            && list[4].phone.length >= 11
        ){
            if(list[4].from 
                && list[4].name.length > 3 
                && list[4].title 
                && pattern.test(list[4].email)
                && list[4].phone.length >= 11
            ) {
                return setIsCars({...isCars, 1: true})
            } else {
                return setIsCars({...isCars, 1: false})
            }
            
        } else{
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
                && isCars[4]
                && list[4].adults){
                    setIsCars({...isCars, 5:true})

                } else if(
                !list[4].isReturnTrip 
                && list[4].name.length > 3 
                && list[4].title 
                && pattern.test(list[4].email)
                && list[4].phone.length >= 11
                &&  list[4].from 
                && list[4].to
                && isCars[4]
                && list[4].adults){
                setIsCars({...isCars,  5:true})
            }else {
            
                setIsCars({...isCars, 5: false})
            }
        }
    },[list[4]])

    useEffect(()=>{
        setIsSubmit(false)
    },[activeCarId])
    return (
        <div  className={container}>
            {!validation.isSubmit &&
            <>
                {list[activeCarId-1].steps === 1 && <InfoSection />}
                {list[activeCarId-1].steps === 2 && <AddressSection />}
                {list[activeCarId-1].steps === 3 && <OptionsSection />}
                {list[activeCarId-1].steps === 4 && <PaymentSection/>}
                
                {list[activeCarId-1].steps !== 2 && <Steps/>}
            </>}
            {validation.isSubmit && <Submit />}
        </div>
    );
};

export default Form;

const container = 'flex w-[85%] flex-col  border-none items-center min-h-screen '