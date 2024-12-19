// const express = require("express");
import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

// const logger = (req, res, next) => {
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
//   );
//   next();
// };

// Get all posts
router.get("/", getPosts); // Fix: Ensure "/" is used for the base endpoint

// Get a single post by ID
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

// Update a post by ID
router.put("/:id", updatePost);

// Delete a post by ID
router.delete("/:id", deletePost);

export default router;
