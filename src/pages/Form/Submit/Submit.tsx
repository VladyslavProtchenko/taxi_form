
import { ITaxi, useMain } from '../../../Store/useMain';
import React, { useEffect } from 'react';
import CarCard from './CarCard';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import {  useNavigate } from 'react-router-dom';


const sendOrder = async (data:ITaxi[]): Promise<AxiosResponse> => {
    console.log(data)
    const response = await axios.post("http://localhost:7010/order",data)
    // const response = await axios.post("https://taxibeckend.onrender.com/order",data)
    console.log(response, 'response from server')
    
    return response;
};

const Submit = (): React.ReactNode => {
    const { list,setSubmit, isFrench,setSteps } = useMain()
    const navigate = useNavigate()
    useEffect(()=>{},[list])
    
    return (
        <section className={section}>
            <h1 className={pageNumber}>8/8</h1>
            {list.filter(item => item.filled).length > 0 
            ? list.filter(item => item.filled).map((item) => (<CarCard item={item} key={item.name + item.phone}/>))
            : <div className='w-full h-[100px] text-center'> no orders yet</div>  }

            <div className="flex justify-between mt-20">
                <div onClick={() => {
                        setSteps(0)
                        setSubmit(false)
                    }} className={backBtn}> {isFrench? 'Précédent': 'Previous'} </div>
                <div onClick={async () => {
                    const data = list.filter(item=>item.filled).map(car =>{return car.dateNow?  {...car, date: dayjs().format('MM/DD/YYYY'), time: dayjs().format('HH:mm')} : car})
                    await sendOrder(data)
                    navigate('success')
                }} className={greenBtn}>Submit</div>
            </div>
        </section>
    );
};

export default Submit;
const pageNumber = 'absolute left-2 top-16 text-base text-gray-600'

const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const greenBtn = 'w-1/3 border-2 border-green-400   active:bg-green-400 active:text-white flex items-center justify-center text-green-400 rounded-full'


const section = 'flex w-full space-y-4 flex-col max-w-[576px] py-8 px-10'

