
import { useMain } from '../../../Store/useMain';
import React from 'react';
import CarCard from './CarCard';
import { useValidation } from '../../../Store/useValidation';


const Submit = ():React.ReactNode => {
    const { list } =useMain()
    const { setIsSubmit } = useValidation()
    
    return (
        <section className={section}>
            {list.filter(item => item.filled).map((item)=>(
                <CarCard item={item} />
            ))}
            <div className="flex justify-between">
                <div onClick={()=>setIsSubmit(false)} className={btn}>
                    Back
                </div>
                <div onClick={()=>alert('order sent')} className={btn2}>
                    Submit
                </div>
            </div>
                    
        </section>
    );
};

export default Submit;

const btn = 'flex text-black px-2 py-1 rounded self-start bg-red-500 active:bg-red-400 cursor-pointer text-white'
const btn2 = 'flex text-black px-2 py-1 rounded self-start bg-green-400 active:bg-green-300 cursor-pointer text-white'

const section = 'flex w-full space-y-4  flex-col max-w-[576px] border-none   py-8 px-1'

