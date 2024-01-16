import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useState } from 'react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { SlEarphonesAlt } from "react-icons/sl";
import React from 'react';
import { useMain } from '../../Store/useMain';
import { useStore } from '../../Store';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ReactFlagsSelect from "react-flags-select";
const countries = [
    ["Afghanistan", "93"],
    ["Albania", "355"],
    ["Algeria", "213"],
    ["Andorra", "376"],
    ["Angola", "244"],
    ["Antigua and Barbuda", "1268"],
    ["Argentina", "54"],
    ["Armenia", "374"],
    ["Aruba", "297"],
    ["Australia", "61"],
    ["Austria", "43"],
    ["Azerbaijan", "994"],
    ["Bahamas", "1242"],
    ["Bahrain", "973"],
    ["Bangladesh", "880"],
    ["Barbados", "1246"],
    ["Belarus", "375"],
    ["Belgium", "32"],
    ["Benin", "229"],
    ["Bhutan", "975"],
    ["Bolivia", "591"],
    ["Bosnia and Herzegovina", "387"],
    ["Botswana", "267"],
    ["Brazil", "55"],
    ["British Indian Ocean Territory", "246"],
    ["Brunei", "673"],
    ["Bulgaria", "359"],
    ["Burkina Faso", "226"],
    ["Burundi", "257"],
    ["Cambodia", "855"],
    ["Cameroon", "237"],
    ["Canada", "1"],
    ["Cape Verde", "238"],
    ["Caribbean Netherlands", "599"],
    ["Central African Republic", "236"],
    ["Chad", "235"],
    ["Chile", "56"],
    ["China", "86"],
    ["Colombia", "57"],
    ["Comoros", "269"],
    ["Congo", "242"],
    ["Costa Rica", "506"],
    ["Côte d’Ivoire", "225"],
    ["Croatia", "385"],
    ["Cuba", "53"],
    ["Curaçao", "599"],
    ["Cyprus", "357"],
    ["Czech Republic", "420"],
    ["Denmark", "45"],
    ["Djibouti", "253"],
    ["Dominica", "1767"],
    ["Dominican Republic", "1"],
    ["Ecuador", "593"],
    ["Egypt", "20"],
    ["El Salvador", "503"],
    ["Equatorial Guinea", "240"],
    ["Eritrea", "291"],
    ["Estonia", "372"],
    ["Ethiopia", "251"],
    ["Fiji", "679"],
    ["Finland", "358"],
    ["France", "33"],
    ["French Guiana", "594"],
    ["French Polynesia", "689"],
    ["Gabon", "241"],
    ["Gambia", "220"],
    ["Georgia", "995"],
    ["Germany", "49"],
    ["Ghana", "233"],
    ["Greece", "30"],
    ["Grenada", "1473"],
    ["Guadeloupe", "590"],
    ["Guam", "1671"],
    ["Guatemala", "502"],
    ["Guinea", "224"],
    ["Guinea-Bissau", "245"],
    ["Guyana", "592"],
    ["Haiti", "509"],
    ["Honduras", "504"],
    ["Hong Kong", "852"],
    ["Hungary", "36"],
    ["Iceland", "354"],
    ["India", "91"],
    ["Indonesia", "62"],
    ["Iran", "98"],
    ["Iraq", "964"],
    ["Ireland", "353"],
    ["Israel", "972"],
    ["Italy", "39"],
    ["Jamaica", "1876"],
    ["Japan", "81"],
    ["Jordan", "962"],
    ["Kazakhstan", "7"],
    ["Kenya", "254"],
    ["Kiribati", "686"],
    ["Kosovo", "383"],
    ["Kuwait", "965"],
    ["Kyrgyzstan", "996"],
    ["Laos", "856"],
    ["Latvia", "371"],
    ["Lebanon", "961"],
    ["Lesotho", "266"],
    ["Liberia", "231"],
    ["Libya", "218"],
    ["Liechtenstein", "423"],
    ["Lithuania", "370"],
    ["Luxembourg", "352"],
    ["Macau", "853"],
    ["Macedonia", "389"],
    ["Madagascar", "261"],
    ["Malawi", "265"],
    ["Malaysia", "60"],
    ["Maldives", "960"],
    ["Mali", "223"],
    ["Malta", "356"],
    ["Marshall Islands", "692"],
    ["Martinique", "596"],
    ["Mauritania", "222"],
    ["Mauritius", "230"],
    ["Mexico", "52"],
    ["Micronesia", "691"],
    ["Moldova", "373"],
    ["Monaco", "377"],
    ["Mongolia", "976"],
    ["Montenegro", "382"],
    ["Morocco", "212"],
    ["Mozambique", "258"],
    ["Myanmar", "95"],
    ["Namibia", "264"],
    ["Nauru", "674"],
    ["Nepal", "977"],
    ["Netherlands", "31"],
    ["New Caledonia", "687"],
    ["New Zealand", "64"],
    ["Nicaragua", "505"],
    ["Niger", "227"],
    ["Nigeria", "234"],
    ["North Korea", "850"],
    ["Norway", "47"],
    ["Oman", "968"],
    ["Pakistan", "92"],
    ["Palau", "680"],
    ["Palestine", "970"],
    ["Panama", "507"],
    ["Papua New Guinea", "675"],
    ["Paraguay", "595"],
    ["Peru", "51"],
    ["Philippines", "63"],
    ["Poland", "48"],
    ["Portugal", "351"],
    ["Puerto Rico", "1"],
    ["Qatar", "974"],
    ["Réunion", "262"],
    ["Romania", "40"],
    ["Russia", "7"],
    ["Rwanda", "250"],
    ["Saint Kitts and Nevis", "1869"],
    ["Saint Lucia", "1758"],
    ["Saint Vincent and the Grenadines", "1784"],
    ["Samoa", "685"],
    ["San Marino", "378"],
    ["São Tomé and Príncipe", "239"],
    ["Saudi Arabia", "966"],
    ["Senegal", "221"],
    ["Serbia", "381"],
    ["Seychelles", "248"],
    ["Sierra Leone", "232"],
    ["Singapore", "65"],
    ["Slovakia", "421"],
    ["Slovenia", "386"],
    ["Solomon Islands", "677"],
    ["Somalia", "252"],
    ["South Africa", "27"],
    ["South Korea", "82"],
    ["South Sudan", "211"],
    ["Spain", "34"],
    ["Sri Lanka", "94"],
    ["Sudan", "249"],
    ["Suriname", "597"],
    ["Swaziland", "268"],
    ["Sweden", "46"],
    ["Switzerland", "41"],
    ["Syria", "963"],
    ["Taiwan", "886"],
    ["Tajikistan", "992"],
    ["Tanzania", "255"],
    ["Thailand", "66"],
    ["Timor-Leste", "670"],
    ["Togo", "228"],
    ["Tonga", "676"],
    ["Trinidad and Tobago", "1868"],
    ["Tunisia", "216"],
    ["Turkey", "90"],
    ["Turkmenistan", "993"],
    ["Tuvalu", "688"],
    ["Uganda", "256"],
    ["Ukraine", "380"],
    ["United Arab Emirates", "971"],
    ["United Kingdom", "44"],
    ["United States", "1"],
    ["USA", "1"],
    ["Uruguay", "598"],
    ["Uzbekistan", "998"],
    ["Vanuatu", "678"],
    ["Vatican City", "39"],
    ["Venezuela", "58"],
    ["Vietnam", "84"],
    ["Yemen", "967"],
    ["Zambia", "260"],
    ["Zimbabwe", "263"],
];

const flags: { [key: string]: string } = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia, Plurinational State of",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Democratic Republic of the Congo",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    PF: "French Polynesia",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    HT: "Haiti",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Republic of Macedonia",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    MX: "Mexico",
    FM: "Micronesia, Federated States of",
    MD: "Republic of Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RO: "Romania",
    RU: "Russia",
    RW: "Rwanda",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syria",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "(USA) United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela, Bolivarian Republic of",
    VN: "Viet Nam",
    VI: "Virgin Islands",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
};
interface ICountry {
    countryCode: string;
    dialCode: string;
    format: string;
    name: string;
}
interface IPhone {
    value: string;
    type?: number;

    onChange: (value: string) => void;
    setValidation: (value: boolean) => void;
}

function PhoneNumberInput({ value, onChange, type, setValidation }: IPhone): React.ReactNode {
    const ref = useOnclickOutside(() => setIsOpen(false));
    const { isFrench } = useMain()
    const { store } = useStore()
    const [country, setCountry] = useState('Canada')
    const [countryCode, setCountryCode] = useState(value)
    const [isOpen, setIsOpen] = useState(false)
    const [icon, setIcon] = useState(1)
    const [val, setVal] = useState(0)
    const [res, setRes] = useState(0)
    const [selected, setSelected] = useState('CA')

    useEffect(() => {
        if (type === 1) {
            if (val >= 12) return setValidation(true)
            setValidation(val === res)
        }
    }, [val, res])

    useEffect(() => {
        if (country) {
            const res = countries.find((item) => item[0].toLowerCase().includes(country.toLowerCase()))
            if (res) {
                setCountryCode(res[1])
            }
        }
    }, [country])

    const handleCountryCode = (data: string) => {
        setSelected(data)
        setCountry(flags[data])
    }


    return (
        <section className={container}>
            <div className='z-20 absolute left-[178px] font-bold top-[10px]'>+</div>
            <div className={phoneLabel} onClick={() => setIsOpen(!isOpen)} >
                {icon === 1 ? <><span className='w-3'><IoPhonePortraitOutline  className='text-blue-500 w-[12px]' /></span><span className=' text-xs mx-1 truncate'>
                    {isFrench ? store.phoneTitleListF[0] : store.phoneTitleList[0]}
                </span></> : icon === 2 
                    ? <><span className='w-3'><BsTelephone className='text-blue-500 w-[12px]' /></span><span className=' text-xs ml-1 truncate'>{isFrench ? store.phoneTitleListF[1] : store.phoneTitleList[1]}</span></> 
                    : <><span className='w-3'><SlEarphonesAlt className='text-blue-500 w-[12px]' /></span><span className=' text-xs ml-1 truncate'>{isFrench ? store.phoneTitleListF[2] : store.phoneTitleList[2]}</span></>}
                <ul className={isOpen ? subMenu : 'hidden'} ref={ref}>
                    <li className={icon === 1 ? 'bg-gray-100 ' + subItem : subItem} onClick={() => setIcon(1)}><IoPhonePortraitOutline className='text-blue-500' /><span className=' text-xs ml-2'>{isFrench ? store.phoneTitleListF[0] : store.phoneTitleList[0]}</span></li>
                    <li className={icon === 2 ? 'bg-gray-100 ' + subItem : subItem} onClick={() => setIcon(2)}> <BsTelephone className='text-blue-500' /><span className=' text-xs ml-2'>{isFrench ? store.phoneTitleListF[1] : store.phoneTitleList[1]}</span> </li>
                    <li className={icon === 3 ? 'bg-gray-100 ' + subItem : subItem} onClick={() => setIcon(3)}><SlEarphonesAlt className='text-blue-500' /><span className=' text-xs ml-2'>{isFrench ? store.phoneTitleListF[2] : store.phoneTitleList[2]}</span></li>
                </ul>
                <div className={"text-xs "}>
                    {isOpen && <IoIosArrowUp />}
                    {!isOpen && <IoIosArrowDown />}
                </div>
            </div>
            <ReactFlagsSelect
                selected={selected}
                searchable
                customLabels={{"US":"USA"}}
                className='p-0 px-1 h-[38px] flex items-center border-x-[1px] border-purple-500'
                onSelect={handleCountryCode}
            />

            {(country === 'USA' || country.toLowerCase() === "united states") &&
                <PhoneInput
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    isValid={(value, country: any,) => {
                        const res = country.format.split(".").length - 1;
                        setVal(value.length)
                        setRes(res)
                        return true
                    }}
                    
                    prefix=''
                    dropdownClass='max-w-[180px] z-40'
                    priority={{ ca: 1, us: 0, kz: 0, ru: 1 }}
                    country={'us'}
                    value={value || countryCode}
                    onChange={(e, countryName: ICountry) => {
                        setCountryCode('')
                        for (const key in flags) {
                            if (flags[key] === countryName.name) setSelected(key)
                        }
                        onChange(e)
                    }}
                />}

            {(country !== 'USA' && country.toLowerCase() !== "united states") &&
                <PhoneInput
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    isValid={(value, country: any,) => {
                        const res = country.format.split(".").length - 1;
                        setVal(value.length)
                        setRes(res)
                        return true
                    }}
                    
                    prefix=''
                    dropdownClass='max-w-[180px] z-40 '
                    priority={{ ca: 0, us: 1, kz: 0, ru: 1 }}
                    country={'ca'}
                    value={value || countryCode}
                    onChange={(e, countryName: ICountry) => {
                        setCountryCode('')
                        for (const key in flags) {

                            if (flags[key] === countryName.name) {
                                setSelected(key)
                            }

                        }
                        onChange(e)
                    }}
                />
            }
        </section>
    )
}

export default PhoneNumberInput

const subMenu = 'absolute bg-white z-30 top-[110%] left-0 shadow-xl rounded-lg overflow-hidden px-1'
const subItem = 'flex text-sm px-3 py-2 items-end hover:bg-blue-50 rounded'
const phoneLabel = 'min-w-[75px] flex rounded-l-xl relative items-center pl-1 h-[38px]  cursor-pointer hover:bg-gray-100 '
const container = 'flex relative items-center bg-white rounded-xl w-full'


