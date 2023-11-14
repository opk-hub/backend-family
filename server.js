
const express = require('express')
const dotEnv = require('dotenv')
const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path'); 

const userRoutes = require('./routes/userRoutes')
const familyRoutes = require('./routes/familyRoutes'); 
const eachMemberRoutes= require('./routes/eachMemberRoutes')


const app =express()
// By using "dotenv," to improve the manageability, security, and flexibility of your Node.js application's configuration. It's a best practice in the Node.js ecosystem
dotEnv.config()  


// "body-parser" is a Node.js middleware used to parse request bodies, such as JSON and URL-encoded data, in web applications.
app.use(bodyParser.json())

// connection for mongdb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(()=>{
        console.log('MongoDB connected suecessfully')
    })
    .catch((error)=>{
        console.log('Error',error)
    })


const PORT= process.env.PORT || 5000


// Define the path to your uploads folder
const uploadsPath = path.join(__dirname, 'uploads');

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(uploadsPath));

app.use('/uploads', express.static('uploads'));

// console.log(process.env) 

app.use(cors({orgin:'*'}))


app.use('/eachMember', eachMemberRoutes);

app.use('/family', familyRoutes); // Define the base URL for family routes


app.use('/users',userRoutes)

app.listen(PORT,()=>{
    console.log(`server started and running at http://localhost:${PORT}`)
})