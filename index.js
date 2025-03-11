import express from "express";
import mongoose from "mongoose";
import userRoute from './src/routes/userRoute.js';
import authRoute from './src/routes/authRoute.js';
import brandRoute from './src/routes/brandRoute.js';
import laptopTypeRoute from './src/routes/laptopTypeRoute.js';
import laptopSeriRoute from './src/routes/laptopSeriRoute.js';
import productRoute from './src/routes/productRoute.js';
import productDetailRoute from './src/routes/productDetailRoute.js';
import uploadRoute from './src/routes/upload.js';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());

//route
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", authRoute);
app.use("/api", brandRoute);
app.use("/api", laptopTypeRoute);
app.use("/api", laptopSeriRoute);
app.use("/api", productRoute);
app.use("/api", productDetailRoute);
app.use("/api/upload", uploadRoute);
mongoose
  .connect("mongodb://localhost:27017/test2025")
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
