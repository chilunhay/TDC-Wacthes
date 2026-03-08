const app = require("../backend/app");
const connectDatabase = require("../backend/db/Database");
const cloudinary = require("cloudinary");

// Biến lưu trạng thái kết nối để tái sử dụng
let isConnected = false;

const startServerless = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  return app(req, res);
};

module.exports = startServerless;
