import { useEffect, useState } from 'react';
import { IoPeopleOutline } from "react-icons/io5";
import { useOptions } from '../../../../Store/useOptions';


const PassengersSelect = () => {
    const {options, setPassengers} = useOptions()
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
        if(adults > 5) setBabies(1)
        if(!adults) setChildren([])
    },[adults])


    return (
        <div className={container} >
            <div className={mainItem}>
                <IoPeopleOutline />
                <span>Passengers</span>
                <div></div>
            </div>
            <ul className={submenu}>
                <div className={subItem}>
                    <label className={label}>Adults</label>
                    <div className={bagCount}>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                    if(!adults ) return;
                                    setAdults(adults - 1 )
                                }}
                        > - </div>
                        <div className="plus">{adults}</div>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                if((children.length + adults) >=4  && options.carType !== 'VAN (5-7)') return;
                                if((children.length + adults)  >= 7) return;
                                setAdults(adults + 1)
                            }}
                        >+</div>
                    </div>
                </div>

                <div className={subItem} >
                    Children
                    <div className={bagCount}>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                    if(!children.length) return;
                                    children.pop()
                                    setChildren([...children] )
                                }}
                        > - </div>
                        <div className="plus">{children.length}</div>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                if(!adults) return;
                                if((children.length + adults) >= 7 ) return;
                                if((children.length + adults) >= 4 && options.carType !== 'VAN (5-7)') return;
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
                        Kid #<span>{item.id}</span>
                        <div className={bagCount}>
                            <div 
                                className={qnt} 
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
                            <div>{item.age} years</div>
                            <div 
                                className={qnt} 
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
                    <label className={label}>Babies</label>
                    <div className={bagCount}>
                        <div 
                            className={qnt} 
                            onClick={()=>{
                                    if(!babies ) return;
                                    setBabies(babies - 1 )
                                }}
                        > - </div>
                        <div className="plus">{babies}</div>
                        <div 
                            className={qnt} 
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
            </ul>
        </div>
    );
};

export default PassengersSelect;

const childrenCard = 'flex border px-1 text-xs py-1 border-yellow-300 shadow rounded mr-1 mb-1 items-center'
const kidsContainer = 'flex flex-col px-2 py-2'

const label = 'flex space-x-1'
const bagCount ='flex space-x-[2px] items-center'
const qnt = 'cursor-pointer w-4 text-center text-xl font-bold text-yellow-400' 

const subItem = 'relative flex px-4 py-2 hover:bg-yellow-200 justify-between cursor-pointer'
const submenu = 'flex flex-col pb-2 bg-white border-black'

const mainItem = "flex justify-between py-2 bg-yellow-100 px-2" 

const container = 'relative text-sm w-full'