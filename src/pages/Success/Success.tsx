import { useInfo } from "../../Store/useInfo";

const Success = () => {
    const {user} = useInfo()
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            {user.gender + ' ' + user.name } than you for order
        </div>
    );
};

export default Success;