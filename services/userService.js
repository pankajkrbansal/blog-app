import connection from "../utilities/connection.js";
import bcrypt from 'bcrypt';

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
  console.log(`user 36 ${user} ${userData.password}`);

  let decrypted = await bcrypt.compare(userData.password, user.password);
  console.log(decrypted);

  if (user && decrypted) {
    return user;
  } else {
    let e = new Error("Invalid Credentials");
    e.status = 401;
    throw e;
  }
};


service.createNote = async(noteData) => {
  try{
    return true;
  }catch(e){
    let err =  new Error("User Not Found")
    err.status = 404
    throw err;
  }
}

export default service;
