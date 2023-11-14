const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true,
        unique: false
        
    },
    profilePicture: {
        type: String,
      },
    additionalInfo: {
        type: String 
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EachMember',
        },
    ],

});

module.exports = mongoose.model('Family', familyData);
