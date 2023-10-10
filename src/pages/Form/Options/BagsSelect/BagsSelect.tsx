import { useState } from 'react';
import useOnclickOutside from "react-cool-onclickoutside";
import { FaSuitcaseRolling } from "react-icons/fa";
import { useOptions } from '../../../../Store/useOptions';
import AddButton from '../../../../UI/components/AddButton';
import RemoveButton from '../../../../UI/components/RemoveButton';

const BagsSelect = () => {
    const ref = useOnclickOutside(() => setIsOpen(false));
    const [isOpen, setIsOpen] = useState(false)
    const {options, setBaggage} = useOptions()

    return (
        <div className={container} ref={ref}>
            <div className={baggageItemMain} >
                <div className=""><FaSuitcaseRolling/></div>
                <span>Baggage</span>
                <AddButton onClick={()=>setIsOpen(!isOpen)}/>
            </div>

            {options.baggage.filter(item=>item.isActive === true).map(item=>(
                <div className={baggageItem} onClick={()=>setIsOpen(false)} key={item.title}>
                    <div className='w-2/5'>{item.title}</div>

                    <div className={bagCount}>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                if(item.title === options.baggage[1].title && item.quantity <= 0) return;
                                if(item.quantity <= 0 ) return setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        > - </div>
                        <div >{item.quantity}</div>
                        <div  
                        className={qnt} 
                            onClick={()=>{
                                if(item.quantity >= 10) return;
                                setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</div>
                    </div>
                    
                    {item.title != options.baggage[1].title  
                        ? <RemoveButton 
                            style='opacity-0 group-hover:opacity-100'
                            onClick={()=>{
                            
                            setBaggage(options.baggage.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                        }}/>
                        : <div className='w-4'></div>
                    }
                </div>
            ))}
            
                
            {isOpen 
                && (options.baggage.filter(item=>item.isActive===false).length >0) 
                && 
            <ul className={submenu} >
                <div className='text-sm px-4 py-2'>select your baggage</div>
                {options.baggage.filter(item=>!item.isActive).map(bag=>(
                    <div 
                        className={subItem} 
                        key={bag.title}
                        onClick={()=>{
                            setBaggage(options.baggage.map(item=>item.title === bag.title ? {...item, isActive: true} : item))
                        }}
                    >
                    <label className={label}>
                        <div
                            className={addItem}
                            >+</div>
                        <div>{bag.title}</div>
                    </label>
                </div>
                ))}

            </ul>}
        </div>
    );
};

export default BagsSelect;

const addItem ='opacity-0 group-hover:opacity-100 text-green-400 group-hover:text-green-300 group-active:text-green-200 text-2xl font-bold cursor-pointer '
const qnt = 'cursor-pointer w-4 text-center'
const bagCount ='flex space-x-2'
const subItem = 'flex px-2 py-2 hover:bg-yellow-100 justify-between group cursor-pointer '
const label = 'flex  items-center w-full space-x-4 cursor-pointer group'
const submenu = 'flex flex-col shadow absolute top-0 left-full border border-black bg-white z-10 w-[200px] sm:top-[100%] sm:w-full sm:left-0'

const baggageItemMain = 'flex items-center w-full px-2 py-1 group justify-between py-2 bg-yellow-100'
const baggageItem = 'flex items-center justify-between w-full px-2 py-1 hover:bg-yellow-200 group'
const container = 'flex flex-col items-center  relative cursor-pointer text-sm w-full'
