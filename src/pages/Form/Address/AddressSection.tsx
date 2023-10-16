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

const section = 'flex flex-col w-full p-8 space-y-12 max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] lg:space-y-6'