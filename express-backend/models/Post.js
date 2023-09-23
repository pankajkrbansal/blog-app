const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
    replyId:{
        type:String
    },
    text:{
        // required:true,
        type:String
    },
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
    
})

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    // imageId:{
    //     type:String,
    //     required: true
    // }
    // ,
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
    like:{
        type:Number,
        default:0
    },
    comment:[{
        commentId:{
            type:String,
            required:true
        },
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
},{
    timestamps:true
})

module.exports = postSchema