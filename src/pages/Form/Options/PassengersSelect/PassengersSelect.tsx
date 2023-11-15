import { useEffect, useState } from 'react';
import { IoPeopleOutline, } from "react-icons/io5";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { useMain } from '../../../../Store/useMain';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";


const PassengersSelect = () => {
    const {list, activeCarId, setPassengers,setCarType} = useMain()
    const [adults, setAdults] = useState(list[activeCarId-1].passengers.adults)
    const [babies, setBabies] = useState(list[activeCarId-1].passengers.babies)
    const [children, setChildren] = useState<{id:number; age:number}[]>(list[activeCarId-1].passengers.kids)


    useEffect(()=>{
        setPassengers({adults, kids:children,babies})
    },[adults,babies,children])

    useEffect(()=>{ 
        if(list[activeCarId-1].carType !== 'VAN (5-7)' && (adults + children.length ) >=4) {
            setAdults((adults >= 4 ? 4: adults))
            setChildren(children.filter(( child, index)=> {
                if(index+1 <= (4 - adults) ) return child;
                return false;
            }))
        }
    },[list[activeCarId-1].carType])

    useEffect(()=>{ 
        if(adults < babies) setBabies(adults) 
        if(!adults) setChildren([])
    },[adults])


    return (
            <ul className={content}>
                <div className={subItem + ' rounded-t border-b-0'}>
                    <label className={label}><IoPeopleOutline className='w-7 h-7'/>
                    <span className='ml-2 text-gray-400'>Adults</span>
                    </label>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{adults}</div>
                            <div className={countBox}>
                                <IoIosArrowUp
                                    className={button+ ' text-green-500 active:text-green-300'}
                                    onClick={()=>{
                                        if((children.length + adults) >=4) setCarType('VAN (5-7)')
                                        if((children.length + adults)  >= 7) return;
                                        setAdults(adults + 1)
                                    }}
                                />
                                <IoIosArrowDown 
                                    className={button+ ' text-red-500 active:text-red-300'} 
                                    onClick={()=>{
                                        if(!adults ) return;
                                        setAdults(adults - 1 )
                                    }}
                                    
                                />
                        </div>
                        
                    </div>
                </div>

                <div className={children.length? subItem + ' rounded-b': subItem+ ' border-b-0'} >
                    <span className={kidsIcon}></span>
                    <span className='ml-2 text-gray-400 mr-auto pt-1'>Kids</span>
                    <div className={bagCount}>
                        <div className={count}>{children.length}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'}
                                onClick={()=>{
                                    if(!adults) return;
                                    if((children.length + adults) >=4) setCarType('VAN (5-7)')
    
                                    if((children.length + adults) >= 7 ) return;
                                    const newKid = {
                                        id: children.length +1,
                                        age: 0
                                    }
                                    setChildren([...children, newKid] )
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(!children.length) return;
                                    children.pop()
                                    setChildren([...children] )
                                }}
                                
                            />
                        </div>
                        
                    </div>
                </div>

                {children.length > 0 && <div className={kidsContainer}>
                    {children.map((item) => (
                    <div className={childrenCard} key={item.id} onClick={(e)=> e.stopPropagation()}>
                        <span >Kid # {item.id}</span>
                        <div className={bagCount}>
                            <div >{item.age} years</div>
                            <div className={countBox}>
                                <IoIosArrowUp
                                    className={button+ ' text-green-500 active:text-green-300'}
                                    onClick={()=>{
                                        if(item.age >= 8) return;
                                            
                                        setChildren(children.map(child =>{
                                            if(child.id === item.id) child.age = child.age + 1;
                                            return child;
                                        }) )
                                    }}
                                />
                                <IoIosArrowDown 
                                    className={button+ ' text-red-500 active:text-red-300'} 
                                    onClick={()=>{
                                        if(item.age <= 0) return setChildren(
                                            children.filter((child)=> child.id!== item.id)
                                        );
                                        
                                        setChildren(children.map(child =>{
                                            if(child.id === item.id) child.age = child.age - 1;
                                            return child;
                                        }) )
                                    }}
                                    
                                />
                            </div>
                        </div>
                    </div>))}
                </div>}
                
                <div className={children.length ? subItem+ ' rounded' : subItem +' rounded-b'}>
                    <span className={label}>
                        <LiaBabyCarriageSolid className='w-7 h-7'/>
                        <span className='ml-2 text-gray-400 mr-auto pt-1'>Babies</span>
                    </span>
                    <div className={bagCount}>
                        <div className={count}>{babies}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'}
                                onClick={()=>{
                                    if(babies >= adults) return;
                                    if(babies >= 1  && list[activeCarId-1].carType !== 'VAN (5-7)') return;
                                    if(babies >= 2) return;
                                    if(babies >= 1 && adults >5) return;
    
                                    setBabies(babies + 1)
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(!babies ) return;
                                    setBabies(babies - 1 )
                                }}
                            />
                        </div>
                        
                    </div>
                </div>

                {((children.length + adults) > 5) && <div className={extraFee}>
                    <span className={fee}>You will have extra fee 5%</span>
                </div>}
            </ul>
    );
};

export default PassengersSelect;

const fee='text-gray-400 italic text-xs'
const extraFee =' flex px-4 py-2  justify-between '

const childrenCard = 'flex border px-3  py-3 border-gray-400 shadow rounded mb-1 items-center justify-between '
const kidsContainer = 'flex flex-col py-2'

const label = 'flex items-center'

const count = ' text-xl px-2'
const countBox =' flex flex-col'
const button = "   cursor-pointer scale-[140%]  duration-300 "

const bagCount ='flex space-x-1 ml-auto items-center'

const kidsIcon ='w-8 h-[28px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[130%]'
const subItem = 'relative flex px-4 py-2 justify-between cursor-pointer border'
const content = 'flex flex-col pb-2 bg-white py-2  relative text-sm w-full '
