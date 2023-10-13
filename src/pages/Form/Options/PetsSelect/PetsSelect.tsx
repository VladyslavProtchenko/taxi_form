import { useOptions } from '../../../../Store/useOptions';
import type { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import { PiDog } from "react-icons/pi";
import { LuCat } from "react-icons/lu";
import { MdPets } from "react-icons/md";


const PetsSelect = () => {
    const {options, setPets} = useOptions()

    const items: MenuProps['items'] = [];
    options.pets.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setPets(options.pets.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })

    return (
        <div className={container}>
        <div className='flex justify-center w-full border-t'>
            <span className='bg-white -translate-y-1/2 px-2 text-gray-400'>pets </span>
        </div>
        {options.pets.filter(item=>item.isActive === true).map((item)=>(
            <div className={card} key={item.title}>
                <div className='flex items-center space-x-2'>
                    {(item.title =='Dog')
                    ?<PiDog className='w-6 h-6'/>
                    :(item.title =='Cat')
                    ?<LuCat className='w-6 h-6'/>
                    :(item.title =='Rabbit')
                    ?<span className={rabbitIcon}></span>
                    :<MdPets className='w-6 h-6'/>}
                    <span className=' text-gray-400' > {item.title}</span>
                </div>
                <div className={bagCount}>
                        (cage) 
                    <input type="checkbox" 
                        className='ml-1'
                        checked={item.cage} 
                        onChange={()=>{
                            setPets(options.pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                        }}
                    />
                </div>
                {item.title != options.pets[0].title  
                    ? <div className={qntMinus+ ' absolute -right-4'} onClick={()=>{setPets(options.pets.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))}}>-</div>
                    : <div className=''></div>
                }
            </div>
        ))}
        {options.pets.filter(item=>item.isActive !== true).length > 0 && <Dropdown menu={{ items }} placement="bottomLeft" className='self-start'>
            <div className={qntPlus+ ' w-4 h-4'}>+</div>
        </Dropdown>}
    </div>
    );
};


export default PetsSelect;


const rabbitIcon ='w-5 h-5 overflow-hidden bg-contain bg-[url("https://i.pinimg.com/originals/2b/21/54/2b2154655f0eedb3dd372c1301c5552f.png")] scale-[130%]'

const qntPlus = 'flex h-6 w-6 items-center justify-center cursor-pointer  font-bold bg-green-400 active:bg-green-500 border border-black rounded-full' 
const qntMinus = 'flex h-6 w-6 items-center justify-center cursor-pointer font-bold  bg-red-500 active:bg-red-600 border border-black rounded-full' 
const bagCount ='flex space-x-2 ml-auto'
const card = 'relative flex px-4 py-2 cursor-pointer w-full'

const container = 'flex w-full flex-col items-center px-4 pb-2 '

