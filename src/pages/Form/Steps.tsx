import { useReturnLocation } from '../../Store/useReturnLocation';
import { useSteps } from '../../Store/useSteps';

const Steps = () => {
    const {  returnTrip, setIsReturnTrip } = useReturnLocation()

    const { store, setSteps } = useSteps()

    return (
        <div className={buttons}>
        {store.steps != 1 && <div 
            className={navBtn}
            onClick={() =>{
                if(store.steps <=1 ) return setSteps(1)
                setSteps(store.steps - 1)
            }}
        >back</div>}

        {store.steps === 2 &&<div 
            className={returnTrip.isReturnTrip ? returnBtn + ' text-red-500': returnBtn +''}
            onClick={() => setIsReturnTrip(!returnTrip.isReturnTrip)}
        >{returnTrip.isReturnTrip? '-': '+'}return trip</div>}

        {store.steps != 4 && <div 
            className={(store.steps === 1)? navBtn+' ml-auto': navBtn}
            onClick={() =>{
                if(store.steps >= 4 ) return setSteps(4)
                setSteps(store.steps + 1)
            }}
        >next</div>}
    </div>
    );
};

export default Steps;

const navBtn = ' px-2 py-1 bg-yellow-200  rounded active:bg-yellow-100 active:text-gray-500'
const returnBtn = 'self-center   text-green-300 active:text-green-500'

const buttons = 'flex max-w-[320px] w-full justify-between px-3 mt-auto mb-10'
