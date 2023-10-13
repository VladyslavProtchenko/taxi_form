import React, {  useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useInfo } from '../../Store/useInfo';
import 'antd/dist/reset.css';
import { TfiEmail } from "react-icons/tfi";


interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const MailInput: React.FC<InputProps> = ({ onChange, placeholder }) => {
    const [email, setEmail] = useState({mail:'', domain:''});
    const [isEmail, setISEmail] = useState(0)
    const { user } = useInfo()
    useEffect(()=>{
        onChange(email.mail+'@'+email.domain)
    },[email])

    console.log(isEmail)
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
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (
        <div className={container}>
            <span className='icon'><TfiEmail/></span>
            <Input
                onBlur={()=>{
                    if(pattern.test(user.email)){setISEmail(2)
                    } else{setISEmail(1) }
                }}
                style={{width: 200,fontWeight: 'bold', borderRadius: 0, height: 30, color: '#0066ff' }}
                value={email.mail}
                onChange={(e) => {
                    if(pattern.test(user.email)){setISEmail(2)
                    } else{setISEmail(1) }
                    setEmail({
                        ...email, mail: e.target.value
                    })
                }}
                placeholder={placeholder}
            />

            <div className={domain+ ' domain'}>
            <div className={label}>@</div>
            
            <Select
                showSearch
                onBlur={()=>{
                    if(pattern.test(user.email)){setISEmail(2)
                    } else{ setISEmail(1)}
                }}
                style={{width:118, height: 30, fontWeight: 'bold', borderRadius: 0, borderLeft:'none', color: '#0066ff' }}
                placeholder='gmail.com'
                onChange={(value) => {
                    if(pattern.test(user.email)){ setISEmail(2)
                    } else{ setISEmail(1)}
                    setEmail({...email, domain: value})
                }}
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
const container = 'flex text-sm border items-center'

