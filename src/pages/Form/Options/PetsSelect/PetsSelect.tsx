import { useState } from 'react';
import AddButton from '../../../../UI/components/AddButton';
import RemoveButton from '../../../../UI/components/RemoveButton';
import useOnclickOutside from "react-cool-onclickoutside";
import { MdPets } from "react-icons/md";
import { useOptions } from '../../../../Store/useOptions';


const PetsSelect = () => {
    const ref = useOnclickOutside(() => setIsOpen(false));
    const [isOpen, setIsOpen] = useState(false)
    const {options, setPets} = useOptions()

    return (
        <div className={container} ref={ref}>
            <div className={petsItemMain} >
                <div ><MdPets/></div>
                <div>Pets</div>
                <AddButton onClick={()=>setIsOpen(!isOpen)}/>
            </div>

            {options.pets.filter(item=>item.isActive === true).map(item=>(
                <div className={petsItem} onClick={()=>setIsOpen(false)} key={item.title}>
                    <div className='w-2/5'>{item.title}</div>

                    <div className={bagCount}>
                        (cage) 
                        <input type="checkbox" 
                            className='ml-1'
                            checked={item.cage} 
                            onChange={()=>{
                                setPets(options.pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                            }}/>
                    </div>
                    
                    {options.pets[0].title !== item.title
                        ?<RemoveButton 
                            style='opacity-0 group-hover:opacity-100'
                            onClick={()=>{
                            setPets(options.pets.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                        }}/>
                        :<div className="w-4"></div>
                    }
                </div>
            ))}
            
                
            {isOpen 
                && (options.pets.filter(item=>item.isActive===false).length >0) 
                && 
            <ul className={submenu} >
                <div className='text-sm px-4 py-2'>select your pets</div>
                {options.pets.filter(item=>!item.isActive).map(bag=>(
                    <div 
                        className={subItem} 
                        key={bag.title}
                        onClick={()=>{
                            setPets(options.pets.map(item=>item.title === bag.title ? {...item, isActive: true} : item))
                        }}
                    >
                    <label className={label}>
                        <div className={addItem}
                            >+</div>
                        <span>{bag.title}</span>
                    </label>
                </div>
                ))}

            </ul>}
        </div>
    );
};

export default PetsSelect;

const addItem ='opacity-0 group-hover:opacity-100 text-green-400 group-hover:text-green-300 group-active:text-green-200 text-2xl font-bold cursor-pointer '
const bagCount ='flex space-x-2 text-gray-500 text-xs'
const subItem = 'flex px-2 py-2 hover:bg-yellow-100 justify-between group'
const label = 'flex  items-center w-full space-x-4 cursor-pointer group'

const petsItemMain = 'flex items-center w-full px-2 py-1 group justify-between py-2 bg-yellow-100'
const petsItem = 'flex items-center justify-between w-full px-2 py-1 hover:bg-yellow-200 group'

const submenu = 'flex flex-col shadow absolute top-0 border border-black right-1/2  bg-white z-10 w-[200px] sm:top-[100%] sm:w-full sm:left-0'
const container = 'flex flex-col items-center  relative  cursor-pointer text-sm w-full'



