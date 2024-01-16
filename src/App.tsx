import React, { useEffect } from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import en from './assets/english.png'
import fr from './assets/france.png'
import { PiUserListLight } from "react-icons/pi";

import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

import { IoCheckmarkDone } from "react-icons/io5";
import { IoCarSportOutline } from "react-icons/io5";

import { TiInfoLarge } from "react-icons/ti";

import dayjs from "dayjs";
import { useStore } from './Store/index';

function App():React.ReactNode {
  const { list, submit, setSubmit, activeCarId, setActiveCarId, isCars, isFrench, setIsFrench, setDay,setSteps} = useMain()
  const { store } = useStore()

  useEffect(()=>{
    ( dayjs().format('HH') > '05' && dayjs().format('HH') < '23') ? setDay(true): setDay(false)
  },[activeCarId,setActiveCarId,isCars,isFrench])

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
                  <TiInfoLarge className='cursor-pointer '/>
            </div>
          </div>
 
        </div>
        
        <div className={content}>
          <Form />
        </div>

        <div className={footer}>
          <div className={footerWrapper}>
          <span className={list[activeCarId-1].steps===0?footerTabActive: footerTab} onClick={()=>{setSubmit(false); setSteps(0)}}>
              <MdOutlineModeOfTravel  className={footerIcon}/>
              <span className={footerTabText}>{isFrench? store.menuTabsF[0] : store.menuTabs[0] }</span>
            </span>
            <span className={list[activeCarId-1].steps===1?footerTabActive: footerTab} onClick={()=>{setSubmit(false); setSteps(1)}}>
              <PiUserListLight className={footerIcon}/>
              <span className={footerTabText}>{isFrench? store.menuTabsF[1] : store.menuTabs[1] }</span>
            </span>
            <span className={list[activeCarId-1].steps===2?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
                if(list[activeCarId-1].validation>0) setSteps(2)
              }}>
              <CiLocationOn className={footerIcon} />
              <span className={footerTabText}>{isFrench? store.menuTabsF[2] : store.menuTabs[2] }</span>
            </span>
            <span className={list[activeCarId-1].steps===3?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
              if(list[activeCarId-1].validation>1) setSteps(3)
            }}>
              <IoPeopleOutline  className={footerIcon}/>
              <span className={footerTabText}>{isFrench? store.menuTabsF[3] : store.menuTabs[3] }</span>
            </span>

            <span className={list[activeCarId-1].steps===4?footerTabActive: footerTab} onClick={()=>{
              setSubmit(false);
              if(list[activeCarId-1].validation>1) setSteps(4)
            }}>
              <IoCarSportOutline className={footerIcon} />
              <span className={footerTabText}>{isFrench? store.menuTabsF[4] : store.menuTabs[4] }</span>
            </span>

            <span className={ footerTab} onClick={()=>{}}>
              <CiMoneyCheck1 className={footerIcon} />
              <span className={footerTabText}>{isFrench? store.menuTabsF[5] : store.menuTabs[5] }</span>
            </span>

            <span className={submit?footerTabActive: footerTab} onClick={()=>{
                setSubmit(true)
            }}>
              <IoCheckmarkDone className={footerIcon} />
              <span className={footerTabText}>{isFrench? store.menuTabsF[6] : store.menuTabs[6] }</span>
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

const lang = 'flex cursor-pointer items-center  mt-8 mb-2 '
const langItem = ' px-1 text-gray-600 font-thin'

const footer =  'flex justify-center border-t bg-white  fixed bottom-0 left-0 right-0 z-20 '
const content =  'flex flex-1 w-full justify-center pb-[60px]'
const header = 'flex flex-col px-10 w-full  '

const wrapper = ' relative w-full flex flex-col max-w-[768px] main-h-screen'
const container = 'flex w-full min-w-screen  min-h-screen justify-center bg-gray-50 text-xs'