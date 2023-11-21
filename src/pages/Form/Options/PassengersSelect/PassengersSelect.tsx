import { useEffect, useState } from 'react';
import { IoPeopleOutline, } from "react-icons/io5";
// import { LiaBabyCarriageSolid } from "react-icons/lia";
import { useMain } from '../../../../Store/useMain';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { Select } from 'antd';


const PassengersSelect = () => {
    const {list, activeCarId, setPassengers,setCarType, isFrench } = useMain()
    const [adults, setAdults] = useState(list[activeCarId-1].passengers.adults)
    const [babies, setBabies] = useState(list[activeCarId-1].passengers.babies)
    const [children, setChildren] = useState<{id:number; age:number}[]>(list[activeCarId-1].passengers.kids)
    const years = ['1 year','2 years','3 years','4 years','5 years','6 years','7 years','8 years']

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

                <div className={card}>
                    <label className={label}>
                    <span className='ml-2 text-gray-400'>{isFrench ? 'Adultes': 'Adults'}</span>
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

                <div className={children.length? card : card} >
                    <span className='ml-2 text-gray-400 mr-auto pt-1'>{isFrench ? 'Enfants': 'Kids'}</span>
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
                        <div className=' flex items-center w-[60%] px-1 rounded'>
                            <Select defaultValue='0 years' style={{width:'100%', padding:0}} className='yearsSelect' options={years.map(item=>({value: item, label: item }))}/>

                        </div>
                    </div>))}
                </div>}
                
                <div className={children.length ? card : card}>
                    <span className={label}>
                        <span className='ml-2 text-gray-400 mr-auto pt-1'>{isFrench ? 'Bébés': 'Babies'}</span>
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
                <div className='absolute flex -top-4 border-none right-1/2 translate-x-1/2 z-10 bg-white px-1 items-center text rounded-full'>
                    <IoPeopleOutline className='text-2xl text-gray-500 '/>
                </div>

            </ul>
    );
};

export default PassengersSelect;

const fee='text-gray-400 italic text-xs'
const extraFee =' flex px-4 py-2  justify-between '

const childrenCard = 'flex border pl-2 pr-1 ml-3 py-2 border-gray-400 shadow rounded-l mb-1 items-center justify-between '
const kidsContainer = 'flex flex-col py-2'

const label = 'flex items-center'

const count = ' text-xl px-2'
const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "

const bagCount ='flex space-x-1 ml-auto items-center'

// const kidsIcon ='w-8 h-[28px] overflow-hidden bg-contain bg-[url("https://cdn0.iconfinder.com/data/icons/child-1-1/70/boy-child-children-girl-512.png")] bg-no-repeat scale-[130%]'
const card = 'relative text-sm flex  pr-4  py-2 justify-between cursor-pointer h-[45px] border-blue-500 '
const content = 'relative border px-2 h-min border-blue-500 rounded pt-2 divide-y flex flex-col bg-white relative text-sm w-1/2'
