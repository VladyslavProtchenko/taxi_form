import { create } from 'zustand'

export interface IStore {
    titleList: string[];
    titleListF: string[];



    phoneList: string[],
    phoneListF: string[],

    phoneTitleList: string[],
    phoneTitleListF: string[],



    nowLater: string[],
    nowLaterF: string[],

    locationList: string[],
    locationListF: string[],

    tripTitles: string[],
    tripTitlesF: string[],


    carList: string[];
    carListF: string[];

    paymentList: string[];
    paymentListF: string[];
    tripList: string[];
    tripListF: string[];
    departureSections: string[];
    flights: string[];

    iconValues:{ [key: string]: string[] };


    menuTabs: string[];
    menuTabsF: string[];
    dayPrices: string[];
    nightPrices: string[];

    // emailList: string[],
    // emailListF: string[],
    // nameList: string[],
    // nameListF: string[],


    // typeList: string[],
    // typeListF: string[],

}
interface Store {
    store: IStore;

}
export const useStore = create<Store>(() => ({
    store: {

        menuTabs: ['Service Type' , 'Contacts', 'One-Way','Return', 'Vehicle & Passengers', 'Seats & Strollers','Sport & Pets', 'Payment' , 'Confirmation'],
        menuTabsF: ['Type Service', 'Contacts', 'Aller', 'Retour', 'Véhicule et Passagers','Sièges & Poussettes','Sport & Animaux', 'Paiement', 'Confirmation'],
        // numbersList: ['st', 'nd', 'rd', 'th'],
        // numbersListF: ['st', 'nd', 'rd', 'th'],

        dayPrices: [ '4.10', '1.05','22.537','0.77', '2.05'],//prices:  from start/ per km/ minute of waiting / fee 0.9/ tax  1.05
        nightPrices: ['4.70', '1.05','22.573','0.89', '2.35' ],

        titleList: ['Mr.', 'Mrs.', 'Miss.', 'Prefer Not To say'],
        titleListF: ['M.', 'Mme.', 'Mlle.', 'Préfère ne pas dire'],




        phoneList: ['Your phone', 'Second phone', 'Third phone'],
        phoneListF: ['Votre cellulaire', 'Deuxième cellulaire ', 'Troisième cellulaire'],

        phoneTitleList: ['Mobile', 'Home', 'Work'],
        phoneTitleListF: ['Cellulaire', 'Domicile', 'Travail'],

        tripTitles: ['One-Way', 'Return'],
        tripTitlesF: ['Aller', 'Retour'],



        nowLater: ['Now', 'Later'],
        nowLaterF: ['Maintenant', 'Après'],

        locationList: ['Pick Up', 'Drop Off', 'First Stop', 'Second Stop', 'Third Stop', 'Fourth Stop'],
        locationListF: ['Ramassage', 'Débarquement', 'Premier Arrêt', 'Deuxième Arrêt', 'Troisième Arrêt', 'Quatrième Arrêt'],

        carList: ['Sedan', 'SUV', 'VAN', 'Limo'],
        carListF: ['Berline', 'VUS', "VAN", "Limo"],

        tripList: ['Business (need receipt)', 'Vacation', 'Else'],
        tripListF: ['Affaires (Besoin reçu)', 'Vacance', 'Autre'],

        departureSections: ['Domestic', 'International', 'USA', 'Arrivals'],
        departureSectionsF: ['Domestique', 'International', 'États-Unis', 'Arrivés'],

        paymentList: ['Cash', 'Debit', 'Credit Card (need receipt)', 'Voucher', 'Office Charges'],
        paymentListF: ['Comptant', 'Débit', 'Carte crédit (besoin reçu)', 'Coupon', 'Charge Au Bureu'],


        flights: [
            'AIR CANADA - AC',
            'Air Transat - AT',
            'PAL airlines - PA',
            'Air Inuit - AI',
            'Porter - PO',
            'UNITED - UN',
            'CANADIAN NORTH - CN',
            'American Airlines - AA',
            'Emirates - EM',
            'arajet - AR',
            'DELTA - DE',
            'flair - FL',
            'AIR ALGERIE - AL',
            'TUNISAIR - TU',
            'SWISS - SW',
            'Austrian - AU',
            'Air Saint-Pierre - SP',
            'AIRFRANCE - AF',
            'KLM - KLM',
            'Lufthansa - LU',
            'Royal Air MAroc(RAM) - MA',
            'BRITISH AIRWAYS - BA',
            'AeroMexico - AM',
            'CopaAirlines - CO',
            'Lynx - LY',
            'SUNWING - SNW',
            'QATAR - QT',
            'RAM - RAM',
        ],
        iconValues: {
            airports: [
                'plane',
                'airport',
                'airport,',
                'Airport',
                'Airport - Montreal ( 975 Roméo-Vachon)',
                'Aéroport - Montréal ( 975 Roméo-Vachon)',
                'YUL - Montreal Airport'
            ],
            train:[
                'train',
                'train station underground'
            ],
            bus: [
                'bus',
                'bus station'
            ],
            boat: [
                'boat'
            ],
            hotel: [
                'room',
                'hotel'
            ],
        }

        // emailList: ['Your e-mail', 'Second e-mail', 'Third e-mail'],
        // emailListF: ['Votre courriel', 'Deuxième courriel', 'Troisième courriel'],
        // nameList: ['Your name', 'Second name', 'Third name'],
        // nameListF: ['Votre nom', 'Deuxième nom', 'Troisième nom'],
        // typeList: ['Transport', 'Delivery', 'Boost', 'Unlocking doors'],
        // typeListF: ['Transport', 'Livraison', 'Survoltage', 'Débarrage de portes'],

    },

}))