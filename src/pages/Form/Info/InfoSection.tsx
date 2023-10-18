import { useState } from 'react';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import { useInfo } from '../../../Store/useInfo';
import { Input, Select } from 'antd';
import { BsPeople } from "react-icons/bs";
import Required from '../../../UI/components/Required';
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
            <div className={header}>Order info</div>
            <div className={content}>
                
                <div className={extraContainer }>
                    <div className={ (validation.isName && validation.isTitle ) ? 'nameCard2 border': 'nameCard2 border border-red-500' }>
                        <Required />
                        <span className='icon'><BsPeople/></span>
                        <Select
                            placeholder='title'
                            style={{width: 118, height: 30}}
                            onChange={setGender}
                            options={user.genderList.map(item=>({value: item, label: item }))}
                        />
                        <Input placeholder='Name'onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{width:200, borderRadius: 0, height: 30}}/>
                    </div>

                    {isExtraNameOpen[1] && 
                    <div className='nameCard'>
                        <span className='icon'><BsPeople/></span>
                        <Select
                            placeholder='title'
                            style={{width: 118, height: 30}}
                            onChange={setExtraGender1}
                            options={user.genderList.map(item=>({value: item, label: item }))}
                        /> 
                        <Input placeholder='Second name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setExtraName1(e.target.value)} style={{width:200, borderRadius: 0, height: 30}}/>
                        <button className={extraNameClose} onClick={()=>{ setIsExtraNameOpen({ ...isExtraNameOpen, 1: false }) }}>-</button>
                    </div>}

                    {isExtraNameOpen[2] &&  
                    <div className='nameCard'>
                        <span className='icon'><BsPeople/></span>
                        <Select
                            placeholder='title'
                            style={{width: 118, height: 30}}
                            onChange={setExtraGender2}
                            options={user.genderList.map(item=>({value: item, label: item }))}
                        /> 
                        <Input 
                            placeholder='Third name'
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setExtraName2(e.target.value)}
                            style={{width:200, borderRadius: 0, height: 30}}
                        />
                        <div 
                            className={extraNameClose} 
                            onClick={()=>{ setIsExtraNameOpen({ ...isExtraNameOpen, 2: false }) }}
                        >-</div> 
                    </div>}

                    
                    {(!isExtraNameOpen[2] || !isExtraNameOpen[1] ) && <div className={addExtraBtn} onClick={()=>{
                        if(!isExtraNameOpen[1]) return setIsExtraNameOpen({ ...isExtraNameOpen, 1: true })
                        if(!isExtraNameOpen[2]) return setIsExtraNameOpen({ ...isExtraNameOpen, 2: true })
                    }}>
                        <span className={addButton}>+</span> add name
                    </div>}
                </div>

                <div className={extraContainer}>
                    <div className={extraCard}>
                        <Required />
                        <MailInput value={user.email} onChange={setEmail} placeholder='Set second email'/>
                    </div>

                    {isExtraEmailOpen[1] && 
                    <div className={extraCard}>    
                        <MailInput value={user.extraEmail1} onChange={setExtraEmail1} placeholder='Set third email'/>
                        <div 
                            className={extraEmailClose}
                            onClick={()=>{ setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: false }) }}
                        >-</div>         
                    </div>}

                    {isExtraEmailOpen[2] &&  
                    <div className={extraCard}>
                        <MailInput value={user.extraEmail2} onChange={setExtraEmail2} placeholder='Set your email'/>
                        <div 
                            className={extraEmailClose}
                            onClick={()=>{ setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false }) }}
                        >-</div>   
                    </div>}

                    
                    {(!isExtraEmailOpen[2] || !isExtraEmailOpen[1] ) && <div className={addExtraBtn} onClick={()=>{
                        if(!isExtraEmailOpen[1]) return setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: true })
                        if(!isExtraEmailOpen[2]) return setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: true })
                    }}>
                        <span className={addButton}>+</span> add email
                    </div>}

                </div>

                <div className={extraContainer }>
                    <div className={validation.isPhone ? extraCard+' border': extraCard + ' border border-red-500' } >
                        <Required />
                        <PhoneNumberInput value={user.phone} onChange={setPhone}/>
                    </div>

                    {isExtraPhoneOpen[1] && 
                    <div className={extraCard}>    
                        <PhoneNumberInput value={user.extraPhone1} onChange={setExtraPhone1}/>
                        <div 
                            className={extraPhoneClose}
                            onClick={()=>{ setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: false }) }}
                        >-</div>         
                    </div>}

                    {isExtraPhoneOpen[2] &&  
                    <div className={extraCard}>
                        <PhoneNumberInput value={user.extraPhone2} onChange={setExtraPhone2}/>
                        <div 
                            className={extraPhoneClose}
                            onClick={()=>{ setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false }) }}
                        >-</div>   
                    </div>}

                    
                    {(!isExtraPhoneOpen[2] || !isExtraPhoneOpen[1] ) && <div className={addExtraBtn} onClick={()=>{
                            if(!isExtraPhoneOpen[1]) return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: true })
                            if(!isExtraPhoneOpen[2]) return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: true })
                    }}>
                    <span className={addButton}>+</span> add phone</div>}

                </div>
            </div>
    </section>
    );
};

export default InfoSection;


const addButton ='px-1 bg-green-400 border border-black rounded-full text-gray-500 border-gray-500 font-bold'
const addExtraBtn = 'text-xs cursor-pointer ml-4 text-gray-400 hover:text-black duration-500 w-[350px]'

const extraNameClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border cursor-pointer font-bold text-black  left-[350px]"
const extraEmailClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border right-2 cursor-pointer font-bold text-black  left-[353px]"
const extraPhoneClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border right-2 cursor-pointer font-bold text-black left-[353px]"

const extraCard = ' flex relative items-center'
const extraContainer = 'flex flex-col 2xl:w-1/3 sm:w-full items-center space-y-2'

const header = 'mb-2 italic text-gray-400 uppercase sm:text-center lg:text-center'
const content ='flex justify-between flex-wrap  sm:items-center sm:flex-col sm:space-y-8  lg:flex-col lg:items-center lg:space-y-4'
const section = 'flex flex-col w-full px-8  pt-16 sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1 lg:items-start'