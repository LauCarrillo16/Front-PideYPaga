import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../UserContext';
import AxiosConfiguration from '../AxiosConfiguration';
import '../styles.css'; 

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actualizarUsuario } = useUser();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        AxiosConfiguration.post('login', null, {
            params: { email, password },
        })
            .then((response) => {
                const { token, id, name,email} = response.data;
    
                console.log('Login successful:', response.data);
    
                localStorage.clear();
    
                localStorage.setItem('authToken', token);
    
                actualizarUsuario({
                    id,
                    name,
                    email
                });
    
                alert('Bienvenido/a!');
                navigate("/home")
                
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert('Error: Usuario o contraseña incorrectos.');
                } else {
                    console.error('Error de conexión:', error);
                    alert('Hubo un problema al intentar conectarse con el servidor.');
                }
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
            <main className='w-screen flex justify-around items-center h-screen flex-col bg-white signin'>
                <h2 className="text-4xl font-semibold text-black mb-6">Login</h2>
                <form className="flex flex-col space-y-4 gap-4 pt-6" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        name="email"
                        type="text"
                        placeholder="email"
                        className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                    />
                    <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="password"
                        className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-white-mt-8/30 hover:bg-white/40 transition p-2 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-6">
                    Don't have an account?{' '}
                    <a
                        href=""
                        onClick={() => navigate('../signin')}
                        className="text-white font-semibold underline"
                    >
                        Sign up. It's free
                    </a>
                </p>
                </main>
    );
};