const mongoose = require("mongoose");
const User = require('../models/User')
const Post = require('../models/Post')

const url = "mongodb://0.0.0.0:27017/backend-task";

let connection = {};

connection.connectDB = async function() {
    try{
        let dbConnect = await mongoose.connect(url, {useNewUrlParser:true});
        console.log(`\nDB Connected ${dbConnect.connection.host}\n`);
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw error;
    }
}


connection.getUserCollection = async function(){
    try{
        // No need to connect to the database again if it's already connected
        if (mongoose.connection.readyState === 1) {
            return User; // Return the User model
        }
         await mongoose.connect(url,{useNewUrlParser:true});
        // let model = await dbConnection.model("User", userSchema);
        // return model;
        return User
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw err;
    }
}

connection.getPostCollection = async function(){
    try{
        // No need to connect to the database again if it's already connected
        if (mongoose.connection.readyState === 1) {
            return Post; // Return the Post model
        }
        await mongoose.connect(url,{useNewUrlParser:true});
        return Post
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw err;
    }
}


module.exports = connection;