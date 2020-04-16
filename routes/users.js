const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
      if(user.firstname == req.body.firstname) {
        login_user = user;
      }
    });

    if(login_user == null) {
      return res.status(400).send('Cannot find the user');
    }

    try {
      if(await bcrypt.compare(req.body.password, login_user.password)) {
        res.send('Success');
      } else {
        res.send('Not Allowed')
      }
    } catch (err) {
      res.send('Not Allowed');
    }
});


module.exports = router;