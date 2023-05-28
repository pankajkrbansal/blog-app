import connection from "../utilities/connection.js";
import bcrypt from 'bcrypt';
import ShortUniqueId from "short-unique-id";

let service = {};

/**
 * Registers a new user.
 * @param {Object} usrBody - User data (name, email, password).
 * @returns {Promise<Object>} - Resolves to the registered user data.
 * @throws {Error} - If the user is already registered or if the email is invalid.
 */
service.registerUser = async (usrBody) => {
  let regex = /^[a-z]+[0-9]*\@gmail.com$/;
  let { name, email, password } = usrBody;
  let userCollection = await connection.getUserCollection();
  let userData = await userCollection.find({ email });
  if (userData.length > 0) {
    let err = new Error("User Already Registered");
    err.status = 400;
    throw err;
  } 
  if(!regex.test(email)){
    let err = new Error("Invalid Email, Gmail Domain Expected");
    err.status = 401;
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

/**
 * Authenticates a user.
 * @param {Object} userData - User data (email, password).
 * @returns {Promise<Object>} - Resolves to the authenticated user data.
 * @throws {Error} - If the credentials are invalid.
 */
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

/**
 * Creates a new post.
 * @param {Object} noteData - Post data.
 * @returns {Promise<Object>} - Resolves to the created post data.
 * @throws {Error} - If the user is not found.
 */
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

/**
 * Posts a comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} text - Comment text.
 * @param {string} email - User email.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */
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

/**
 * Replies to a comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} commentId - ID of the comment.
 * @param {string} text - Reply text.
 * @param {string} email - User email.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */

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
    let err = new Error("try Again");
    err.status = 500;
    throw err;
  }
}

/**
 * Likes a post.
 * @param {string} postId - ID of the post.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */
service.likePost = async(postId) => {
  let postCollection = await connection.getPostCollection();
  let post = await postCollection.findOne({postId});
  post.like += 1;
  let resp = await post.save();
  if(resp){
    return resp;
  }else{
    let err = new Error("try Again");
    err.status = 500;
    throw err;
  }
}

/**
 * Likes a comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} commentId - ID of the comment.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */
service.likeComment = async(postId, commentId) => {
  let postCollection = await connection.getPostCollection();
  let post = await postCollection.findOne({postId});
  post.comment.map((eachComment) => {
    if(eachComment.commentId == commentId){
      eachComment.like += 1;
    }
  })
  let resp = await post.save();
  if(resp){
    return resp;
  }else{
    let err = new Error("try Again");
    err.status = 500;
    throw err;
  }
}

/**
 * Dislikes a comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} commentId - ID of the comment.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */
service.dislikeComment = async(postId, commentId) => {
  let postCollection = await connection.getPostCollection();
  let post = await postCollection.findOne({postId});
  post.comment.map((eachComment) => {
    if(eachComment.commentId == commentId){
      eachComment.dislike += 1;
    }
  })
  let resp = await post.save();
  if(resp){
    return resp;
  }else{
    let err = new Error("try Again");
    err.status = 500;
    throw err;
  }
}

/**
 * Likes a reply to a comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} commentId - ID of the comment.
 * @param {string} replyId - ID of the reply.
 * @returns {Promise<Object>} - Resolves to the updated post data.
 * @throws {Error} - If an error occurs or the server returns an error.
 */
service.likeReply = async(postId, commentId, replyId) => {
  let postCollection = await connection.getPostCollection();
  let post = await postCollection.findOne({postId});
  post.comment.map((eachComment) => {
    if(eachComment.commentId == commentId){
      eachComment.replies.map((eachReply) => {
        if(eachReply.replyId == replyId){
          eachReply.like += 1
        }
      })
    }
  })
  let resp = await post.save();
  if(resp){
    return resp;
  }else{
    let err = new Error("try Again");
    err.status = 500;
    throw err;
  }
}

export default service;
