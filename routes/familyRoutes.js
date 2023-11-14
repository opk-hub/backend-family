const express = require('express');
const router = express.Router();
const EachMember = require('../models/EachMember');
const upload = require('../middleware/upload')


const familyController = require('../controllers/familyController');

// Create a new family member
router.post('/create-member', upload.single('profilePicture'), familyController.createMember);

// Get all family members
router.get('/all-members', familyController.getMembers);

router.get('/each-member/:id', familyController.getEachMember);

router.get('/member', familyController.getRegisterFamilyids);


// Delete a family member by ID
router.delete('/delete-member/:id', familyController.deleteMember);

// Add family data to a register
// router.post('/add-family-to-register', familyControllers.addFamilyDataToRegister);
// router.post('/add-member-to-family/:familyId', familyController.addMemberToFamily);

// Define the route for getting family data
router.get('/:userId', familyController.getFamilyData);


module.exports = router;
