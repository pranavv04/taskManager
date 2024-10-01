import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [formData, setFromData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFromData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://taskmanager-backend-bsps.onrender.com/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json(); 
                localStorage.setItem('username', formData.username);
                localStorage.setItem('role', responseData.role); 
                console.log(responseData)
                toast.success('Login Successful');
                setTimeout(() => {
                    navigate('/tasks');
                }, 2000);
            } else {
                toast.error('Login Failed!');
            }

        } catch (error) {
            toast.error('Login Failed: Internal server error');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-gray-100 h-[88.5vh] flex justify-center items-center text-center'>
                <div className='flex flex-col justify-center items-center m-5 shadow-xl px-4 w-[600px] rounded-lg'>
                    <h2 className='text-xl text-black font-bold mb-5'>Welcome, Login to Task Manager.</h2>

                    <input
                        className='px-4 py-2 text-center border border-black text-black m-2 rounded-md bg-gray-100 placeholder:text-black w-[300px] text-sm'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        type="text"
                        placeholder='Enter username'
                    />

                    <input
                        className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 border border-black placeholder:text-black text-black w-[300px] text-sm'
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Enter password'
                    />

                    <div className='flex m-4'>
                        <button className='bg-black transition duration-500 ease-in-out px-4 py-2 text-white rounded-md w-[90px] text-sm mt-4 font-semibold' type='submit'>
                            Submit
                        </button>
                        <NavLink to='/signup'>
                            <p className='ml-7 mt-5 text-blue-500 underline text-sm font-semibold'>New user? Sign Up</p>
                        </NavLink>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
