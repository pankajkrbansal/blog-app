import express from 'express';
import service from '../services/userService.js'
import generateToken from '../utilities/generateToken.js';
import protect from '../utilities/validator.js'

const router = express.Router();

// @desc register new user
// @route /api/users/
router.post('/', async(req, res, next) => {
    try{
        let resp = await service.registerUser(req.body);
        generateToken(res, resp.email);
        res.json(resp);
    }catch(err){
        next(err);
    }
})

// @desc authenticate user & get token
// @route /api/users/auth
router.post('/auth', async(req, res, next) => {
    try{
        let resp = await service.authUser(req.body);
       if(resp){
        generateToken(res, resp.email);
        res.json({message:`Logged In ${resp}`});
       }
    }catch(err){
        next(err)
    }
});

// @desc create a new note for user who is logged in
// route /api/users/create
router.post('/create', protect, async(req, res, next) => {
    try{
        console.log("\n\nPost Create Called\n\n");
        console.log(req.user);
        let resp = await service.createPost(req.body);
        // console.log("\nResponse Route\n", resp);
        if(resp){
            res.json(resp);
        }
    }catch(err){
        next(err);
    }
})

// @desc add comment to a post
// @route /api/users/comments/:postId
router.post('/comments/:postId', protect, async(req, res, next) => {
try{
    let postId = req.params.postId;
    console.log(postId);
    let {text, email} = req.body;
    let resp = await service.postComment(postId, text, email);
    res.json(resp);
}catch(err){
    next(err);
}
})

// @desc reply to a comment

router.post('/reply-to-comment/:postId/:commentId', protect, async(req, res, next) => {
    try{
        let {postId, commentId} = req.params;
        let {reply, email} = req.body;
        let resp = await service.replyToComment(postId, commentId, reply, email);
        res.json(resp);
    }catch(err){
        next(err);
    }
})

router.post('/like-post/:postId', async(req, res, next) => {
    try{
        let {postId} = req.params;
        let resp = await service.likePost(postId);
        res.json(resp);
    }catch(err){
        next(err);
    }
})

router.post('/like-comment/:postId/:commentId', async(req, res, next) => {
    try{
        let {postId, commentId} = req.params;
        let resp = await service.likeComment(postId, commentId);
        res.json(resp);
    }catch(err){
        next(err);
    }
})

router.post('/dislike-comment/:postId/:commentId', async(req, res, next) => {
    try{
        let {postId, commentId} = req.params;
        let resp = await service.dislikeComment(postId, commentId);
        res.json(resp);
    }catch(err){
        next(err);
    }
})

router.post('/like-reply/:postId/:commentId/:replyId', async(req, res, next) => {
    try{
        let {postId, commentId, replyId} = req.params;
        let resp = await service.likeReply(postId, commentId, replyId);
        res.json(resp);
    }catch(err){
        next(err);
    }
})


export default router;