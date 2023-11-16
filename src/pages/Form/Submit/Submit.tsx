
import { useMain } from '../../../Store/useMain';
import React from 'react';
import CarCard from './CarCard';


const Submit = ():React.ReactNode => {
    const { list } =useMain()
    
    return (
        <section className={section}>
            {list.filter(item => item.filled).map((item)=>(
                <CarCard item={item} />
            ))}
        </section>
    );
};

export default Submit;


const section = 'flex w-full space-y-4  flex-col max-w-[576px] border-none   py-8 px-1 mb-20'

