const express = require('express');
const router = express.Router();
const Position = require('../models/Position');
const jwt = require('jsonwebtoken')
require('dotenv/config');


function authenticateToken(req, res, next) {
  
  console.log("authentification...");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    // console.log(user)
    req.user = user
    next();
  })
}

// GET API all the positions  // of the authenticated user
router.get('/', authenticateToken, async (req, res) => {
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
router.post('/', async (req,res) => {

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