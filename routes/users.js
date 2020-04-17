const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv/config');

// GET API all the users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch(err) {
    res.json({message: err})
  }
});

// POST : create a user
router.post('/', async (req, res) => {

  try {
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    const user = new User({
      firstname : req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({message: err});
  }
});

// POST : login a user
router.post('/login', async (req, res) => {

    const users = await User.find();
    var login_user = null;
    users.forEach(user => {
      if(user.email == req.body.email) {
        login_user = user;
      }
    });

    if(login_user == null) {
      return res.status(400).send('Cannot find the user');
    }

    var user = login_user.toObject({ getters: true }); 
    console.log(user);

    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.send({accessToken: accessToken})
      } else {
        res.send('Not Allowed after bcrypt')
      }
    } catch (err) {
      res.send('Not Allowed catch');
    }
});


module.exports = router;