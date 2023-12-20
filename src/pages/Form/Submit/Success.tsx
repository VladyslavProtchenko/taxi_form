import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = ():React.ReactNode => {
    const nav = useNavigate()
    return (
        <div className='flex flex-col w-screen min-h-screen items-center justify-center '>
            Order completed! 
            Thank you for choosing Bonjour taxi!
            <button className={purpleBtn} onClick={()=>{nav('/')}}>Go Main</button>
        </div>
    );
};

export default Success;

const purpleBtn = "bg-purple-500 py-3 mt-4 text-center px-20 rounded-full cursor-pointer border-purple-700  text-white active:bg-purple-400"