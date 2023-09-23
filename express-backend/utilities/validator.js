const jwt = require("jsonwebtoken");
const connection = require("./connection");

const protect = async(req, res, next) => {
    // console.log('\n\nProtect Called\n\n');
    let token;
    token = req.cookies.jwt;
    // console.log("\nToken = \n", token);
    if(token){
        try{
            let userModel = await connection.getUserCollection();
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("\ndecoded\n", decoded);;
            req.user = await userModel.findOne({email:decoded.userEmail});
            // console.log(req.user);
            next();
        }catch(err){
            
            let error =  new Error("Not Authorized")
            error.status = 401;
            next(error);
        }
    }else{
        
        let err = new Error("Not Token Found")
        err.status = 401
        next(err);
    }
}


module.exports = protect;