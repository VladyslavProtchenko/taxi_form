import React, {  useState } from 'react';
import { Input, Select } from 'antd';
import 'antd/dist/reset.css';

import { CiMail } from "react-icons/ci";

interface InputProps {
    value:string;
    placeholder?: string;
    onChange: (value: string) => void;
    mainMail?: boolean;
    noMail?: boolean;
}

const MailInput: React.FC<InputProps> = ({ onChange, placeholder, value, mainMail, noMail }) => {
    const [ domains ] = useState([
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
    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    return (
        <div className={(!noMail && mainMail) ? container  +' border-red-600': container}>
            <span className='icon'><CiMail className='text-[#3e49da]'/></span>
            <Input
                allowClear
                style={{ maxWidth: 250,width:'60%', paddingRight:22, fontWeight: 'bold', borderRadius: 0, height: 30, color: '#0066ff' }}
                value={value.split('@')[0] || ''}
                className='blueInput'
                onChange={(v) => onChange(v.target.value+'@'+(value.split('@')[1] || ''))}
                placeholder={placeholder}
            />

            <div className={domainBox+ ' domain'}>
            <div className={label}>@</div>
            <Select
                optionFilterProp="children"
                showSearch
                allowClear
                value={value.split('@')[1] || null}
                style={{minWidth:80, width:'100%', height: 40, fontWeight: 'bold', borderRadius: 20, borderLeft:'none', color: '#0066ff' }}
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

const domainBox = 'relative flex w-2/5 items-center font-bold text-[#0066ff]'
const label = 'absolute bottom-1/2 translate-y-1/2 -left-6 z-20 font-bold text-[#0066ff] text-xl'
const container = 'relative flex text-sm border border-purple-500 items-center rounded-xl w-full'

