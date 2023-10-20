import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";

const AddressSection = () => {

    return (
        <section className={section}>
            <TripContent />
            <ReturnTrip />
        </section>
    );
};
export default AddressSection;

const section = 'flex w-full p-8  max-w-[1240px] sm:py-8 sm:px-1 sm:max-w-[576px] lg:space-y-6'