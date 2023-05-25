import express from 'express';
import service from '../services/userService.js'

const router = express.Router();

// @desc authenticate user
// @route /api/users/auth

router.get('/auth', async(req, res, next) => {
    try{
        let resp = await service.authUser("");
        res.json(resp);
    // res.status(200).json({message:"Auth User"})

    }catch(err){

        next(err);
    }
});

export default router;