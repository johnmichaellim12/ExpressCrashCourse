// const express = require("express");
import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// const logger = (req, res, next) => {
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
//   );
//   next();
// };

// Get all posts
router.get("/", (req, res, next) => {
  // console.log(req.query);
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get single post
router.get("/:id", (req, res, next) => {
  // console.log(req.params);
  const id = parseInt(req.params.id);
  // res.status(200).json(posts.filter((post) => post.id === id));
  const post = posts.find((post) => post.id === id);

  if (!post) {
    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
});

// Create new post
router.post("/", (req, res, next) => {
  //   console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    // return res.status(400).json({ msg: "Please include a title" });
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

// Update Post
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete Post
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
