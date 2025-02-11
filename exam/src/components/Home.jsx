import React, { useState } from 'react';
import { useUser } from '../UserContext';


export const Home = () => {
    const {usuario} = useUser();

    console.log(usuario)
    return (
        <>
            <section>
                <span className='text-center'>Hola {usuario.name}</span>
            </section>
        </>
    )
}