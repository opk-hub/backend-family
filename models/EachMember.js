const mongoose = require('mongoose');

const eachMemberSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  profession: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  dateOfBirth: {
    type: Date, // Date of Birth field
  },

});

module.exports = mongoose.model('EachMember', eachMemberSchema);
