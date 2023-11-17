import { Select } from "antd";
import { Input } from 'antd';
import { useMain } from "../../../Store/useMain";
import { useStore } from "../../../Store";
import React from "react";
import { useValidation } from "../../../Store/useValidation";
const { TextArea } = Input;


const PaymentSection = ():React.ReactNode => {
    const {list, activeCarId, setPaymentMethod,setAdditionalText,setTripType,setFilled } = useMain()
    const {setIsSubmit} = useValidation()
    const { store} = useStore()

    return (
        <section className={section}>
            <div className={content}>
                <span className={box}>
                    <Select  placeholder='Trip type' style={{ width:200 , height: 30, borderRadius: 5}} value={list[activeCarId-1].tripType} onChange={setTripType} options={store.tripList.map(item=>({value: item, label: item}))}/></span>
                <span className={list[activeCarId-1].paymentMethod ? box2: box2 +' border-red-500'}>
                    <Select placeholder='Payment method' style={{ width:200 , height: 30, borderRadius: 5}} value={list[activeCarId-1].paymentMethod} onChange={setPaymentMethod} options={store.paymentList.map(item=>({value: item, label: item}))}/></span>
            </div>
            
            <div className={additional}>
                <span className={textArea}>
                    <TextArea style={{borderRadius: '20px'}} rows={2} placeholder='Additional information' onChange={(e)=>{
                        setAdditionalText(e.target.value)
                    }}/></span>
            </div>
            <div className='flex justify-between mt-4'>
                <button className={btn2} onClick={()=> setFilled(true, activeCarId)}>Order taxi</button>
                <button className={btn} onClick={()=> setIsSubmit(true)}>View Orders</button>
            </div>
        </section>
    );
};

export default PaymentSection;


const btn = 'py-2 px-4 rounded bg-yellow-400  text-white active:bg-yellow-200 self-start'
const btn2 = 'py-2 px-4 rounded bg-green-400  text-white active:bg-green-200 self-start'
const additional ='flex additional px-2 w-full '
const content ='flex  px-2 w-full mb-4'

const box ='flex border h-min pl-3 w-[100px] rounded'
const box2 ='flex border h-min ml-4 pl-3 w-[100px] rounded'
const textArea ='flex border h-min w-full rounded-xl'
const section = 'flex flex-col w-full  max-w-[576px]  border-none  py-8 px-1 pb-20'