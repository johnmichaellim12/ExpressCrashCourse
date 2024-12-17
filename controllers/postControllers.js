// @desc Get all posts
// @route GET /api/posts

const getPosts = (req, res, next) => {
  // console.log(req.query);
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
const getPost = (req, res, next) => {
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
};

// @desc Create new post
// @route POST /api/posts
const createPost = (req, res, next) => {
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
};
