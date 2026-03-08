const app = require("../backend/app");
const connectDatabase = require("../backend/db/Database");
const cloudinary = require("cloudinary");

// Chỉ khởi tạo khi chạy trên môi trường serverless
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = app;
