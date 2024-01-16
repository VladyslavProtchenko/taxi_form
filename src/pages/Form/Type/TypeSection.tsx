import React from 'react';
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store/index';

const Type = ():React.ReactNode => {
    const { isFrench } = useMain()
    const { store } = useStore()

    // const goNext = ( ) => {

    // }

    return (
        <section className={section}>
            <div className={buttons}>
                {
                    (isFrench? store.typeListF: store.typeList).map((item)=>(
                        <div className={button}>{item}</div>
                    ))
                }
            </div>




        </section>
    );
};

export default Type;

const button = ' w-full text-purple-500 py-2  rounded-full cursor-pointer font-bold text-center '
const buttons = 'flex w-full flex-col space-y-4 items-center px-10'

const section = 'flex flex-col space-y-6 items-center  w-full  max-w-[576px] pt-6'