import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from 'react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { GiModernCity } from "react-icons/gi";
import { Select } from 'antd';


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

interface ICountry {
    
countryCode:string;
dialCode:string;
format:string;
name:string;
}
interface IPhone {
    value: string;
    onChange: (value: string) => void;
}

function PhoneNumberInput({ value, onChange }: IPhone) {
    const [country, setCountry] = useState('')
    const [countryCode, setCountryCode] = useState(value)
    const [phoneType, setPhoneType] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    const [val, setVal] = useState(0)
    const [res, setRes] = useState(0)
    
    useEffect(()=>{
        if(country) {
            const find = country
            const res = countries.find((item) => item[0].toLowerCase().includes(find.toLowerCase()))
            if(res) setCountryCode(res[1])  
        } else { setCountryCode('1') }
    },[country])

    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <section className={container}>
            <div className={phoneLabel} onClick={()=>setIsOpen(!isOpen)}>
                {phoneType === 1 ? <IoPhonePortraitOutline /> : phoneType === 2 ? <AiOutlineHome /> : <GiModernCity />}
                {isOpen && <div className={subLabel}>
                    {phoneType !== 1 && <div className={subItem} onClick={()=>setPhoneType(1)}><IoPhonePortraitOutline /></div>}
                    {phoneType !== 2 && <div className={subItem} onClick={()=>setPhoneType(2)}><AiOutlineHome /></div>}
                    {phoneType !== 3 && <div className={subItem} onClick={()=>setPhoneType(3)}><GiModernCity /></div>}
                </div>}
            </div>

            <Select
                className={res > val ? 'error': res === val ? 'success' : 'default'}
                showSearch
                value={country ? country : 'Canada'}
                style={{width:118, height: 30}}
                onChange={setCountry}
                filterOption={filterOption}
                options={countries.map((item)=>(
                    {
                        value: item[0],
                        label: item[0],
                    }
                ))}
            />

            <PhoneInput
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                isValid={(value, country:any,) => {
                    const res = country.format.split(".").length-1;
                    setVal(value.length)
                    setRes(res)
                    return true
                }}
                country={'ca'}
                value={countryCode}
                onChange={(e, countryName:ICountry)=>{
                    setCountry(countryName.name)
                    onChange(e)
                }}
            />
        </section>
    )
}

export default PhoneNumberInput

const subItem = 'px-2 text-black hover:bg-yellow-200 px-2 py-1'
const phoneLabel = ' flex relative items-center w-[32px] px-2 cursor-pointer hover:bg-yellow-100'
const subLabel = ' left-0 pb-1 z-50  bg-white border-black border-[1px] flex flex-col absolute top-[115%] items-center cursor-pointer '
const container = 'flex border'


