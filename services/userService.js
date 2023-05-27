import connection from "../utilities/connection.js";
import bcrypt from 'bcrypt';
import ShortUniqueId from "short-unique-id";

let service = {};

service.registerUser = async (usrBody) => {
  let { name, email, password } = usrBody;
  let userCollection = await connection.getUserCollection();
  let userData = await userCollection.find({ email });
  if (userData.length > 0) {
    let err = new Error("User Already Registered");
    err.status = 400;
    throw err;
  } else {
    
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(usrBody.password, salt);    // hashing password
    usrBody.password = password;

    let resp = await userCollection.create(usrBody); // saving user data to to user collection

    if (resp) {
      
      return resp;
    } else {
      throw new Error("Invalid User Data");
    }
  }
};

// @desc authenticate user
// @route /api/users/auth
service.authUser = async (userData) => {
  let { email } = userData

  let userModel = await connection.getUserCollection();
  let user = await userModel.findOne({email});

  console.log(user.password);
  // console.log(`user 36 ${user} ${userData.password}`);

  let decrypted = await bcrypt.compare(userData.password, user.password);
  // console.log(decrypted);

  if (user && decrypted) {
    return user;
  } else {
    let e = new Error("Invalid Credentials");
    e.status = 401;
    throw e;
  }
};


service.createPost = async(noteData) => {
    // console.log("\nCreate Post Service\n");

    const uid = new ShortUniqueId({ length:5 });
    let postCollection = await connection.getPostCollection();
    // console.log("\nPostcollection\n", postCollection);
    
    noteData.postId = uid();
    // noteData.replies = [];
    // console.log("\nNote Data\n", noteData);
    
    let resp = await postCollection.create(noteData);
    // console.log("\nressponse\n", resp);
    if(resp){
      return resp;
    }else{
      let err =  new Error("User Not Found")
    err.status = 404
    throw err;
    }
}

service.postComment = async(postId, text, email) => {
    let postCollection = await connection.getPostCollection();
    let post = await postCollection.findOne({postId});
    const uid = new ShortUniqueId({ length:5 });
    let commentId = uid();
    post.comment.push({text, email, commentId});
    let result = await post.save();
    if(result){
      return result
    }else{
      err.status = 500;
      throw new Error("Internal Server Error");
    }
  
}

service.replyToComment = async(postId, commentId, text, email) => {
  let postCollection = await connection.getPostCollection();
  let post = await postCollection.findOne({postId});
  const uid = new ShortUniqueId({ length:3 });
  let replyId = uid();
  // let comment = post.comment.id(commentId);
  post.comment.map((eachComment) => {
    if(eachComment.commentId == commentId){
      console.log(eachComment);
      eachComment.replies.push({replyId, text, email});
    }
  });

  // console.log(post);
  // post.comment.replies.push(reply);
  let result = await post.save();
  if(result){
    return result
  }else{
    err.status = 500;
    throw new Error("Internal Server Error");
  }
}

export default service;
