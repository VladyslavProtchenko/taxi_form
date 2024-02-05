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
                <div className={lang} onClick={() => setIsFrench(!isFrench)}>
                    {isFrench
                        ? <><div style={{ backgroundImage: `url(${fr})` }} className={image} ></div><div className={langItem} >EN</div></>
                        : <><div style={{ backgroundImage: `url(${en})` }} className={image} ></div><div className={langItem} >FR</div></>
                    }
                </div>
                <div className={submit ? headerText +' opacity-0': headerText}>
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
                </div>
                <div className={iIcon} onClick={()=>setInfoOpen(!infoOpen)}><TiInfoLarge className='cursor-pointer text-lg' /></div>
                <div className={step}>{list[activeCarId - 1].steps + 1}/9</div>
            </div>
        </div>
    );
};

export default Header;


const image = 'w-8 h-5 text-xs bg-center bg-cover bg-no-repeat'
const iIcon = " flex items-center justify-center border-2  rounded-full border-orange-400 text-orange-400 "
const headerText = 'flex items-center mx-auto text-gray-600 text-base'
const step = "text-2xl ml-2 text-gray-300"
const wrapper = 'flex relative items-center px-4 justify-between w-full max-w-[576px]'
const lang = 'flex cursor-pointer items-center'
const langItem = ' px-1 text-gray-600 font-thin text-xl'
const header = 'fixed top-0 left-0 right-0 pt-4 pb-2 items-center justify-center z-40 bg-gray-50 flex w-full  '
