const mongoose = require('mongoose');

const ArtisanSchema = mongoose.Schema({
  fairfair_id : {
    type: Number,
    required: true,
  },
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
    required: false
  },
  status: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  expo_push_token: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Artisans',ArtisanSchema);

