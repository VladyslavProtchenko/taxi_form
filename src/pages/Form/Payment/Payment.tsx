import { Select } from "antd";
import { Input } from 'antd';
import { useMain } from "../../../Store/useMain";
import { useStore } from "../../../Store";
import React from "react";
const { TextArea } = Input;
import { MdDone } from "react-icons/md";


const PaymentSection = ():React.ReactNode => {
    const {list,setSubmit, activeCarId, setPaymentMethod,setAdditionalText,setTripType,setFilled,setSteps,isFrench } = useMain()
    const { store} = useStore()
    return (
        <section className={section}>
            <div className={content}>
                <span className={box}>
                    <Select  placeholder='Trip type' style={{ width:200 , height: 30, borderRadius: 20}} value={list[activeCarId-1].tripType} onChange={setTripType} options={store.tripList.map(item=>({value: item, label: item}))}/></span>
                <span className={list[activeCarId-1].paymentMethod ? box2: box2 +' border-red-500'}>
                    <Select placeholder='Payment method' style={{ width:200 , height: 30, borderRadius: 20}} value={list[activeCarId-1].paymentMethod} onChange={setPaymentMethod} options={store.paymentList.map(item=>({value: item, label: item}))}/></span>
            </div>
            
            <div className={additional}>
                <span className={textArea}>
                    <TextArea style={{borderRadius: '10px'}} rows={2} placeholder='Additional information' onChange={(e)=>{
                        setAdditionalText(e.target.value)
                    }}/></span>
            </div>

            <div className='flex justify-end space-x-4 mt-4'>
                
                {list[activeCarId-1].filled 
                    ? <div className="px-4 py-2 text-gray-400 flex items-center "><MdDone className='-translate-y-[1px] text-xl'/> Completed! </div>
                    : <button className={nextBtn} onClick={()=> {
                            setFilled(true, activeCarId)
                        }}>Order taxi</button>}
                {list.filter(item => item.filled).length>0 &&<button className={yellowBtn} onClick={()=> {
                        setSteps(8)
                        setSubmit(true)
                    }}>View Orders</button>}
            </div>
            <div className={btns}>
                <div className={backBtn} onClick={()=>setSteps(6)}>{isFrench? 'Précédent': 'Previous'}</div>
            </div>
        </section>
    );
};

export default PaymentSection;

const btns = ' fixed bottom-20 w-full flex justify-between max-w-[400px] px-5 right-1/2 translate-x-1/2'
const nextBtn = 'w-1/3 bg-purple-500 text-center active:bg-purple-700 py-3 rounded-full text-white  cursor-pointer'
const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white  cursor-pointer'
const yellowBtn = 'w-1/3 border-2 border-yellow-300  active:bg-yellow-200 text-center py-3 rounded-full'

const additional ='flex w-full '
const content ='flex justify-between w-full mb-4'

const box ='flex border h-min pl-3 w-[100px] rounded-xl border-purple-500 bg-white'
const box2 ='flex border h-min ml-4 pl-3 w-[100px] rounded-xl border-purple-500 bg-white' 
const textArea ='flex border h-min w-full rounded-xl border-purple-500' 
const section = 'flex flex-col h-full w-full pt-14 max-w-[576px]  border-none  py-8 px-10   rounded-b'