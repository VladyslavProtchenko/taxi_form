import React, { useEffect, useRef, useState } from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import en from './assets/english.png'
import fr from './assets/france.png'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { PiUserListLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import babiSeat from './assets/babySeat.png'
import babiSeatPurple from './assets/babySeatPurple.png'
import { TiInfoLarge } from "react-icons/ti";

import dayjs from "dayjs";
import { useStore } from './Store/index';

function App():React.ReactNode {
  const { list, 
    submit, 
    setSubmit, activeCarId, setActiveCarId, isCars, isFrench, setIsFrench, setDay,setSteps} = useMain()
  const { store } = useStore()
  const [screenWidth] = useState(window.innerWidth);

  useEffect(()=>{
    ( dayjs().format('HH') > '05' && dayjs().format('HH') < '23') ? setDay(true): setDay(false)
  },[activeCarId,setActiveCarId,isCars,isFrench])
  const ref = useRef<Carousel>(null);
  
  const responsive = {

    tablet: {
      breakpoint: { max: 10000, min: 480 },
      items: 8
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  useEffect(()=>{
    
    if(screenWidth< 570) {
      list[activeCarId-1].steps === 2
      ? ref.current?.goToSlide(1)
      : list[activeCarId-1].steps === 3  
      ? ref.current?.goToSlide(2)
      : list[activeCarId-1].steps === 4  
      ? ref.current?.goToSlide(3)
      : list[activeCarId-1].steps === 5  
      ? ref.current?.goToSlide(4)
      : list[activeCarId-1].steps === 6  
      ? ref.current?.goToSlide(5)
      : list[activeCarId-1].steps === 7  
      ? ref.current?.goToSlide(5)
      : ref.current?.goToSlide(0)
    }
      

  },[list[activeCarId-1].steps])

  
  return (
    <div className={container} >
      <div className={wrapper}>
        <div className={header}>
          <div className='flex items-center'>
            <div className={lang} onClick={()=>setIsFrench(!isFrench)}>
              {isFrench 
                ?<><div style={{backgroundImage:`url(${fr})` }} className={'w-5 h-5 text-xs bg-center bg-cover bg-no-repeat'} ></div><div className={langItem} >EN</div></>
                :<><div style={{backgroundImage:`url(${en})` }} className={'w-5 h-5 text-xs bg-center bg-cover bg-no-repeat '} ></div><div  className={langItem} >FR</div></>
              }
            </div>
            <div className=" flex items-center mt-8 mb-2 justify-center border-2  rounded-full border-orange-400 text-orange-400 ml-auto">
                  <TiInfoLarge className='cursor-pointer text-base'/>
            </div>
          </div>
        </div>
        
        <div className={content}>
          <Form />
        </div>
        <div className="fixed -bottom-1 z-20 left-0 right-0 bg-white py-2 border-t">
        <div className={"xs:hidden flex justify-around max-w-[570px] absolute -top-6 right-1/2 translate-x-1/2 w-full"}>
              {[0,0,0,0,0,0,0,0].map((_,index)=>  list[activeCarId-1].steps === index
                    ? <FaSortDown className={arrIcon}/>
                    : <div className='w-[20px]'></div> 
              )}
        </div>
        <div className={" xs:flex hidden justify-around max-w-[570px] absolute -top-6 right-1/2 translate-x-1/2 w-full"}>
              {[1,1,1].map((_,index)=> {
                  if(list[activeCarId-1].steps > 0 && list[activeCarId-1].steps < 7 ){
                    return index === 1
                    ? <FaSortDown className={arrIcon}/>
                    : <div className='w-[20px]'></div>
                  } else if( submit) {
                    return index === 2
                    ? <FaSortDown className={arrIcon}/>
                    : <div className='w-[20px]'></div>
                  }else if( list[activeCarId-1].steps === 0) {
                    return index === 0
                    ? <FaSortDown className={arrIcon}/>
                    : <div className='w-[20px]'></div>
                  }
                  
              })}
        </div>
            
            <Carousel 
              containerClass={`w-full`}
              className='max-w-[570px] w-full text-center mx-auto'
              ref={ref}
              
              arrows={false}
              responsive={responsive}
            >
                {
                  (isFrench? store.menuTabsF  : store.menuTabs).map((item, index)=> {

                    return index === 7 
                    ?  (<span 
                      key={item} 
                      className={ submit  ? footerTabActive : footerTab  } 
                      onClick={()=>{
                          setSubmit(true); setSteps(index)
                        }}><IoCheckmarkDone  className={footerIcon}/>
                      <span className={footerTabText}>{isFrench? store.menuTabsF[index] : store.menuTabs[index] }</span>
                    </span>)
                    : (<span 
                          key={item} 
                          className={ (list[activeCarId-1].steps===index)  ? footerTabActive : footerTab  } 
                          onClick={()=>{
                              if(index ===7 ) return setSubmit(true)
                              setSubmit(false); setSteps(index)
                            }}>
                          {index === 0
                            ?  <IoSettingsOutline  className={footerIcon}/>
                            : index === 1
                            ? <PiUserListLight className={footerIcon}/>
                            : index === 2
                            ? <CiLocationOn className={footerIcon} />
                            : index === 3
                            ? <IoPeopleOutline  className={footerIcon}/>
                            : index === 4
                            ? <div style={{backgroundImage:`url(${list[activeCarId-1].steps===4 ?babiSeatPurple : babiSeat})` }} className={'  text-xs w-10 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                            : index ===5
                            ?<MdDirectionsBike className={footerIcon} />
                            : <CiMoneyCheck1 className={footerIcon} />
                          }
                          <span className={footerTabText}>{isFrench? store.menuTabsF[index] : store.menuTabs[index] }</span>
                        </span>)
                  }
                  )
                }
            </Carousel>
        </div>
        



      </div>
    </div>
  )
}
export default App

const arrIcon = ' text-purple-500 text-xl'
const footerIcon = 'text-3xl'
const footerTabText = 'text-[10px] leading-3 '

const footerTab = 'flex relative flex-col items-center mx-1 text-center  w-[60px] py-1 text-gray-800 cursor-pointer'
const footerTabActive = ' relative flex flex-col text-center mx-1 items-center w-[60px]  py-1 font-bold text-purple-500 rounded-xl cursor-pointer  '

const lang = 'flex cursor-pointer items-center  mt-6 mb-2 '
const langItem = ' px-1 text-gray-600 font-thin'

const content =  'flex flex-1 w-full justify-center pb-[60px] pt-6'
const header = 'fixed  z-50 bg-gray-50 flex flex-col px-10 w-full  '

const wrapper = ' relative w-full flex flex-col max-w-[768px] main-h-screen'
const container = 'flex w-full min-w-screen  min-h-screen justify-center bg-gray-50 text-xs'
