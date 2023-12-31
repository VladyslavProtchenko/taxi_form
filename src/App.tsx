import React, { useEffect } from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import en from './assets/english.png'
import fr from './assets/france.png'
import { PiUserListLight } from "react-icons/pi";

import { CiLocationOn } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";

import { IoCheckmarkDone } from "react-icons/io5";

import { TiInfoLarge } from "react-icons/ti";

import dayjs from "dayjs";

function App():React.ReactNode {
  const { list,submit, setSubmit, activeCarId, setActiveCarId, isCars, isFrench, setIsFrench, setDay,setSteps} = useMain()

  useEffect(()=>{
    ( dayjs().format('HH') > '05' && dayjs().format('HH') < '23') ? setDay(true): setDay(false)
  },[activeCarId,setActiveCarId,isCars,isFrench])

  return (
    <div className={container} >
      <div className={wrapper}>
        <div className={header}>
          <div className={lang} onClick={()=>setIsFrench(!isFrench)}>
            {isFrench 
              ?<><div style={{backgroundImage:`url(${fr})` }} className={'w-5 h-5 text-xs bg-center bg-cover bg-no-repeat'} ></div><div className={langItem} >EN</div></>
              :<><div style={{backgroundImage:`url(${en})` }} className={'w-5 h-5 text-xs bg-center bg-cover bg-no-repeat '} ></div><div  className={langItem} >FR</div></>
            }
          </div>

          <ul className={tabsContainer}>
            <li className='px-4'>taxis</li>
            <li 
                className={activeCarId ===1  ? activeTab : activeCarId == 2 ? tab + ' rounded-br border-t  ' :  tab +"  rounded-tr border-b-gray-100" }
                onClick={()=> setActiveCarId(1) }
            >1<span className={isFrench?'font-light mx-[1px] w-3  -translate-y-[4px] ':'font-light mx-[1px] w-3  '}>{isFrench? 'er': 'st'}</span></li>
            <li 
                className={activeCarId===2 ? activeTab  : activeCarId ===3 ? tab + '  rounded-br ' : activeCarId===1 ? tab + ' rounded-tr ' : tab+ ' ' }
                onClick={()=>{
                  if(!isCars[1]) return
                  setActiveCarId(2)
                }}
            >+2<span className={isFrench?'font-light mx-[1px] w-3  -translate-y-[6px] ':'font-light  mx-[1px] w-3  '}>{isFrench? 'e': 'nd'}</span></li>
            <li 
                className={activeCarId===3 ? activeTab  : activeCarId===4 ? tab + 'rounded-br ' : activeCarId===2 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[2] || !isCars[1]) return
                  setActiveCarId(3)
                }}
            >+3<span className={isFrench?'font-light  mx-[1px] w-3  -translate-y-[6px] ':'font-light  mx-[1px] w-3  '}>{isFrench? 'e': 'rd'}</span></li>
            <li 
                className={activeCarId===4 ? activeTab  : activeCarId===5 ? tab + '  rounded-br ' : activeCarId===3 ? tab + ' rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(4)
                }}
            >+4<span className={isFrench?'font-light  mx-[1px] w-3  -translate-y-[6px] ':'font-light  mx-[1px] w-3  '}>{isFrench? 'e': 'th'}</span></li>
            <li 
                className={activeCarId===5 ? activeTab : activeCarId===4 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[4] || !isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(5)
                }}
            >+5<span className={isFrench?'font-light  mx-[1px] w-3  -translate-y-[6px] ':'font-light t mx-[1px] w-3  '}>{isFrench? 'e': 'th'}</span></li>

            <li className={activeCarId===5 ? '':''}>
              <div className=" flex items-center  justify-center border-2  rounded-full border-orange-400 text-orange-400">
                <TiInfoLarge className='cursor-pointer '/>
              </div>
            </li>
          </ul> 
        </div>
        
        <div className={content}>
          <Form />
        </div>

        <div className={footer}>
          <div className={footerWrapper}>
            <span className={list[activeCarId-1].steps===1?footerTabActive: footerTab} onClick={()=>{setSubmit(false); setSteps(1)}}>
              <PiUserListLight className={footerIcon}/>
              <span className={footerTabText}>Info</span>
            </span>
            <span className={list[activeCarId-1].steps===2?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
                if(list[activeCarId-1].validation>0) setSteps(2)
              }}>
              <CiLocationOn className={footerIcon} />
              <span className={footerTabText}>Locations</span>
            </span>
            <span className={list[activeCarId-1].steps===3?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
              if(list[activeCarId-1].validation>1) setSteps(3)
            }}>
              <CiBoxList  className={footerIcon}/>
              <span className={footerTabText}>Options</span>
            </span>
            <span className={list[activeCarId-1].steps===4?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
              if(list[activeCarId-1].validation>1) setSteps(4)
            }}>
              <CiMoneyCheck1 className={footerIcon} />
              <span className={footerTabText}>Payment</span>
            </span>
            <span className={submit?footerTabActive: footerTab} onClick={()=>{
                setSubmit(true)
            }}>
              <IoCheckmarkDone className={footerIcon} />
              <span className={footerTabText}>Conirm</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App

const footerWrapper = 'flex max-w-[768px] w-full px-3 py-2 flex justify-around'
const footerIcon = 'text-lg'
const footerTabText = 'text-[10px]'
const footerTab = 'flex flex-col items-center  px-3 py-1 text-gray-500 cursor-pointer'
const footerTabActive = 'flex flex-col items-center  px-3 py-1 font-bold text-purple-500 rounded-xl cursor-pointer  '

const activeTab = 'px-1 flex items-center px-3 py-1 bg-purple-500 text-white bg-gray-100'
const tab = ' flex items-center cursor-pointer px-3 py-1'
const tabsContainer = 'bg-white flex mt-2 items-center text-xs mb-0 shadow-lg rounded-lg overflow-hidden'

const lang = 'flex cursor-pointer items-center  mt-8 mb-2 '
const langItem = ' px-1 text-gray-600 font-thin'

const footer =  'flex justify-center border-t bg-white  fixed bottom-0 left-0 right-0 z-20 '
const content =  'flex flex-1 w-full justify-center pb-[60px]'
const header = 'flex flex-col px-10 w-full  '

const wrapper = ' relative w-full flex flex-col max-w-[768px] main-h-screen'
const container = 'flex w-full min-w-screen  min-h-screen justify-center bg-gray-50 text-xs'