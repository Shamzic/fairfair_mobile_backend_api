const express = require('express');
const router = express.Router();
const Position = require('../models/Position');
require('dotenv/config');
require('./auth')


// GET API all the positions  // of the authenticated user
router.get('/', global.authenticateToken, async (req, res) => {
    try {
      const positions = await Position.find();
      positions_obj = JSON.parse(JSON.stringify(positions));
      console.log(positions_obj)
      console.log(req.user.id)
      res.json(positions_obj.filter(pos => pos.userId == req.user.id));
    } catch(err) {
      res.json({message: err})
    }
});

// POST API call
router.post('/', global.authenticateToken, async (req,res) => {

  console.log(req.body)

  // Post object creation
  const position = new Position({
    userId : req.body.userId,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    iat: Date.now()
  });

  // Save Post object to the DB
  try {
    const savedPosition = await position.save();
    res.json(savedPosition);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;