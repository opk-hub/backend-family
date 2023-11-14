const Register = require('../models/Register');

const Member = require('../models/Family')

const Family = require('../models/Family');

const EachMember = require('../models/EachMember');

const createMember = async (req, res) => {
  try {
    // Create a new Family member
    const newFamilyMember = new Family({
      name: req.body.name,
      relationship: req.body.relationship,
      profilePicture: req.body.profilePicture, // Add this line to include profilePicture
      additionalInfo: req.body.additionalInfo,
    });

    await newFamilyMember.save();

    // Find the Register document by its ID and update the familyIds array
    const registerId = req.body.registerId; // Get the Register ID from the request body
    const register = await Register.findById(registerId);

    if (register) {
      register.familyIds.push(newFamilyMember._id);
      await register.save();
    }

    res.status(201).json({
      message: 'Family member created and linked to the register successfully',
      familyMember: newFamilyMember,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating family member and linking to the register' });
  }
};


  //function for delete member
  const deleteMember = async (req, res) => {
    try {
      const memberId = req.params.id;
      if (!memberId) {
        return res.status(400).json({ message: 'Member ID is missing or invalid' });
      }
  
      const deletedMember = await Member.findByIdAndDelete(memberId);
      if (!deletedMember) {
        return res.status(404).json({ message: 'Member not found' });
      }
  
      res.status(204).send('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // function for get method for all members
  const getMembers= async(req,res)=>{
    try{
      const members= await Member.find()
      res.status(200).json(members)
    }catch(error){
      console.log('There is an error:',error)
      res.status(500).json({message:'server error'})
    }
  }


  const getEachMember = async (req, res) => {
    try {
      const member= await Member.findById(req.params.id)

      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
  
      res.status(200).json(member);
    } catch (error) {
      console.error('Error fetching member details:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
 const getRegisterFamilyids= async (req, res) => {
    try {
        const { registerId, familyId } = req.params;

        // Assuming you have a Family model with the fields: name, relationship, additionalInfo, and _id
        const familyMember = await Family.findOne({ registerId, _id: familyId });

        if (!familyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        res.status(200).json(familyMember);
    } catch (error) {
        console.error('Error fetching family member details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Get family data based on registered data
const getFamilyData = async (req, res) => {
  try {
    // Get the unique identifier (e.g., user ID) from the request
    const userId = req.params.userId; // Assuming you have a route parameter like /family/:userId

    // Find the Register document by the user ID
    const register = await Register.findOne({ _id: userId });

    if (register) {
      // Extract familyIds from the Register data
      const familyIds = register.familyIds;

      // Retrieve the family data based on familyIds
      const familyData = await Family.find({ _id: { $in: familyIds } });

      res.status(200).json({
        message: 'Family data retrieved successfully',
        familyData,
      });
    } else {
      res.status(404).json({ error: 'Register not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting family data based on registered data' });
  }
};


  
  module.exports = {
    createMember,
    deleteMember,
    getMembers,
    getEachMember,
    getRegisterFamilyids,
    getFamilyData
  };