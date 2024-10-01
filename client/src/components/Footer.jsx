import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='bg-black text-white h-[100px] flex justify-around items-center '>
      <div>
        <p className='text-sm font-bold hover:underline'>Developed and Designed by Pranav</p>
      </div>
      <div className='flex'> 
      <FaLinkedin  className='text-2xl m-5 mr-2 transition ease-in-out duration-200 cursor-pointer hover:text-blue-500'/>
      <FaGithub className='text-2xl m-5 mr-2 transition ease-in-out duration-200 cursor-pointer hover:text-gray-500'/>
      <FaInstagram className='text-2xl m-5 mr-2 transition ease-in-out duration-200 cursor-pointer hover:text-red-500' />
      </div>
    </div>
  )
}

export default Footer
