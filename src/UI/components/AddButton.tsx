
const AddButton = ({style, onClick}:{
    style?:string;
    onClick:()=>void;
}) => {
    const main ="flex  font-bold cursor-pointer  active:text-yellow-200 rounded-full text-yellow-400 text-2xl w-4 h-4 items-center justify-center"
    return (
        <div onClick={onClick} className={main+ ' ' + style}>+</div>
    );
};

export default AddButton;