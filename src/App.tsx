import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className={container}>
      <Outlet />
    </div>
  )
}

export default App

const container = 'flex w-screen min-h-screen justify-center'