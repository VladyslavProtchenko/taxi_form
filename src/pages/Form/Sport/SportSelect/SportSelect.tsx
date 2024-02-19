import { useMain } from '../../../../Store/useMain';
import React from 'react';
import surfer from './../../../../assets/surfing.png'
import golfer from './../../../../assets/golf.png'
import ski from './../../../../assets/ski.png'
import bike from './../../../../assets/bike.png'

const SportsSelect = ():React.ReactNode => {
    const {list, activeCarId, setSport} = useMain()

    return (
        <div className={container}>

            {list[activeCarId-1].sport.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center space-x-2'>
                        {(item.title =='Bikes')
                        ?<div style={{backgroundImage:`url(${bike})` }} className={' bg-gray-50   text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :(item.title =='Skis')
                        ?<div style={{backgroundImage:`url(${ski})` }} className={' bg-gray-50   text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :(item.title =='Surf')
                        ?<div style={{backgroundImage:`url(${surfer})` }} className={' bg-gray-50  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :<div style={{backgroundImage:`url(${golfer})` }} className={'    bg-gray-50  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>}
                        <span className={title}> {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <button 
                            className={button2} 
                            onClick={()=>{
                                if(item.title === list[activeCarId-1].sport[0].title && item.quantity <= 0) return;
                                if(item.quantity <= 0 ) return setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                    setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                        >-</button>
                        <div className={count}>{item.quantity}</div>
                        <button
                            className={button} 
                            onClick={()=>{
                                if(item.quantity >= 4) return;
                                setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</button>
                        
                    </div>

                </div>
            ))}
            <div className='absolute border-none -top-2 right-1/2 translate-x-1/2 bg-gray-50 px-1 text-purple-500'>Sport</div>

        </div>
    );
};

export default SportsSelect;

const title = ' text-gray-500 text-base font-bold'
const count = ' text-3xl px-2'
const button = "   cursor-pointer pb-1  items-center flex duration-300 h-1/2 text-4xl text-green-500 active:text-green-300'"
const button2 = "   cursor-pointer pb-1  items-center flex  duration-300 h-1/2 text-5xl text-red-500 active:text-red-300"

const bagCount ='flex space-x-1 ml-auto items-center'
const card = 'relative flex pr-4  text-sm cursor-pointer w-full h-[45px] border-purple-500'
const container = 'relative flex px-2 w-full flex-col items-center pt-2 divide-y border border-purple-500 rounded-xl'