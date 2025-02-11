import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useUser } from '../../UserContext';

export const Panel = () => {
    const navigate = useNavigate();
    const { user } = useUser(); 

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Panel de Control</h1>
            <button onClick={() => handleNavigation('/inventory')}>Ir a Link 1</button>
            <button onClick={() => handleNavigation('/orders')}>Ir a Link 2</button>
        </div>
    );
};