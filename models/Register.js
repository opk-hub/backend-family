
const mongoose = require('mongoose')

// here using register schema for main input fields we want
const registerSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        default:false
    },
    confirmPassword:{
        type:String,
        required:true
    },
    familyIds:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Family', // Reference the Family model
       }
   ]
})

module.exports = mongoose.model('Register',registerSchema)