import type { MenuProps } from 'antd';
import { MdOutlineDirectionsBike } from "react-icons/md";
import { LiaSkiingSolid } from "react-icons/lia";
import { MdSurfing } from "react-icons/md";
import { IoGolfOutline } from "react-icons/io5";
import { useMain } from '../../../../Store/useMain';
import React from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";


const SportsSelect = ():React.ReactNode => {
    const {list, activeCarId, setSport} = useMain()


    const items: MenuProps['items'] = [];
    list[activeCarId-1].sport.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setSport(list[activeCarId-1].sport.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })

    return (
        <div className={container}>
            {list[activeCarId-1].sport.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center space-x-2'>
                        {(item.title =='Bikes')
                        ?<MdOutlineDirectionsBike className='w-6 h-6'/>
                        :(item.title =='Skis')
                        ?<LiaSkiingSolid className='w-6 h-6'/>
                        :(item.title =='Surf')
                        ?<MdSurfing className='w-6 h-6'/>
                        :<IoGolfOutline className='w-6 h-6'/>}
                        <span className=' text-gray-400' > {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>

                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 4) return;
                                    setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.title === list[activeCarId-1].sport[0].title && item.quantity <= 0) return;
                                    if(item.quantity <= 0 ) return setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                        setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            />
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default SportsSelect;


const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%] duration-300 "

const bagCount ='flex space-x-1 ml-auto items-center'

const card = 'relative flex px-2 pr-4 py-2 text-sm cursor-pointer w-full border h-[45px] '
const container = 'flex w-1/2 flex-col items-center py-2 pb-2 xl:pr-0 2xl:pl-0 '