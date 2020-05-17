const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
require('dotenv/config');
require('./auth')
const { Expo } = require('expo-server-sdk');

// POST notification to users with tokens
router.post('/', global.authenticateToken, async (req,res) => {

  console.log(req.body)
  let expo = new Expo();
  let messages = [];

  for (let pushToken of req.body.tokenArray) {

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      body: req.body.body,
      data: req.body.data,
      iat: Date.now()+(2*60*60*1000) // Add 2 hours to the UTC time
    })
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  // Save Notification object to the DB
  const notificationDbOject = new Notification({
    tokenArray: req.body.tokenArray,
    sound: 'default',
    body: req.body.body,
    data: req.body.data,
    iat: Date.now()+(2*60*60*1000) // Add 2 hours to the UTC time
  });

  try {
    const savedNotification = await notificationDbOject.save();
    res.json(savedNotification);
  } catch (err) {
    res.json({message: err});
  }
});

// POST notification to users with tokens
router.post('/mission', global.authenticateToken, async (req,res) => {

  console.log(req.body)
  let expo = new Expo();
  let messages = [];

  for (let pushToken of req.body.tokenArray) {

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

      
    messages.push({
      to: pushToken,
      sound: "default",
      body: req.body.body,
      data: req.body.data,
      color: req.body.color,
      channelId: req.body.channelId,
      iat: Date.now()+(2*60*60*1000) // Add 2 hours to the UTC time
    })
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  // Save Notification object to the DB
  const notificationDbOject = new Notification({
    tokenArray: req.body.tokenArray,
    sound: req.body.sound,
    body: req.body.body,
    data: req.body.data,
    color: req.body.color,
    channelId: req.body.channelId,
    iat: Date.now()+(2*60*60*1000) // Add 2 hours to the UTC time
  });

  try {
    const savedNotification = await notificationDbOject.save();
    res.json(savedNotification);
  } catch (err) {
    res.json({message: err});
  }
});


module.exports = router;