const express = require('express');
const router = express.Router();
const Artisans = require('../models/Artisan');
const Positions = require('../models/Position');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('./auth')

// GET API all the artisans
router.get('/artisans', async (req, res) => {
  try {
    const artisans = await Artisans.find();
    // console.log("dashboard artisans : ", artisans);
    console.log(JSON.stringify(artisans))
    res.render('dashboard_artisans', {title: "Dashboard artisans", artisans : artisans});
    // res.render('dashboard', json(artisans));
  } catch(err) {
    res.json({message: err})
  }
});

// GET API all the artisans
router.get('/positions', async (req, res) => {
  try {
    const positions = await Positions.find();
    // console.log("dashboard artisans : ", artisans);
    console.log(JSON.stringify(positions))
    res.render('dashboard_positions', {title: "Dashboard positions", positions : positions});
    // res.render('dashboard', json(artisans));
  } catch(err) {
    res.json({message: err})
  }
});



module.exports = router;