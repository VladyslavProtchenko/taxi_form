import { useState } from 'react';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import { useInfo } from '../../../Store/useInfo';
import { Input, Select } from 'antd';
import { BsPeople } from "react-icons/bs";
import { useValidation } from '../../../Store/useValidation';

const InfoSection = () => {
    const { user, setName, setGender, setEmail, setPhone,setExtraGender1, setExtraGender2, setExtraName1,setExtraName2, setExtraPhone1, setExtraPhone2, setExtraEmail1, setExtraEmail2, } = useInfo()
    const { validation } = useValidation()
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
            <div className={extraContainer + ' xl:mb-3 lg:mb-3'}>
                <div className={ (validation.isName && validation.isTitle ) ? nameCard + ' ': nameCard + '  border-red-500' }>
                    <span className='icon'><BsPeople/></span>
                    <Select allowClear value={user.gender || null} placeholder='title' style={{width: 118, height: 40}} onChange={setGender}options={user.genderList.map(item=>({value: item, label: item }))}/>
                    <Input allowClear value={user.name || ''} placeholder='Name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{width:200, borderRadius: 5, height: 30}}/>
                </div>

                <div className={nameCard}>
                    {!isExtraNameOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select value={user.extraGender1 || null} placeholder='title'  style={{width: 118, height: 40}} onChange={setExtraGender1}options={user.genderList.map(item=>({value: item, label: item }))}/> 
                        <Input value={user.extraName1 || ''} allowClear placeholder='Second name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setExtraName1(e.target.value)} style={{width:200, borderRadius: 5, height: 30}}/>
                        
                        <button className={(isExtraNameOpen[1]) ? extraNameClose : addExtraBtn } onClick={()=>{    setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })}}>
                        {`${(isExtraNameOpen[1]) ? '-' : '+'}`}
                    </button>
                </div>
                
                <div className={(isExtraNameOpen[1] || isExtraNameOpen[2])? nameCard: nameCard+ ' border-white h-[32px]'}>
                    {!isExtraNameOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) &&  <>
                        <span className='icon'><BsPeople/></span>
                        <Select value={user.extraGender2 || null} placeholder='title' style={{width: 118, height: 40}} onChange={setExtraGender2}options={user.genderList.map(item=>({value: item, label: item }))}/> 
                        <Input  value={user.extraName2 || ''} allowClear placeholder='Third name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setExtraName2(e.target.value)} style={{width:200, borderRadius: 5, height: 30}}/>
                    </>}
                    {(isExtraNameOpen[1] || isExtraNameOpen[2])  && <button className={(isExtraNameOpen[2]) ? extraNameClose : addExtraBtn } onClick={()=>{setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })}}>{`${(isExtraNameOpen[2]) ? '-' : '+'}`}</button>}
                </div>

            </div>

            <div className={extraContainer  + ' xl:mb-3 lg:mb-3'}>
                <div className={extraCard}>
                    <MailInput value={user.email} mainMail={true} onChange={setEmail} placeholder='Set your email'/>
                </div>
                
                <div className={extraCard}>
                    {!isExtraEmailOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                    <MailInput value={user.extraEmail1} onChange={setExtraEmail1} placeholder='Set second email'/>
                    <button className={(isExtraEmailOpen[1]) ? extraEmailClose : addExtraBtn } onClick={()=>{setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: !isExtraEmailOpen[1] })}}>
                        {`${(isExtraEmailOpen[1]) ? '-' : '+'}`}
                    </button>      
                </div>
                
                <div className={(isExtraEmailOpen[1] ||isExtraEmailOpen[2]) ? nameCard + ' border-none' : nameCard + ' border-white h-[32px]'}>
                    {!isExtraEmailOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraEmailOpen[1] ||isExtraEmailOpen[2]) &&  <>
                    <MailInput value={user.extraEmail2} onChange={setExtraEmail2} placeholder='Set third email'/>
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
                <div className={validation.isPhone ? extraCard +' border': extraCard+ ' border border-red-500' } >
                    <PhoneNumberInput type={1} value={user.phone} onChange={setPhone}/>
                </div>

                <div className={extraCard + ' border'}>
                    {!isExtraPhoneOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                        <PhoneNumberInput type={3}  value={user.extraPhone1} onChange={setExtraPhone1}/>
                    <button className={(isExtraPhoneOpen[1]) ? extraEmailClose : addExtraBtn } onClick={()=>{setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })}}> {`${(isExtraPhoneOpen[1]) ? '-' : '+'}`} </button>      
                </div>

                <div className={(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) ? nameCard + ' ' : nameCard + ' border-white h-[32px]'}>
                    {!isExtraPhoneOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                    {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) &&  <>
                        <PhoneNumberInput type={2}  value={user.extraPhone2} onChange={setExtraPhone2}/>
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


const nameCard = 'relative flex max-w-[400px] w-full relative items-center border rounded'
// const addExtraBtn = " w-5 h-5 flex justify-center bg-green-400 -translate-y-1 rounded text-md border border-black cursor-pointer font-bold text-black sm:-translate-x-[150px] ml-auto"
const addExtraBtn = "absolute w-5 h-5 flex justify-center bg-green-400 rounded text-md border border-black cursor-pointer font-bold text-black  left-[101%]"


const extraNameClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600 cursor-pointer font-bold text-black  left-[101%]"
const extraEmailClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600  right-2 cursor-pointer font-bold text-black  left-[101%]"
const extraPhoneClose = "absolute  w-5 h-5 flex justify-center bg-red-500 rounded text-md border border-gray-600  right-2 cursor-pointer font-bold text-black left-[101%] "

const extraCard = ' flex relative items-center max-w-[400px] w-full rounded'
const extraContainer = 'flex flex-col sm:w-full items-start space-y-2 sm:items-center xl:max-w-[400px] xl:w-full lg:max-w-[400px] lg:w-full'

const section = 'flex flex-col pt-20 sm:space-y-6 justify-between w-full px-8  pt-16 max-w-[576px] border-none max-w-[1240px] py-8 pl-0 pr-6'