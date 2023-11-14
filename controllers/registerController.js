const User = require('../models/Register');
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword, familyData } = req.body;

    const newRegister = new User({
      name,
      phone,
      email,
      password,
      confirmPassword,
    });

    if (familyData) {
      const newFamily = new Family(familyData);
      await newFamily.save();
      newRegister.family = newFamily._id;
    }

    await newRegister.save();

    res.status(201).json({ message: 'User created successfully', register: newRegister });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};



// function for get method for all users
const getUsers= async(req,res)=>{
  try{
    const users= await User.find()
    res.status(200).json(users)
  }catch(error){
    console.log('There is an error:',error)
    res.status(500).json({message:'server error'})
  }
}


// function for get method for single user
const singleUser= async(req,res)=>{
  try{
    const user= await User.findById(req.params.id)
    if (!user){
      return res.status(404).json({message:'User Not Found'})
    }
    res.status(200).json(user)
  }catch(error){
    console.log('There is an error:',error)
    res.status(500).json({message:'server error'})
  }
}


// function for put method 
const updateUser = async(req,res)=>{
  try{
    const {name,phone,email,password,confirmPassword}=req.body

    const myUser = await User.findByIdAndUpdate(
      req.params.id,
      {name,phone,email,password,confirmPassword}
    )
    if (!myUser){
      return res.status(404).json({message:'user not found'})
    }
    res.status(200).json(myUser)

  }catch(error){
    console.log('There is an error:',error)
    res.status(500).json({message:"Server Error"})
  }
}

// function for delete method 
const deleteUser = async(req,res)=>{
  try{
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    res.status(204).send("User Deleted Sucessfully")
  }catch(error){
    console.log('There is an error:',error)
    res.status(500).json({message:"Server Error"})
  }
}


// function for login 
const login = async(req,res)=>{
  try{
    const {email,password} = req.body
    let exist = await User.findOne({email:email})

    if(!exist){
      return res.status(400).send("User Not Found")
    }
    if(exist.password !== password){
      return res.status(400).send("User Email and Password are not matched")

    }
    let payload = {
      userDetails :{
        id:exist.id
      },
      registerId: exist.id
    }
   jwt.sign(payload,"jwtSecret",{expiresIn:3600000},
  (err,token)=>{
        if(err) throw err
        return res.json({token,registerId: exist.id})
      })
      

  }
  catch(error){
    console.log('There is an error in Server:',error)
    res.status(500).json({message:"Server Error"})
  }
}

// get data after login
const myProfile =  async(req,res)=>{
  try{
    let exist = await User.findById(req.userDetails.id)
    if(!exist){
      return res.status(400).send('User Not Found')
    }
    res.json(exist)

  }catch(error){
    console.log('There is an error:',error)
    res.status(500).json({message:"Server Error"})
  }
}



// Export the updated function
module.exports = {
  createUser,
  getUsers,
  singleUser,
  updateUser,
  deleteUser,
  login,
  myProfile,
  
};