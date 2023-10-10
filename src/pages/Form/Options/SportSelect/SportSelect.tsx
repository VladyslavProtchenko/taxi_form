import { useState } from 'react';
import AddButton from '../../../../UI/components/AddButton';
import RemoveButton from '../../../../UI/components/RemoveButton';
import useOnclickOutside from "react-cool-onclickoutside";
import { GiDutchBike } from "react-icons/gi";
import { useOptions } from '../../../../Store/useOptions';


const SportsSelect = () => {
    const ref = useOnclickOutside(() => setIsOpen(false));

    const [isOpen, setIsOpen] = useState(false)
    const {options, setSport} = useOptions()

    return (
        <div className={container} ref={ref}>
            <div className={sportItemMain} >
                
                <div ><GiDutchBike /></div>
                <div>Sport</div>
                <AddButton onClick={()=>setIsOpen(!isOpen)}/>
            </div>

            {options.sport.filter(item=>item.isActive === true).map(item=>(
                <div className={sportItem} onClick={()=>setIsOpen(false)} key={item.title}>
                    <div className='w-2/5'>{item.title}</div>

                    <div className={sportCount}>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                if(item.title === options.sport[0].title && item.quantity <= 0) return;
                                if(item.quantity <= 0) return setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                    setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                        > - </div>
                        <div >{item.quantity}</div>
                        <div  
                        className={qnt} 
                            onClick={()=>{
                                if(item.quantity >= 10) return;
                                setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                            }}
                        >+</div>
                    </div>
                    
                    {item.title !== options.sport[0].title 
                        ? <RemoveButton 
                            style='opacity-0 group-hover:opacity-100'
                            onClick={()=>{
                            setSport(options.sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                        }}/>
                        : <div className="w-4"></div>
                    }
                </div>
            ))}
            
                
            {isOpen 
                && (options.sport.filter(item=>item.isActive===false).length >0) 
                && 
            <ul className={submenu} >
                <div className='text-sm px-4 py-2'>select your sport</div>
                {options.sport.filter(item=>!item.isActive).map(type=>(
                    <div 
                        onClick={()=>{
                            setSport(options.sport.map(item=>item.title === type.title ? {...item, isActive: true} : item))
                        }}
                        className={subItem} 
                        key={type.title}
                    >
                    <label className={label}>
                        <div
                            className={addItem}
                            >+</div>
                        <span>{type.title}</span>
                    </label>
                </div>
                ))}

            </ul>}
        </div>
    );
};

export default SportsSelect;

const addItem ='opacity-0 group-hover:opacity-100 text-green-400 group-hover:text-green-300 group-active:text-green-200 text-2xl font-bold cursor-pointer '
const qnt = 'cursor-pointer w-4 text-center'
const sportCount ='flex space-x-2'
const subItem = 'flex px-2 py-2 hover:bg-yellow-100 justify-between group'
const label = 'flex  items-center w-full space-x-4 cursor-pointer group'

const sportItemMain = 'flex items-center w-full px-2 py-1 group justify-between py-2 bg-yellow-100'
const sportItem = 'flex items-center justify-between w-full px-2 py-1 hover:bg-yellow-200 group'


const submenu = 'flex flex-col shadow absolute  border border-black right-1/2 bg-white z-10 w-[200px] left-0 sm:left-0 sm:top-[100%] sm:w-full sm:left-0'
const container = 'flex flex-col items-center  relative  cursor-pointer text-sm w-full'