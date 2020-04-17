const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  }
  // lat: {
  //   type: Number,
  //   required: false
  // },
  // long: {
  //   type: Number,
  //   required: false
  // },
  // is_online: {
  //   type: Boolean,
  //   required: false
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = mongoose.model('Users',UserSchema);

