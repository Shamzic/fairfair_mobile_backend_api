const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken')
require('dotenv/config');


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user
    next();
  })
}

// GET API all the posts of the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
      const posts = await Post.find();
      posts_object = JSON.parse(JSON.stringify(posts));

      // console.log(posts_object);
      res.json(posts_object.filter(post => post.username === req.user.firstname));
    } catch(err) {
      res.json({message: err})
    }

});

// GET API specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch(err) {
    res.json({message: err})
  }
});


// DELETE API specific post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
  } catch(err) {
    res.json({message: err})
  }
});


// UPDATE API specific post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {_id: req.params.postId},
      {$set: {
        title: req.body.title,
        descripiton: req.body.description,
      }}
    );
    res.json(updatedPost);
  } catch(err) {
    res.json({message: err})
  }
});


// POST API call
router.post('/', async (req,res) => {


  console.log(req.body)

  // Post object creation
  const post = new Post({
    title : req.body.title,
    description: req.body.description,
    username: req.body.username,
  });

  // Save Post object to the DB
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;