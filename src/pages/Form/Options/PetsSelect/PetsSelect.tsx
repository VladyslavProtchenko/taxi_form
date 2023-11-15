import type { MenuProps } from 'antd';
import { PiDog } from "react-icons/pi";
import { LuCat } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { IPet, useMain } from '../../../../Store/useMain';
import { useState } from 'react';


const PetsSelect = () => {
    const {list, activeCarId, setPets} = useMain()
    const [pet,setPet] = useState(list[activeCarId-1].pets[3].title)

    const items: MenuProps['items'] = [];
    list[activeCarId-1].pets.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setPets(list[activeCarId-1].pets.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })
    function setOther(item:IPet, e:any){
        setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, title: e.target.value} : rem ))
    }

    return (
        <div className={container}>

        {list[activeCarId-1].pets.map((item,index)=>(
            <div className={ index===0?  card + ' rounded-t':index===3?  card + ' rounded-b': card} key={item.title}>
                <div className='flex items-center space-x-2'>
                    {(item.title =='Dog')
                    ?<PiDog className='w-6 h-6'/>
                    :(item.title =='Cat')
                    ?<LuCat className='w-6 h-6'/>
                    :(item.title =='Rabbit')
                    ?<span className={rabbitIcon}></span>
                    :<MdPets className='w-6 h-6'/>}
                    
                </div>
                
                <div className='flex items-center justify-between ml-2 w-full'>
                    {item.isOther 
                        ? <input 
                                className=' text-gray-400 w-1/2  border outline-none' 
                                value={pet} 
                                onChange={(e)=>setPet(e.target.value)}
                                onBlur={(e)=>setOther(item,e.target.value)}
                            />
                        :<span className=' text-gray-400' > {item.title}</span>}
                    <div className={item.isOther ? bagCount+ ' ml-0': bagCount}>
                        <input type="checkbox" 
                            className='ml-1 -translate-y-[2px]'
                            checked={item.cage} 
                            onChange={()=>{
                                setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                            }}
                        />
                        <span className='text-xs'>(cage)</span>
                    </div>
                </div>
                

            </div>
        ))}
    </div>
    );
};


export default PetsSelect;


const rabbitIcon ='w-5 h-5 overflow-hidden bg-contain bg-[url("https://i.pinimg.com/originals/2b/21/54/2b2154655f0eedb3dd372c1301c5552f.png")] scale-[130%]'
const bagCount ='flex space-x-2 ml-auto items-end'
const card = 'relative flex px-2 py-2 cursor-pointer text-sm w-full border h-[45px] '
const container = 'flex w-1/2 flex-col items-center py-2 pb-2 border-l-2 pl-1 border-gray-500 '

