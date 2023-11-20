import React from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import { AiOutlineInfoCircle } from "react-icons/ai";


function App():React.ReactNode {
  const {activeCarId, setActiveCarId, isCars, isFrench, setIsFrench} = useMain()

  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={header}>
        <AiOutlineInfoCircle className='cursor-pointer text-xl mr-6'/>

          <div >
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
          <div className={lang}>
            <div 
              className={isFrench? langItem + ' border-white': langItem+ ' border-green-400'} 
              onClick={()=>setIsFrench(false)}
            >EN</div> |
            <div 
              className={!isFrench? langItem + ' border-white': langItem+ ' border-green-400'} 
              onClick={()=>setIsFrench(true)}
            >FR</div>
          </div>
        </div>
        
        <div className="flex h-full">
        <ul className={tabsContainer}>
            <li 
                className={activeCarId ===1  ? activeTab : activeCarId == 2 ? tab + ' border-b rounded-br border-t  ' :  tab +" border-t rounded-tr border-b-gray-100" }
                onClick={()=>{
                  setActiveCarId(1)
                }}
            >1</li>
            <li 
                className={activeCarId===2 ? activeTab  : activeCarId ===3 ? tab + ' border-b rounded-br pt-[10px]' : activeCarId===1 ? tab + ' rounded-tr border-t' : tab+ ' pt-[10px]' }
                onClick={()=>{
                  if(!isCars[1]) return
                  setActiveCarId(2)
                }}
            >2</li>
            <li 
                className={activeCarId===3 ? activeTab  : activeCarId===4 ? tab + ' border-b rounded-br pt-[10px]' : activeCarId===2 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  if(!isCars[2] || !isCars[1]) return
                  setActiveCarId(3)
                }}
            >3</li>
            <li 
                className={activeCarId===4 ? activeTab  : activeCarId===5 ? tab + ' border-b rounded-br pt-[10px]' : activeCarId===3 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  if(!isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(4)
                }}
            >4</li>
            <li 
                className={activeCarId===5 ? activeTab : activeCarId===4 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  if(!isCars[4] || !isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(5)
                }}
            >5</li>
            <li className={activeCarId===5 ? 'h-full  rounded-tr border-r border-t ' : ' h-full border-r '}></li>
        </ul>

          
          <Form />
        </div>
      </div>
      
    </div>
  )
}

export default App
const taxiLabel = 'text-gray-400'
const tab = 'px-4 py-2 cursor-pointer hover:bg-gray-50 text-gray-300 hover:text-gray-600  border-r box-border' 
const activeTab = 'px-4 py-2 cursor-pointer border-t border-b border-white'
const tabsContainer = 'flex  flex-col mr-2 font-bold h-full m-0 w-[40px] shadow'

const lang = ' flex rounded h-[20px] cursor-pointer ml-auto'
const langItem = 'text-sm px-1 border-b-2'

const header = 'flex items-center w-full py-4 pt-10 px-4  shadow mb-[1px]'

const wrapper = ' relative w-full flex flex-col max-w-[768px]'
const container = 'flex w-full min-w-screen min-h-screen justify-center'