const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  iat: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Positions', PositionSchema);

