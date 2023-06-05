import jwt  from "jsonwebtoken";
import connection from "./connection.js";

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
            res.status(401);
            throw new Error("Not Authorized")
        }
    }else{
        res.status(401);
        throw new Error("Not Token Found")
    }
}

export default protect;