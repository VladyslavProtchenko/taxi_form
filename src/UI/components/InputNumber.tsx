import React from 'react';

interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    style?: string;
}

const InputNumber: React.FC<InputProps>= ({ value, onChange, placeholder, style}) => {

    return (
            <input 
                className={container+ ' '+ style}
                value={value} 
                onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} 
                placeholder={placeholder}
                min="0"
            />
    );
};

export default InputNumber;

const container = 'border relative px-2 py-1 outline-none focus:border text-sm focus:border-blue-800'