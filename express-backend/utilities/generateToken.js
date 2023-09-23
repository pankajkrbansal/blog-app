const service = require('../services/userService')
const jwt = require("jsonwebtoken");

const generateToken = async(res, userEmail) => {
    const token = jwt.sign({ userEmail }, process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
    let usrData = await service.getUserByEmailId(userEmail);
    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }).json(usrData)

}

module.exports = generateToken;