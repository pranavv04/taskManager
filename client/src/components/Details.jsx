import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';

const Details = () => {
    const localUsername = localStorage.getItem('username'); // Get username from local storage
    const { id } = useParams(); // Get task ID from URL
    const [taskData, setTaskData] = useState(null); // State to store task data
    const [assignedUserUsername, setAssignedUserUsername] = useState(''); // State to store assigned user's username
    const navigate = useNavigate();

    // Fetch task details based on task ID
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`https://taskmanager-backend-bsps.onrender.com/task/${id}`);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                const data = await response.json();
                setTaskData(data); // Set task data

                // Fetch the assigned user's username based on the "assigned" name in the task data
                const assignedUserResponse = await fetch(`https://taskmanager-backend-bsps.onrender.com/user?name=${data.assigned}`);
                const assignedUserData = await assignedUserResponse.json();
                
                setAssignedUserUsername(assignedUserData.username); // Set the assigned user's username
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Failed to fetch task: ' + error.message);
            }
        };

        if (id) {
            fetchTask(); // Fetch task if ID is present
        }
    }, [id]);

    // Function to handle task deletion
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://taskmanager-backend-bsps.onrender.com/task/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Task deleted successfully');
                setTimeout(() => {
                    navigate('/tasks');
                }, 2000);
            } else {
                toast.error('Unsuccessful to delete task');
            }
        } catch (error) {
            toast.error('Unsuccessful to delete task');
        }
    };

    // Function to remove HTML tags from task description
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    // Placeholder function for reporting a task
    const handleReport = () => {
        toast.info('Task has been reported!');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="m-6">
                <Link to='/tasks'>
                    <button className="flex items-center bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 text-white font-semibold transition duration-300 ease-in-out shadow-md">
                        <IoArrowBack className="mr-2" />
                        Back to Tasks
                    </button>
                </Link>
            </div>
            <div className="flex-grow flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold font-serif text-gray-800 mb-6">
                    {taskData ? taskData.title : 'Loading...'}
                </h1>
                <div className="w-full text-left space-y-4">
                    <p className="text-lg font-medium text-gray-600">
                        <span className="font-semibold text-gray-900">Assigned to:</span> {taskData ? taskData.assigned : 'Loading...'}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                        <span className="font-semibold text-gray-900">Description:</span> {taskData ? stripHtml(taskData.description) : 'Loading...'}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                        <span className="font-semibold text-gray-900">Due Date:</span> {taskData ? taskData.due_date : 'Loading...'}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                        <span className="font-semibold text-gray-900">Status:</span> {taskData ? taskData.status : 'Loading...'}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                        <span className="font-semibold text-gray-900">Priority:</span> {taskData ? taskData.priority : 'Loading...'}
                    </p>
                </div>

              
                    <div className="flex justify-between items-center mt-8 w-full space-x-4">
                        <button 
                            onClick={handleDelete} 
                            className="text-red-500 font-semibold hover:underline hover:text-red-600 transition ease-in-out duration-300"
                        >
                            Delete Task
                        </button>
                        <Link to={`/tasks/${id}/update`}>
                            <button className="px-6 py-2 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition duration-300">
                                Update Task
                            </button>
                        </Link>
                        <Link to={`/tasks/${id}/report`}>
                        <button 
                            onClick={handleReport}
                            className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition duration-300"
                        >
                            Report Task
                        </button>
                        </Link>
                       
                    </div>
                   
            
            </div>
            <ToastContainer />
        </div>
    );
};

export default Details;
