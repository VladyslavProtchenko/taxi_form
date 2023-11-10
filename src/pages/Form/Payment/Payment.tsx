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
    const {user:store,  setPaymentMethod, setAdditionalText } = useInfo()
    const { setTripType } = useLocation()
    const { validation } = useValidation()

    return (
        <section className={section}>
            <div className="flex w-full sm:flex-col">
                <div className={content}>
                    <span className={box}>
                        <Select  placeholder='Trip type' style={{ width:200 , height: 30, borderRadius: 5}} onChange={setTripType}options={user.tripList.map(item=>({value: item, label: item}))}/></span>
                    <span className={validation.isPayment ? box2: box2 +' border-red-500'}>
                        <Select placeholder='Payment method' style={{ width:200 , height: 30, borderRadius: 5}} value={store.paymentMethod} onChange={setPaymentMethod} options={user.paymentList.map(item=>({value: item, label: item}))}/></span>
                        <button className={btn} onClick={sendOrder}>Order</button>
                </div>
                
                <div className={additional}>
                    <span className={textArea}>
                            <TextArea style={{borderRadius: '20px'}} rows={1} placeholder='Additional information' onChange={(e)=>{
                                setAdditionalText(e.target.value)
                            }}/></span>
                </div>
            </div>
        </section>
    );
};

export default PaymentSection;


const btn = 'py-2 px-4 rounded ml-auto bg-yellow-400 self-start text-white active:bg-yellow-200 '
const additional ='flex additional px-2 w-full '
const content ='flex  px-2 w-full mb-10 '

const box ='flex border h-min pl-3 w-[100px] rounded-l'
const box2 ='flex border h-min pl-3 w-[100px] rounded-r'
const textArea ='flex border h-min w-full rounded-xl'
const section = 'flex flex-col w-full  max-w-[576px]  border-none  py-8 px-1 flex-col pb-20'