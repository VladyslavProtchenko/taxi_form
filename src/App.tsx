import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
function App() {
  const {activeCarId, setActiveCarId} = useMain()

  console.log(activeCarId, 'card')
  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={header}>
          <div className={headerContent}>
            content 
          </div>
          <div className={language}>language</div>
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
                  setActiveCarId(2)
                }}
            >2</li>
            <li 
                className={activeCarId===3 ? activeTab  : activeCarId===4 ? tab + ' border-b rounded-br pt-[10px]' : activeCarId===2 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  setActiveCarId(3)
                }}
            >3</li>
            <li 
                className={activeCarId===4 ? activeTab  : activeCarId===5 ? tab + ' border-b rounded-br pt-[10px]' : activeCarId===3 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  setActiveCarId(4)
                }}
            >4</li>
            <li 
                className={activeCarId===5 ? activeTab : activeCarId===4 ? tab + ' border-t rounded-tr': tab + ' pt-[10px]'}
                onClick={()=>{
                  setActiveCarId(5)
                }}
            >5</li>
            <li className={activeCarId===5 ? 'h-full bg-gray-100 rounded-tr border-r border-t ' : ' h-full border-r bg-gray-100'}></li>
        </ul>

          
          <Form />
        </div>
      </div>
      
    </div>
  )
}

export default App

const tab = 'px-4 py-2 cursor-pointer hover:bg-gray-50 text-gray-500 hover:text-black bg-gray-100 border-r box-border' 
const activeTab = 'px-4 py-2 cursor-pointer border-t border-b border-white'
const tabsContainer = 'flex  flex-col mr-2 font-bold h-full mb-0 overflow-hidden bg'

const language = ''
const headerContent = ''
const header = 'flex  w-full py-2 px-4 justify-between'

const wrapper = ' w-full border max-w-[768px]'
const container = 'flex w-screen min-h-screen justify-center'