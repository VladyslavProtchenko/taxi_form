
import { ITaxi, useMain } from '../../../Store/useMain';
import React from 'react';
import CarCard from './CarCard';
import axios, { AxiosResponse } from 'axios';
import { UseMutationResult, useMutation } from 'react-query';
import dayjs from 'dayjs';


const sendOrder = async (data:ITaxi[]): Promise<AxiosResponse> => {
    console.log(data, 'data')
    // const response = await axios.post("http://localhost:7013/order",data)
    const response = await axios.post("https://taxibeckend.onrender.com/order",data)
    console.log(response, 'response from server')
    return response;
};

const Submit = (): React.ReactNode => {
    const { list,setSubmit } = useMain()
    const mutation: UseMutationResult<AxiosResponse<unknown>, unknown, ITaxi[], unknown> = useMutation(data=> sendOrder(data))

    return (
        <section className={section}>
            {list.filter(item => item.filled).length > 0 
            ? list.filter(item => item.filled).map((item) => (
                <CarCard item={item} key={item.name + item.phone}/>
            ))
            : <div className='w-full h-[100px] text-center'> no orders yet</div>  }

            <div className="flex justify-between mt-20">
                <div onClick={() => setSubmit(false)} className={backBtn}> Back </div>
                <div onClick={() => {
                    const data = list.filter(item=>item.filled).map(car =>{return car.dateNow?  {...car, date: dayjs().format('MM/DD/YYYY'), time: dayjs().format('HH:mm')} : car})
                    mutation.mutate(data)
                    alert('order sent')
                }} className={greenBtn}>Submit</div>
            </div>
        </section>
    );
};

export default Submit;

const backBtn = 'w-1/3 bg-rose-500 active:bg-rose-700 text-center py-3 rounded-full text-white'
const greenBtn = 'w-1/3 border-2 border-green-400   active:bg-green-400 active:text-white flex items-center justify-center text-green-400 rounded-full'


const section = 'flex w-full  flex-col max-w-[576px] py-8 px-10'

