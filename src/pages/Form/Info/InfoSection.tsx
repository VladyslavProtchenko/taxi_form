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
        isFrench,
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

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const options1 = isFrench ? store.titleListF.map(item=>({value: item, label: item })) : store.titleList.map(item=>({value: item, label: item }))

    return (
        <section className={section}>
            <div className={extraContainer}>
                <div className={ (list[activeCarId-1].name.length>3 && list[activeCarId-1].title ) ? nameCard: nameCard + '  border-red-500' }>
                    <div className={ (list[activeCarId-1].name.length>3 && list[activeCarId-1].title ) ? box: box + '  border-red-500' }>
                        <span className='icon'><BsPeople/></span>
                        <Select allowClear  placeholder={isFrench? store.titleListF[3]:store.titleList[3] } style={{width: 118, height: 40}} onChange={setTitle} options={options1}/>
                        <Input allowClear value={list[activeCarId-1].name} placeholder={isFrench? store.nameListF[0]:store.nameList[0] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                    </div>
                </div>

                <div className={list[activeCarId-1].name.length>3 ? nameCard : 'hidden'}>
                    <div className={isExtraNameOpen[1] ? box : box + ' opacity-0'}>
                        <div className={(list[activeCarId-1].name === list[activeCarId-1].name2)? warn: 'hidden'}>name cannot be repeated</div>
                        {!isExtraNameOpen[1] &&  <div className='absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-100 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select placeholder={isFrench? store.titleListF[3]:store.titleList[3] }style={{width: 118, height: 40}} onChange={setTitle2} options={options1}/> 
                        <Input value={list[activeCarId-1].name2} allowClear placeholder={isFrench? store.nameListF[1]:store.nameList[1] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName2(e.target.value)} style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                        
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
                        {`${ isFrench?'Ajouter nom':'Add name'}`}
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
                
                <div className={list[activeCarId-1].name2.length<3 ? 'hidden': (isExtraNameOpen[1] || isExtraNameOpen[2])? nameCard : nameCard + ' border-white h-[32px]'}>
                    <div className={(list[activeCarId-1].name === list[activeCarId-1].name3 || list[activeCarId-1].name2 === list[activeCarId-1].name3)? warn: 'hidden'}>name cannot be repeated</div>
                    <div className={(isExtraNameOpen[2])? box: box +' opacity-0'}>
                        {!isExtraNameOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select placeholder={isFrench? store.titleListF[3]:store.titleList[3] } style={{width: 118, height: 40}} onChange={setTitle3}options={options1}/> 
                        <Input  value={list[activeCarId-1].name3 } allowClear placeholder={isFrench? store.nameListF[2]:store.nameList[2] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName3(e.target.value)} style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                    </div>
                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? 'hidden' : addExtraBtn } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('Undefined')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        >{`${(isExtraNameOpen[2]) ? isFrench?'Supprimer':'Delete' : isFrench?'Ajouter nom':'Add name'}`}</button>}

                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? extraNameClose : 'hidden' } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('Undefined')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        ><span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span></button>}
                </div>

            </div>

            <div className={extraContainer}>
                <div className={nameCard}>
                    <div className={box +' border-none '}>
                        <MailInput value={list[activeCarId-1].email} mainMail={true} onChange={setEmail} placeholder={isFrench? store.emailListF[0]:store.emailList[0] }/>
                    </div>
                </div>
                
                <div className={pattern.test(list[activeCarId-1].email) ? nameCard : 'hidden'}>

                    <div className={isExtraEmailOpen[1] ? box + ' border-none ' : box + ' opacity-0'}>
                        <div className={(list[activeCarId-1].email === list[activeCarId-1].email2)? warn: 'hidden'}>email cannot be repeated</div>
                        {!isExtraEmailOpen[1] &&  <div className={'absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-0 rounded cursor-not-allowed'}></div>}
                        <MailInput value={list[activeCarId-1].email2} mainMail={true} onChange={setEmail2} placeholder={isFrench? store.emailListF[1]:store.emailList[1]}/>
                    </div>
                    <button 
                        className={(isExtraEmailOpen[1]) ? 'hidden' : addExtraBtn } 
                        onClick={()=>{
                            if(list[activeCarId-1].email2 && list[activeCarId-1].email3) {
                                setEmail2(list[activeCarId-1].email3)
                                setEmail3('')
                                return   setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                            }
                            setEmail2('')
                            setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: !isExtraEmailOpen[1] })
                        }}
                    >
                        {isFrench?'Ajouter courrier':'Add email'}
                    </button>
                    <button 
                        className={(isExtraEmailOpen[1]) ? extraNameClose : 'hidden' } 
                        onClick={()=>{
                            if(list[activeCarId-1].email2 && list[activeCarId-1].email3) {
                                setEmail2(list[activeCarId-1].email3)
                                setEmail3('')
                                return   setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                            }
                            setEmail2('')
                            setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: !isExtraEmailOpen[1] })
                        }}
                    >
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>  
                </div>
                
                <div className={(!pattern.test(list[activeCarId-1].email2)) ? 'hidden' : nameCard + ' border-none'}>
                    <div className={isExtraEmailOpen[2] ? box +' border-none ': box + ' opacity-0 '}>    
                        <div className={(list[activeCarId-1].email2 === list[activeCarId-1].email3 || list[activeCarId-1].email === list[activeCarId-1].email3)? warn: 'hidden'}>email cannot be repeated</div>
                        <div className={isExtraEmailOpen[2]? 'hidden':'absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'}></div>
                        
                        <MailInput value={list[activeCarId-1].email3} onChange={setEmail3}placeholder={isFrench? store.emailListF[2]:store.emailList[2] }/>
                    </div>
                    
                    <button className={(isExtraEmailOpen[2]) ? ' hidden ' : addExtraBtn } onClick={()=>{
                                    setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: !isExtraEmailOpen[2] })
                                }}>
                        {isFrench?'Ajouter courrier':'Add email'}
                    </button>
                    <button className={(isExtraEmailOpen[2]) ? extraNameClose : ' hidden ' } onClick={()=>{
                                    setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: !isExtraEmailOpen[2] })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>
                </div>
            </div>

            <div className={extraContainer}>
                <div className={list[activeCarId-1].phone.length>=10 ? extraCard +' border z-30': extraCard+ ' border border-red-500 z-30' } >
                    <PhoneNumberInput type={1} value={list[activeCarId-1].phone} onChange={setPhone}/>
                </div>

                <div className={list[activeCarId-1].phone.length>=10 ? extraCard + ' z-20' : 'hidden'}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone2)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[1]? box : box+ ' opacity-0 '}>
                        {!isExtraPhoneOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                        <PhoneNumberInput type={3}  value={list[activeCarId-1].phone2} onChange={setPhone2}/>
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
                        {isFrench?'Ajouter téléphone':'Add phone'} 
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
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>      
                </div>

                <div className={list[activeCarId-1].phone2.length < 10 ? 'hidden' : nameCard}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone3 || list[activeCarId-1].phone2 === list[activeCarId-1].phone3)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[2]? box: box + ' opacity-0 '}>
                        {!isExtraPhoneOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) &&  <>
                            <PhoneNumberInput type={2}  value={list[activeCarId-1].phone3} onChange={setPhone3}/>
                        </>}
                    </div>
                    
                    <button className={(isExtraPhoneOpen[2]) ? 'hidden' : addExtraBtn } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        {isFrench?'Ajouter téléphone':'Add phone'}
                    </button>
                    <button className={(isExtraPhoneOpen[2]) ? extraNameClose : 'hidden' } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;


const box = ' border rounded bg-white flex items-center w-full '
const warn = 'absolute -top-[15px] left-4 text-xs z-20 text-red-500'
const nameCard = 'relative flex max-w-[400px] w-[100%] relative'
const addExtraBtn = "absolute w-[25%] py-1 flex justify-center border border-gray-500 bg-green-400 rounded text-xs cursor-pointer left-0"

const extraNameClose = " my-auto ml-2 text-black w-6  h-6 border-gray-800 border  items-center flex justify-center bg-red-500 rounded cursor-pointer  left-[102%]"

const extraCard = ' flex relative max-w-[400px] rounded w-full'
const extraContainer = 'flex flex-col w-full  space-y-4 items-center'

const section = 'flex flex-col pt-10 space-y-6 items-center justify-between w-full  max-w-[576px] border-none'