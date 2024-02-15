import React from 'react';
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store/index';
import transport from '../../../assets/taxiOrder.png' 
import delivery from '../../../assets/delivery.png' 
import boost from '../../../assets/boost2.png' 
import unlock from '../../../assets/lostKeys.png' 

const Type = ():React.ReactNode => {
    const { isFrench, setType, setSteps,setValidation } = useMain()
    const { store } = useStore()

    return (
        <section className={section}>
            <h1 className={h1}>Bonjour taxi!</h1>
            <h2 className={h2}>Make a choice of service, please!</h2>
            <div className={buttons}>
                {(isFrench? store.typeListF: store.typeList).map((item,index)=>(
                        <div  key={item}><div className={button} onClick={()=>{
                            setType(index+1)
                            setValidation(1)
                            setSteps(1)
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
                        </div><div className="w-full border-b border-black"></div></div>
                    ))
                }
            </div>
        </section>
    );
};

export default Type;

const iconImage =' z-10 w-20 h-20 bg-center mr-2 bg-contain bg-no-repeat '
const icon = ''
const h1 = ' text-3xl '
const h2 = ' text-xl mb-'
const button = ' w-[200px] px-2 bg-white h-[90px] border-black flex  items-center  py-2 cursor-pointer font-bold text-center hover:bg-gray-200 rounded-lg'
const buttons = 'flex flex-col items-center justify-center rounded border-black overflow-hidden space-y-4'

const section = 'flex flex-col items-center  w-full  max-w-[576px] pt-12 pb-10 bg-white h-full'