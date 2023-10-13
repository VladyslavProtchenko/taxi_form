import { Select } from 'antd';

interface SelectProps {
    value?: string;
    onChange: (value: string) => void;
    source: string[];
    placeholder: string;
    style?: string;
    subStyle?: string
    width?: number;
}


const CustomSelect= ({ onChange, source, placeholder, width}:SelectProps) => {

    return (
        <Select
            
            placeholder={placeholder}
            style={{ width , height: 30}}
            onChange={onChange}
            options={source.map(item=>(
                {value: item, label: item}
            ))}
        />
    );
};


export default CustomSelect;

// const oneItem = 'cursor-pointer hover:bg-yellow-200 px-4 py-1'
// const submenu = 'w-[200px] text-black py-1 border-[1px] border-black absolute sm:w-full sm:min-w-[200px] py-2 md:right-0 sm:right-0  shadow-xl bg-white z-20 max-h-[200px] overflow-scroll top-[106%]'