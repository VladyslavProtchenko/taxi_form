import { useEffect, useState } from 'react';
import { IoPeopleOutline, } from "react-icons/io5";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { useOptions } from '../../../../Store/useOptions';


const PassengersSelect = () => {
    const {options, setPassengers, setCarType} = useOptions()
    const [adults, setAdults] = useState(options.passengers.adults)
    const [babies, setBabies] = useState(options.passengers.babies)
    const [children, setChildren] = useState<{id:number; age:number}[]>(options.passengers.kids)

    useEffect(()=>{
        setPassengers({adults, kids:children,babies})
    },[adults,babies,children])

    useEffect(()=>{ 
        if(options.carType !== 'VAN (5-7)' && (adults + children.length ) >=4) {
            setAdults((adults >= 4 ? 4: adults))
            setChildren(children.filter(( child, index)=> {
                if(index+1 <= (4 - adults) ) return child;
                return false;
            }))
        }
    },[options.carType])

    useEffect(()=>{ 
        if(adults < babies) setBabies(adults) 
        if(!adults) setChildren([])
    },[adults])


    return (
            <ul className={content}>
                <div className={subItem}>
                    <label className={label}><IoPeopleOutline className='w-7 h-7'/>
                    <span className='ml-2 text-gray-400'>Adults</span>
                    </label>
                    <div className={bagCount}>
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                    if(!adults ) return;
                                    setAdults(adults - 1 )
                                }}
                        > - </div>
                        <div className={count}>{adults}</div>
                        <div 
                            className={qntPlus} 
                            onClick={()=>{
                                if((children.length + adults) >=4) setCarType('VAN (5-7)')
                                if((children.length + adults)  >= 7) return;
                                setAdults(adults + 1)
                            }}
                        >+</div>
                    </div>
                </div>

                <div className={subItem} >
                    <span className={kidsIcon}></span>
                    <span className='ml-2 text-gray-400 mr-auto pt-1'>Kids</span>
                    <div className={bagCount}>
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                    if(!children.length) return;
                                    children.pop()
                                    setChildren([...children] )
                                }}
                        > - </div>
                        <div className={count}>{children.length}</div>
                        <div 
                            className={qntPlus} 
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
                        >+</div>
                    </div>
                </div>

                {children.length > 0 && <div className={kidsContainer}>
                    {children.map((item) => (
                    <div className={childrenCard} key={item.id} onClick={(e)=> e.stopPropagation()}>
                        <span >Kid # {item.id}</span>
                        <div className={bagCount}>
                            <div 
                                className={qntKids} 
                                onClick={()=>{
                                        if(item.age <= 0) return setChildren(
                                            children.filter((child)=> child.id!== item.id)
                                        );
                                        
                                        setChildren(children.map(child =>{
                                            if(child.id === item.id) child.age = child.age - 1;
                                            return child;
                                        }) )
                                    }}
                            > - </div>
                            <div >{item.age} years</div>
                            <div 
                                className={qntKids} 
                                onClick={()=>{
                                    if(item.age >= 8) return;
                                        
                                    setChildren(children.map(child =>{
                                        if(child.id === item.id) child.age = child.age + 1;
                                        return child;
                                    }) )
                                }}
                            >+</div>
                        </div>
                    </div>))}
                </div>}
                
                <div className={subItem}>
                    <span className={label}>
                        <LiaBabyCarriageSolid className='w-7 h-7'/>
                        <span className='ml-2 text-gray-400 mr-auto pt-1'>Babies</span>
                    </span>
                    <div className={bagCount}>
                        <div 
                            className={qntMinus} 
                            onClick={()=>{
                                    if(!babies ) return;
                                    setBabies(babies - 1 )
                                }}
                        > - </div>
                        <div className={count}>{babies}</div>
                        <div 
                            className={qntPlus} 
                            onClick={()=>{
                                if(babies >= adults) return;
                                if(babies >= 1  && options.carType !== 'VAN (5-7)') return;
                                if(babies >= 2) return;
                                if(babies >= 1 && adults >5) return;

                                setBabies(babies + 1)
                            }}
                        >+</div>
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
const qntPlus = " w-5 h-5 flex justify-center items-center bg-green-400 active:bg-green-500 rounded-full border border-black cursor-pointer font-bold text-black duration-300 "
const qntMinus = " w-5 h-5 flex justify-center items-center bg-red-500 active:bg-red-600  rounded-full border border-black cursor-pointer font-bold text-black duration-300 "

const bagCount ='flex space-x-2 ml-auto items-center'
const qntKids = 'flex h-5 w-5 items-center justify-center cursor-pointer font-bold  border border-black rounded-full' 

const kidsIcon ='w-8 h-[28px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[130%]'
const subItem = 'relative flex px-4 py-2 justify-between cursor-pointer border'
const content = 'flex flex-col pb-2 bg-white p-2 2xl:pl-0 xl:pl-0 relative text-sm w-full'
