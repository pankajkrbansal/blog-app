import express from 'express';
import service from '../services/userService.js'

const router = express.Router();

// @desc register new user
router.get('/', async(req, res, next) => {
    try{

    }catch(err){
        next(err);
    }
})

// @desc authenticate user & get token
// @route /api/users/auth
router.post('/auth', async(req, res, next) => {
    try{
        let resp = await service.authUser("");
        res.json(resp);
    // res.status(200).json({message:"Auth User"})

    }catch(err){

        next(err);
    }
});

export default router;