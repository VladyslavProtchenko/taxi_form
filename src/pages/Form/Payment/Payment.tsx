import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { useOptions } from "../../../Store/useOptions";
// import { useReturnLocation } from "../../../Store/useReturnLocation";

const PaymentSection = () => {
    const {user} = useInfo()
    const {user:location} = useLocation()
    const {options} = useOptions()


    return (
        <section className={section}>
            
            <div className={mobileContent}>

            </div>
            <div className={content}>
                <div className="name">Dear,{user.gender}, {user.name} you car:</div>
                <div className="catTitle">{options.carType}</div>
                <div className="date">Will arrive {location.date}, at: {location.time}</div>
                <div className="trip">From: {location.pickUpLocation} to {location.dropOffLocation}</div>
            </div>

        </section>
    );
};

export default PaymentSection;

const mobileContent = 'md:hidden lg:hidden xl:hidden 2xl:hidden'

const content = 'flex text-xs text-gray-500'
const section = 'flex flex-col w-full mb-8 p-8 sm:py-8 sm:px-1 border-b border-gray-300 sm:w-[320px] lg:w-[1024px] xl:w-[1024px] 2xl:w-[1024px] sm:border-none sm:m-0'