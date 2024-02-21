import { Input } from 'antd';
import { useMain } from "../../../Store/useMain";
import { useStore } from "../../../Store";
import React, { useEffect, useRef, useState } from "react";
const { TextArea } = Input;
import { MdDone } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useTranslation } from 'react-i18next';


const PaymentSection = (): React.ReactNode => {
    const { list, setSubmit, activeCarId, setIsReset, setPaymentMethod, setAdditionalText, setTripType, setFilled, setSteps, isFrench, setValidation } = useMain()
    const { store } = useStore()
    const ref = useRef<HTMLDivElement | null>(null)
    const [paymentTab, setPaymentTab] = useState(0)
    const { t } = useTranslation();

    useEffect(()=>{
        const container = ref.current;
        if (container) {

            if(paymentTab===0 || paymentTab === 1) container.scrollLeft = 0
            if(paymentTab===3) container.scrollLeft = 150
            if(paymentTab===2) container.scrollLeft = 50
            if(paymentTab===4) container.scrollLeft = 150
        }
    },[list[activeCarId - 1].paymentMethod])



    useEffect(() => {
        if (
            list[activeCarId - 1].isReset[7]
            && list[activeCarId - 1].paymentMethod !== 'Cash'
            || list[activeCarId - 1].tripType !== 'Vacation'
            || list[activeCarId - 1].additionalText
        ) {
            return setIsReset({ ...list[activeCarId - 1].isReset, 7: false })
        }
    }, [list[activeCarId - 1].paymentMethod, list[activeCarId - 1].tripType, list[activeCarId - 1].additionalText])

    const isActiveTripType = (index: number) => {
        return store.tripList.indexOf(list[activeCarId - 1].tripType) === index || store.tripListF.indexOf(list[activeCarId - 1].tripType) === index
    }

    const isActivePaymentMethod = (index: number) => {
        return store.paymentList.indexOf(list[activeCarId - 1].paymentMethod) === index || store.paymentListF.indexOf(list[activeCarId - 1].paymentMethod) === index
    }

    return (
        <section className={section}>
            <div className={content}>


                <div className={toggleContainer + ' mb-10 ' }>
                    {
                        (isFrench ? store.tripListF : store.tripList).map((item, index) =>
                            <div
                                key={item}
                                className={isActiveTripType(index) ? toggleItemActive : toggleItem}
                                onClick={() => setTripType(item)}
                            >{item}</div>
                        )
                    }
                </div>
                <div ref={ref} className={toggleContainer}>
                    {
                        (isFrench ? store.paymentListF : store.paymentList).map((item, index) =>
                            <div
                                key={item}
                                className={isActivePaymentMethod(index) ? toggleItemActive2: toggleItem2}
                                onClick={() => {
                                    setPaymentTab(index)
                                    setPaymentMethod(item)
                                }}
                            >{item}</div>
                        )
                    }
                </div>
            </div>
            
            <div className={additional}>
                <span className={textArea}>
                    <TextArea style={{ borderRadius: '10px' }} value={list[activeCarId - 1].additionalText} rows={2} placeholder='Additional information' onChange={(e) => {
                        setAdditionalText(e.target.value)
                    }} /></span>
            </div>
            {list[activeCarId - 1].filled && <div className="px-4 py-2 mx-auto pt-32 text-gray-400 flex items-center "><MdDone className='-translate-y-[1px] text-xl' /> Completed! </div>}

            <div className={btns}>
                <div className={backBtn} onClick={() => setSteps(6)}><MdOutlineKeyboardDoubleArrowLeft className='text-2xl' />{isFrench ? 'Précédent' : 'Previous'}</div>
                {!list[activeCarId - 1].filled &&
                    <button className={nextBtn} onClick={() => {
                        setValidation(9)
                        setFilled(true, activeCarId)
                        setSubmit(true)
                    }}>
                        Order
                        {
                            activeCarId === 1
                            ? t('1st')
                            : activeCarId === 2
                            ? t('2nd')
                            : activeCarId === 3
                            ? t('3rd')
                            : activeCarId === 4
                            ? t('4th')
                            : t('5th')
                        }
                        {t('car')}
                    </button>}
                {list[activeCarId - 1].filled && <button className={yellowBtn} onClick={() => {

                    setSubmit(true)
                }}>View Orders</button>}
            </div>
        </section>
    );
};

export default PaymentSection;

const toggleItem = ' w-1/3 text-center py-1'
const toggleItemActive = 'text-white bg-purple-500 w-1/3 text-center py-1'
const toggleItem2 = ' w-1/5 text-center py-1 truncate'
const toggleItemActive2 = 'text-white bg-purple-500 w-1/5 text-center py-1 truncate'
const toggleContainer = ' flex w-full border border-gray-800 rounded cursor-pointer text-sm divide-x'

const btns = ' fixed bottom-[86px] w-full flex justify-between max-w-[400px] px-5 right-1/2 translate-x-1/2'
const nextBtn = 'w-[130px] bg-purple-500 text-center active:bg-purple-700 py-3 rounded-xl text-white text-lg  cursor-pointer font-bold'
const backBtn = 'w-[120px] flex items-center justify-center  bg-rose-500 pr-2 active:bg-rose-700 text-center py-3 rounded-xl text-lg text-white cursor-pointer font-bold'
const yellowBtn = 'w-[120px] font-bold border-2 text-lg border-yellow-300 active:bg-yellow-200 text-center rounded-xl'

const additional = 'flex w-full '
const content = 'flex flex-col justify-between w-full mb-10 '

const textArea = 'flex border h-min w-full rounded-xl border-purple-500'
const section = 'flex flex-col h-full w-full pt-24 max-w-[576px] border-none py-8 px-5 rounded-b'