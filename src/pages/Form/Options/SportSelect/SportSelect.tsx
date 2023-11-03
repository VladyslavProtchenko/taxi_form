import { useOptions } from '../../../../Store/useOptions';
import type { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import { MdOutlineDirectionsBike } from "react-icons/md";
import { LiaSkiingSolid } from "react-icons/lia";
import { MdSurfing } from "react-icons/md";
import { IoGolfOutline } from "react-icons/io5";


const SportsSelect = () => {
    const {options, setSport} = useOptions()


    const items: MenuProps['items'] = [];
    options.sport.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setSport(options.sport.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })

    return (
        <div className={container}>
            {options.sport.filter(item=>item.isActive === true).map((item)=>(
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
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                if(item.title === options.sport[0].title && item.quantity <= 0) return;
                                if(item.quantity <= 0 ) return setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        > - </div>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div  
                        className={qntPlus} 
                            onClick={()=>{
                                if(item.quantity >= 4) return;
                                setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</div>
                    </div>

                </div>
            ))}
            {options.sport.filter(item=>item.isActive !== true).length > 0 && <Dropdown  overlayStyle={{minWidth: 150}} menu={{ items }} placement="bottomLeft" className='self-start'>
                <div className={qntPlus+  'mt-2 ml-4 w-4 h-4'}>+</div>
            </Dropdown>}
        </div>
    );
};

export default SportsSelect;


const qntPlus = " w-5 h-5 flex justify-center items-center bg-green-400 active:bg-green-500 rounded-full border border-black cursor-pointer font-bold text-black  duration-300 "
const qntMinus = " w-5 h-5 flex justify-center items-center bg-red-500 active:bg-red-600  rounded-full border border-black cursor-pointer font-bold text-black duration-300 "

const bagCount ='flex space-x-2 ml-auto items-center'

const card = 'relative flex px-4 py-2 cursor-pointer w-full border'
const container = 'flex w-full flex-col items-center p-2 pb-2 xl:pr-0 2xl:pl-0'