import React, {  useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import 'antd/dist/reset.css';
import { TfiEmail } from "react-icons/tfi";
import { useValidation } from '../../Store/useValidation';


interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const MailInput: React.FC<InputProps> = ({ onChange, placeholder }) => {
    const [email, setEmail] = useState({mail:'', domain:''});
    const { validation } = useValidation()
    useEffect(()=>{
        onChange(email.mail+'@'+email.domain)
    },[email])

    const domains = [
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
    ];    
    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className={validation.isEmail ? container : container +' border-red-500'}>
            <span className='icon'><TfiEmail/></span>
            <Input
                style={{width: 200,fontWeight: 'bold', borderRadius: 0, height: 30, color: '#0066ff', border: 'none' }}
                value={email.mail}
                onChange={(e) => setEmail({...email, mail: e.target.value})}
                placeholder={placeholder}
            />

            <div className={domain+ ' domain'}>
            <div className={label}>@</div>
            
            <Select
                showSearch
                style={{width:118, height: 30, fontWeight: 'bold', borderRadius: 0, borderLeft:'none', color: '#0066ff' }}
                placeholder='gmail.com'
                onChange={(value) => {setEmail({...email, domain: value})}}
                filterOption={filterOption}
                options={domains.map(item=>({ value: item, label: item,}
                ))}
            />
            </div>
        </div>
    );
};



export default MailInput;

const domain = 'relative flex items-center font-bold text-[#0066ff]'
const label = 'absolute right-[125px] font-bold text-[#0066ff] text-xl'
const container = ' flex text-sm border items-center hover:border-[#0066ff]'

