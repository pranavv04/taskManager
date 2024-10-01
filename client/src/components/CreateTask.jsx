import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

const CreateTask = () => {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assigned: '',
    due_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setTaskData((prevData) => ({ ...prevData, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://taskmanager-backend-i458.onrender.com/task/addpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),  // No need to add creator
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }
  
      toast.success('Task created successfully!');
      setTaskData({
        title: '',
        description: '',
        status: '',
        priority: '',
        assigned: '',
        due_date: ''
        // Reset without creator
      });
  
    } catch (error) {
      toast.error('Failed to create task: ' + error.message);
      console.error('Create task error:', error);
    }
  };
  
  
  return (
    <div className="bg-gray-100 min-h-screen p-10 flex items-center justify-center">
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-8 text-center font-extrabold">Create a Task</h1>

        <div className="bg-white p-8 shadow-md rounded-lg space-y-6">
          {/* Title Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Description</label>
            <ReactQuill
              value={taskData.description}
              onChange={handleDescriptionChange}
              placeholder="Enter task description"
              className="h-64 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Status Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              placeholder="Enter task status"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Priority Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Priority</label>
            <input
              type="text"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              placeholder="Enter task priority"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Assigned Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Assigned To</label>
            <input
              type="text"
              name="assigned"
              value={taskData.assigned}
              onChange={handleChange}
              placeholder="Assign to"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Due Date</label>
            <input
              type="text"
              name="due_date"
              value={taskData.due_date}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all"
            type="submit"
          >
            Create Task
          </button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default CreateTask;
