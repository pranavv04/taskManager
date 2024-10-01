import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
    const [taskId, setTaskId] = useState('');
    const [format, setFormat] = useState('json'); // Default to JSON
    const [reportData, setReportData] = useState(null); // State to hold the report data

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://taskmanager-r9o7.onrender.com/task/report/${taskId}?format=${format}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            // Handle the response based on the format
            if (format === 'csv') {
                const blob = await response.blob(); // Get the CSV as a blob
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'task_report.csv'); // Set the file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('CSV report downloaded successfully.');
            } else {
                const data = await response.json(); // JSON format
                setReportData(data); // Set the report data to state
                toast.success('Report fetched successfully.');
            }
        } catch (error) {
            console.error('Error fetching report:', error);
            toast.error('Failed to fetch report: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
            <p className='text-red-500 text-sm font-bold'>To get the id of task look at the url and copy that </p>
            <h1 className="text-3xl font-bold mb-8">Generate Report</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                {/* Task ID Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Task ID
                    </label>
                    <input
                        type="text"
                        value={taskId}
                        onChange={(e) => setTaskId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Format Selection */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Format
                    </label>
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Get Report
                    </button>
                </div>
            </form>
            <ToastContainer />

            {/* Display Report Data */}
            {reportData && (
                <div className="mt-8 w-full max-w-lg p-4 border rounded-md bg-white shadow">
                    <h2 className="text-xl font-semibold mb-4">Report Data</h2>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(reportData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Report;
