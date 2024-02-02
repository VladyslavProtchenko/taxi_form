import React from 'react';
import { TiInfoLarge } from "react-icons/ti";
import { useMain } from '../../Store/useMain';
import en from '../../assets/english.png'
import fr from '../../assets/france.png'

const Header = (): React.ReactNode => {
    const { list, submit, activeCarId, isFrench, setIsFrench, infoOpen, setInfoOpen } = useMain()

    return (
        <div className={header}>
            <div className={wrapper}>
                <div className={step}>{list[activeCarId - 1].steps + 1}/9</div>
                <div className={lang} onClick={() => setIsFrench(!isFrench)}>
                    {isFrench
                        ? <><div style={{ backgroundImage: `url(${fr})` }} className={image} ></div><div className={langItem} >EN</div></>
                        : <><div style={{ backgroundImage: `url(${en})` }} className={image} ></div><div className={langItem} >FR</div></>
                    }
                </div>
                {!submit && <div className={headerText}>
                    {
                        list[activeCarId - 1].isEdit
                            ? isFrench ? 'Modification ' : 'Editing '
                            : isFrench ? 'Ajout ' : 'Adding '
                    }
                    {
                        activeCarId === 1
                            ? isFrench ? '1er' : '1st'
                            : activeCarId === 2
                                ? isFrench ? '2e' : '2nd'
                                : activeCarId === 3
                                    ? isFrench ? '3e' : '3rd'
                                    : isFrench ? activeCarId + 'e' : activeCarId + 'th'
                    } {isFrench ? ' Véhicule' : ' Car'}
                </div>}
                <div className={iIcon} onClick={()=>setInfoOpen(!infoOpen)}><TiInfoLarge className='cursor-pointer text-base' /></div>
            </div>
        </div>
    );
};

export default Header;


const image = 'w-5 h-5 text-xs bg-center bg-cover bg-no-repeat'
const iIcon = " flex items-center mt-8 mb-2 justify-center border-2  rounded-full border-orange-400 text-orange-400 "
const headerText = 'flex items-center mt-5 mx-auto text-gray-600'
const step = "text-base absolute text-gray-300 left-2 top-7 z-50"
const wrapper = 'flex relative items-center px-10 justify-between w-full max-w-[576px]'
const lang = 'flex cursor-pointer items-center  mt-6 mb-2 '
const langItem = ' px-1 text-gray-600 font-thin'
const header = 'fixed top-0 left-0 right-0 justify-center z-40 bg-gray-50 flex w-full  '
