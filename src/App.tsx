import Form from "./pages/Form/Form"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
function App() {

  return (
    <div className={container}>
      <DndProvider backend={HTML5Backend}>
        <Form />
      </DndProvider>
    </div>
  )
}

export default App

const container = 'flex w-screen min-h-screen justify-center'