import { useMain } from '../../../../Store/useMain';
import React from 'react';
import bags from '../../../../assets/bags.png'

const BagsSelect = ():React.ReactNode => {
    const {list, activeCarId, setBaggage} = useMain()

    return (
        <div className={container} >
            {list[activeCarId-1].baggage.map((item)=>(
                <div className={card} key={item.title}>
                    <span className=' text-gray-500 ml-2 font-bold text-base'>{item.title}</span>
                    <div className={countBox}>
                        <button 
                            className={button2} 
                            onClick={()=>{
                                    if(item.quantity <= 0 ) return;
                                    setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        >-</button>
                        <div className={count}>{item.quantity}</div>
                        <button
                            className={button} 
                            onClick={()=>{
                                if(item.quantity >= 10) return;
                                setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</button>
                    </div>
                </div>
            ))}
            <div className='absolute -top-5 right-1/2 translate-x-1/2 border-none rounded-full px-2 flex bg-gray-50'>
                <div style={{backgroundImage:`url(${bags})` }} className={' z-10 bg-gray-190  text-blue-500 w-6 bg-center h-8 bg-contain bg-no-repeat '} ></div>
            </div>
            
        </div>
    );
};
export default BagsSelect;

const countBox =' flex items-center'

const count = ' text-3xl px-2'
const button = "   cursor-pointer pb-1  items-center flex duration-300 h-1/2 text-4xl text-green-500 active:text-green-300'"
const button2 = "   cursor-pointer pb-1  items-center flex  duration-300 h-1/2 text-5xl text-red-500 active:text-red-300"

const card = 'relative flex justify-between pr-3 py-2 cursor-pointer border-purple-500 text-sm w-full h-[45px] '
const container = 'relative rounded-xl px-2 flex w-full mb-6 pt-2 divide-y flex-col items-center border border-purple-500'
