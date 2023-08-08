// Create web server

// Import modules  ==============================================================
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// Create comment  ==============================================================
router.post('/posts/:id/comments', isLoggedIn, async (req, res) => {  

  try {
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    comment.post.id = post._id;
    comment.post.title = post.title;
    await comment.save();
    post.comments.push(comment);
    await post.save();
    req.flash('success', 'Comment created');
    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    req.flash('error', 'Cannot create comment');
    res.redirect('back');
  }
})
