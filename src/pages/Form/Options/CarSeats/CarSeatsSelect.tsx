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

                </div>
            ))}
            {options.carSeats.filter(item=>item.isActive !== true).length > 0 && <Dropdown menu={{ items }} placement="bottomLeft" className='self-start'>
                <div className={qntPlus+ ' mt-2 ml-4 w-4 h-4'}>+</div>
            </Dropdown>}
        </div>
    );
};

export default CarSeatsSelect;

const qntPlus = " w-5 h-5 flex justify-center items-center bg-green-400 active:bg-green-500 rounded-full border border-black cursor-pointer font-bold text-black  duration-300 "
const qntMinus = " w-5 h-5 flex justify-center items-center bg-red-500 active:bg-red-600  rounded-full border border-black cursor-pointer font-bold text-black duration-300 "

const bagCount ='flex space-x-2 ml-auto items-center'

const babiSeatIcon ='w-4 h-4 mx-1 overflow-hidden bg-contain bg-[url("https://cdn1.iconfinder.com/data/icons/car-engine-dashboard-lights-outline-set-2/91/Car_Engine_-_Dashboard_Lights_73-512.png")] scale-[130%]'

const card = 'relative flex px-4 py-2 cursor-pointer w-full border'
const container = 'flex w-full flex-col items-center p-2 pb-2 2xl:pr-0 xl:pl-0'

