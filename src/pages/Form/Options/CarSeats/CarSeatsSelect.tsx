import type { MenuProps } from 'antd';
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { MdOutlineStroller } from "react-icons/md";
import { MdOutlineAirlineSeatFlatAngled } from "react-icons/md";
import { useMain } from '../../../../Store/useMain';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

const CarSeatsSelect = () => {
    const {list, activeCarId, setCarSeats} = useMain()

    const items: MenuProps['items'] = [];
    list[activeCarId-1].carSeats.filter(item=>!item.isActive).map((item,index) =>{
        items.push({
            key: index,
            label: (<span onClick={()=>setCarSeats(list[activeCarId-1].carSeats.map(bag=>bag.title === item.title ? {...bag, isActive: true} : bag))} >{item.title}</span>),})
    })

    return (
        <div className={container}>
            {list[activeCarId-1].carSeats.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center space-x-2'>
                        {(item.title =='Baby car seat')
                        ?<MdOutlineAirlineSeatFlatAngled className='w-6 h-6'/>
                        :(item.title =='Umbrella stroller')
                        ?<MdOutlineStroller className='w-6 h-6'/>
                        :(item.title =='Regular stroller')
                        ?<LiaBabyCarriageSolid className='w-6 h-6'/>
                        :<div className={babiSeatIcon}/>}
                        <span className=' text-gray-400'> {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 10) return;
                                    setCarSeats(list[activeCarId-1].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.title === list[activeCarId-1].carSeats[0].title && item.quantity === 0) return;
                                    if(item.quantity <= 0 ) return setCarSeats(list[activeCarId-1].carSeats.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                    setCarSeats(list[activeCarId-1].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                    }}
                                
                            />
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default CarSeatsSelect;

const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "
const bagCount ='flex space-x-1 ml-auto items-center'
const babiSeatIcon ='w-4 h-4 mx-1 overflow-hidden bg-contain bg-no-repeat bg-[url("https://cdn1.iconfinder.com/data/icons/car-engine-dashboard-lights-outline-set-2/91/Car_Engine_-_Dashboard_Lights_73-512.png")] scale-[130%]'

const card = 'relative flex px-1 pr-4 py-2 cursor-pointer w-full text-sm border max-h-[45px]'
const container = 'flex w-full flex-col items-center pb-2 pb-2'

