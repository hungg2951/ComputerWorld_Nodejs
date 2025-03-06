import express from "express";
import mongoose from "mongoose";
import userRoute from './src/routes/userRoute.js';
import authRoute from './src/routes/authRoute.js';
import brandRoute from './src/routes/brandRoute.js';
import laptopTypeRoute from './src/routes/laptopTypeRoute.js';
import laptopSeriRoute from './src/routes/laptopSeriRoute.js';
import productRoute from './src/routes/productRoute.js';
import productDetailRoute from './src/routes/productDetailRoute.js';

const app = express();

// Middleware xử lý dữ liệu
app.use(express.json());
// Import routes

// Sử dụng route
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", authRoute);
app.use("/api", brandRoute);
app.use("/api", laptopTypeRoute);
app.use("/api", laptopSeriRoute);
app.use("/api", productRoute);
app.use("/api", productDetailRoute);
mongoose
  .connect("mongodb://localhost:27017/test2025")
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
