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
    required: true
  },
  status: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Artisans',ArtisanSchema);

