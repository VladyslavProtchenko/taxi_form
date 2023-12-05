import { useState } from "react";
import { useDashboard } from "../../Store/dashboard";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isFrench } = useDashboard()
    
    return (
        <div className={screen}>
            <nav className={isOpen ? navMenu: navMenu + ' -translate-x-[200px]'}>
                {!isOpen && <IoIosArrowForward className={menuIcon} onClick={()=>setIsOpen(true)}/>}
                {isOpen && <IoIosArrowBack className={menuIcon} onClick={()=>setIsOpen(false)} />}
                <div className={isOpen? menuContent: menuContent + ' opacity-0 '}>

                    <NavLink to='calendar' className={({ isActive }) => isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Calendrier' : 'Calendar'}</NavLink>
                    <NavLink to='customers' className={({ isActive }) =>isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Clients' : 'Customers'}</NavLink>
                    <NavLink to='orders' className={({ isActive }) =>isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Nouvelle Commande' : 'New Order'}</NavLink>
                    <NavLink to='drivers' className={({ isActive }) =>isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Chauffeurs' : 'Drivers'}</NavLink>
                    <NavLink to='prices' className={({ isActive }) =>isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Fares' : 'Tarification'}</NavLink>
                    <NavLink to='settings' className={({ isActive }) =>isActive ? navItem+ " text-purple-500 " : navItem}>{isFrench? 'Paramètres' : 'Setting(only for Admin)'}</NavLink>

                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Dashboard;

const menuIcon = 'absolute top-4 text-2xl right-2 cursor-pointer hover:text-purple-500'
const menuContent = 'flex flex-col '
const navItem = ' rounded py-2 px-2 font-bold cursor-pointer mb-2 hover:text-purple-500'
const navMenu = ' flex flex-col absolute top-0 bottom-0 shadow left-0 px-4 py-8 bg-white ease-linear duration-500 '
const screen = 'relative flex w-screen bg-gray-200 min-h-screen pl-10'