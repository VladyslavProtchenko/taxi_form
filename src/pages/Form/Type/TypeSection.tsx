import React from 'react';
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store/index';
import transport from '../../../assets/taxiOrder.png' 
import delivery from '../../../assets/delivery.png' 
import boost from '../../../assets/carBooster.png' 
import unlock from '../../../assets/lostKeys.png' 

const Type = ():React.ReactNode => {
    const { isFrench, setType, setSteps } = useMain()
    const { store } = useStore()

    return (
        <section className={section}>
            <h1 className={number}>1/7</h1>
            <h1 className={h1}>Bonjour taxi!</h1>
            <h2 className={h2}>Make a choice of service, please!</h2>
            <div className={buttons}>
                {(isFrench? store.typeListF: store.typeList).map((item,index)=>(
                        <div className={button} onClick={()=>{
                            setType(index+1)
                            setSteps(1)
                        }}>
                            <span className={icon}>
                                {index === 0 
                                    ? <div style={{backgroundImage:`url(${transport})` }} className={' z-10   w-8 bg-center h-8 bg-contain bg-no-repeat '} ></div>
                                    : index === 1 
                                    ? <div style={{backgroundImage:`url(${delivery})` }} className={' z-10 mb-1  w-8 bg-center h-8 bg-contain bg-no-repeat '} ></div>
                                    : index === 2 
                                    ? <div style={{backgroundImage:`url(${boost})` }} className={' z-10  mb-1 w-8 bg-center h-8 bg-contain bg-no-repeat '} ></div>
                                    : <div style={{backgroundImage:`url(${unlock})` }} className={' z-10   w-9 bg-center h-9 bg-contain bg-no-repeat '} ></div>
                                }
                            </span>
                            <span className='text-[10px]'>{item}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Type;

const number = 'absolute left-2 top-18 text-base text-gray-300'
const icon = ' '
const h1 = ' text-3xl '
const h2 = ' text-xl '
const button = ' w-[200px] bg-white h-[100px] border-black flex flex-col items-center justify-center  py-2 shadow-xl rounded border cursor-pointer font-bold text-center hover:bg-gray-200 '
const buttons = 'flex flex-col items-center justify-center rounded border-black overflow-hidden space-y-2'

const section = 'flex flex-col items-center  w-full  max-w-[576px] pt-6 pb-10 bg-white h-full'