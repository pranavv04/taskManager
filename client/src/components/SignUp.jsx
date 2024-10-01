import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
const SignUp = () => {
    const[formData, setFromData] = useState({
        name:'',
        email:'',
        profession:'',
        role:'',
        username:'',
        password:''
    });

    const navigate = useNavigate();

    const handleInputChange =(e)=>{
        const{name, value} = e.target;
        setFromData({
            ...formData,
            [name] : value
        })
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch('https://taskmanager-backend-i458.onrender.com/user/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData),
          });
  
          if (response.ok) {
              const responseData = await response.json(); // Get the response data
              localStorage.setItem('username', formData.username);
              localStorage.setItem('userId', responseData.userId); // Assuming your API returns the user ID
  
              toast.success('Sign up successful!');
  
              setTimeout(() => {
                  navigate('/tasks');
              }, 2000);
          } else {
              toast.error('Sign up failed');
          }
      } catch (error) {
          toast.error('Sign up failed: Internal server error');
      }
  };
  
  return (
    <div>
        <form onSubmit={handleSubmit}  className='bg-gray-100 h-[88.5vh] flex justify-center align-middle text-center'>
        <div className='flex flex-col justify-center items-center shadow-xl m-5 px-4 rounded-lg w-[700px]'>
          <h2 className='text-2xl font-sans text-black font-bold mb-5'>Welcome, Sign in Task Manager.</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
           
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 border border-black placeholder:text-black text-black w-[300px] text-sm'
            type="text"
            placeholder='Enter your name'
          />
          
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 placeholder:text-black text-black border border-black w-[300px] text-sm'
            type="email"
            placeholder='Enter your email'
          />
          <input
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md border border-black bg-gray-100 placeholder:text-black text-black w-[300px] text-sm'
            type="text"
            placeholder='Enter profession'
          />
           <input
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md border border-black bg-gray-100 placeholder:text-black text-black w-[300px] text-sm'
            type="text"
            placeholder='Enter role (admin or user)'
          />
        
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md border border-black bg-gray-100 placeholder:text-black text-black w-[300px] text-sm'
            type="text"
            placeholder='Enter username'
          />
          <input
            name="password"
           value={formData.password}
           onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 placeholder:text-black text-black border border-black w-[300px] text-sm'
            type="password"
            placeholder='Enter password'
          />
          <div className='flex m-3'>
            <button
              type="submit"
              className='bg-black transition duration-500 ease-in-out px-4 py-2 text-white rounded-md w-[90px] hover:bg-gray-900 mt-4 text-sm font-semibold'>
              Submit
            </button>
            <NavLink to='/login'>
              <p className='mt-6 ml-3 text-blue-500 underline text-sm font-semibold'>Already have an account?</p>
            </NavLink>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default SignUp
