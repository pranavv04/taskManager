import React from 'react';
import { motion } from 'framer-motion';
import Img5 from '../assets/images/img5.jpg';
import Img4 from '../assets/images/img4.jpg';

// Define variants for different animations
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
      staggerChildren: 0.3, // Stagger animation for child elements
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const Home = () => {
  return (
    <motion.div
      className='flex flex-col justify-center text-center m-20'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.h1 className='text-[50px] font-extrabold font-sans'  variants={textVariants}>
        Task Manager.
      </motion.h1>
      <motion.p
        className='text-md font-bold text-yellow-500 underline'
        variants={textVariants}
      >
        Manage all your tasks
      </motion.p>

      {/* First Section with Text and Image */}
      <div className='flex justify-between m-20'>
        <motion.div
          className='w-[500px] m-10 p-4 flex text-center text-sm shadow-md rounded-xl items-center'
          variants={textVariants}
        >
          <p>
          Stay organized and focused with our intuitive interface, designed to enhance your productivity. Our task management system allows you to create, assign, and track tasks effortlessly, ensuring that nothing slips through the cracks. With customizable categories, you can easily prioritize your workload and tackle your most important assignments first, leading to better time management and increased efficiency.
          </p>
        </motion.div>

        <motion.img
          src={Img5}
          className='h-[300px] w-[500px]   rounded-md'
          alt=""
          variants={imageVariants}
        />
      </div>

      {/* Second Section with Image and Text */}
      <div className='flex justify-between m-20'>
        <motion.img
          src={Img4}
          className='h-[300px] w-[500px]  rounded-md'
          alt=""
          variants={imageVariants}
        />

        <motion.div
          className='w-[500px] m-10 p-4 text-sm flex text-center shadow-md rounded-xl items-center'
          variants={textVariants}
        >
          <p>
          Enhance team collaboration with real-time updates and notifications that keep everyone in sync. Our platform facilitates smooth communication and ensures that all team members are on the same page. Say goodbye to missed deadlines and hello to seamless teamwork, where everyone can contribute effectively towards achieving your project goals. Experience the difference that efficient collaboration can make!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
