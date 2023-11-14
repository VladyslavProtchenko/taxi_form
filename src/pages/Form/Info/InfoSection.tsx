import { useState } from 'react';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import { Input, Select } from 'antd';
import { BsPeople } from "react-icons/bs";
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store';
import React from 'react';

const InfoSection = () => {
    const { store } = useStore()
    const {
        activeCarId,
        list, 
        setTitle,
        setTitle2,
        setTitle3,
        setName,
        setName2,
        setName3,
        setEmail,
        setEmail2,
        setEmail3,
        setPhone,
        setPhone2,
        setPhone3,
    } = useMain()

    const [isExtraNameOpen, setIsExtraNameOpen] = useState({
        1:false,
        2:false,
    })
    const [isExtraPhoneOpen, setIsExtraPhoneOpen] = useState({
        1:false,
        2:false,
    })
    const [isExtraEmailOpen, setIsExtraEmailOpen] = useState({
        1:false,
        2:false,
    })

    return (
        <section className={section}>
            <div className={extraContainer}>
                <div className={ (list[activeCarId-1].name.length>3 && list[activeCarId-1].title ) ? nameCard + ' ': nameCard + '  border-red-500' }>
                    <span className='icon'><BsPeople/></span>
                    <Select allowClear value={list[activeCarId-1].title || null} placeholder='title' style={{width: 118, height: 40}} onChange={setTitle} options={store.titleList.map(item=>({value: item, label: item }))}/>
                    <Input allowClear value={list[activeCarId-1].name || ''} placeholder='Name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{width:200, borderRadius: 5, height: 30}}/>
                </div>

                <div className={nameCard}>
                    {!isExtraNameOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select value={list[activeCarId-1].title2 || null} placeholder='title'  style={{width: 118, height: 40}} onChange={setTitle2} options={store.titleList.map(item=>({value: item, label: item }))}/> 
                        <Input value={list[activeCarId-1].name2 || ''} allowClear placeholder='Second name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName2(e.target.value)} style={{width:200, borderRadius: 5, height: 30}}/>
                        
                        <button className={(isExtraNameOpen[1]) ? extraNameClose : addExtraBtn } onClick={()=>{    setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })}}>
                        {`${(isExtraNameOpen[1]) ? '-' : '+'}`}
                    </button>
                </div>
                
                <div className={(isExtraNameOpen[1] || isExtraNameOpen[2])? nameCard: nameCard+ ' border-white h-[32px]'}>
                    {!isExtraNameOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) &&  <>
                        <span className='icon'><BsPeople/></span>
                        <Select value={list[activeCarId-1].title3 || null} placeholder='title' style={{width: 118, height: 40}} onChange={setTitle3}options={store.titleList.map(item=>({value: item, label: item }))}/> 
                        <Input  value={list[activeCarId-1].name3 || ''} allowClear placeholder='Third name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName3(e.target.value)} style={{width:200, borderRadius: 5, height: 30}}/>
                    </>}
                    {(isExtraNameOpen[1] || isExtraNameOpen[2])  && <button className={(isExtraNameOpen[2]) ? extraNameClose : addExtraBtn } onClick={()=>{setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })}}>{`${(isExtraNameOpen[2]) ? '-' : '+'}`}</button>}
                </div>

            </div>

            <div className={extraContainer}>
                <div className={extraCard}>
                    <MailInput value={list[activeCarId-1].email} mainMail={true} onChange={setEmail} placeholder='Set your email'/>
                </div>
                
                <div className={extraCard}>
                    {!isExtraEmailOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                    <MailInput value={list[activeCarId-1].email2} onChange={setEmail2} placeholder='Set second email'/>
                    <button className={(isExtraEmailOpen[1]) ? extraEmailClose : addExtraBtn } onClick={()=>{setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: !isExtraEmailOpen[1] })}}>
                        {`${(isExtraEmailOpen[1]) ? '-' : '+'}`}
                    </button>      
                </div>
                
                <div className={(isExtraEmailOpen[1] ||isExtraEmailOpen[2]) ? nameCard + ' border-none' : nameCard + ' border-white h-[32px]'}>
                    {!isExtraEmailOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraEmailOpen[1] ||isExtraEmailOpen[2]) &&  <>
                    <MailInput value={list[activeCarId-1].email3} onChange={setEmail3} placeholder='Set third email'/>
                    </>}
                    {(isExtraEmailOpen[1] ||isExtraEmailOpen[2]) && 
                    <button className={(isExtraEmailOpen[2]) ? extraEmailClose : addExtraBtn } onClick={()=>{
                                    setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: !isExtraEmailOpen[2] })
                                }}>
                        {`${(isExtraEmailOpen[2]) ? '-' : '+'}`}
                    </button>}
                </div>
            </div>

            <div className={extraContainer}>
                <div className={list[activeCarId-1].phone.length>=11 ? extraCard +' border z-30': extraCard+ ' border border-red-500 z-30' } >
                    <PhoneNumberInput type={1} value={list[activeCarId-1].phone} onChange={setPhone}/>
                </div>

                <div className={extraCard + ' border z-20'}>
                    {!isExtraPhoneOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                        <PhoneNumberInput type={3}  value={list[activeCarId-1].phone2} onChange={setPhone2}/>
                    <button className={(isExtraPhoneOpen[1]) ? extraEmailClose : addExtraBtn } onClick={()=>{setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })}}> {`${(isExtraPhoneOpen[1]) ? '-' : '+'}`} </button>      
                </div>

                <div className={(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) ? nameCard + ' ' : nameCard + ' border-white h-[32px]'}>
                    {!isExtraPhoneOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) &&  <>
                        <PhoneNumberInput type={2}  value={list[activeCarId-1].phone3} onChange={setPhone3}/>
                    </>}
                    {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) && 
                    <button className={(isExtraPhoneOpen[2]) ? extraPhoneClose : addExtraBtn } onClick={()=>{
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        {`${(isExtraPhoneOpen[2]) ? '-' : '+'}`}
                    </button>}
                </div>
            </div>
        </section>
    );
};

export default InfoSection;


const nameCard = 'relative flex max-w-[400px] w-[100%] relative items-center border rounded'
const addExtraBtn = "absolute w-5 h-5 flex justify-center bg-green-400 rounded text-md border border-black cursor-pointer font-bold text-black  left-[101%]"

const extraNameClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600 cursor-pointer font-bold text-black  left-[101%]"
const extraEmailClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600  right-2 cursor-pointer font-bold text-black  left-[101%]"
const extraPhoneClose = "absolute  w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600  right-2 cursor-pointer font-bold text-black left-[101%] "

const extraCard = ' flex relative items-center max-w-[400px] w-full rounded'
const extraContainer = 'flex flex-col w-full items-start space-y-2 items-center'

const section = 'flex flex-col pt-10 space-y-6 items-center justify-between w-full pr-8 max-w-[576px] border-none '
// const missIcon ='w-8 h-[28px] overflow-hidden bg-contain bg-[url("https://icons.iconarchive.com/icons/iconsmind/outline/512/Girl-icon.png")] bg-no-repeat scale-[130%]'