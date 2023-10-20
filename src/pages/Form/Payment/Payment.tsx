import { Select } from "antd";
import { useStore } from "../../../Store";
import { useInfo } from "../../../Store/useInfo";
import { useLocation } from "../../../Store/useLocation";
import { Input } from 'antd';
import { useValidation } from "../../../Store/useValidation";
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

            <div className={content}>
                <span className={box}>
                    <Select  placeholder='Trip type' style={{ width:200 , height: 30}} onChange={setTripType}options={user.tripList.map(item=>({value: item, label: item}))}/></span>
                <span className={validation.isPayment ? box: box +' border-red-500'}>
                    <Select placeholder='Payment method' style={{ width:200 , height: 30}}onChange={setPaymentMethod}options={user.paymentList.map(item=>({value: item, label: item}))}/></span>
                    <button className={btn} onClick={sendOrder}>Order</button>
            </div>
            <div className={additional}>
                <span className={textArea}>
                        <TextArea rows={2} placeholder='Additional information' onChange={(e)=>{
                            setAdditionalText(e.target.value)
                        }}/></span>
            </div>
            {/* <div className={modal}>thank you for order</div> */}
        </section>
    );
};

export default PaymentSection;


const btn = 'py-2 px-4 rounded bg-yellow-400 self-start text-white active:bg-yellow-200 mx-auto'
const additional ='flex additional w-2/3 px-2'
const content ='flex w-1/3 px-2 lg:mb-4 lg:space-x-4'

const box ='flex border h-min pl-3 w-[100px]'
const textArea ='flex border h-min w-full rounded-xl'
const section = 'flex w-full px-8  sm:max-w-[576px] sm:border-none max-w-[1240px] sm:py-8 sm:px-1 lg:flex-col'