import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');  // State to track the selected filter

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://taskmanager-backend-i458.onrender.com/task/');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          toast.error('Error in fetching data from database');
        }
      } catch (error) {
        toast.error('Internal server error');
      }
    }
    fetchTasks();
  }, [])

  // Function to filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'High Priority') return task.priority === 'High';
    if (filter === 'Medium Priority') return task.priority === 'Medium';
    if (filter === 'Low Priority') return task.priority === 'Low';
    if (filter === 'Incomplete') return task.status === 'Incomplete';
    if (filter === 'To Do') return task.status === 'To Do';
    return true;
  });

  return (
    <div>
      {/* Filter Options */}
      <div className='flex justify-around mt-2'>
        {['All', 'High Priority', 'Medium Priority', 'Low Priority', 'Incomplete', 'To Do'].map(priority => (
          <h3 
            key={priority}
            className={`text-sm font-bold cursor-pointer ${filter === priority ? 'underline rounded-md' : ''}`}
            onClick={() => setFilter(priority)}
          >
            {priority === 'All' ? 'All Tasks' : priority + ' Tasks'}
          </h3>
        ))}
      </div>

      <h1 className='text-2xl font-bold m-6 underline'> Tasks</h1>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div className='flex flex-col justify-center items-center text-center align-middle shadow-sm p-4 mb-4' key={task._id}>
            <h1 className='text-lg font-bold mt-1'>{task.title}</h1>
            <div className='flex justify-between items-center w-full p-2 mt-2 bg-gray-100 rounded-md'>
              <p className={task.status === 'Completed' ? 'm-2 text-green-600' : 'm-2 text-red-600'}>{task.status}</p>
              <p className='m-2 text-gray-600'>{task.due_date}</p>
              <p className='m-2 text-gray-600'>{task.priority}</p>
              <p className='m-2 text-gray-600'>Assigned to: {task.assigned}</p>
              <p className='m-2 text-gray-600'>Task id: {task._id}</p>

              <Link to={`/tasks/${task._id}`}>
                <button className='text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800'>
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className='h-[70vh] flex justify-center items-center'>
          <p className='text-gray-500 text-3xl font-extrabold'>
            No Tasks available
          </p>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default Tasks;
