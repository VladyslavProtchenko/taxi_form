import { useEffect } from 'react';
import { IoPeopleOutline, } from "react-icons/io5";
import { useMain } from '../../../../Store/useMain';
import { Select } from 'antd';


const PassengersSelect = () => {
    const {list, activeCarId, setAdults, setKids, setBabies,setCarType, isFrench } = useMain()
    const years = [1,2,3,4,5,6,7,8,]

    useEffect(()=>{ 
        if(list[activeCarId-1].carType !== 3 && (list[activeCarId-1].adults + list[activeCarId-1].kids.length ) >=4) {
            setAdults((list[activeCarId-1].adults >= 4 ? 4: list[activeCarId-1].adults))
            setKids(list[activeCarId-1].kids.filter(( child, index)=> {
                if(index+1 <= (4 - list[activeCarId-1].adults) ) return child;
                return false;
            }))
        }
    },[list[activeCarId-1].carType])

    useEffect(()=>{ 
        if(list[activeCarId-1].adults===0) {
            setKids([])
            setBabies(0)
        }
    },[list[activeCarId-1].adults])

    return (
            <ul className={content}>

                <div className={card}>
                    <span className={label}> {isFrench ? 'Adultes': 'Adults'}</span>
                    <div className={bagCount}>
                        <button 
                            className={button2} 
                            onClick={()=>{
                                if(!list[activeCarId-1].adults ) return;
                                setAdults(list[activeCarId-1].adults - 1 )
                            }}
                            
                        >-</button>
                        <div className={count}>{list[activeCarId-1].adults}</div>
                        <button
                            className={button}
                            onClick={()=>{
                                if((list[activeCarId-1].kids.length + list[activeCarId-1].adults) >=4) setCarType(3)
                                if((list[activeCarId-1].kids.length + list[activeCarId-1].adults)  >= 7) return;
                                setAdults(list[activeCarId-1].adults + 1)
                            }}
                        >+</button>
                    </div>
                </div>

                <div className={list[activeCarId-1].kids.length? card : card} >
                    <span className={label}>{isFrench ? 'Enfants': 'Kids'}</span>
                    <div className={bagCount}>
                        
                        <button 
                            className={button2} 
                            onClick={()=>{
                                if(!list[activeCarId-1].kids.length) return;
                                const newArray = [...list[activeCarId-1].kids]
                                newArray.pop()
                                setKids(newArray)
                            }}
                            
                        >-</button>
                        <div className={count}>{list[activeCarId-1].kids.length}</div>
                        <button
                            className={button}
                            onClick={()=>{
                                if(!list[activeCarId-1].adults) return;
                                if((list[activeCarId-1].kids.length + list[activeCarId-1].adults) >=4) setCarType(3)

                                if((list[activeCarId-1].kids.length + list[activeCarId-1].adults) >= 7 ) return;
                                const newKid = 0
                                setKids([...list[activeCarId-1].kids, newKid] )
                            }}
                        >+</button>
                        
                        
                    </div>
                </div>

                {list[activeCarId-1].kids.length > 0 && <div className={kidsContainer}>
                    {list[activeCarId-1].kids.map(( _, index) => (
                    <div className={childrenCard} key={index} onClick={(e)=> e.stopPropagation()}>
                        <span >Kid # {index+1}</span>
                        <div className=' flex items-center w-[60%] px-1 rounded'>
                            <Select 
                                defaultValue='0 years' 
                                style={{width:'100%', padding:0}} 
                                className='yearsSelect' 
                                options={years.map(item=>({value: item, label: `${item} years ` }))}
                                onChange={(e)=>{
                                    setKids(list[activeCarId-1].kids.map((child,i)=> i === index ? Number(e): child))
                                }}
                            />
                        </div>
                    </div>))}
                </div>}
                
                <div className={list[activeCarId-1].kids.length ? card : card}>
                    <span className={label}>{isFrench ? 'Bébés': 'Babies'}</span>
                    <div className={bagCount}>
                        <button 
                            className={button2} 
                            onClick={()=>{
                                if(!list[activeCarId-1].babies ) return;
                                setBabies(list[activeCarId-1].babies - 1 )
                            }}
                        >-</button>
                        <div className={count}>{list[activeCarId-1].babies}</div>
                        <button
                            className={button}
                            onClick={()=>{
                                if(list[activeCarId-1].babies >= 2 && list[activeCarId-1].carType !== 3) return;
                                if(list[activeCarId-1].babies >= 2) return;
                                if(list[activeCarId-1].babies >= 1 && list[activeCarId-1].adults >5) return;

                                setBabies(list[activeCarId-1].babies + 1)
                            }}
                        >+</button>
                            
                    </div>
                </div>

                {((list[activeCarId-1].kids.length + list[activeCarId-1].adults) > 5) && <div className={extraFee}>
                    <span className={fee}>You will have extra fee 5%</span>
                </div>}
                <div className='absolute flex -top-4 border-none right-1/2 translate-x-1/2 z-10 bg-gray-50 px-1 items-center text rounded-full'>
                    <IoPeopleOutline className='text-2xl text-gray-500 '/>
                </div>

            </ul>
    );
};

export default PassengersSelect;

const fee='text-gray-400 italic text-xs'
const extraFee =' flex px-4 py-2  justify-between '

const childrenCard = 'flex px-6 border-gray-400 shadow bg-white rounded border border-gray-200 mb-2 items-center justify-between '
const kidsContainer = 'flex flex-col py-4 ml-10'

const label = 'pl-2 text-gray-500 text-base font-bold'

const count = ' text-3xl px-2'
const button = "   cursor-pointer pb-1  items-center flex duration-300 h-1/2 text-4xl text-green-500 active:text-green-300'"
const button2 = "   cursor-pointer pb-1  items-center flex  duration-300 h-1/2 text-5xl text-red-500 active:text-red-300"

const bagCount ='flex items-center'

const card = 'relative text-sm flex pr-4 items-center py-2 justify-between cursor-pointer h-[45px] border-purple-500 '
const content = 'relative border px-2 mb-10 h-min border-purple-500 rounded-xl pt-2 divide-y flex flex-col bg-white relative text-sm w-full'
