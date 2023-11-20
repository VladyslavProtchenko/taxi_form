import type { MenuProps } from 'antd';
// import { PiSuitcaseRolling,PiBackpackLight,PiHandbag } from "react-icons/pi";
import { useMain } from '../../../../Store/useMain';
import React from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import bags from '../../../../assets/bags.png'

const BagsSelect = ():React.ReactNode => {
    const {list, activeCarId, setBaggage} = useMain()


    const items: MenuProps['items'] = [];
    list[activeCarId-1].baggage.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setBaggage(list[activeCarId-1].baggage.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })
    
    return (
        <div className={container} >
            {list[activeCarId-1].baggage.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center'>
                        {/* {(item.title =='32 kg' || item.title == '23 kg')
                        ?<PiSuitcaseRolling className='w-6 h-6'/>
                        :(item.title =='Between' || item.title == '10 kg')
                        ?<PiBackpackLight className='w-6 h-6'/>
                        :<PiHandbag className='w-6 h-6'/>} */}
                        <span className=' text-gray-400 ml-2'>{item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 10) return;
                                    setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.title === list[activeCarId-1].baggage[1].title && item.quantity <= 0) return;
                                    if(item.quantity <= 0 ) return setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                    setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                    }}
                                
                            />
                        </div>
                        
                    </div>
                </div>
            ))}
            <div style={{backgroundImage:`url(${bags})` }} className={'absolute border-none -top-5 left-2 z-10 bg-white px-1 text-xs text-blue-500 w-7 h-7 bg-contain bg-no-repeat'} >
                
            </div>
            
        </div>
    );
};
export default BagsSelect;

const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "
const bagCount ='flex space-x-1 ml-auto items-center'
const card = 'relative flex px-1 pr-4 py-2 cursor-pointer border-blue-500 text-sm w-full h-[45px] '
const container = 'relative rounded px-1 flex w-1/2 pt-2 divide-y flex-col space-y-1 items-center border border-blue-500'
