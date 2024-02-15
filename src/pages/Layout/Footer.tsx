import React, { useEffect, useRef, useState } from 'react';
import { useMain } from '../../Store/useMain';
import { useStore } from '../../Store';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FcSettings } from "react-icons/fc";
import { PiUserListFill } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCardOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { FaSortDown } from "react-icons/fa";
// import { MdDirectionsBike } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

import babiSeat from '../../assets/babySeat.png'
import babiSeatPurple from '../../assets/babySeatPurple.png'
import carBags from '../../assets/carBags.png'
import carBagsPurple from '../../assets/carBagsPurple.png'


const Footer = (): React.ReactNode => {

    const { list, submit, setSubmit, activeCarId, isFrench, setSteps } = useMain()
    const { store } = useStore()
    const [screenWidth] = useState(window.innerWidth);
    const ref = useRef<Carousel>(null);

    const responsive = {
        tablet: {
            breakpoint: { max: 10000, min: 571 },
            items: 9
        },
        mobile: {
            breakpoint: { max: 570, min: 0 },
            items: 3
        }
    }

    useEffect(() => {
        if (screenWidth < 570) {
            if(list[activeCarId - 1].steps > 1 && list[activeCarId - 1].steps < 8) {
                ref.current?.goToSlide(list[activeCarId - 1].steps - 1)
            } else {
                list[activeCarId - 1].steps === 8
                ? ref.current?.goToSlide(6)
                : ref.current?.goToSlide(0)
            }
        }
    }, [list[activeCarId - 1].steps])

    return (
        <div className={footer}>
            <Carousel
                containerClass={`w-full`}
                className='max-w-[570px] w-full text-center mx-auto'
                ref={ref}
                arrows={false}
                responsive={responsive}
            >
                {(isFrench ? store.menuTabsF : store.menuTabs).map((item, index) => {
                    

                    return index === 8
                        ? <span
                            key={item}
                            className={submit ? footerTabActive : footerTab }
                            onClick={() => {
                                setSubmit(true)
                                setSteps(index)
                            }}>
                                <FaSortDown className={list[activeCarId - 1].steps === 8 ? arrIcon : ' hidden '}/>
                                <IoCheckmarkDoneSharp className={submit? footerIcon: footerIcon + ' text-green-500 '} />
                                <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-green-500 border-green-500'}>{index+1}</div>
                            <span className={footerTabText}>{isFrench ? store.menuTabsF[index] : store.menuTabs[index]}</span>
                        </span>

                        : <span
                            key={item}
                            className={(list[activeCarId - 1].steps === index) ? footerTabActive : footerTab}
                            onClick={() => {
                                if (index === 8) return setSubmit(true)
                                setSubmit(false); setSteps(index)
                            }}>
                            <FaSortDown className={(list[activeCarId - 1].steps === index && list[activeCarId - 1].steps !== 8) ? arrIcon : ' hidden '}/>
                            {index === 0
                                ? <>
                                    <FcSettings className={ footerIcon} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-slate-500 border-slate-600'}>{index+1}</div>
                                </>
                                : index === 1
                                ? <>
                                    <PiUserListFill className={footerIcon} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex}>{index+1}</div>
                                </>
                                : index === 2
                                ? <>
                                    <IoLocationOutline className={list[activeCarId - 1].steps===2 ? footerIcon : footerIcon + ' text-blue-500'} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-blue-500 border-blue-500'}>{index+1}</div>
                                </>
                                : index === 3
                                ? <>
                                    <IoLocationOutline className={list[activeCarId - 1].steps===3 ? footerIcon: footerIcon + ' text-orange-500'} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-orange-500 border-orange-500'}>{index+1}</div>
                                </>
                                : index === 4
                                ? <>
                                    <div style={{ backgroundImage: `url(${list[activeCarId - 1].steps === 4 ? carBagsPurple : carBags})` }} className={icon}></div>
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex}>{index+1}</div>
                                </>
                                : index === 5
                                ? <>
                                    <div style={{ backgroundImage: `url(${list[activeCarId - 1].steps === 5 ? babiSeatPurple : babiSeat})` }} className={icon}></div>
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-purple-500'}>{index+1}</div>
                                </>
                                : index === 6
                                ? <>
                                    <FaRunning className={list[activeCarId - 1].steps===6 ? footerIcon: footerIcon + ' text-blue-700 '} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-blue-700 border-blue-700'}>{index+1}</div>
                                </>
                                : <>
                                    <IoCardOutline className={list[activeCarId - 1].steps===7 ? footerIcon: footerIcon+' text-orange-900'} />
                                    <div className={list[activeCarId - 1].steps === index? tabIndexActive : tabIndex+ ' text-orange-900 border-orange-900 '}>{index+1}</div>
                                </>
                            }
                            
                            
                            <span className={footerTabText}>{isFrench ? store.menuTabsF[index] : store.menuTabs[index]}</span>
                        </span>
                    }
                    )
                }
            </Carousel>
        </div>
    );
};

const tabIndex = 'absolute flex font-bold -top-1 font bold flex items-center justify-center bg-white rounded-full shadow  border-black border-[0.5px] xs:left-3 -left-2 text-[24px] w-[26px] h-[26px] pt-[1px] '
const tabIndexActive = 'absolute text-purple-500 border-purple-500 flex font-bold -top-1 font bold flex items-center justify-center bg-white rounded-full shadow  border-black border-[0.5px] xs:left-3 -left-2 text-[24px] w-[26px] h-[26px] pt-[1px] '

const icon = 'text-xs w-10 bg-center h-7 bg-contain bg-no-repeat' 
const arrIcon = ' text-purple-500 text-2xl absolute -translate-y-9'
const footerIcon = 'text-3xl'
const footerTabText = 'text-[12px] leading-3  font-bold'

const footerTab = 'flex w-full relative flex-col items-center mx-1 text-center  py-1 text-gray-800 cursor-pointer'
const footerTabActive = 'w-full relative flex flex-col text-center mx-1 items-center  py-1 font-bold text-purple-500 rounded-xl cursor-pointer  '
const footer = "fixed -bottom-1 z-20 left-0 right-0  bg-white py-2 border-t"

export default Footer;