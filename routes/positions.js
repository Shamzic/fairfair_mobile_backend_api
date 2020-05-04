const express = require('express');
const router = express.Router();
const Position = require('../models/Position');
require('dotenv/config');
require('./auth')


// GET API positions  of the authenticated user with his uid
router.get('/:uid', global.authenticateToken, async (req, res) => {
    try {
      const positions = await Position.find();
      positions_obj = JSON.parse(JSON.stringify(positions));

      if(req.params.uid != null) {
        res.json(positions_obj.filter(pos => pos.userId == req.params.uid.toString()));
      } else {
        res.json(positions_obj);
      }
    } catch(err) {
      res.json({message: err})
    }
});

// GET API all positions
router.get('/', global.authenticateToken, async (req, res) => {
  try {
    const positions = await Position.find();
    positions_obj = JSON.parse(JSON.stringify(positions));
    res.json(positions_obj);
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