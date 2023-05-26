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
        generateToken(res, resp._id);
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
        generateToken(res, resp._id);
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
        console.log("\n\nCalled\n\n");
        let resp = await service.createNote(req.body);
        if(res){
            return resp
        }
    }catch(err){
        next(err);
    }
})


export default router;