const express = require('express')
const app = express();
const db = require('./mongodb/db')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT || 10000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cors())


app.get('/' , (req,res)=>{
    res.send('Server working ')
})
const userRoutes = require('./routes/userRoutes')
app.use('/user' , userRoutes)

const taskRoutes = require('./routes/tastRoutes')
app.use('/task', taskRoutes)

app.listen(PORT, '0.0.0.0' , ()=>console.log("Server Running...."))
