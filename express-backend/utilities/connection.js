const mongoose = require("mongoose");
const userSchema = require('../models/User')
const postSchema = require('../models/Post')

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
        let dbConnection = await mongoose.connect(url,{useNewUrlParser:true});
        let model = await dbConnection.model("User", userSchema);
        return model;
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw err;
    }
}

connection.getPostCollection = async function(){
    try{
        let dbConnection = await mongoose.connect(url,{useNewUrlParser:true});
        let model = await dbConnection.model("Posts", postSchema);
        return model;
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw err;
    }
}


module.exports = connection;