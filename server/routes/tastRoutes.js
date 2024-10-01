const express = require('express')
const router = express.Router();
const Task = require('../models/Task')
const mongoose = require('mongoose')
const { taskSchema, taskUpdateSchema } = require('../validation'); 
const {jwtAuthMiddleware ,adminMiddleware } = require('../jwt')


//adding task
const { Parser } = require('json2csv');
router.post('/addpost', async (req, res) => {
    try {
      
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const task = new Task(req.body); 
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
});

//getting all task
router.get('/' , async(req,res) =>{
    try {
        const response = await Task.find().populate('assigned' , 'name');
        if(!response) {
            return res.status(404).json({message:"Error fetching data"})
        }
        console.log("All data fetched")
        res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error: "Internal server error"})
    }
})
router.get('/:id', async (req, res) => {
    // const { id } = req.params;
    try {
        const taskid = req.params.id;
        if(taskid){
          const response = await Task.findById(taskid);
          if(!response){
            return res.status(404).json({error: "Task data not found"})
          }
          console.log('Task data fetched');
          res.status(200).json(response)
        }
       
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        // Validate the request body for updates
        const { error } = taskUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const taskId = req.params.id;
        const updatedData = req.body;

        const response = await Task.findByIdAndUpdate(taskId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ message: "Update Failed" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:id' , async(req,res)=>{
    try {
        const userId = req.params.id;
        const response = await Task.findByIdAndDelete(userId)
        if(!response){
            return res.status(404).json({message:"Unable to delete"})
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})

//admin only routes 
//to assign a task to a user (admin only)
router.put('/:id/assign', jwtAuthMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedUser } = req.body;

        const task = await Task.findByIdAndUpdate(id, { assigned: assignedUser }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
});


//getting report admins only

router.get('/report/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Fetch the task from the database
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Format the report data
    const reportData = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
      assigned: task.assigned,
      priority: task.priority,
      creator: task.Creator
    };

    // Check if CSV format is requested
    const { format } = req.query;
    if (format === 'csv') {
      const fields = ['title', 'description', 'due_date', 'status', 'assigned', 'priority', 'creator'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse([reportData]); // Wrap in an array for CSV conversion

      // Send CSV response
      res.header('Content-Type', 'text/csv');
      res.attachment('task_report.csv');
      return res.send(csv);
    }

    // Default: Send JSON response
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

module.exports = router;
