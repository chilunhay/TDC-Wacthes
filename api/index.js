const app = require("../backend/app");
const connectDatabase = require("../backend/db/Database");
const cloudinary = require("cloudinary");
const path = require("path");

// Chỉ khởi tạo khi chạy trên môi trường serverless
console.log("Serverless environment check:", {
  hasDbUrl: !!process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV,
  cloudinaryName: process.env.CLOUDINARY_NAME
});
// Load ENV for serverless
require("dotenv").config({
  path: path.resolve(__dirname, "../backend/config/.env"),
});

// Biến lưu trạng thái kết nối để tái sử dụng
let isConnected = false;

const startServerless = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Serverless Start Error:", error);
    return res.status(500).json({
      success: false,
      message: "Serverless initialization failed: " + error.message,
    });
  }
};

module.exports = startServerless;
