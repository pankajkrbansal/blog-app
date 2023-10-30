const mongoose = require("mongoose");
const User = require("./User")

const commentSchema = mongoose.Schema({
    text:{
        // required:true,
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        default:null
    },
    childComments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    email:{
        type:String,
        // required:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },  
},
{timestamps:true})

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageId:{
        type:String,
        default:null
    },
    postId:{
        type:String,
        required:true
    },
    summary:{
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
    like:{
        type:Number,
        default:0
    },
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
            default:[]
        }
    ],
    // createdAt : Date
},{
    timestamps:true
})


const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Post