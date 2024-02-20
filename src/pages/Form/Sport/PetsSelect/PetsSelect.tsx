import { IPet, useMain } from '../../../../Store/useMain';
import {  useState } from 'react';
import rabbit from './../../../../assets/rabbit2.png'
import cat from './../../../../assets/cat.png'
import mira from './../../../../assets/serviceDog3.png'
import dog from './../../../../assets/dog.png'
import other from './../../../../assets/pet2.png'

const PetsSelect = () => {
    const {list, activeCarId, setPets} = useMain()
    const [pet,setPet] = useState(list[activeCarId-1].pets[4].title)

    function setOther(item:IPet, e:string){
        setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, title: e} : rem ))
    }

    return (
        <div className={container}>

        {list[activeCarId-1].pets.map((item, index)=>(
            <div className={card} key={item.title}>
                <div className='flex  items-center space-x-2'>
                    {(item.title =='Dog')
                    ?<div style={{backgroundImage:`url(${dog})` }} className={' z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Cat')
                    ?<div style={{backgroundImage:`url(${cat})` }} className={' z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Rabbit')
                    ?<div style={{backgroundImage:`url(${rabbit})` }} className={' z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Service dog (Mira)')
                    ? <div style={{backgroundImage:`url(${mira})` }} className={' z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :<div style={{backgroundImage:`url(${other})` }} className={' z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    }
                    
                </div>
                
                <div className='flex ml-1 w-full items-center'>
                    {item.isOther 
                        ? <input 
                                className=' text-gray-400 w-full  border outline-none' 
                                value={pet} 
                                onChange={(e)=>setPet(e.target.value)}
                                onBlur={(e)=>setOther(item, e.target.value)}
                            />
                        :<span className={title} > {item.title}</span>}
                        {index !==3 && <div className='flex items-center'>
                            <input type="checkbox" 
                                className=' -translate-y-[1px] mr-2 mt-1 ml-1'
                                checked={item.cage} 
                                onChange={()=>{
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                                }}
                            />
                            <span className='text-xs'>(cage)</span>
                        </div>}
                </div>
                <div className={bagCount}>
                        <button 
                            className={button2} 
                            onClick={()=>{
                                if(item.quantity === 0) return;
                                setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                        >-</button>
                        <div className={count}>{item.quantity}</div>
                        <button
                            className={button} 
                            onClick={()=>{
                                if(item.quantity >= 4) return;
                                setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</button>
                    </div>
                
            </div>
        ))}
            <div className='absolute border-none -top-2 right-1/2 translate-x-1/2 bg-gray-50 px-1 text-purple-500'>Pets</div>

    </div>
    );
};


export default PetsSelect;

const title = ' text-gray-500 text-base font-bold'
const count = ' text-3xl px-2'
const button = "   cursor-pointer pb-1  items-center flex duration-300 h-1/2 text-4xl text-green-500 active:text-green-300'"
const button2 = "   cursor-pointer pb-1  items-center flex  duration-300 h-1/2 text-5xl text-red-500 active:text-red-300"

const bagCount ='flex  items-center'
const card = 'relative flex  border-purple-500 cursor-pointer text-sm w-full  h-[45px] '
const container = 'relative px-2 pr-6 flex w-full mb-10 flex-col divide-y items-center  pt-2  border rounded-xl border-purple-500 '

