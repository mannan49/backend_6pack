// Create token and save in cookie

const { COOKIE_EXPIRE } = require("../config");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //   options for cookie
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
