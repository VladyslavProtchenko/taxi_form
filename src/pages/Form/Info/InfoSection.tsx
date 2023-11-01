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
                <div className={ (validation.isName && validation.isTitle ) ? 'nameCard2 border': 'nameCard2 border border-red-500' }>
                    <span className='icon'><BsPeople/></span>
                    <Select
                        allowClear 
                        value={user.gender || null}
                        placeholder='title'
                        style={{width: 118, height: 30}}
                        onChange={setGender}
                        options={user.genderList.map(item=>({value: item, label: item }))}
                    />
                    <Input 
                        allowClear 
                        value={user.name || ''}
                        placeholder='Name'
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{width:200, borderRadius: 0, height: 30}}
                    />
                </div>

                {isExtraNameOpen[1] && 
                <div className='nameCard'>
                    <span className='icon'><BsPeople/></span>
                    <Select
                        value={user.extraGender1 || null}
                        placeholder='title'
                        style={{width: 118, height: 30}}
                        onChange={setExtraGender1}
                        options={user.genderList.map(item=>({value: item, label: item }))}
                    /> 
                    <Input value={user.extraName1 || ''} allowClear placeholder='Second name' onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setExtraName1(e.target.value)} style={{width:200, borderRadius: 0, height: 30}}/>
                    <button className={extraNameClose} onClick={()=>{ setIsExtraNameOpen({ ...isExtraNameOpen, 1: false }) }}>-</button>
                </div>}

                {isExtraNameOpen[2] &&  
                <div className='nameCard'>
                    <span className='icon'><BsPeople/></span>
                    <Select
                        value={user.extraName1 || null}
                        placeholder='title'
                        style={{width: 118, height: 30}}
                        onChange={setExtraGender2}
                        options={user.genderList.map(item=>({value: item, label: item }))}
                    /> 
                    <Input 
                        value={user.extraName1 || ''}
                        allowClear
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
                }}>+</div>}
            </div>

            <div className={extraContainer}>
                <div className={extraCard}>
                    <MailInput value={user.email} mainMail={true} onChange={setEmail} placeholder='Set second email'/>
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
                }}>+</div>}

            </div>

            <div className={extraContainer}>
                <div className={validation.isPhone ? extraCard +' border': extraCard+ ' border border-red-500' } >
                    <PhoneNumberInput value={user.phone} onChange={setPhone}/>
                </div>

                {isExtraPhoneOpen[1] && 
                <div className={extraCard+' border'}>    
                    <PhoneNumberInput value={user.extraPhone1} onChange={setExtraPhone1}/>
                    <div 
                        className={extraPhoneClose}
                        onClick={()=>{ setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: false }) }}
                    >-</div>         
                </div>}

                {isExtraPhoneOpen[2] &&  
                <div className={extraCard+' border'}>
                    <PhoneNumberInput value={user.extraPhone2} onChange={setExtraPhone2}/>
                    <div 
                        className={extraPhoneClose}
                        onClick={()=>{ setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false }) }}
                    >-</div>   
                </div>}

                
                {(!isExtraPhoneOpen[2] || !isExtraPhoneOpen[1] ) && <div className={addExtraBtn} onClick={()=>{
                        if(!isExtraPhoneOpen[1]) return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: true })
                        if(!isExtraPhoneOpen[2]) return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: true })
                }}>+</div>}

            </div>
    </section>
    );
};

export default InfoSection;



const addExtraBtn = " w-5 h-5 flex justify-center bg-green-400 ml-2 -translate-y-1 rounded-full text-md border border-black cursor-pointer font-bold text-black opacity-20 hover:opacity-100 duration-300 "


const extraNameClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border border-black cursor-pointer font-bold text-black  left-[352px] opacity-20 hover:opacity-100 duration-300 "
const extraEmailClose = "absolute w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border border-black right-2 cursor-pointer font-bold text-black  left-[355px] opacity-25 hover:opacity-100 duration-300 "
const extraPhoneClose = "absolute  w-5 h-5 flex justify-center bg-red-500 rounded-full text-md border border-black right-2 cursor-pointer font-bold text-black left-[355px] opacity-25 hover:opacity-100 duration-300 "

const extraCard = ' flex relative items-center '
const extraContainer = 'flex flex-col sm:w-full items-start space-y-2 sm:items-center'

const section = 'flex xl:flex-wrap lg:flex-wrap sm:flex-col sm:space-y-2 justify-between w-full px-8  pt-16 sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1'