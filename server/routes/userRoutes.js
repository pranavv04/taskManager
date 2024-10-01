const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { generateToken, jwtAuthMiddleware } = require('../jwt')


//sign up route
router.post('/signup', async (req, res) => {
    try {

        const data = req.body;
      

        const newUser = User(data)
        const response = await newUser.save();
        console.log('New User added')


        const payload = {
            id: response.id,
            username: response.username,
            role:response.role
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log('Token is ', token);
        res.status(200).json({ response: response, token: token })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

//login route

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body; 

        const user = await User.findOne({ username: username });

        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(404).json({ error: 'Invalid username or password' });
        }

        
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role, 
        };    
        const token = generateToken(payload);
        res.json({ token });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  
//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; 
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

//fetching all the user
router.get('/', async (req, res) => {
    try {
        const data = await User.find()
        console.log('User Data fetched')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})


//fetching using username
router.get('/:username', async (req, res) => {
    try {
        const userName = req.params.username
        const response = await User.find({ username: userName })
        if (response.length == 0) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(response)
    } catch (error) {
       res.status(500).json({error :"Internal server error"})
    }

})

//Updating user data
router.put('/:id', async(req,res)=>{
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const response = await User.findByIdAndUpdate(userId , updatedUser , {
            new:true , runValidators:true
        } );
        if(!response){ 
            return res.status(404).json({error: "Unable to update user"})
        }
        res.status(200).json(response)
        

    } catch (error) {
        res.status(500).json({error : "Internal server error"})
    }
})

router.delete('/:id' , async(req,res)=>{
    try {
     const userId = req.params.id;
     const response = await User.findByIdAndDelete(userId);
     if(!response){
        return res.status(404).json({error:"Unable to delete user"})
    }
    res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;