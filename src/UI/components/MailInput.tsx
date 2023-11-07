import React, {  useState } from 'react';
import { Input, Select } from 'antd';
import 'antd/dist/reset.css';
import { TfiEmail } from "react-icons/tfi";
import { useValidation } from '../../Store/useValidation';

interface InputProps {
    value:string;
    placeholder?: string;
    onChange: (value: string) => void;
    mainMail?: boolean;
}

const MailInput: React.FC<InputProps> = ({ onChange, placeholder, value, mainMail }) => {
    const [domains, ] = useState([
        "gmail.com",
        "outlook.com",
        "hotmail.com",
        "yahoo.com",
        "icloud.com",
        "aol.com",
        "yandex.ru",
        "mail.ru",
        "protonmail.com",
        "gmx.com",
        "zoho.com",
        "fastmail.com",
        "tutanota.com",
        "hushmail.com",
        "mail.com",
        "godaddy.com",
        "rambler.ru",
        "comcast.net",
        "verizon.net",
        "qq.com",
    ])
    const [customDomain, setCustomDomain ] = useState('')

    const { validation } = useValidation()
    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    return (
        <div className={(!validation.isEmail && mainMail) ? container  +' border-red-500': container}>
            <span className='icon'><TfiEmail/></span>
            <Input
                style={{width: 200,fontWeight: 'bold', borderRadius: 0, height: 30, color: '#0066ff' }}
                value={value.split('@')[0] || ''}
                onChange={(v) => onChange(v.target.value+'@'+value.split('@')[1])}
                placeholder={placeholder}
            />

            <div className={domainBox+ ' domain'}>
            <div className={label}>@</div>
            <Select
                optionFilterProp="children"
                showSearch
                allowClear
                value={value.split('@')[1] || null}
                style={{width:118, height: 30, fontWeight: 'bold', borderRadius: 5, borderLeft:'none', color: '#0066ff' }}
                placeholder='gmail.com'
                onSearch={(value) => {setCustomDomain( value)}}
                onChange={(v) => onChange(value.split('@')[0]+'@'+(v || ''))}
                filterOption={filterOption}
                options={[customDomain, ...domains].map(item=>({ value: item, label: item,}))} 
            />
            </div>
        </div>
    );
};


export default MailInput;

const domainBox = 'relative flex items-center font-bold text-[#0066ff]'
const label = 'absolute right-[125px] font-bold text-[#0066ff] text-xl'
const container = ' flex text-sm border items-center w-full rounded'

