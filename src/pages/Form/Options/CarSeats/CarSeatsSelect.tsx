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
            
        <div className={part+ ' pr-1'}>
            <div className={card + ' rounded-t'} key={list[activeCarId-1].carSeats[0].title}>
                <div className='flex items-center space-x-2'>
                    <MdOutlineAirlineSeatFlatAngled className='w-6 h-6'/>
                    <span className={text}> {list[activeCarId-1].carSeats[0].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[0].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[0].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[0].title === list[activeCarId-1].carSeats[0].title && list[activeCarId-1].carSeats[0].quantity === 0) return;
                                if(list[activeCarId-1].carSeats[0].quantity <= 0 ) return setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, isActive: false} : rem ))
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>

            <div className={card + ' rounded-t'} key={list[activeCarId-1].carSeats[3].title}>
                <div className='flex items-center space-x-2'>
                    <div className={babiSeatIcon}/>
                    <span className={text}> {list[activeCarId-1].carSeats[3].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[3].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[0].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[3].title === list[activeCarId-1].carSeats[3].title && list[activeCarId-1].carSeats[3].quantity === 0) return;
                                if(list[activeCarId-1].carSeats[3].quantity <= 0 ) return setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, isActive: false} : rem ))
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className={part + ' border-l-2 border-gray-600 pl-1'}>
            <div className={card + ' rounded-t'} key={list[activeCarId-1].carSeats[2].title}>
                <div className='flex items-center space-x-2'>
                    <LiaBabyCarriageSolid className='w-6 h-6'/>
                    <span className={text}> {list[activeCarId-1].carSeats[2].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[2].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[2].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[2].title === list[activeCarId-1].carSeats[2].title && list[activeCarId-1].carSeats[2].quantity === 0) return;
                                if(list[activeCarId-1].carSeats[2].quantity <= 0 ) return setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, isActive: false} : rem ))
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>
            <div className={card + ' rounded-t'} key={list[activeCarId-1].carSeats[1].title}>
                <div className='flex items-center space-x-2 '>
                    <MdOutlineStroller className='w-6 h-6'/>
                    <span className={text}> {list[activeCarId-1].carSeats[1].title}</span>
                </div>
                <div className={bagCount}>
                    <div className='text-xl text-center w-7'>{list[activeCarId-1].carSeats[1].quantity}</div>
                    <div className={countBox}>
                        <IoIosArrowUp
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[1].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        />
                        <IoIosArrowDown 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[1].title === list[activeCarId-1].carSeats[1].title && list[activeCarId-1].carSeats[1].quantity === 0) return;
                                if(list[activeCarId-1].carSeats[1].quantity <= 0 ) return setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, isActive: false} : rem ))
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        />
                    </div>
                </div>
            </div>
        </div>

        </div>
    );
};

export default CarSeatsSelect;

const text = ' text-gray-400 min-w-[50px] truncate'

const part = ' flex flex-col w-1/2 '
const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "
const bagCount ='flex space-x-1 ml-auto items-center'
const babiSeatIcon ='w-4 h-4 mx-1 overflow-hidden bg-contain bg-no-repeat bg-[url("https://cdn1.iconfinder.com/data/icons/car-engine-dashboard-lights-outline-set-2/91/Car_Engine_-_Dashboard_Lights_73-512.png")] scale-[130%]'

const card = 'relative flex px-1 pr-4 py-2 cursor-pointer w-full text-sm border max-h-[45px]'
const container = 'flex w-full  items-center py-2  '

