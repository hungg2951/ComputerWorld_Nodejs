import express from "express";
import mongoose from "mongoose";
import userRoute from './src/routes/userRoute.js';
import authRoute from './src/routes/authRoute.js';
import brandRoute from './src/routes/brandRoute.js';
import laptopTypeRoute from './src/routes/laptopTypeRoute.js';
import laptopSeriRoute from './src/routes/laptopSeriRoute.js';
import productRoute from './src/routes/productRoute.js';
import productDetailRoute from './src/routes/productDetailRoute.js';
import OrderRoute from './src/routes/orderRoute.js';
import OrderDetailRoute from './src/routes/orderDetailRoute.js';
import uploadRoute from './src/routes/upload.js';
import paymentRoute from './src/routes/paymentRoute.js';
import cors from 'cors'
import 'dotenv/config'
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
app.use("/api",OrderRoute);
app.use("/api",OrderDetailRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", paymentRoute);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
