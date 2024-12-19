// const express = require("express");
import express from "express";
// const path = require("path");
import path from "path";
// const posts = require("./routes/posts");
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
const port = process.env.PORT || 8000;
const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/posts", posts); // This ensures `/api/posts` points to `routes/posts.js`

// Error handler
app.use(notFound); // Add this after defining all routes
app.use(errorHandler); // Add this to handle any errors

app.listen(port, () => console.log(`Server is running on port ${port}`));
