const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "samiple",
      url: "ahk",
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});
