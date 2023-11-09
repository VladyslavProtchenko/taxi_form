import { create } from 'zustand'

interface IUser {
    genderList:string[];
    seatsList: string[];
    carList:string[];
    bagsWeightList:string[];
    sportList: string[];
    petList: string[];
    options: string[];
    paymentList:string[];
    defaultLocations:string[];
    tripList:string[];
    departureSections: string[];
    flights: string[];
    airportArray: string[];
    busArray: string[];
    trainArray: string[];
    boatArray: string[];
    hotelArray: string[];

}
interface Store {
    user: IUser;
}
export const useStore = create<Store>(() => ({
    user: {
        // French Version : const [tripType, setTripType] = useState('S.V.P. choisissez :');
        // French Version : const [tripList, setTripList] = useState(['Affaires', 'Vacance']);
        // Fench Version : const [paymentTypeList, setPaymentTypeList] = useState(['Crédit', 'Débit', 'Comptant', 'Coupon']);

        //  defaultLocations: [ 'Aéroport - Montréal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Gare Centrale de Montreal(895 de la //Gauchetière Ouest)', 'Train - Dorval Station','Bus - Bus - Station Centrale d’autobus( 1717 rue Berri)',]
        // defaultLocations: ['Airport - Montreal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Central Station( 895 Gauchetière Ouest)', 'Train - Dorval Station', 'Bus - Central Station( 1717 Rue Berri)',],
        defaultLocations: ['YUL - Montreal Airport', 'YMX - Mirabel Airport', 'YHU - Saint-Hubert Airport', 'Train - Montreal Central Station', 'Train - Dorval Central Station','Bus - Central Station( 1717 Rue Berri)'],
        
        carList:['sedan (max 4)', 'SUV (max 4)', 'VAN (5-7)', 'limo (disabled)'],
        bagsWeightList:['8.5 kg', '19 kg', 'middle', '23 kg', '32 kg'],
        sportList: ['Bikes', 'Skis', 'Golf', 'Surfing'],
        seatsList:['Baby seat','Umbrella stroller', 'Regular Stroller', 'Booster seat'],
        petList: ['Dogs->(Mira, small,big)->Ch.box(in a cage)','Cat->Ch.kbox(in a cage)','Rabbit' ],
        options: ['Small stroller','Big stroller','WheelChair'],

        genderList:['Mr.', 'Msr.', 'Miss.', 'undefined'],
        tripList:['Business (need receipt)', 'Vacation', 'Else'],
        departureSections: ['Departure (Domestic)', 'Departure (International)', 'Departure (USA)', 'Arrival'],
        paymentList: ['Cash', 'Debit', 'Credit Card(need receipt),', 'Voucher','Office Charges'],
        flights: ['Air Canada', 'Air Canada(to USA)', 'Air Transat','Air Transat (to USA)', 'Sunwing', 'Qatar', 'RAM', 'Another'],
        airportArray: ['plane','airport','airport,', 'Airport','Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport'],
        busArray:['bus',  'bus station', ],
        trainArray:[ 'train', 'train station underground', ],
        boatArray : [ 'boat', ],
        hotelArray: [ 'room', 'hotel', ],
    },
}))