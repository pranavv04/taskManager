import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const { id } = useParams(); // Get task ID from the URL
    const [taskData, setTaskData] = useState({
        title: '',
        assigned: '',
        description: '',
        due_date: '',
        status: '',
        priority: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing task details to populate the form
        const fetchTask = async () => {
            try {
                const response = await fetch(`https://taskmanager-r9o7.onrender.com/task/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                const data = await response.json();
                console.log('Fetched task data:', data);
                setTaskData(data);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Failed to fetch task: ' + error.message);
            }
        };

        fetchTask();
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    // Handle form submission
   // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new object without the `_id` and `__v` fields
    const { _id, __v, ...dataToUpdate } = taskData;

    try {
        const response = await fetch(`https://taskmanager-r9o7.onrender.com/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
            },
            body: JSON.stringify(dataToUpdate) // Send only the fields to update
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        toast.success('Task updated successfully');
        setTimeout(() => {
            navigate('/tasks'); // Redirect to task list after update
        }, 2000);
    } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Failed to update task: ' + error.message);
    }
};

    

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-8">Update Task</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                {/* Task Title */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Task Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Assigned To */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Assigned To
                    </label>
                    <input
                        type="text"
                        name="assigned"
                        value={taskData.assigned}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Due Date */}
{/* Due Date */}
<div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Due Date (YYYY-MM-DD)
    </label>
    <input
        type="text"
        name="due_date"
        value={taskData.due_date}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
    />
</div>


                {/* Status */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Status
                    </label>
                    <select
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">Select Status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Priority */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Priority
                    </label>
                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Task
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Update;
