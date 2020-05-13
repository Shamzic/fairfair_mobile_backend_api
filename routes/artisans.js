const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('./auth')


// GET status artisan
router.get('/:uid', global.authenticateToken, async (req, res) => {
  try {
    const artisan = await Artisan.findOne({"fairfair_id": req.params.uid.toString()});
    // const artisan = await Artisan.find();
    res.json(artisan);
  } catch(err) {
    res.json({message: err})
  }
});


router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.find();
    console.log("get artisans : ", artisans);
    res.json(artisans);
  } catch(err) {
    res.json({message: err})
  }
});


// Update or create an artisan if not already created
router.post('/set', global.authenticateToken, async (req, res) => {
  try {
    const artisan = await Artisan.findOne({"fairfair_id": req.body.fairfair_id});
    artisan_objet = JSON.parse(JSON.stringify(artisan));
  
    if(!artisan_objet) {
      const artisan = new Artisan({
        fairfair_id: req.body.fairfair_id,
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        status: req.body.status,
        phone: req.body.phone
      });
      artisan_objet = await artisan.save();
    } else {
      artisan_objet = await artisan.updateOne({
        fairfair_id: req.body.fairfair_id,
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        status: req.body.status,
        phone: req.body.phone
      });
    }
    res.json(artisan_objet);
  } catch(err) {
    res.json({message: err})
  }
});

// Update ONLY the status or create an artisan if not already created
router.post('/setstatus', global.authenticateToken,  async (req, res) => {
  try {
    const artisan = await Artisan.findOne({"fairfair_id": req.body.fairfair_id});
    artisan_objet = JSON.parse(JSON.stringify(artisan));
  
    if(!artisan_objet) {
      const artisan = new Artisan({
        fairfair_id: req.body.fairfair_id,
        status: req.body.status,
      });
      artisan_objet = await artisan.save();
    } else {
      artisan_objet = await artisan.updateOne({
        fairfair_id: req.body.fairfair_id,
        status: req.body.status,
      });
    }
    res.json(artisan_objet);
  } catch(err) {
    res.json({message: err})
  }
});


router.post('/create', global.authenticateToken, async (req, res) => {
  
  const artisan = new Artisan({
    fairfair_id: req.body.fairfair_id,
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: req.body.status,
    phone: req.body.phone
  });

  try {
      const savedArtisan = await artisan.save();
      res.json(savedArtisan);
    } catch (err) {
      res.json({message: err});
    }
  });




module.exports = router;