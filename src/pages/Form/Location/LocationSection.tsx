
import { useInfo } from "../../../Store/useInfo";
import Car1 from "./Car1";
import Car2 from "./Car2";
import Car3 from "./Car3";
import Car4 from "./Car4";
// import Car5 from "./Car5";


const LocationSection = () => {
    const {user} = useInfo()

    return (
        <section className={section}>
            <div className={(user.isCars[1] && !user.isCars[2] && !user.isCars[3] && !user.isCars[4]) ? '' : ' hidden' }>
                <Car1 />
            </div>
            <div className={user.isCars[2] ? '' : ' hidden' }>
                <Car2 />
            </div>
            <div className={user.isCars[3]  ? '' : ' hidden' }>
                <Car3 />
            </div>
            <div className={user.isCars[4] ? '' : ' hidden' }>
                <Car4 />
            </div>
            {/* <div className={user.isCars[5] ? '' : ' hidden' }>
                <Car5 />
            </div> */}
        </section>
    );
};
export default LocationSection;

// const addCar = 'flex  py-1 font-bold text-gray-200 hover:text-gray-400 cursor-pointer'
// const removeCar = ' px-2 no-underline'



const section = 'flex flex-col w-full p-8 justify-between max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] sm:flex-col '