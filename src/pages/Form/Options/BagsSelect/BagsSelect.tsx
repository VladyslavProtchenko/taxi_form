import type { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import { PiSuitcaseRolling,PiBackpackLight,PiHandbag } from "react-icons/pi";
import { useMain } from '../../../../Store/useMain';
import React from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";


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
            {list[activeCarId-1].baggage.filter(item=>item.isActive === true).map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center'>
                        {(item.title =='32 kg' || item.title == '23 kg')
                        ?<PiSuitcaseRolling className='w-6 h-6'/>
                        :(item.title =='middle' || item.title == '10 kg')
                        ?<PiBackpackLight className='w-6 h-6'/>
                        :<PiHandbag className='w-6 h-6'/>}
                        <span className=' text-gray-400'>{item.title}</span>
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
            
            {list[activeCarId-1].baggage.filter(item=>item.isActive !== true).length > 0 && <Dropdown overlayStyle={{minWidth: 150}} menu={{ items }} placement="bottomLeft" className='self-start'>
                <div className={qntPlus+ ' mt-2 ml-4 w-4 h-4'}>+</div>
            </Dropdown>}
        </div>
    );
};

export default BagsSelect;

const countBox =' flex flex-col'
const qntPlus = " w-5 h-5 flex justify-center items-center bg-green-400 active:bg-green-500  border rounded-full  border-black cursor-pointer font-bold text-black  duration-300 "
const button = "   cursor-pointer scale-[140%]  duration-300 "

const bagCount ='flex space-x-1 ml-auto items-center'

const card = 'relative flex px-1 pr-2 py-2 cursor-pointer w-full border'
const container = 'flex w-1/2 flex-col items-center py-2 pb-2 '
