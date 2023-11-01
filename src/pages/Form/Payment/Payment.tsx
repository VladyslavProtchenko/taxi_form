import { Select } from "antd";
import { useStore } from "../../../Store";
import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { Input } from 'antd';
import { useValidation } from "../../../Store/useValidation";
import Submit from "../Submit/Submit";
const { TextArea } = Input;

interface ISendOrder {
    sendOrder: () => void;
}

const PaymentSection = ({sendOrder}:ISendOrder) => {
    const {user} = useStore()
    const { setPaymentMethod, setAdditionalText } = useInfo()
    const { setTripType} = useLocation()
    const { validation } = useValidation()

    return (
        <section className={section}>
            <div className="flex w-full sm:flex-col">
                <div className={content}>
                    <span className={box}>
                        <Select  placeholder='Trip type' style={{ width:200 , height: 30}} onChange={setTripType}options={user.tripList.map(item=>({value: item, label: item}))}/></span>
                    <span className={validation.isPayment ? box: box +' border-red-500'}>
                        <Select placeholder='Payment method' style={{ width:200 , height: 30}}onChange={setPaymentMethod}options={user.paymentList.map(item=>({value: item, label: item}))}/></span>
                        <button className={btn} onClick={sendOrder}>Order</button>
                </div>
                
                <div className={additional}>
                    <span className={textArea}>
                            <TextArea style={{borderRadius: '20px'}} rows={1} placeholder='Additional information' onChange={(e)=>{
                                setAdditionalText(e.target.value)
                            }}/></span>
                </div>
            
            </div>
            {validation.isSubmit && <Submit />}
        </section>
    );
};

export default PaymentSection;


const btn = 'py-2 px-4 rounded ml-auto bg-yellow-400 self-start text-white active:bg-yellow-200 xl:mx-auto lg:mx-auto'
const additional ='flex additional w-2/3 px-2 sm:w-full lg:w-1/2'
const content ='flex w-1/3 px-2 lg:mb-4 lg:space-x-4 sm:w-full sm:mb-10 lg:w-1/2'

const box ='flex border h-min pl-3 w-[100px]'
const textArea ='flex border h-min w-full rounded-xl'
const section = 'flex flex-col w-full px-8 sm:max-w-[576px] lg:w-full xl:w-full sm:border-none max-w-[1240px] sm:py-8 sm:px-1 lg:flex-col sm:flex-col'