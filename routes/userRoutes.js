import express from 'express';
import service from '../services/userService.js';
import generateToken from '../utilities/generateToken.js';
import protect from '../utilities/validator.js';

const router = express.Router();

/**
 * Route: POST /
 * Description: Register a new user
 * Access: Public
 */
router.post('/', async (req, res, next) => {
  try {
    let resp = await service.registerUser(req.body);
    generateToken(res, resp.email);
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
router.post('/auth', async (req, res, next) => {
  try {
    let resp = await service.authUser(req.body);
    if (resp) {
      generateToken(res, resp.email);
      res.json({ message: `Logged In ${resp}` });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /create
 * Description: Create a new post
 * Access: Private (protected with authentication)
 */
router.post('/create', protect, async (req, res, next) => {
  try {
    console.log("\n\nPost Create Called\n\n");
    console.log(req.user);
    let resp = await service.createPost(req.body);
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
router.post('/comments/:postId', protect, async (req, res, next) => {
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
router.post('/reply-to-comment/:postId/:commentId', protect, async (req, res, next) => {
  try {
    let { postId, commentId } = req.params;
    let { reply, email } = req.body;
    let resp = await service.replyToComment(postId, commentId, reply, email);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

/**
 * Route: POST /like-post/:postId
 * Description: Like a post
 * Access: Public
 */
router.post('/like-post/:postId', async (req, res, next) => {
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
router.post('/like-comment/:postId/:commentId', async (req, res, next) => {
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
router.post('/dislike-comment/:postId/:commentId', async (req, res, next) => {
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
router.post('/like-reply/:postId/:commentId/:replyId', async (req, res, next) => {
  try {
    let { postId, commentId, replyId } = req.params;
    let resp = await service.likeReply(postId, commentId, replyId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

export default router;
