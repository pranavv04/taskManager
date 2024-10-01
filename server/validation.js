const Joi = require('joi');

// Validation schema for task creation
const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    due_date: Joi.string().required(), 
    status: Joi.string().valid('To Do', 'In Progress', 'Completed').required(),
    assigned: Joi.string().required(), 
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),

});

// Validation schema for task update
const taskUpdateSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(5).max(500),
    due_date: Joi.string(), 
    status: Joi.string().valid('To Do', 'In Progress', 'Completed'),
    assigned: Joi.string(),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
}).min(1); 

module.exports = {
    taskSchema,
    taskUpdateSchema,
};
