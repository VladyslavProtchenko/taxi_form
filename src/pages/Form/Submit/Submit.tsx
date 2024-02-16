
import { ITaxi, useMain } from '../../../Store/useMain';
import React, { useEffect } from 'react';
import CarCard from './CarCard';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
// import {  useNavigate } from 'react-router-dom';
import BoostCard from './BoostCard';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


const sendOrder = async (data: ITaxi[], isFrench: boolean): Promise<AxiosResponse> => {

    // const response = await axios.post("http://localhost:7010/order",{list:data, isFrench})
    const response = await axios.post("https://taxibeckend.onrender.com/order",{data, isFrench})
    console.log(response, 'response from server')
    localStorage.clear()
    return response;
};

const Submit = (): React.ReactNode => {
    const { list,addNewCar, setSubmit,setActiveCarId, isFrench ,setSteps } = useMain()
    // const navigate = useNavigate()
    useEffect(()=>{},[list])

    const newOrder = () => {

        if(list.find(a => a.filled === false)) {
            setSubmit(false)
            return setSteps(0)
        }

        if(list.length===5) return;
        
        const id = list[list.length-1].id + 1

        addNewCar()
        setActiveCarId(id)
        setSubmit(false)
        setSteps(0)
    }
    return (
        <section className={section}>
            {list.filter(item => item.filled).length > 0 
            ? list.filter(item => item.filled).map((item) => {
                    return item.type < 3 
                        ? (<CarCard item={item} key={item.id + item.phone}/>)
                        :(<BoostCard item={item} key={item.id + item.phone}/>)
                }
            )
            : <div className='w-full h-[100px] text-center'> no orders yet</div>  }
            {(list.filter(item => item.filled).length > 0 && list.filter(item => item.filled).length < 5)  && 
                <div 
                    className={addCar}
                    onClick={newOrder}
                >Add car</div>
            }
            <div className={btns}>
                <div onClick={() => {
                        setSteps(7)
                        setSubmit(false)
                    }} className={backBtn}> <MdOutlineKeyboardDoubleArrowLeft className='text-2xl'/>{isFrench? 'Précédent': 'Previous'} </div>
                <div onClick={async () => {
                    const data = list.filter(item=>item.filled).map(car =>{return car.dateNow?  {...car, date: dayjs().format('MM/DD/YYYY'), time: dayjs().format('HH:mm')} : car})
                    await sendOrder(data, isFrench )

                    // navigate('success')
                }} className={greenBtn}>Submit</div>
            </div>
        </section>
    );
};

export default Submit;

const btns ="fixed bottom-[86px] flex w-full mt-auto max-w-[400px] justify-between mx-auto px-5 right-1/2 translate-x-1/2 z-20"

const addCar = 'border-2 border-green-400 rounded-lg text-green-400 px-2 py-1 cursor-pointer bg-white mt-0 mb-4 z-20 self-start'

const backBtn = 'w-[120px] flex items-center justify-center bg-rose-500 active:bg-rose-700 text-center py-3 rounded-xl text-white  cursor-pointer font-bold text-lg pr-2'
const greenBtn = 'w-[120px] border-2 border-green-400 bg-gray-50 active:bg-green-400 active:text-white flex items-center justify-center text-lg font-bold text-green-400 rounded-xl  cursor-pointer'


const section = 'flex w-full h-full flex-col max-w-[576px] py-8 pt-14 px-10 pb-20'

