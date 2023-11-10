import { useSteps } from '../../Store/useSteps';
import { useValidation } from '../../Store/useValidation';
import { useEffect, useState } from 'react';

const Steps = () => {
    const { store, setSteps } = useSteps()
    const { validation, setIsSubmit } = useValidation()
    const [disabled, setDisabled] = useState(true)

    useEffect(()=>{
        setDisabled(true)
        if(store.steps === 1 && (validation.isTitle && validation.isName && validation.isPhone && validation.isEmail)) return setDisabled(false);
        if(validation.isReturn && store.steps === 2
            && (!validation.isDateBack || !validation.isTimeBack)
        ) return setDisabled(true)

        if(validation.isReturn && store.steps === 2 
            && validation.isDateBack
            && validation.isTimeBack
        )  return setDisabled(false);

        if(store.steps === 2 && 
            (validation.isDate 
            && validation.isTime 
            && validation.isFrom
            && validation.isTo
        )) return setDisabled(false);

        if(store.steps === 3 && validation.isCarType)return setDisabled(false);
    },[store.steps, validation, validation.isReturn])
    
    return (
        <div className={disabled ? buttons: buttons +' text-gray-300 active:text-gray-300'}>
            {store.steps != 1 && <div 
                className={navBtn}
                onClick={() =>{
                    if(validation.isSubmit) {
                        setIsSubmit(false)
                        return setSteps(1)
                    } 
                    if(store.steps <=1 ) return setSteps(1)
                    setSteps(store.steps - 1)
                }}
            >back</div>}

            {store.steps != 4 && <div 
                className={!disabled 
                    ? navBtn + `${store.steps === 1? ' ml-auto': ''}`
                    : ' text-gray-200 active:text-gray-200 ' + navBtn+ `${store.steps === 1? ' ml-auto': ''}`}
                onClick={() =>{
                    if(store.steps >= 5 ) return setSteps(4)
                    if(disabled) return;

                    if(store.steps === 2 && 
                        (validation.isDate 
                        && !validation.isTime 
                        && !validation.isFrom
                        && !validation.isTo
                        && (validation.isReturn && !validation.isDateBack)
                        && (validation.isReturn && !validation.isTimeBack)
                        && (validation.isReturn && !validation.isBackFrom)
                        && (validation.isReturn && !validation.isBackTo)
                        )) return;
                    setSteps(store.steps + 1)
                }}
            >next</div>}
        </div>
    );
};

export default Steps;

const navBtn = ' flex items-center text-2xl text-white active:text-gray-500 px-5 py-2 bg-red-500 active:bg-red-400 rounded-full'
const buttons = 'flex max-w-[320px] w-full justify-between px-3 mt-4 mb-4'
