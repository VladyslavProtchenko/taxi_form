import { useOptions } from '../../../../Store/useOptions';
import type { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { MdOutlineStroller } from "react-icons/md";
import { MdOutlineAirlineSeatFlatAngled } from "react-icons/md";
const CarSeatsSelect = () => {
    const { options, setCarSeats} = useOptions()

    const items: MenuProps['items'] = [];
    options.carSeats.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setCarSeats(options.carSeats.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })

    return (
        <div className={container}>
            {options.carSeats.filter(item=>item.isActive === true).map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center space-x-2'>
                        {(item.title =='Baby seat')
                        ?<MdOutlineAirlineSeatFlatAngled className='w-6 h-6'/>
                        :(item.title =='Umbrella stroller')
                        ?<MdOutlineStroller className='w-6 h-6'/>
                        :(item.title =='Regular stroller')
                        ?<LiaBabyCarriageSolid className='w-6 h-6'/>
                        :<div className={babiSeatIcon}/>}
                        <span className=' text-gray-400' > {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                if(item.title === options.carSeats[0].title && item.quantity === 0) return;
                                if(item.quantity <= 0 ) return setCarSeats(options.carSeats.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                setCarSeats(options.carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        > - </div>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div  
                        className={qntPlus} 
                            onClick={()=>{
                                if(item.quantity >= 10) return;
                                setCarSeats(options.carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</div>
                    </div>
                    {item.title != options.carSeats[0].title  
                        ? <div className={qntMinus+ ' absolute -right-4'} onClick={()=>{setCarSeats(options.carSeats.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))}}>-</div>
                        : <div className=''></div>
                    }
                </div>
            ))}
            {options.carSeats.filter(item=>item.isActive !== true).length > 0 && <Dropdown menu={{ items }} placement="bottomLeft" className='self-start'>
                <div className={qntPlus+ ' w-4 h-4'}>+</div>
            </Dropdown>}
        </div>
    );
};

export default CarSeatsSelect;

const qntPlus = 'flex h-6 w-6 items-center justify-center cursor-pointer  font-bold bg-green-400 active:bg-green-500 border border-black rounded-full' 
const qntMinus = 'flex h-6 w-6 items-center justify-center cursor-pointer font-bold  bg-red-500 active:bg-red-600 border border-black rounded-full' 

const bagCount ='flex space-x-2 ml-auto'

const babiSeatIcon ='w-4 h-4 mx-1 overflow-hidden bg-contain bg-[url("https://cdn1.iconfinder.com/data/icons/car-engine-dashboard-lights-outline-set-2/91/Car_Engine_-_Dashboard_Lights_73-512.png")] scale-[130%]'

const card = 'relative flex px-4 py-2 cursor-pointer w-full'
const container = 'flex w-full flex-col items-center px-4 pb-2'

