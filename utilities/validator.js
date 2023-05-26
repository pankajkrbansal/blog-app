import jwt  from "jsonwebtoken";
import connection from "./connection.js";

const protect = async(req, res, next) => {
    console.log('\n\nProtect Called\n\n');
    let token;
    token = req.cookies.jwt;
    if(token){
        try{
            let userModel = await connection.getUserCollection();
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.find(decoded.userId).select('-password');
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