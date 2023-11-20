import { PiDog } from "react-icons/pi";
import { LuCat } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { IPet, useMain } from '../../../../Store/useMain';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


const PetsSelect = () => {
    const {list, activeCarId, setPets} = useMain()
    const [pet,setPet] = useState(list[activeCarId-1].pets[3].title)


    function setOther(item:IPet, e:any){
        setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, title: e.target.value} : rem ))
    }

    return (
        <div className={container}>

        {list[activeCarId-1].pets.map((item)=>(
            <div className={card} key={item.title}>
                <div className='flex items-center space-x-2'>
                    {(item.title =='Dog')
                    ?<PiDog className='w-6 h-6'/>
                    :(item.title =='Cat')
                    ?<LuCat className='w-6 h-6'/>
                    :(item.title =='Rabbit')
                    ?<span className={rabbitIcon}></span>
                    :<MdPets className='w-6 h-6'/>}
                    
                </div>
                
                <div className='flex flex-col ml-1 w-full'>
                    {item.isOther 
                        ? <input 
                                className=' text-gray-400 w-full  border outline-none' 
                                value={pet} 
                                onChange={(e)=>setPet(e.target.value)}
                                onBlur={(e)=>setOther(item,e.target.value)}
                            />
                        :<span className=' text-gray-400' > {item.title}</span>}
                        <div className='flex items-center'>
                            <input type="checkbox" 
                                className=' -translate-y-[1px] mr-2 mt-1 ml-1'
                                checked={item.cage} 
                                onChange={()=>{
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                                }}
                            />
                            <span className='text-xs'>(cage)</span>
                        </div>
                </div>
                <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 4) return;
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.title === list[activeCarId-1].sport[0].title && item.quantity <= 0) return;
                                    if(item.quantity <= 0 ) return setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            />
                        </div>
                    </div>
                
            </div>
        ))}
        <div className='absolute border-none -top-3 left-2 z-10 bg-white px-1 text-xs text-blue-500'>Pets</div>

    </div>
    );
};


export default PetsSelect;

const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%] duration-300 "

const rabbitIcon ='w-5 h-5 overflow-hidden bg-contain bg-[url("https://i.pinimg.com/originals/2b/21/54/2b2154655f0eedb3dd372c1301c5552f.png")] scale-[130%]'
const bagCount ='flex  items-center'
const card = 'relative px-1 flex border-blue-500 cursor-pointer text-sm w-full  h-[45px] '
const container = 'relative px-1 flex w-1/2 flex-col divide-y items-center space-y-1 pt-2  border rounded border-blue-500 h-min'

