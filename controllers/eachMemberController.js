const EachMember = require('../models/EachMember');

const Family = require('../models/Family');

const createEachMember=async (req, res) => {
  try {
    const familyId = req.params.familyId;

    // Find the family by ID
    const family = await Family.findById(familyId);

    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    // Create a new EachMember based on the request data
    const newMemberData = {
      profilePicture: req.body.profilePicture,
      phone: req.body.phone,
      profession: req.body.profession,
      bloodGroup: req.body.bloodGroup,
      dateOfBirth: req.body.dateOfBirth,
      currentAddress: req.body.currentAddress,
      nativeAddress: req.body.nativeAddress,
    };

    // Save the EachMember document
    if (req.file) {
      newMemberData.profilePicture = req.file.path;
    }

    const newMember = new EachMember(newMemberData);
    await newMember.save();

    // Add the new member's ID to the family's members array
    family.members.push(newMember._id);
    await family.save();

    res.status(201).json({ message: 'Member added to family', member: newMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const getAllMembers = async (req, res) => {
  try {
    const membersList = await EachMember.find();
    res.status(200).json(membersList);
  } catch (error) {
    console.error('There is an error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const getEachMember = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const member = await EachMember.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



const updateEachMember = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const updatedData = req.body;

    // Find the EachMember document by ID
    const updatedMember = await EachMember.findByIdAndUpdate(
      memberId,
      updatedData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Update the profile picture if a new file is provided
    if (req.file) {
      updatedMember.profilePicture = req.file.path;
      await updatedMember.save();
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// const deleteEachMember = async (req, res) => {
//   try {
//     const memberId = req.params.memberId;

//     // Find the member by ID
//     const member = await EachMember.findById(memberId);

//     if (!member) {
//       return res.status(404).json({ message: 'Member not found' });
//     }

//     // Delete the member
//     await EachMember.findByIdAndRemove(memberId);

//     // Remove the member's ID from any associated family
//     const families = await Family.find({ members: memberId });
//     for (const family of families) {
//       family.members = family.members.filter((id) => id.toString() !== memberId);
//       await family.save();
//     }

//     res.status(204).send(); // 204 No Content for a successful deletion
//   } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const deleteEachMember = async (req, res) => {
  try {
    const memberId = req.params.memberId;

    // Find the member by ID
    const member = await EachMember.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Remove the member's ID from any associated family
    const families = await Family.find({ members: memberId });
    for (const family of families) {
      family.members = family.members.filter((id) => id.toString() !== memberId);
      await family.save();
    }

    // Delete the member
    await EachMember.findByIdAndRemove(memberId);

    res.status(204).send(); // 204 No Content for a successful deletion
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createEachMember,updateEachMember,getEachMember,getAllMembers,deleteEachMember
};
