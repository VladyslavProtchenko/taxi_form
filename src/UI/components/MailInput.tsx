import React, {  useEffect, useState } from 'react';
import InputComponent from './Input';
import SelectInput from './SelectInput';

interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const MailInput: React.FC<InputProps> = ({ onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState({mail:'', domain:''});

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

    return (
        <div className={container}>
            <InputComponent
                width={200}
                value={email.mail}
                onChange={(e:any) => setEmail({
                    ...email, mail: e.target.value
                })}
                placeholder={placeholder}
            />
            <div className={domain}>
                <SelectInput
                    placeholder='gmail.com'
                    source={domains}
                    width={100}
                    onChange={(e:any) => setEmail({
                        ...email, domain: e.target.value.substring(1)
                    })} />
                {isOpen &&<div className={submenu} onClick={e=> e.stopPropagation()}>
                        {domains.filter(item => item.includes(email.domain)).map((item, index) => (
                        <div key={item + index} className={domainItem} onClick={() => {
                            setEmail({
                                ...email, domain: item
                            })
                            setIsOpen(false)
                        }}>
                            {item}
                        </div>
                    ))}
                </div>}
            </div>
        </div>

    );
};

export default MailInput;

const domainItem = 'cursor-pointer hover:bg-gray-50 px-5 '
const submenu = 'absolute bg-white shadow rounded  top-full max-h-[200px] right-0 overflow-scroll z-10 w-[150px]'
const domain = 'relative flex items-center '

const container = 'flex text-sm'

