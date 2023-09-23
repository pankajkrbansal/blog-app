const express = require("express");
const multer = require('multer')
const jwt = require("jsonwebtoken");
const fs = require('fs');

const service = require("../services/userService.js");
const generateToken = require("../utilities/generateToken.js");
const protect = require("../utilities/validator.js");
const router = express.Router();

/**
 * Route: POST /
 * Description: Register a new user
 * Access: Public
 */
router.post("/", async (req, res, next) => {
  try {
    let resp = await service.registerUser(req.body);
    // generateToken(res, resp.email);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /auth
 * Description: Authenticate a user
 * Access: Public
 */
router.post("/auth", async (req, res, next) => {
  try {
    // console.log("Request Data\n", req.body);
    let resp = await service.authUser(req.body);
    if (resp) {
      generateToken(res, resp.email);
    }
  } catch (err) {
    next(err);
  }
});

/* The code `router.get('/profile', async(req, res, next) => { ... })` is defining a route for handling
a GET request to the '/profile' endpoint. */

router.get("/profile", async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    // Verify the token asynchronously
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) {
        return next(err); // Handle token verification error
      }

      console.log("\n\nInfo 49 route", info);

      try {
        let usr = await service.getUserByEmailId(info?.userEmail);
        res.json(usr);
      } catch (getUserErr) {
        return next(getUserErr); // Handle getUserByEmailId error
      }
    });
    
  } catch (err) {
    next(err); // Handle other errors
  }
});

router.post("/logout", protect, async (req, res, next) => {
  try {
    res.cookie("jwt", "").json("ok");
  } catch (err) {
    next(err);
  }
});

router.get('/all-posts', async(req, res, next) => {
  try{
    let postArray = await service.getAllPosts();
    res.json(postArray)
  }catch(err) {
    next(err)
  }
})

/**
 * Route: POST /create
 * Description: Create a new post
 * Access: Private (protected with authentication)
 */

// const upload = multer({dest:'./uploads'})
// router.post("/create", protect, upload.single('file'),async (req, res, next) => {
router.post("/create", protect, upload.single('file'),async (req, res, next) => {
  try {
    let postBody = req.body;
    // const path = req.file.path;
    // postBody.imageId = path;
    postBody.email = req.user.email;
    
    // adding file extension to name of file stored in the uploads folder
    // const nameSplit = req.file.originalname.split('.');
    // const ext = nameSplit[nameSplit.length-1];
    // fs.renameSync(path, path+'.'+ext);
    
    let resp = await service.createPost(postBody);
    if (resp) {
      res.json(resp);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /comments/:postId
 * Description: Post a comment on a post
 * Access: Private (protected with authentication)
 */
router.post("/comments/:postId", protect, async (req, res, next) => {
  try {
    let postId = req.params.postId;
    console.log(postId);
    let { text, email } = req.body;
    let resp = await service.postComment(postId, text, email);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /reply-to-comment/:postId/:commentId
 * Description: Reply to a comment on a post
 * Access: Private (protected with authentication)
 */
router.post(
  "/reply-to-comment/:postId/:commentId",
  protect,
  async (req, res, next) => {
    try {
      let { postId, commentId } = req.params;
      let { reply, email } = req.body;
      let resp = await service.replyToComment(postId, commentId, reply, email);
      res.json(resp);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Route: POST /like-post/:postId
 * Description: Like a post
 * Access: Public
 */
router.post("/like-post/:postId", async (req, res, next) => {
  try {
    let { postId } = req.params;
    let resp = await service.likePost(postId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /like-comment/:postId/:commentId
 * Description: Like a comment on a post
 * Access: Public
 */
router.post("/like-comment/:postId/:commentId", async (req, res, next) => {
  try {
    let { postId, commentId } = req.params;
    let resp = await service.likeComment(postId, commentId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /dislike-comment/:postId/:commentId
 * Description: Dislike a comment on a post
 * Access: Public
 */
router.post("/dislike-comment/:postId/:commentId", async (req, res, next) => {
  try {
    let { postId, commentId } = req.params;
    let resp = await service.dislikeComment(postId, commentId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /like-reply/:postId/:commentId/:replyId
 * Description: Like a reply on a comment
 * Access: Public
 */
router.post(
  "/like-reply/:postId/:commentId/:replyId",
  async (req, res, next) => {
    try {
      let { postId, commentId, replyId } = req.params;
      let resp = await service.likeReply(postId, commentId, replyId);
      res.json(resp);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
