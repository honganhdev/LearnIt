const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { validatePost } = require("../utils/validation");
const logger = require("../utils/logger");

const Post = require("../models/Post");

//@route GET api/post
//@desc Get post
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    logger.error("Error fetching posts", { error: error.message, userId: req.userId });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//@route POST api/post
//@desc Create post
//@access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Validate post data
  const validation = validatePost({ title, description, url, status });
  if (!validation.valid) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url && url.length > 0 ? (url.startsWith(`https://`) ? url : `https://${url}`) : '',
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    logger.error("Error creating post", { error: error.message, userId: req.userId });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//@route PUT api/post
//@desc Update post
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Validate post data
  const validation = validatePost({ title, description, url, status });
  if (!validation.valid) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: url && url.length > 0 ? (url.startsWith(`https://`) ? url : `https://${url}`) : "",
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorized to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });

    res.json({
      success: true,
      message: "Excellent progress",
      post: updatedPost,
    });
  } catch (error) {
    logger.error("Error updating post", { error: error.message, postId: req.params.id });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//@route DELETE api/post
//@desc Delete post
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized to update post or post not found
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    res.json({ success: true, post: deletePost });
  } catch (error) {
    logger.error("Error deleting post", { error: error.message, postId: req.params.id });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
