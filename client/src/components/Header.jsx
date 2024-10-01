import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); // Hook for navigation
    const username = localStorage.getItem("username");

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("username"); // Remove username from localStorage
        localStorage.removeItem("token"); // Remove token if you're using one
        navigate('/'); // Redirect to home page
    };

    return (
        <div className='flex h-[100px] shadow-md justify-around items-center'>
            <div>
                <NavLink to='/'>
                    <h1 className='text-2xl font-extrabold font-sans'>TM.</h1>
                </NavLink>
            </div>
            {username ? (
                <div className='flex '>
                    <p className='font-bold uppercase mr-10 mt-1'>{username}</p>
                    <NavLink to='/tasks'>
                        <button className='bg-black text-white px-4 py-2 text-sm rounded-md'>All Tasks</button>
                    </NavLink>
                    <NavLink to='/createtask'>
                        <button className='bg-blue-500 text-white px-4 py-2 text-sm ml-4 rounded-md'>Create Task</button>
                    </NavLink>
                    
                    <button
                        onClick={handleLogout} // Call handleLogout on click
                        className='bg-red-500 px-4 py-2 ml-4 rounded-md text-white text-sm'
                    >
                        Logout
                    </button>
                    
                </div>
            ) : (
                <div className='flex '>
                    <NavLink to='/login'>
                        <button className='mr-10 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800'>Login</button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button className='font-bold hover:text-blue-500 transition ease-in duration-200 mt-1'>Sign Up</button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Header;
