const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        "Please Login for access this resource or Create new account",
        401
      )
    );
  }

  const secret = process.env.JWT_SECRET_KEY || "TEMPORARY_SECRET_PLEASE_SET_IN_VERCEL_DASHBOARD";
  const decodedData = jwt.verify(token, secret);

  req.user = await User.findById(decodedData.id);

  next();
});

// Admin Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources`)
      );
    }
    next();
  };
};
