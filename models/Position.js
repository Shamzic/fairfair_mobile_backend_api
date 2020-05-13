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
    default: Date.now()+(2*60*60*1000) // Add 2 hours to the UTC time
  }
});

module.exports = mongoose.model('Positions', PositionSchema);

