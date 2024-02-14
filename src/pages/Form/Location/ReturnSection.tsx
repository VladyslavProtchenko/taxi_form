
import React, { useEffect } from "react";
import ReturnTrip from "./ReturnTrip";
import { useMain } from "../../../Store/useMain";



const ReturnSection = ():React.ReactNode => {

    const { list,isFrench, setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()


    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])


    return (
        <section className={section}>
            <div className={list[activeCarId-1].isReturnTrip ? 'hidden':'absolute top-[90px] left-0 right-0 h-[600px] z-20 bg-white opacity-50'}></div>
            <div className={(list[activeCarId-1].type<3) ? 'flex flex-col w-full  mt-4': 'hidden'}>
                <div className={returnTabActiveOne} onClick={()=>{setIsReturnTrip(!list[activeCarId-1].isReturnTrip )}}>
                    <span
                        className={list[activeCarId-1].isReturnTrip ? tab+ ' bg-rose-500' : tab + ' bg-green-400 ' }
                    >{list[activeCarId-1].isReturnTrip ? isFrench? '- décoller Retour ':'- take off Return':isFrench? '+ ajouter Retour': '+ add Return'}</span>
                </div>
            </div>

            <ReturnTrip />
        </section>
    );
};

export default ReturnSection;

const tab = ' text-center duration-300 rounded px-4 w-full font-bold text-2xl'
const returnTabActiveOne = 'self-center  border border-black mx-5 items-center  z-10  text-white rounded flex cursor-pointer items-center' 

const section = 'flex relative h-full flex-col w-full pt-10 max-w-[576px]'