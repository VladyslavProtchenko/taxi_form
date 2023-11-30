import { create } from 'zustand'

interface IUser {
    titleList:string[];
    titleListF:string[];

    nameList:string[],
    nameListF:string[],

    emailList:string[],
    emailListF:string[],

    phoneList:string[],
    phoneListF:string[],

    phoneTitleList:string[],
    phoneTitleListF:string[],

    typeList: string[], 
    typeListR: string[], 

    nowLater: string[],
    nowLaterF: string[],

    locationList: string[],
    locationListF: string[],

    tripTitles: string[],
    tripTitlesF: string[],


    seatsList: string[];
    carList:string[];
    carListF:string[];
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
    store: IUser;

}
export const useStore = create<Store>(() => ({
    store: {
        // French Version : const [tripType, setTripType] = useState('S.V.P. choisissez :');
        // French Version : const [tripList, setTripList] = useState(['Affaires', 'Vacance']);
        // Fench Version : const [paymentTypeList, setPaymentTypeList] = useState(['Crédit', 'Débit', 'Comptant', 'Coupon']);

        //  defaultLocations: [ 'Aéroport - Montréal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Gare Centrale de Montreal(895 de la //Gauchetière Ouest)', 'Train - Dorval Station','Bus - Bus - Station Centrale d’autobus( 1717 rue Berri)',]
        // defaultLocations: ['Airport - Montreal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Central Station( 895 Gauchetière Ouest)', 'Train - Dorval Station', 'Bus - Central Station( 1717 Rue Berri)',],
        numbersList:['st', 'nd', 'rd', 'th'],
        numbersListF:['st', 'nd', 'rd', 'th'],

        titleList: ['Mr.', 'Mrs.', 'Miss.', 'Undefined' ],
        titleListF: ['M.', 'Mne.', 'Mlle.', 'Indéfini' ],

        nameList:['Your name', 'Second name', 'Third name'],
        nameListF:['Votre nom','Deuxième nom', 'Troisième nom'],

        emailList:['Your e-mail', 'Second e-mail', 'Third e-mail'],
        emailListF:['Votre courriel','Deuxième courriel','Troisième courriel'],

        phoneList:['Your phone','Second phone','Third phone'],
        phoneListF:['Votre cellulaire', 'Deuxième téléphone ', 'Troisième téléphone',],

        phoneTitleList:['Mobile', 'Home', 'Work'],
        phoneTitleListF:['Portable','Maison','Travail'],

        tripTitles: ['One-Way', 'Return'],
        tripTitlesF: ['Aller', 'Retour'],

        typeList: ['Transport', 'Delivery', 'Boost', 'Unlocking door'], 
        typeListR: [], 

        nowLater: ['Now', 'Later'],
        nowLaterF: ['Maintenant', 'Après'],

        locationList: ['Pick Up','Drop Off','First Stop','Second Stop','Third Stop','Fourth Stop'],
        locationListF: ['Ramassage','Débarquement','Premier Arrêt','Deuxième Arrêt','Troisième Arrêt','Quatrième Arrêt',],
        
        defaultLocations: ['YUL - Montreal Airport', 'YMX - Mirabel Airport', 'YHU - Saint-Hubert Airport', 'Train - Montreal Central Station', 'Train - Dorval Central Station','Bus - Central Station( 1717 Rue Berri)'],
        
        carList:['Sedan', 'SUV', 'VAN', 'Limo'],
        carListF:['Berline', 'VUS', "VAN", "Limo"],

        bagsWeightList:['8 kg', '19 kg', 'Between', '23 kg', '32 kg'],
        sportList: ['Bikes', 'Skis', 'Golf', 'Surfing'],
        seatsList:['Regular seat','Baby seat','Booster', 'Regular Stroller', 'Umbrella stroller', 'Double stroller', 'wheel chair'],
        petList: ['Dogs->(Mira, small,big)->Ch.box(in a cage)','Cat->Ch.kbox(in a cage)','Rabbit' ],
        options: ['Small stroller','Big stroller','WheelChair'],

        tripList:['Business (need receipt)', 'Vacation', 'Else'],
        departureSections: ['Domestic', 'International', 'USA', 'Arrivals'],
        paymentList: ['Cash', 'Debit', 'Credit Card(need receipt),', 'Voucher','Office Charges'],
        flights: ['Air Canada', 'Air Canada(to USA)', 'Air Transat','Air Transat (to USA)', 'Sunwing', 'Qatar', 'RAM', 'Another'],

        
    
        airportArray: ['plane','airport','airport,', 'Airport','Airport - Montreal ( 975 Roméo-Vachon)','Aéroport - Montréal ( 975 Roméo-Vachon)', 'YUL - Montreal Airport'],
        busArray:['bus',  'bus station', ],
        trainArray:[ 'train', 'train station underground', ],
        boatArray : [ 'boat', ],
        hotelArray: [ 'room', 'hotel', ],

        
    },

}))