import express from "express";
import userRoute from './src/routes/userRoute.js';
import authRoute from './src/routes/authRoute.js';
import brandRoute from './src/routes/brandRoute.js';
import mongoose from "mongoose";
const app = express();

// Middleware xử lý dữ liệu
app.use(express.json());
// Import routes

// Sử dụng route
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", authRoute);
app.use("/api", brandRoute);
mongoose
  .connect("mongodb://localhost:27017/test2025")
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
