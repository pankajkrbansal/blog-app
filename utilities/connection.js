import * as mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/backend-task";

const replySchema = mongoose.Schema({
    text:{
        // required:true,
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        // required:true
    }
})

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }, 
    email:{
        required:true,
        type:String
    },
    comment:[{
        text:{
            type:String,
        },
        email:{
            type:String,
        },
        like:{
            type:Number,
            default:0
        },
        dislike:{
            type:Number,
            default:0
        },
        replies:[replySchema],
        // required:false,
    }],
    // createdAt : Date
})

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    } ,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

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


export default connection;