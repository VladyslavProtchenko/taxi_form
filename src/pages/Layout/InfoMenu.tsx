import React from 'react';
import { useMain } from '../../Store/useMain';
import useOnclickOutside from "react-cool-onclickoutside";
import { IoMdClose } from "react-icons/io";
import { useStore } from '../../Store/index';

import { CgArrowsExchange } from "react-icons/cg";

const InfoMenu = (): React.ReactNode => {
    const { infoOpen, setInfoOpen,isFrench } = useMain()
    const { store } = useStore()
    const ref = useOnclickOutside(() => setInfoOpen(false));  


    return (
        <div className={infoOpen ? modalOpen : modal} ref={ref}>
            <IoMdClose className={closeIcon} onClick={() => setInfoOpen(false)} />
            <div className={infoOpen ? modalContent : ' opacity-0 '}>
                <div className={fromTo}>
                    <span>TEXT TEXT</span> 
                    <div className="flex justify-around w-full">
                        <div className='w-[40%] text-center'>$48,40 Montrial Airport </div>
                        <CgArrowsExchange className='text-xl'/>
                        <div className='w-[40%] text-center'>Downtown $55,65 </div>
                    </div>
                </div>
                <div className={titles}>
                    <span>{isFrench?'Ouverture du taximètre': 'Taximeter opening'}</span>
                    <span>{isFrench?'Redevance gouvernementale': 'Government Fee'}</span>
                    <span>{isFrench?'Vitesse de transition 22,537 km/h': 'Transition speed 22,537 km/h'}</span>
                    <span>{isFrench?'Per minute': 'Per minute'}</span>
                    <span>{isFrench?'Per km': 'Per km'}</span>
                </div>
                <div className={side + ' border-r'}>
                    <h1 className={title}>{isFrench?'Tariffication du jour': 'Day Fare'}</h1>
                    <h2 className={time}>Time Range <br/> 05:00:00 am To 22:59:59</h2>
                    <div className={priceItem}>${store.dayPrices[0]}</div>
                    <div className={priceItem+ ' mb-3'}>${store.dayPrices[1]}</div>
                    <div className={priceItem+ ' mb-3'}>${store.dayPrices[2]} km/h</div>
                    <div className={priceItem}>if{' < $'+ store.dayPrices[2]} km/h</div>
                    <div className={priceItem}>if &#8805; ${store.dayPrices[2]} km/h</div>

                </div>
                <div className={side}>
                    <h1 className={title}>{isFrench?'Tariffication de nuit': 'Night Fare'}</h1>
                    <h2 className={time}>Time Range <br/> 23:00:00   To 04:59:59</h2>
                    <div className={priceItem2}>${store.nightPrices[0]}</div>
                    <div className={priceItem2+ ' mb-3'}>${store.nightPrices[1]}</div>
                    <div className={priceItem2+ ' mb-3'}>${store.nightPrices[2]} km/h</div>
                    <div className={priceItem2}>if{' < $'+ store.nightPrices[2]} km/h</div>
                    <div className={priceItem2}>if &#8805; ${store.nightPrices[2]} km/h</div>
                </div>
            </div>
            <div className={infoOpen ? fees: 'opacity-0'}>Au montant de départ s’ajoute une redevance de 0,90 $ + taxes (1,05 $) </div>
        </div>
    );
};

export default InfoMenu;

const time = ' mb-[92px] text-center'
const fromTo = ' absolute flex w-full flex-col items-center top-20 bg-white'
const titles = ' absolute px-1 w-[140px] text-sm right-1/2 translate-x-1/2 flex flex-col items-center top-[134px] bg-white border space-y-1 py-2 text-center rounded-lg'

const fees = 'px-4 text-gray-400 italic text-center mt-auto mb-4 duration-[3000ms]'
const priceItem = ' flex mb-1 h-[20px] pr-[66px] justify-center w-full'
const priceItem2 = ' flex mb-1 h-[20px] pl-[66px] justify-center w-full'

const title = 'text-center '

const side = 'w-1/2  h-full px-2 flex flex-col '
const modalContent = 'flex  mb-6 duration-[3000ms] h-full relative'
const closeIcon = ' mt-4 ml-4 text-xl '

const modal = 'fixed overflow-hidden flex flex-col top-4 bottom-4 shadow-xl rounded-l-xl right-0 w-[0px] bg-white z-50 duration-500 '
const modalOpen = 'fixed overflow-hidden flex flex-col top-4 bottom-4 shadow-xl rounded-l-xl right-0 w-[360px] bg-white z-50 duration-500'