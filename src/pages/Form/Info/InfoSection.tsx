import { useEffect, useState } from 'react';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import { Input, Select } from 'antd';
import { IoIosPerson } from "react-icons/io";
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store';
import React from 'react';
import Buttons from '../Components/Buttons';
import { useTranslation } from 'react-i18next';

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
        setSteps,
        setValidation,
        setIsReset,
        setAlert,
    } = useMain()
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { t, i18n } = useTranslation();

    const [isTitle, setIsTitle] = useState(true)
    const [isName, setIsName] = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isPhone, setIsPhone] = useState(true)
    const [noPhone, setNoPhone] = useState(true)
    const [trigger, setTrigger] = useState(false)
    const [titleTrigger, setTitleTrigger] = useState(false)
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


    useEffect(()=>{
        setIsExtraNameOpen({ 1:list[activeCarId-1].name2?.length>0 , 2:list[activeCarId-1].name3?.length>0})
        setIsExtraEmailOpen({ 1:list[activeCarId-1].email2.length>1 , 2:list[activeCarId-1].email3.length>1})
        setIsExtraPhoneOpen({ 1:list[activeCarId-1].phone2.length>0 , 2:list[activeCarId-1].phone3.length>0})
    },[])

    useEffect(()=>{
        if(trigger) {
            setIsTitle(false)
            setIsName(false)
            setIsEmail(false)
            setNoPhone(false)
    
            setIsName(list[activeCarId-1].name?.length > 2)
            setIsTitle(list[activeCarId-1].title?.length>1)
            setIsEmail(pattern.test(list[activeCarId-1].email))
            setNoPhone(isPhone)
        }

    },[list[activeCarId-1], isPhone])

    useEffect(()=>{
        if(list[activeCarId-1].title?.length > 0 || list[activeCarId-1].name?.length > 0 || list[activeCarId-1].email.length > 1 || list[activeCarId-1].phone.length > 0 && list[activeCarId-1].isReset[1]) {
            return setIsReset({...list[activeCarId-1].isReset, 1: false })
        }
    },[list[activeCarId-1].name,list[activeCarId-1].title, list[activeCarId-1].email, list[activeCarId-1].phone])

    useEffect(()=>{
        if(titleTrigger) {
            if(list[activeCarId-1].title?.length>1) {
                i18n.language === 'fr' ? setTitle(store.titleListF[store.titleList.indexOf(list[activeCarId-1].title)]) : setTitle(store.titleList[store.titleListF.indexOf(list[activeCarId-1].title)])
            }
            if(list[activeCarId-1].title2?.length>1) {
                i18n.language === 'fr' ? setTitle2(store.titleListF[store.titleList.indexOf(list[activeCarId-1].title2)]) : setTitle2(store.titleList[store.titleListF.indexOf(list[activeCarId-1].title2)])
            }
            if(list[activeCarId-1].title3?.length>1) {
                i18n.language === 'fr' ? setTitle3(store.titleListF[store.titleList.indexOf(list[activeCarId-1].title3)]) : setTitle3(store.titleList[store.titleListF.indexOf(list[activeCarId-1].title3)])
            }
        }
        setTitleTrigger(true)
        
    },[i18n.language])

    function goNext(){
        setTrigger(true)
        setIsTitle(false)
        setIsName(false)
        setIsEmail(false)
        setNoPhone(false)

        if(list[activeCarId-1].name.length > 2) {
            setIsName(true)
        } else {
            setValidation(1)
            return setAlert(t('name_alert'))
            }
        if(list[activeCarId-1].title?.length>1) {
            setIsTitle(true)
        } else { 
            setValidation(1)
            return setAlert(t('title_alert'))
        }
        if(pattern.test(list[activeCarId-1].email)) {
            setIsEmail(true)
        } else { 
            setValidation(1)
            return setAlert(t('email_alert'))
        }

        if(isPhone) {
            setNoPhone(true)
        }else { 
            setValidation(1)
            return setAlert(t('phone_alert'))
            }
        
    
        if(isTitle && isName &&  isPhone && isEmail && noPhone) {
            setValidation(2)
            setSteps(2)
        }
    }
    
    const options1 = i18n.language === 'fr'  ? store.titleListF.map(item=>({value: item, label: item })) : store.titleList.map(item=>({value: item, label: item }))
    return (
        <section className={section}>

            <div className={extraContainer}>
                <div className={nameCard}>
                    <div className={ (isTitle && isName) ? box: box + '  border-red-500' }>
                        {isExtraNameOpen[1] && <div className={number}>1</div>}
                        <span className='icon ml-1'><IoIosPerson/></span>
                        <Select allowClear  className='arrow-right'  placeholder={t('title')} style={{width: 118, height: 40}} onChange={setTitle} options={options1} value={list[activeCarId-1].title || null} />
                        <Input allowClear value={list[activeCarId-1].name} placeholder={t('name_placeholder') } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{  borderRadius: 5, height: 30}}/>
                    </div>
                </div>

                <div className={list[activeCarId-1].name.length > 2 || isExtraNameOpen[1]  ? nameCard : 'hidden'}>
                    <div className={isExtraNameOpen[1] ? box : box + ' opacity-0'}>
                        <div className={number}>2</div>
                        <div className={(list[activeCarId-1].name.length>2 && list[activeCarId-1].name === list[activeCarId-1].name2) ? warn: 'hidden'}>name cannot be repeated</div>
                        {!isExtraNameOpen[1] &&  <div className='absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-100 rounded cursor-not-allowed'></div>}
                        <span className='icon ml-1'><IoIosPerson/></span>
                        <Select allowClear placeholder={t('title')}  className='arrow-right' style={{width: 118, height: 40}} onChange={setTitle2} options={options1} value={list[activeCarId-1].title2 || null}/> 
                        <Input value={list[activeCarId-1].name2} allowClear placeholder={t('name_placeholder2') } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName2(e.target.value)} style={{  borderRadius: 5, height: 30}}/>
                    </div>
                    <button 
                        className={(isExtraNameOpen[1]) ? 'hidden' : addExtraBtn } 
                        onClick={()=>{
                                if(list[activeCarId-1].name2 && list[activeCarId-1].title2 && list[activeCarId-1].name3) {
                                    setTitle2(list[activeCarId-1].title3);
                                    setName2(list[activeCarId-1].name3);
                                    setTitle3('');
                                    setName3('');
                                    return setIsExtraNameOpen({ 1: true, 2:false })
                                }
                                setTitle2('');
                                setName2('');
                                setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })
                            }}>
                        {t('+name')}
                    </button>
                    <button 
                        className={(isExtraNameOpen[1]) ? extraNameClose : 'hidden' } 
                        onClick={()=>{
                            if(list[activeCarId-1].name2 && list[activeCarId-1].title2 && list[activeCarId-1].name3) {
                                setTitle2(list[activeCarId-1].title3);
                                setName2(list[activeCarId-1].name3);
                                setTitle3('');
                                setName3('');
                                return setIsExtraNameOpen({ 1: true, 2:false })
                            }
                            setTitle2('');
                            setName2('');
                            setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></button>
                </div>
                
                <div className={(list[activeCarId-1].name2.length<2 && !isExtraNameOpen[2])  ? 'hidden': (isExtraNameOpen[1] || isExtraNameOpen[2])? nameCard : nameCard + ' border-white h-[32px]'}>
                    <div className={(list[activeCarId-1].name.length>2 && list[activeCarId-1].name === list[activeCarId-1].name3 || list[activeCarId-1].name2 === list[activeCarId-1].name3)? warn: 'hidden'}>name cannot be repeated</div>
                    <div className={(isExtraNameOpen[2])? box: box +' opacity-0'}>
                        <div className={number}>3</div>
                        {!isExtraNameOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        <span className='icon  ml-1'><IoIosPerson/></span>
                        <Select allowClear placeholder={t('title')} className=' arrow-right ' style={{width: 118, height: 40}} onChange={setTitle3}options={options1} value={list[activeCarId-1].title3 || null}/> 
                        <Input  value={list[activeCarId-1].name3 } allowClear placeholder={t('name_placeholder3')} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName3(e.target.value)} style={{ borderRadius: 5, height: 30}}/>
                    </div>
                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? 'hidden' : addExtraBtn } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        >{t('+name')}</button>}

                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? extraNameClose : 'hidden' } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        ><span className='scale-[150%] font-bold rotate-45'>+</span></button>}
                </div>
            </div>

            <div className={extraContainer}>
                <div className={nameCard}>
                    <div className={box +' border-none '}>
                    {isExtraEmailOpen[1] && <div className={number}>1</div>}
                        <MailInput 
                            value={list[activeCarId-1].email} 
                            mainMail={true} 
                            noMail={isEmail} 
                            onChange={setEmail} 
                            placeholder={t('email_placeholder')}
                        />
                    </div>
                </div>
                
                <div className={pattern.test(list[activeCarId-1].email) ? nameCard : 'hidden'}>

                    <div className={isExtraEmailOpen[1] ? box + ' border-none ' : box + ' opacity-0'}>
                        <div className={number}>2</div>
                        <div className={(list[activeCarId-1].email === list[activeCarId-1].email2)? warn: 'hidden'}>email cannot be repeated</div>
                        {!isExtraEmailOpen[1] &&  <div className={'absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-0 rounded cursor-not-allowed'}></div>}
                        <MailInput value={list[activeCarId-1].email2} mainMail={false} onChange={setEmail2} placeholder={t('email_placeholder2')}/>
                    </div>
                    <button className={(isExtraEmailOpen[1]) ? 'hidden' : addExtraBtn } onClick={()=> setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: true })}>
                        {t('+email')}
                    </button>
                    <button 
                        className={(isExtraEmailOpen[1]) ? extraNameClose : 'hidden' } 
                        onClick={()=>{
                            if(list[activeCarId-1].email2.length>1 && list[activeCarId-1].email3.length>1) {
                                setEmail2(list[activeCarId-1].email3)
                                setEmail3('@')
                                return   setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                            }
                            setEmail2('@')
                            setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: false })
                        }}
                    >
                        <span className='scale-[150%] font-bold rotate-45'>+</span>
                    </button>  
                </div>
                
                <div className={(!pattern.test(list[activeCarId-1].email2)) ? 'hidden' : nameCard + ' border-none'}>
                    <div className={isExtraEmailOpen[2] ? box +' border-none ': box + ' opacity-0 '}>
                        <div className={number}>3</div>    
                        <div className={(list[activeCarId-1].email2 === list[activeCarId-1].email3 || list[activeCarId-1].email === list[activeCarId-1].email3)? warn: 'hidden'}>email cannot be repeated</div>
                        <div className={isExtraEmailOpen[2]? 'hidden':'absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'}></div>
                        
                        <MailInput value={list[activeCarId-1].email3} onChange={setEmail3}placeholder={t('email_placeholder3')}/>
                    </div>
                    
                    <button className={(isExtraEmailOpen[2]) ? ' hidden ' : addExtraBtn } onClick={()=>{setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: true })}}>
                    {t('+email')} 
                    </button>
                    <button className={(isExtraEmailOpen[2]) ? extraNameClose : ' hidden ' } onClick={()=>{
                                    setEmail3('@')
                                    setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>+</span>
                    </button>
                </div>
            </div>

            <div className={extraContainer}>
                <div className={nameCard} >
                    <div className={noPhone ? box: box + ' border-red-500 z-30'}>
                        {isExtraPhoneOpen[1] && <div className={number}>1</div>}
                        <PhoneNumberInput  setValidation={setIsPhone} type={1} value={list[activeCarId-1].phone} onChange={setPhone}/>
                    </div>
                </div>

                <div className={list[activeCarId-1].phone.length>=10 ? nameCard + ' z-20' : 'hidden'}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone2)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[1] ? box : box+ ' opacity-0 '}>
                        <div className={number}>2</div>
                        {!isExtraPhoneOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                        <PhoneNumberInput  setValidation={setIsPhone} type={3}  value={list[activeCarId-1].phone2} onChange={setPhone2}/>
                    </div>
                    <button 
                        className={(isExtraPhoneOpen[1]) ? 'hidden' : addExtraBtn } 
                        onClick={()=>{
                            if(list[activeCarId-1].phone2 && list[activeCarId-1].phone3) {
                                setPhone2(list[activeCarId-1].phone3)
                                setPhone3('')
                                return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false})
                            }
                            setPhone2('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })
                        }}
                    > 
                        {t('+phone')} 
                    </button>
                    <button 
                        className={(isExtraPhoneOpen[1]) ? extraNameClose : 'hidden ' } 
                        onClick={()=>{
                            if(list[activeCarId-1].phone2 && list[activeCarId-1].phone3) {
                                setPhone2(list[activeCarId-1].phone3)
                                setPhone3('')
                                return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false})
                            }
                            setPhone2('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })
                        }}
                    > 
                        <span className='scale-[150%] font-bold rotate-45'>+</span>
                    </button>      
                </div>

                <div className={list[activeCarId-1].phone2.length < 10 ? 'hidden' : nameCard}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone3 || list[activeCarId-1].phone2 === list[activeCarId-1].phone3)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[2]? box: box + ' opacity-0 '}>
                        <div className={number}>3</div>
                        {!isExtraPhoneOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) &&  <>
                            <PhoneNumberInput  setValidation={setIsPhone} type={2}  value={list[activeCarId-1].phone3} onChange={setPhone3}/>
                        </>}
                    </div>
                    
                    <button className={(isExtraPhoneOpen[2]) ? 'hidden' : addExtraBtn } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        {t('+phone')}
                    </button>
                    <button className={(isExtraPhoneOpen[2]) ? extraNameClose : 'hidden' } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>+</span>
                    </button>
                </div>
            </div>
            <Buttons  goNext={goNext} step={0}/>

        </section>
    );
};

export default InfoSection;


const number = 'absolute left-5 text-gray-400 text-xl'
const warn = 'absolute -top-[15px] left-12 text-xs z-20 text-red-500'

const addExtraBtn = "absolute p-2 py-1 flex justify-center text-purple-500 -top-1 text-lg cursor-pointer "
const extraNameClose = "absolute my-auto pl-[9px] top-[6px] right-[6px] ml-2 text-black bg-rose-500 px-2 text-xl  text-center items-center flex justify-center border border-black rounded cursor-pointer "

const box = ' border border-purple-500 rounded-xl bg-white flex items-center w-full'

const nameCard = 'relative flex  w-full px-10'
const extraContainer = 'flex mb-4 flex-col w-full space-y-4 items-center'

const section = 'relative flex flex-col h-full items-center  w-full  max-w-[576px] pt-14 pb-20'