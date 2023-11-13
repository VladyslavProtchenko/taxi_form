import { useMain } from '../../Store/useMain';
// import { useSteps } from '../../Store/useSteps';
import { useValidation } from '../../Store/useValidation';
import { useEffect, useState } from 'react';

const Steps = () => {
    
    const { activeCarId, list, setSteps } = useMain()
    const { validation, setIsSubmit } = useValidation()
    // const [disabled, setDisabled] = useState(true)

    // useEffect(()=>{
    //     // setDisabled(true)
    //     if(list[activeCarId-1].steps === 1 && (validation.isTitle && validation.isName && validation.isPhone && validation.isEmail)) return setDisabled(false);
    //     if(validation.isReturn && list[activeCarId-1].steps === 2
    //         && (!validation.isDateBack || !validation.isTimeBack)
    //     ) return setDisabled(true)

    //     if(validation.isReturn && list[activeCarId-1].steps === 2 
    //         && validation.isDateBack
    //         && validation.isTimeBack
    //     )  return setDisabled(false);

    //     if(list[activeCarId-1].steps === 2 && 
    //         (validation.isDate 
    //         && validation.isTime 
    //         && validation.isFrom
    //         && validation.isTo
    //     )) return setDisabled(false);

    //     if(list[activeCarId-1].steps === 3 && validation.isCarType)return setDisabled(false);
    // },[list[activeCarId-1].steps, validation, validation.isReturn])
    
    return (
        <div className={buttons +' text-gray-300 active:text-gray-300'}>
            {list[activeCarId-1].steps != 1 && <div 
                className={navBtn}
                onClick={() =>{
                    if(validation.isSubmit) {
                        setIsSubmit(false)
                        return setSteps(1)
                    } 
                    if(list[activeCarId-1].steps <=1 ) return setSteps(1)
                    setSteps(list[activeCarId-1].steps - 1)
                }}
            >back</div>}

            {list[activeCarId-1].steps != 4 && <div 
                className={'' 
                    ? navBtn + `${list[activeCarId-1].steps === 1? ' ml-auto': ''}`
                    : ' text-gray-200 active:text-gray-200 ' + navBtn+ `${list[activeCarId-1].steps === 1? ' ml-auto': ''}`}
                onClick={() =>{
                    if(list[activeCarId-1].steps >= 5 ) return setSteps(4)
                    // if(disabled) return;
                    console.log(list[activeCarId-1].steps, 'stepsss')
                    // if(list[activeCarId-1].steps === 2 && 
                    //     (validation.isDate 
                    //     && !validation.isTime 
                    //     && !validation.isFrom
                    //     && !validation.isTo
                    //     && (validation.isReturn && !validation.isDateBack)
                    //     && (validation.isReturn && !validation.isTimeBack)
                    //     && (validation.isReturn && !validation.isBackFrom)
                    //     && (validation.isReturn && !validation.isBackTo)
                    //     )) return;
                    setSteps(list[activeCarId-1].steps + 1)
                }}
            >next</div>}
        </div>
    );
};

export default Steps;

const navBtn = ' flex items-center text-xl text-white active:text-gray-500 px-4 py-1 cursor-pointer bg-red-500 active:bg-red-400 rounded'
const buttons = 'flex max-w-[320px] w-full justify-between px-3 mt-4 mb-4'
