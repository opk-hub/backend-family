const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload')


const eachMemberController = require('../controllers/eachMemberController');

// router.post('/:familyId', upload.single('profilePicture'),eachMemberController.createEachMember);
router.post('/:familyId', upload.single('profilePicture'),eachMemberController.createEachMember);

// Update a member by ID (PUT request)
router.put('/update-members/:memberId', upload.single('profilePicture'),eachMemberController.updateEachMember);
router.patch('/update-members/:memberId', eachMemberController.updateEachMember);

router.get('/all-members', upload.single('profilePicture'), eachMemberController.getAllMembers);

router.get('/members/:memberId',eachMemberController.getEachMember)

router.delete('/delete/:memberId', eachMemberController.updateEachMember);

module.exports = router;