import React from 'react';
import { TiInfoLarge } from "react-icons/ti";
import { useMain } from '../../Store/useMain';
import en from '../../assets/usa.png'
import fr from '../../assets/france.png'

const Header = (): React.ReactNode => {
    const { list, resetForm, restoreForm, submit, activeCarId, isFrench, setIsFrench, infoOpen, setInfoOpen } = useMain()

    return (
        <div className={header}>
            <div className={wrapper}>
                <div className={content}>
                    <div className={lang} onClick={() => setIsFrench(!isFrench)}>
                        {isFrench
                            ? <><div style={{ backgroundImage: `url(${en})` }} className={image} ></div><div className={langItem} >EN</div></>
                            : <><div style={{ backgroundImage: `url(${fr})` }} className={image} ></div><div className={langItem} >FR</div></>
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
                    <div className={iIcon} onClick={()=>setInfoOpen(!infoOpen)}><TiInfoLarge className='cursor-pointer text-3xl' /></div>
                    <div className={step}><span className='text-gray-500 font-bold'>{list[activeCarId - 1].steps + 1}</span>/9</div>
                </div>

                {activeCarId !==1 && <div className={toggleButton}>
                    <div onClick={resetForm} className={list[activeCarId-1].isReset ? toggleActive: toggle}>{isFrench? 'Effacer les données':'Reset data'}</div>
                    <div onClick={restoreForm} className={list[activeCarId-1].isReset ? toggle: toggleActive}>{isFrench? 'Utiliser les données disponibles':'Use available data'}</div>
                </div>}
            </div>
        </div>
    );
};

export default Header;

const toggle = 'px-2  border-purple-500 '
const toggleActive = 'px-2   border-purple-500 bg-purple-500 text-white'
const toggleButton = ' flex text-[10px] border rounded-full self-center divide-x cursor-pointer border-purple-500 overflow-hidden'
const content = 'flex items-center w-full justify-between mb-1' 
const image = 'w-8 h-5 text-xs bg-center bg-cover bg-no-repeat'
const iIcon = " flex items-center justify-center border-2  rounded-full border-orange-400 text-orange-400 "
const headerText = 'flex font-bold items-center mx-auto text-blue-700 text-lg '
const step = "text-2xl ml-2 text-gray-300"
const wrapper = 'flex flex-col w-full max-w-[576px] px-4 '
const lang = 'flex cursor-pointer items-center'
const langItem = ' px-1 text-gray-600 font-thin text-xl'
const header = 'fixed top-0 left-0 right-0 pt-4 pb-2 items-center justify-center z-40 bg-gray-50 flex w-full  '


