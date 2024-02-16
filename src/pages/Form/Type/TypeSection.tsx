import React from 'react';
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store/index';
import transport from '../../../assets/taxiOrder.png' 
import delivery from '../../../assets/delivery.png' 
import boost from '../../../assets/boost2.png' 
import unlock from '../../../assets/lostKeys.png' 
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Type = ():React.ReactNode => {
    const { list, isFrench,activeCarId, setType, setSteps,setValidation } = useMain()
    const { store } = useStore()

    return (
        <section className={section}>
            <h1 className={h1}>Bonjour taxi!</h1>
            <h2 className={h2}>Make a choice of service, please!</h2>
            <div className={buttons}>
                {(isFrench? store.typeListF: store.typeList).map((item,index)=>(
                        <div key={item} className={list[activeCarId-1].type===index+1 ? buttonActive : button} onClick={()=>{
                            setType(index+1)
                            
                        }}>
                            <span className={icon}>
                                {index === 0 
                                    ? <div style={{backgroundImage:`url(${transport})` }} className={iconImage} ></div>
                                    : index === 1 
                                    ? <div style={{backgroundImage:`url(${delivery})` }} className={iconImage} ></div>
                                    : index === 2 
                                    ? <div style={{backgroundImage:`url(${boost})` }} className={iconImage}></div>
                                    : <div style={{backgroundImage:`url(${unlock})` }} className={iconImage}></div>
                                }
                            </span>
                            <span className='text-xl text-start'>{item}</span>
                            <button className={buttonNext} onClick={()=>{
                                setValidation(1)
                                setSteps(1)
                            }}>{isFrench? 'Suivant': 'Next'}<MdOutlineKeyboardDoubleArrowRight className='text-2xl'/></button>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Type;

const buttonNext = ' flex items-center absolute text-lg bottom-2 right-3 cursor-pointer text-purple-500'

const iconImage =' z-10 w-20 h-20 bg-center mr-2 bg-contain bg-no-repeat '
const icon = ''
const h1 = ' text-3xl '
const h2 = ' text-xl mb-10'
const button = ' w-[250px] px-6 py-2 h-[100px] border-black flex  items-center  py-2 cursor-pointer font-bold text-center  duration-500 opacity-50'
const buttonActive = ' w-[250px] px-6 py-2 h-[100px] border-black flex  items-center  py-2 cursor-pointer font-bold text-center scale-125 duration-500 shadow-md rounded-xl bg-white shadow-purple-500 '
const buttons = 'flex flex-col items-center justify-center space-y-6'

const section = 'flex flex-col items-center  w-full  max-w-[576px] pt-12 pb-10 bg-white h-full'