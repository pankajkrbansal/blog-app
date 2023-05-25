let service = {};

// @desc authenticate user
// @route /api/users/auth
service.authUser = async (userData) => {
  if (userData.length > 0) {
    return 'Hello'
  } else {
    let e = new Error("Error Check");
    e.status = 404;
    throw e;
  }
};

export default service;
