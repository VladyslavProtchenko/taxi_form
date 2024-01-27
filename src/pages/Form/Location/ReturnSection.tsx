
import React, { useEffect } from "react";
import ReturnTrip from "./ReturnTrip";
import { useMain } from "../../../Store/useMain";



const ReturnSection = ():React.ReactNode => {

    const { list, setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()


    useEffect(()=>{
        if(list[activeCarId-1].type>2) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])
    return (
        <section className={section}>
            <div className={list[activeCarId-1].isReturnTrip ? 'hidden':'absolute top-[84px] left-0 right-0 h-[400px] z-20 bg-white opacity-50'}></div>
            <div className={(list[activeCarId-1].type<3) ? 'flex flex-col w-full  mt-4': 'hidden'}>
                <div className={returnTabActiveOne} onClick={()=>{setIsReturnTrip(!list[activeCarId-1].isReturnTrip )}}>
                    <span
                        className={list[activeCarId-1].isReturnTrip ? tab+ ' bg-rose-500' : tab + ' bg-green-400 ' }
                    >{list[activeCarId-1].isReturnTrip ? '- Take of return':'+ Add return'}</span>
                </div>
            </div>

            <ReturnTrip />
        </section>
    );
};

export default ReturnSection;

const tab = ' text-center py-1 duration-300 rounded-full px-3 font-bold'
const returnTabActiveOne = 'max-w-[120px] mx-5 items-center  z-10  text-white rounded-full flex ' 

const section = 'flex relative h-full flex-col w-full pt-10 max-w-[576px]'