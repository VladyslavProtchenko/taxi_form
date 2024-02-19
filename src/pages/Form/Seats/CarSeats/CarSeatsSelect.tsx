import { useMain } from '../../../../Store/useMain';
import babiSeat from './../../../../assets/babySeat.png'
import regularBaby from './../../../../assets/BabiSeat2.png'
import stroller from './../../../../assets/stroller.png'
import baby from './../../../../assets/baby.png'
import booster from './../../../../assets/booster.png'
import umbrella from './../../../../assets/umbrellaStroller.png'
import double from './../../../../assets/doubleStroller.png'
import wheelchair from './../../../../assets/wheelchair.png'


const CarSeatsSelect = () => {
    const {list, activeCarId, setCarSeats} = useMain()

    return (
        <div className={container}>
        
        <div className={part}>

            <div className={card} key={list[activeCarId-1].carSeats[0].title}>
                <div style={{backgroundImage:`url(${regularBaby})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <span className={text}> {list[activeCarId-1].carSeats[0].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button2} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[0].quantity <= 0 ) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                        
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[0].quantity}</div>
                    <button
                        className={button} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[0].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[0].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                        
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[1].title}>
                <div style={{backgroundImage:`url(${baby})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>

                <span className={text}> {list[activeCarId-1].carSeats[1].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button2} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[1].quantity <= 0 ) return
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[1].quantity}</div>
                    <button
                        className={button} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[1].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[1].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[2].title}>
                <div style={{backgroundImage:`url(${booster})` }} className={'w-6 h-6 self-center mr-1 bg-gray-50  bg-center bg-contain bg-no-repeat'} ></div>

                <span className={text}> {list[activeCarId-1].carSeats[2].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button2} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[2].quantity <= 0 ) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                        }}
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[2].quantity}</div>
                    <button
                        className={button} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[2].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[2].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                </div>
            </div>

            <div className='absolute border-none rounded-full -top-3 right-1/2 translate-x-1/2 bg-gray-50 px-1'>
                <div style={{backgroundImage:`url(${babiSeat})` }} className={'  text-xs w-6 bg-center h-5 bg-contain bg-no-repeat'} ></div>
            </div>

        </div>

        <div className={part}>

            <div className={card} key={list[activeCarId-1].carSeats[3].title}>
                <div style={{backgroundImage:`url(${stroller})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <span className={text}> {list[activeCarId-1].carSeats[3].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button2} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[3].quantity <= 0 ) return 
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                        
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[3].quantity}</div>
                    <button
                        className={button} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[3].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[3].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[4].title}>
                <div style={{backgroundImage:`url(${umbrella})` }} className={'w-5 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <span className={text}> {list[activeCarId-1].carSeats[4].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button+ ' text-red-500 active:text-red-300'} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[4].quantity <= 0 ) return ;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[4].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}  
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[4].quantity}</div>
                    <button
                        className={button+ ' text-green-500 active:text-green-300'} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[4].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[4].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[5].title}>
                <div style={{backgroundImage:`url(${double})` }} className={'w-4 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <span className={text}> {list[activeCarId-1].carSeats[5].title}</span>
                
                <div className={bagCount}>
                        <button 
                            className={button+ ' text-red-500 active:text-red-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[5].quantity <= 0 ) return 
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[5].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            
                        >-</button>
                        <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[5].quantity}</div>
                        <button
                            className={button+ ' text-green-500 active:text-green-300'} 
                            onClick={()=>{
                                if(list[activeCarId-1].carSeats[5].quantity >= 10) return;
                                setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[5].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</button>
                        
                </div>
            </div>

            <div className={card} key={list[activeCarId-1].carSeats[6].title}>
                <div style={{backgroundImage:`url(${wheelchair})` }} className={'w-4 h-5 self-center mr-1 bg-white  text-xs bg-center bg-contain bg-no-repeat'} ></div>
                <span className={text}> {list[activeCarId-1].carSeats[6].title}</span>
                
                <div className={bagCount}>
                    <button 
                        className={button2} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[6].quantity <= 0 ) return 
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[6].title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                            }}
                    >-</button>
                    <div className='text-xl text-center px-1'>{list[activeCarId-1].carSeats[6].quantity}</div>
                    <button
                        className={button} 
                        onClick={()=>{
                            if(list[activeCarId-1].carSeats[6].quantity >= 10) return;
                            setCarSeats(list[activeCarId-1].carSeats.map(rem=>list[activeCarId-1].carSeats[6].title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                        }}
                    >+</button>
                    
                </div>
            </div>

            <div className='absolute rounded-full -top-4 right-1/2 translate-x-1/2  border-none bg-gray-50 px-1'>
                <div style={{backgroundImage:`url(${stroller})` }} className={'   z-10   text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
            </div>

        </div>

        </div>
    );
};

export default CarSeatsSelect;


const text = ' text-gray-500 self-center text-base font-bold truncate'

const part = 'relative flex px-2 flex-col w-full mb-4 pt-2 border border-purple-500 rounded-xl divide-y'
const button = "   cursor-pointer pb-1  items-center flex duration-300 h-1/2 text-2xl text-green-500 active:text-green-300'"
const button2 = "   cursor-pointer pb-1  items-center flex  duration-300 h-1/2 text-3xl text-red-500 active:text-red-300"

const bagCount ='flex space-x-1 ml-auto items-center'

const card = 'relative flex  pr-4 py-2 cursor-pointer w-full text-sm max-h-[45px] border-purple-500'
const container = 'flex w-full items-start flex-col'

