import { useOptions } from '../../../../Store/useOptions';
import type { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import { PiSuitcaseRolling,PiBackpackLight,PiHandbag } from "react-icons/pi";

const BagsSelect = () => {
    const {options, setBaggage} = useOptions()

    const items: MenuProps['items'] = [];
    options.baggage.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setBaggage(options.baggage.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })
    

    return (
        <div className={container} >
            {options.baggage.filter(item=>item.isActive === true).map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center'>
                        {(item.title =='32 kg' || item.title == '23 kg')
                        ?<PiSuitcaseRolling className='w-6 h-6'/>
                        :(item.title =='middle' || item.title == '10 kg')
                        ?<PiBackpackLight className='w-6 h-6'/>
                        :<PiHandbag className='w-6 h-6'/>}
                        <span className=' text-gray-400' > {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                if(item.title === options.baggage[0].title && item.quantity <= 0) return;
                                if(item.quantity <= 0 ) return setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        > - </div>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div  
                        className={qntPlus} 
                            onClick={()=>{
                                if(item.quantity >= 10) return;
                                setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</div>
                    </div>
                    {item.title != options.baggage[1].title  
                        ? <div className={qntMinus+ ' absolute -right-4'} onClick={()=>{setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))}}>-</div>
                        : <div className=''></div>
                    }
                </div>
            ))}
            
            {options.baggage.filter(item=>item.isActive !== true).length > 0 && <Dropdown menu={{ items }} placement="bottomLeft" className='self-start'>
                <div className={qntPlus+ ' w-4 h-4'}>+</div>
            </Dropdown>}
        </div>
    );
};

export default BagsSelect;



const qntPlus = 'flex h-6 w-6 items-center justify-center cursor-pointer  font-bold bg-green-400 active:bg-green-500 border border-black rounded-full' 
const qntMinus = 'flex h-6 w-6 items-center justify-center cursor-pointer font-bold  bg-red-500 active:bg-red-600 border border-black rounded-full' 

const bagCount ='flex space-x-2 ml-auto'

const card = 'relative flex px-4 py-2 cursor-pointer w-full'
const container = 'flex w-full flex-col items-center px-4 pb-2 '
