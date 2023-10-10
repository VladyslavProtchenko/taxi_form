import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useReturnLocation } from "../../../Store/useReturnLocation";

const AddressSection = () => {
    const { user } = useReturnLocation()

    return (
        <section className={section}>
            <TripContent />
            {user.isReturnTrip &&  <ReturnTrip />}
        </section>
    );
};

export default AddressSection;

const section = 'flex flex-col w-full  px-8 py-4 relative sm:px-1 border-gray-300 sm:w-[320px] border-b lg:w-[1024px] xl:w-[1024px] 2xl:w-[1024px] sm:border-none'