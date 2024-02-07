import React, { useEffect, useRef, useState } from 'react';
import { useMain } from '../../Store/useMain';
import { useStore } from '../../Store';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { PiUserListLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
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
            breakpoint: { max: 10000, min: 480 },
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
            <div className={arrows}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => list[activeCarId - 1].steps === index
                    ? <FaSortDown className={arrIcon} key={index} />
                    : <div className='w-[20px]' key={index}></div>
                )}
            </div>
            <div className={arrowsXs}>
                {[1, 1, 1].map((_, index) => {
                    if (list[activeCarId - 1].steps > 0 && list[activeCarId - 1].steps < 8) {
                        return index === 1
                            ? <FaSortDown className={arrIcon} key={index} />
                            : <div className='w-[20px]' key={index}></div>
                    } else if (submit) {
                        return index === 2
                            ? <FaSortDown className={arrIcon} key={index} />
                            : <div className='w-[20px]' key={index}></div>
                    } else if (list[activeCarId - 1].steps === 0) {
                        return index === 0
                            ? <FaSortDown className={arrIcon} key={index} />
                            : <div className='w-[20px]' key={index}></div>
                    }

                })}
            </div>

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
                            className={submit ? footerTabActive : footerTab}
                            onClick={() => {
                                setSubmit(true)
                                setSteps(index)
                            }}>
                                <IoCheckmarkDone className={footerIcon} />
                            <span className={footerTabText}>{isFrench ? store.menuTabsF[index] : store.menuTabs[index]}</span>
                        </span>

                        : <span
                            key={item}
                            className={(list[activeCarId - 1].steps === index) ? footerTabActive : footerTab}
                            onClick={() => {
                                if (index === 8) return setSubmit(true)
                                setSubmit(false); setSteps(index)
                            }}>
                            {index === 0
                                ? <IoSettingsOutline className={footerIcon} />
                                : index === 1
                                ? <PiUserListLight className={footerIcon} />
                                : index === 2 || index === 3
                                ? <CiLocationOn className={footerIcon} />
                                : index === 4
                                ? <div style={{ backgroundImage: `url(${list[activeCarId - 1].steps === 4 ? carBagsPurple : carBags})` }} className={icon}></div>
                                : index === 5
                                ? <div style={{ backgroundImage: `url(${list[activeCarId - 1].steps === 5 ? babiSeatPurple : babiSeat})` }} className={icon}></div>
                                : index === 6
                                ? <FaRunning className={footerIcon} />
                                : <CiMoneyCheck1 className={footerIcon} />
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

const arrows = "xs:hidden h-0 flex justify-around max-w-[576px] absolute -top-6 right-1/2 translate-x-1/2 w-full"
const arrowsXs = " xs:flex h-0 hidden justify-around max-w-[576px] absolute -top-6 right-1/2 translate-x-1/2 w-full"

const icon = 'text-xs w-10 bg-center h-7 bg-contain bg-no-repeat' 
const arrIcon = ' text-purple-500 text-xl'
const footerIcon = 'text-3xl'
const footerTabText = 'text-[10px] leading-3 '

const footerTab = 'flex relative flex-col items-center mx-1 text-center  w-[60px] py-1 text-gray-800 cursor-pointer'
const footerTabActive = ' relative flex flex-col text-center mx-1 items-center w-[60px]  py-1 font-bold text-purple-500 rounded-xl cursor-pointer  '
const footer = "fixed -bottom-1 z-20 left-0 right-0  bg-white py-2 border-t"

export default Footer;