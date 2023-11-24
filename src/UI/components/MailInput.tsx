import React, {  useState } from 'react';
import { Input, Select } from 'antd';
import 'antd/dist/reset.css';
import { TfiEmail } from "react-icons/tfi";
import { useMain } from '../../Store/useMain';

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
    const {list, activeCarId} = useMain()
    const [customDomain, setCustomDomain ] = useState('')
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    return (
        <div className={(!pattern.test(list[activeCarId-1].email) && mainMail) ? container  +' border-red-500': container}>
            <span className='icon'><TfiEmail/></span>
            <Input
                style={{maxWidth: 200,width:'60%', fontWeight: 'bold', borderRadius: 0, height: 30, color: '#0066ff' }}
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
                style={{minWidth:80, width:'100%', height: 40, fontWeight: 'bold', borderRadius: 5, borderLeft:'none', color: '#0066ff' }}
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
const container = 'relative flex text-sm border items-center rounded w-full'

