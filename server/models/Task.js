const { required } = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        required: true
    },
    assigned: {
        type: String,  // Change this to String
        required: true
    },
    priority: {
        type: String,
        required: true
    },
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
