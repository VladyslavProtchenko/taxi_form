import React from 'react';
import { useMain } from '../../Store/useMain';
import useOnclickOutside from "react-cool-onclickoutside";
import { IoMdClose } from "react-icons/io";
import { useStore } from '../../Store/index';
import { PiArrowArcLeftBold } from "react-icons/pi";
import day from './../../assets/day.png'
// import night from './../../assets/stars.jpg'
import night from './../../assets/night.png'

const InfoMenu = (): React.ReactNode => {
    const { infoOpen, setInfoOpen,isFrench } = useMain()
    const { store } = useStore()
    const ref = useOnclickOutside(() => setInfoOpen(false));  


    return (
        <div className={infoOpen ? modalOpen : modal} ref={ref}>
            <IoMdClose className={closeIcon} onClick={() => setInfoOpen(false)} />
            <div className={infoOpen ? modalContent : ' opacity-0 '}>
                <div className={fromTo}>
                    <div className=' text-center font-bold bg-white bg-opacity-75 px-1 rounded mx-auto'>$48,40</div>
                    <div className='flex items-center bg-white border border-black rounded '>
                        <PiArrowArcLeftBold className='rotate-[260deg] text-xl translate-x-1'/>
                        <div className='flex flex-col items-center w-[140px]'>
                            <span className='flex'>{isFrench?'Aéroport de Montréal':'Montreal Airport'}</span> 
                            <span className='flex'>{isFrench?'Centre-ville de Montréal':'Montreal Downtown'}</span> 
                        </div>
                        <PiArrowArcLeftBold className='rotate-[70deg] text-xl -translate-x-1'/>

                    </div>
                    <div className=' text-center font-bold text-white bg-black bg-opacity-75 px-1 rounded mx-auto'>$55,65 </div>
                </div>
                <div className={titles}>
                    <span className={titleItem+ ' w-full'}>
                        {isFrench?<>Ouverture <br /> du taximètre</>:<>Taximeter <br /> opening</>}
                    </span>
                    <span className={titleItem+ ' w-full'}>
                        {isFrench?<>Redevance <br /> gouvernementale</>:<>Government <br />Fee</>}
                    </span>
                    <span className={titleItem}>
                        {isFrench?<>Vitesse <br /> de transition</>:<>Transition <br />speed</>}
                    </span>
                    <span className={titleItem}>
                        {isFrench?'Par minute': 'Per minute'}
                    </span>
                    <span className={titleItem}>
                        {isFrench?'Par km': 'Per km'}
                    </span>
                </div>
                <div className={side + ' border-r'} style={{backgroundImage:`url(${day})` }}>
                    <h1 className={title}>{isFrench?'Tariffication du jour': 'Day Fare'}</h1>
                    <h2 className={time}>
                        <span className='bg-white rounded-t-lg bg-opacity-90 px-2'>{isFrench? 'Plage horaire':'Time Range'} </span> 
                        <br/><span className='bg-white rounded-lg bg-opacity-90 px-2'>05:00:00 am To 22:59:59</span> </h2>
                    <div className={priceItem+ ' mb-6'}>$ {store.dayPrices[0]}</div>
                    <div className={priceItem+ ' mb-6'}>$ {store.dayPrices[1]}</div>
                    <div className={priceItem+ ' mb-[14px]'}>if {'> '+store.dayPrices[2]} km/h</div>
                    <div className={priceItem}>{'if < '+ store.dayPrices[2]} km/h</div>
                    <div className={priceItem}>if &#8805; {store.dayPrices[3]} km/h</div>

                </div>
                <div className={side2} style={{backgroundImage:`url(${night})` }}>
                    <h1 className={title}>{isFrench?'Tariffication de nuit': 'Night Fare'}</h1>
                    <h2 className={time}>
                        <span className='bg-black rounded-t-lg bg-opacity-75 px-2'>{isFrench? 'Plage horaire':'Time Range'} </span> 
                        <br/><span className='bg-black rounded-lg bg-opacity-75 px-2'>23:00:00   To 04:59:59</span>
                    </h2>
                    <div className={priceItem2+ ' mb-6'}>$ {store.nightPrices[0]}</div>
                    <div className={priceItem2+ ' mb-6'}>$ {store.nightPrices[1]}</div>
                    <div className={priceItem2+ ' mb-[14px]'}>if &#8805; {store.nightPrices[2]} km/h</div>
                    <div className={priceItem2}>if{' < '+ store.nightPrices[2]} km/h</div>
                    <div className={priceItem2}>if &#8805; {store.nightPrices[3]} km/h</div>
                </div>
            </div>

            <div className={infoOpen ? fees: 'opacity-0'}>Au montant de départ s’ajoute une redevance de 0,90 $ + taxes (1,05 $) </div>
        </div>
    );
};

export default InfoMenu;

const titleItem = 'bg-white px-3 rounded border border-black'
const time = ' mb-[141px] text-center '
const fromTo = ' absolute flex right-1/2 translate-x-1/2 justify-center items-center top-28  rounded-lg  w-full'
const titles = ' absolute px-1  w-[140px] text-sm right-1/2 translate-x-1/2 flex flex-col items-center top-[200px]   space-y-1 py-2 text-center rounded-lg'

const fees = 'px-4 text-gray-400 italic text-center mt-auto mb-4 duration-[3000ms]'
const priceItem = ' flex mb-1 h-[22px] pr-[40px] justify-center w-full font-bold'
const priceItem2 = ' flex mb-1 h-[22px] pl-[40px] justify-center w-full font-bold'

const title = 'text-cente mb-4 border-[1px] self-start px-2 mx-auto rounded border-black bg-white text-black'

const side = 'w-1/2  h-full px-2 flex flex-col  border-black pt-4 bg-no-repeat bg-cover'
const side2 = 'w-1/2  h-full px-2 flex flex-col text-white pt-4 bg-cover bg-right'
const modalContent = 'flex  mb-6 duration-[3000ms] h-full relative'
const closeIcon = 'absolute top-1 left-1 z-20 text-3xl cursor-pointer shadow-lg rounded-full hover:bg-white hover:bg-opacity-25'

const modal = 'fixed overflow-hidden flex flex-col top-4 bottom-4 shadow-xl rounded-l-xl right-0 w-[0px] bg-white z-50 duration-500 '
const modalOpen = 'fixed overflow-hidden flex flex-col top-4 bottom-4 shadow-xl rounded-l-xl right-0 w-[360px] bg-white z-50 duration-500'