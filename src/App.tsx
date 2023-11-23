import React, { useEffect } from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import { AiOutlineInfoCircle } from "react-icons/ai";
import en from './assets/english.png'
import fr from './assets/france.png'
import sun from './assets/sun.png'
import moon from './assets/moon.png'
import dayjs from "dayjs";

function App():React.ReactNode {
  const {day, activeCarId, setActiveCarId, isCars, isFrench, setIsFrench, setDay} = useMain()

  useEffect(()=>{
    ( dayjs().format('HH') > '05' && dayjs().format('HH') < '23') ? setDay(true): setDay(false)
  },[activeCarId,setActiveCarId,isCars,isFrench])


  return (
    <div className={container+ `${day? 'bg-gradient-to-b from-blue-100 to-blue-500': 'bg-gradient-to-t from-black to-zinc-500'}`} >
      <div className={wrapper}>
        <div className={header + `${day? ' bg-gradient-to-bl from-blue-200 to-blue-500': ' bg-gradient-to-tr from-black to-zinc-400'}`}>
        {day && <div className='absolute top-1 right-5 w-16 h-16 bg-no-repeat bg-center bg-contain rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}
        {!day && <div className='absolute -top-6 -right-2 w-32 h-32 bg-center bg-contain rotate-45' style={{backgroundImage:`url(${moon})` }}></div>}
        <div className={lang} onClick={()=>setIsFrench(!isFrench)}>
          {isFrench 
            ?<div style={{backgroundImage:`url(${en})` }} className={'w-7 h-7 text-xs bg-center bg-cover bg-no-repeat'} ></div>
            :<div style={{backgroundImage:`url(${fr})` }} className={'w-7 h-7 text-xs bg-center bg-cover bg-no-repeat '} ></div>
          }
          {isFrench 
            ?<div className={langItem } >EN</div>
            :<div  className={langItem } >FR</div>
          }
        </div>
          <div className='flex items-center'>  
              
              <span className={taxiLabel}>
                {activeCarId === 1 
                ? "1st Taxi"
                :activeCarId === 2 
                ? "2nd Taxi"
                :activeCarId === 3
                ? "3rd Taxi"
                :activeCarId === 4 
                ? "4th Taxi"
                : '5th Taxi'
                }
              </span>
          </div>
        </div>
        
        <div className="flex h-full">
        <ul className={tabsContainer + `${day? ' bg-gradient-to-b from-blue-200 to-blue-500': 'bg-gradient-to-t from-black to-zinc-300'}` }>
            <li 
                className={activeCarId ===1  ? activeTab : activeCarId == 2 ? tab + ' rounded-br border-t  ' :  tab +"  rounded-tr border-b-gray-100" }
                onClick={()=>{
                  setActiveCarId(1)
                }}
            >1</li>
            <li 
                className={activeCarId===2 ? activeTab  : activeCarId ===3 ? tab + '  rounded-br ' : activeCarId===1 ? tab + ' rounded-tr ' : tab+ ' ' }
                onClick={()=>{
                  if(!isCars[1]) return
                  setActiveCarId(2)
                }}
            >2</li>
            <li 
                className={activeCarId===3 ? activeTab  : activeCarId===4 ? tab + 'rounded-br ' : activeCarId===2 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[2] || !isCars[1]) return
                  setActiveCarId(3)
                }}
            >3</li>
            <li 
                className={activeCarId===4 ? activeTab  : activeCarId===5 ? tab + '  rounded-br ' : activeCarId===3 ? tab + ' rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(4)
                }}
            >4</li>
            <li 
                className={activeCarId===5 ? activeTab : activeCarId===4 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[4] || !isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(5)
                }}
            >5</li>
            <li className={activeCarId===5 ? 'h-full pt-6 flex items-center w-full rounded-tr  border-t ' : ' pt-6 flex justify-center w-full h-full  '}><AiOutlineInfoCircle className='cursor-pointer text-xl'/></li>
        </ul>
          <Form />
        </div>
      </div>
      
    </div>
  )
}

export default App
const taxiLabel = 'text-gray-400 mx-auto'
const tab = 'px-1 text-2xl border border-l-none text-center cursor-pointer   hover:text-gray-400  border-r box-border' 
const activeTab = 'px-1 text-2xl border border-l-none text-center cursor-pointer border-t border-b border-white bg-white'
const tabsContainer = 'flex flex-col mr-2 font-bold h-full m-0 w-[40px] '

const lang = ' flex rounded h-[20px] cursor-pointer mb-4'
const langItem = 'text-xl px-1 text-blue-700'

const header = 'flex flex-col w-full py-4 pt-4 px-4'

const wrapper = ' relative w-full flex flex-col max-w-[768px]'
const container = 'flex w-full min-w-screen min-h-screen justify-center '