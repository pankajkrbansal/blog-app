import * as mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/mern-auth";

const notesSchema = mongoose.Schema({
    noteId:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    }
}, {collection:"note"})

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
    },
    notes:[notesSchema]
})

let connection = {};

connection.getUserCollection = async function(){
    try{
        let dbConnection = await mongoose.connect(url,{useNewUrlParse:true});
        let model = await dbConnection.model("User", userSchema);
        return model;
    }catch(err){
        let error = new Error("Cannot connect to DB");
        error.status = 500;
        throw err;
    }
}

export default connection;