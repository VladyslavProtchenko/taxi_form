import React from 'react';
import { TiInfoLarge } from "react-icons/ti";
import { useMain } from '../../Store/useMain';
import en from '../../assets/usa.png'
import fr from '../../assets/france.png'

const Header = (): React.ReactNode => {
    const { list, reset1, reset2, reset3, reset4, reset5, reset6, restore1 , restore2,restore3,restore4,restore5,restore6, restoreForm, submit, activeCarId, isFrench, setIsFrench, infoOpen, setInfoOpen } = useMain()

    const resetHandler = () =>{
        if(list[activeCarId-1].steps === 1 ) {
            list[activeCarId-1].isReset[1] ?  restore1() : reset1()
        }
        if(list[activeCarId-1].steps === 2 ) {
            list[activeCarId-1].isReset[2] ?  restore2() : reset2()
        }
        if(list[activeCarId-1].steps === 3 ) {
            list[activeCarId-1].isReset[3] ?  restore3() : reset3()
        }
        if(list[activeCarId-1].steps === 4 ) {
            list[activeCarId-1].isReset[4] ?  restore4() : reset4()
        }
        if(list[activeCarId-1].steps === 5 ) {
            list[activeCarId-1].isReset[5] ?  restore5() : reset5()
        }
        if(list[activeCarId-1].steps === 6 ) {
            list[activeCarId-1].isReset[6] ?  restore6() : reset6()
        }
    }

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
                        { list[activeCarId - 1].isEdit? isFrench ? 'Modification ' : 'Editing ': isFrench ? 'Ajout ' : 'Adding '}
                        {activeCarId === 1
                            ? isFrench ? '1er' : '1st'
                            : activeCarId === 2
                            ? isFrench ? '2e' : '2nd'
                            : activeCarId === 3
                            ? isFrench ? '3e' : '3rd'
                            : isFrench ? activeCarId + 'e' : activeCarId + 'th'
                        } {isFrench ? ' Véhicule' : ' Car'}
                    </div>
                    <div className={iIcon} onClick={()=>setInfoOpen(!infoOpen)}><TiInfoLarge className='cursor-pointer text-3xl' /></div>
                    <div className={step}><span className='text-blue-500 font-black text-[22px] italic'>{list[activeCarId - 1].steps + 1}</span>|9</div>
                </div>

                {activeCarId ===1 
                ?<div className={toggleButton}>
                    <div onClick={resetHandler} className={list[activeCarId-1].isReset[list[activeCarId-1].steps] ? toggleActive: toggle}>{isFrench? 'Effacer les données':'Reset data'}</div>
                </div>
                :<div className={toggleButton}>
                    <div onClick={resetHandler} className={list[activeCarId-1].isReset[list[activeCarId-1].steps] ? toggleActive: toggle}>{isFrench? 'Effacer les données':'Reset data'}</div>
                    <div onClick={restoreForm} className={list[activeCarId-1].isReset[list[activeCarId-1].steps] ? toggle: toggleActive}>{isFrench? 'Utiliser les données disponibles':'Use available data'}</div>
                </div>}
            </div>
        </div>
    );
};

export default Header;

const toggle = 'px-2  border-purple-500 px-1 py-1'
const toggleActive = 'px-2  border-purple-500 bg-purple-500 text-white px-1 py-1'
const toggleButton = ' flex text-[20px] border rounded self-center divide-x cursor-pointer border-purple-500 overflow-hidden '
const content = 'flex items-center w-full justify-between' 
const image = 'w-8 h-5 text-xs bg-center bg-cover bg-no-repeat'
const iIcon = " flex items-center justify-center border-2  rounded-full border-orange-400 text-orange-400 "
const headerText = 'flex font-bold items-center mx-auto text-blue-700 text-lg   '
const step = "text-2xl ml-2 text-black font-bold "
const wrapper = 'flex flex-col w-full max-w-[576px] px-2 '
const lang = 'flex cursor-pointer items-center'
const langItem = ' px-1 text-gray-600 bold text-xl'
const header = 'fixed top-0 left-0 right-0 pt-4 pb-2 items-center justify-center z-40 bg-gray-50 flex w-full  '


