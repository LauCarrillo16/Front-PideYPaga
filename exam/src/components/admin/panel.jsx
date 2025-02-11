import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useUser } from '../../UserContext';

export const Panel = () => {
    const navigate = useNavigate();
    const { user } = useUser(); 

    const handleNavigation = (path) => {
        navigate(path);
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        user.logout();
    };

    return (
        <main className='w-screen flex justify-around items-center h-screen flex-col bg-white signin'>


        <>

        
        <div>
            <h1>Panel de Control</h1>
            <button onClick={() => handleNavigation('/inventory')}>Inventory</button>
            <button onClick={() => handleNavigation('/orders')}>Ir a Link 2</button>
        </main>
        </div>
        </>
    );
};