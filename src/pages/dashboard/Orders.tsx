import { useEffect } from "react";
import { useDashboard } from "../../Store/dashboard";


const Orders = () => {
    const { orders, getOrders } = useDashboard()

    useEffect(()=>{
        getOrders()
    },[])

    return (
        <div className={box}>
            <div className={orderCard}>
                <div className='pb-2 text-yellow-400'>
                    <div className='text-red-500 w-1/3'>one-way</div>
                </div>
                <div className="flex">

                    <div className='w-1/2 px-2 '>
                        <div className='text-lg mb-1 '>Nikola Tesla</div>
                        <div className='mb-1 text-gray-500 italic'>nikolaTesla@gmail.com</div>
                        <div>+449 4030 434 3</div>
                    </div>
                    <div className='w-1/2 px-2  '>
                        <div className='flex  py-1'>
                            <div className='w-1/3'>Trip Time</div>
                            <div className='w-1/3'>Trip Date</div>
                        </div>
                        <div className='flex py-1'>
                            <div className=''>Pick up location </div>
                        </div>
                        <div className='flex py-1'>
                            <div className=''>Drop off location</div>
                        </div>

                    </div>
                </div>
                <div className="flex pt-4">
                    <div className={btn+ ' mr-2'}>confirm</div>
                    <div className={btn2}>reject</div>
                </div>
            </div>

            <div className={table}>
                <h1 className={tableHeader}>Orders table</h1>
                <div className={tableRow}>
                    <div className={tableHCell + ' w-[20%]'}>type</div>
                    <div className={tableHCell + ' w-[20%] '}>date/time</div>
                    <div className={tableHCell + ' w-[30%] '}>location</div>
                    <div className={tableHCell + ' w-[10%]'}>status</div>
                    <div className={tableHCell  + ' w-[20%]'} >passengers</div>
                </div>
                <div className='overflow-y-scroll max-h-[320px] mb-4 '>
                    {orders.map(item=>(
                        <div className={tableRow}>
                            <div className={tableCell + ' w-[20%]'}>
                                <div className="flex flex-col ">
                                    <div className='mb-1'>{item.type}</div>
                                    <div className='text-gray-500 text-[10px]'>{item.carType}</div>
                                </div>
                                
                            </div>
                            <div className={tableCell + ' w-[20%]'}>
                                <div className="flex flex-col ">
                                    <div className='mb-1'>{item.time}</div>
                                    <div className='text-gray-500 text-[10px]'>{item.date}</div>
                                </div>
                            </div>
                            <div className={tableCell + ' w-[30%]'}>
                                {item.from}
                                {item.to}
                            </div>
                            <div className={tableCell + ' w-[10%]'}>
                                <div className={item.status ==='active' ? statusCell +' bg-green-400 ': statusCell}>
                                    {item.status}
                                </div>
                                
                            </div>
                            <div className={tableCell + ' w-[10%] justify-end'}>{item.adults + item.kids?.length + item.babies}</div>
                            <div className={tableCell  + ' w-[10%]'}>
                                <div className="cursor-pointer text-gray-600 hover:text-gray-400 text-sm">edit</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Orders;


const btn =' border-2 px-2 py-1 rounded-full border-purple-500 text-purple-500 font-bold cursor-pointer hover:bg-purple-200'
const btn2 =' border-2 px-2 py-1 rounded-full border-red-500 text-red-500 font-bold cursor-pointer hover:bg-red-200'

const orderCard = 'flex flex-col w-2/3 bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

const statusCell = ' px-2 py-1 rounded-full text-white self-start'

const tableCell = ' flex px-2 py-2'
const tableHCell = ' flex px-4 py-2'
const tableRow = ' flex w-full border-b '

const tableHeader = ' px-10 pb-4 '
const table = 'bg-white shadow-xl w-full py-6 rounded-xl text-xs max-h-[450px]  pb-4'
const box = 'flex flex-col w-full px-10 py-20 min-w-screen w-full min-h-screen '