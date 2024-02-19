import { IStore } from "../Store";


const  IconsFilter = (store: IStore, from:string, to:string, setIcon:(icon: number) => void, setIcon2:(icon: number) => void ) => {

    Object.values(store.iconValues).map((item, index)=>{
        item.map(item =>{
                if(from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(index + 1)
            })
        item.map(item =>{
            if(to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(index + 1)
        })
    })

}

export default IconsFilter