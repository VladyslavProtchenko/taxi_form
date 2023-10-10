import { useState } from 'react';
import Input from '../../../UI/components/Input';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import Select from '../../../UI/components/Select';
import { useInfo } from '../../../Store/useInfo';



const InfoSection = () => {
    const { user, setName, setGender, setEmail, setPhone,setExtraGender1, setExtraGender2, setExtraName1,setExtraName2, setExtraPhone1, setExtraPhone2, setExtraEmail1, setExtraEmail2, } = useInfo()

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
            <div className={header}>Personal info</div>
            <div className={content}>
                
                <div className={extraContainer}>
                    <div className={extraCard}>
                        <div className={label}>
                            <div className={labelTitle}>gender</div>
                            <Select width={100} subStyle='sm:left-0 md:left-0' source={user.genderList}  onChange={setGender} placeholder='Mr.' />
                        </div>
                        
                        <div className={label}>
                            <div className={labelTitle}>name</div>
                            <Input width={200} onChange={setName} placeholder='Your name' />
                        </div>
                    </div>

                    {isExtraNameOpen[1] && 
                    <div className={extraCard}>    
                        <Select width={100}  source={user.genderList} onChange={setExtraGender1} placeholder='Mr.' />
                        <Input width={200}  onChange={setExtraName1}  placeholder='Second name' />
                        <div 
                            className={extraNameClose}
                            onClick={()=>{ setIsExtraNameOpen({ ...isExtraNameOpen, 1: false }) }}
                        >-</div>
                    </div>}

                    {isExtraNameOpen[2] &&  
                    <div className={extraCard}>
                        <Select width={100} source={user.genderList} onChange={setExtraGender2}  placeholder='Mr.' />
                        <Input width={200} onChange={setExtraName2}  placeholder='Third name' />
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

                <div className={extraContainer+ ' md:order-last'}>
                    <div className={extraCard}>
                    <div className={label}>
                        <div className={labelTitle}>email</div>
                        <MailInput value={user.email} onChange={setEmail} placeholder='Set second email'/>
                    </div>
                        

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

                <div className={extraContainer}>
                    <div className={extraCard}>
                        <div className={label}>
                            <div className={labelTitle}>phone</div>
                            <PhoneNumberInput value={user.phone} onChange={setPhone}/>
                        </div>
                        
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
                        <span className={addButton}>+</span> add name
                    </div>}

                </div>
            </div>
    </section>
    );
};

export default InfoSection;

const addButton ='px-1 bg-green-400 border border-black rounded-full text-gray-500 border-gray-500  font-bold'
const addExtraBtn = 'text-xs cursor-pointer ml-3 mt-1 text-gray-400 hover:text-black duration-500 w-[100px]'

const label = 'flex flex-col relative'
const labelTitle = 'font-semibold text-sm pl-2'

const extraNameClose = "absolute w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-md border right-2 cursor-pointer font-bold text-black  left-[302px]"
const extraEmailClose = "absolute w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-md border right-2 cursor-pointer font-bold text-black  left-[305px]"
const extraPhoneClose = "absolute w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-md border right-2 cursor-pointer font-bold text-black sm:right-0 left-[335px] md:left-[335px]"

const extraCard = ' flex relative items-center'
const extraContainer = 'flex flex-col w-1/3 space-y-5 sm:w-full sm:mb-10 md:w-1/2 md:mb-8'

const header = 'text-xl mb-8 sm:text-center'
const content ='flex justify-between md:flex-wrap sm:max-w-[320px] sm:items-center sm:flex-col'
const section = 'flex flex-col w-full mb-8 p-8 sm:py-8 sm:px-1 border-b border-gray-300 sm:w-[320px] lg:w-[1024px] xl:w-[1024px] 2xl:w-[1024px] sm:border-none sm:m-0'