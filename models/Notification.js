const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
  tokenArray: {
    type: Array,
    required: true
  },
  sound: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: false
  },
  iat: {
    type: Date,
    default: Date.now()+(2*60*60*1000)  // Add 2 hours to the UTC time
  }
});

module.exports = mongoose.model('Notifications', NotificationSchema);