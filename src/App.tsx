import React, { useEffect } from "react"
import Form from "./pages/Form/Form"

import Header from "./pages/Layout/Header";
import Footer from "./pages/Layout/Footer";
import InfoMenu from "./pages/Layout/InfoMenu";


function App():React.ReactNode {

  useEffect(() => {
    const handleBeforeUnload = (event:BeforeUnloadEvent) => {
        event.preventDefault();
        
        event.returnValue = 'xxxxx';
        return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);

  return (
    <div className={container} >
      <div className={wrapper} >
        <InfoMenu />
        <Header />
        <div className={content}>
          <Form />
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default App


const content =  'flex relative flex-1 w-full justify-center pb-[60px] pt-10'

const wrapper = ' relative w-full flex flex-col max-w-[576px] main-h-screen'
const container = 'flex w-full min-w-screen  min-h-screen justify-center bg-gray-50 text-xs'
