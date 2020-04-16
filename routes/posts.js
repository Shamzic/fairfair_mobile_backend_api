const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET API all the posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
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

  // Post object creation
  const post = new Post({
    title : req.body.title,
    description: req.body.description
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