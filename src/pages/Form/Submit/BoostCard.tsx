import React, { useState } from 'react';
import { ITaxi, useMain } from '../../../Store/useMain';
import dayjs from 'dayjs';

const BoostCard = ({item}:{item: ITaxi}):React.ReactNode => {

    const {list, submit, setList, setSubmit,setFilled,setIsEdit, isFrench, setActiveCarId,setSteps } = useMain()
    const [openModal, setOpenModal] = useState(false)

    const removeTaxi = (id:number) => {
        if(list.length === 1 ) {
            setFilled(false, id)
            setSubmit(false)
            return setSteps(0)
        }
        if( id === 1 ) {
            const newList = list.filter(i=>i.id!==1).map(item => {
                const newId = (item.id-1)
                return {...item,  id:newId}
            })
            
            setList(newList)
            setActiveCarId(1)
            setOpenModal(false)
            return setSubmit(true)
        }

        const newList = list.filter(i=>i.id!==id)
        setList(newList)
        setActiveCarId(1)
        setOpenModal(false)
        
        console.log(submit, 'submit')
    }

    return ( 
    <div className={container}>
        {/* __________________________________CLOSE_MODAL---------------------------------- */}
        {openModal && <div className="absolute flex flex-col bg-white shadow-lg shadow-purple-700 p-4 rounded-xl">
            <h1>Do you want decline car?</h1>
            <div className='flex space-x-2 self-end mt-4'>
                <button className={green} onClick={()=>removeTaxi(item.id)}>yes</button>
                <button className={red} onClick={()=>setOpenModal(false)}>not</button>
            </div>
        </div>}
        <div className="flex w-full flex-col">
            <h1 className='text-sm mb-0 pt-1 roboto w-full '>{dayjs(item.date.split('/').reverse().join('-')).format('dddd')}, {item.date}, {item.time}{(!item.dateNow && item.timeType===1) ? 'am': (!item.dateNow && item.timeType===2)? 'pm':''} </h1>
            <div className='flex  px-2  text-gray-500 italic text-[10px] '>{
                item.type === 3 ? 'Boost':" Unlocking doors" 
            }</div>
            
            <div className='flex w-full pr-4'>
                <div className="flex flex-col mb-1 w-full">
                    <div className="flex truncate mt-1 w-full">{item.from} </div>
                </div>
            </div>
            <div className="flex flex-col ml-auto justify-between">
                <button className={removeBtn} onClick={()=>setOpenModal(true)}>{isFrench? 'supprimer': 'delete'}</button>
            </div>
            <div className='flex justify-between w-full px-4'>
                <div 
                    className={btn+ ' border-blue-500 text-blue-500 '}  
                    onClick={()=>{
                        setIsEdit(true);
                        setActiveCarId(item.id)
                        setSteps(1)
                        setSubmit(false)
                    }}
                >Edit</div>
            </div>
        </div>
        
    </div>
    );
};

export default BoostCard;



const btn = 'text-[10px] mt-3  border text-center rounded-full cursor-pointer roboto text-thin px-2'
const red ='text-sm border-2 border-rose-500 rounded-full px-3 text-rose-500 text-xs'
const green ='text-sm border-2 border-green-500 rounded-full px-3 text-green-500 text-xs'

const removeBtn ='absolute rounded top-2 right-2 text-rose-600 py-[2px] text-xs'

const container = 'relative flex flex-col shadow-xl rounded-lg w-full px-2 py-2 items-center bg-white rounded mb-4'