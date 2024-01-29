
import { ITaxi, useMain } from '../../../Store/useMain';
import React, { useEffect } from 'react';
import CarCard from './CarCard';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import {  useNavigate } from 'react-router-dom';
import BoostCard from './BoostCard';


const sendOrder = async (data: ITaxi[], isFrench: boolean): Promise<AxiosResponse> => {

    // const response = await axios.post("http://localhost:7010/order",{data, isFrench})
    const response = await axios.post("https://taxibeckend.onrender.com/order",{data, isFrench})
    console.log(response, 'response from server')
    
    return response;
};

const Submit = (): React.ReactNode => {
    const { list,addNewCar, setSubmit,setActiveCarId, isFrench ,setSteps } = useMain()
    const navigate = useNavigate()
    useEffect(()=>{},[list])

    const newOrder = () => {

        if(list.find(a => a.filled === false)) {
            setSubmit(false)
            return setSteps(0)
        }
        if(list.length===5) return;
        
        const id = list.reduce((max, obj)=>(obj.id > max.id ? obj : max ), list[0]).id +1
        
        const newCar = {
            ...list[0],
            id: id,
            filled: false,
            isEdit: false,
        }
        
        addNewCar([...list, newCar])
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
            <div className="flex justify-between mt-auto pt-4 max-w-[400px] mx-auto w-full">
                <div onClick={() => {
                        setSteps(7)
                        setSubmit(false)
                    }} className={backBtn}> {isFrench? 'Précédent': 'Previous'} </div>
                <div onClick={async () => {
                    const data = list.filter(item=>item.filled).map(car =>{return car.dateNow?  {...car, date: dayjs().format('MM/DD/YYYY'), time: dayjs().format('HH:mm')} : car})
                    await sendOrder(data, isFrench )
                    navigate('success')
                }} className={greenBtn}>Submit</div>
            </div>
        </section>
    );
};

export default Submit;

const addCar = 'border-2 border-green-400 rounded-full text-green-400 px-2 py-1 cursor-pointer bg-white mt-0 mb-4 z-20 self-start'

const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const greenBtn = 'w-1/3 border-2 border-green-400  active:bg-green-400 active:text-white flex items-center justify-center text-green-400 rounded-full'


const section = 'flex w-full h-full flex-col max-w-[576px] py-8 pt-14 px-10'

