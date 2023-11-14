const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const eachMemberController = require('../controllers/eachMemberController');
const familyController = require('../controllers/familyController');
const upload = require('../middleware/upload')

const middleware = require('../middleware/middleware')

// here using post method to add data in database
router.post('/register', registerController.createUser);

// here using get method to get the all users data from data base
router.get('/all-users',registerController.getUsers)


// here using get method to get the each user data from data base
router.get('/user/:id',registerController.singleUser)

// here using put method to update each user data using id
router.put('/update/:id',registerController.updateUser)

// here using delete method to delete each data using id
router.delete('/delete/:id',registerController.deleteUser)

// creating a login for post method
router.post('/login',registerController.login)

router.get('/my-profile',middleware,registerController.myProfile)



// 
// router.post('/create-member', familyController.createMember);

// // here using get method to get the all users data from data base
// router.get('/all-members',familyController.getMembers)


// // here using delete method to delete each member data using id
// router.delete('/delete-member/:id',familyController.deleteMember)

// Define the route for creating each member

// router.post('/family/:familyId/addMember', upload.single('profilePicture'),eachMemberController.createEachMember);



// router.get('get-member/:memberId',eachMemberController.getEachMember)

// router.patch('/update-member/:id', eachMemberController.updateEachMember);
// router.put('/update-member/:id', eachMemberController.updateEachMember);

module.exports = router;