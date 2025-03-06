import mongoose from "mongoose";

const ProductDetailSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    }, // Tham chiếu đến bảng Product
    cpu: { type: String, required: true }, // CPU (Intel Core i7, Ryzen 7, v.v.)
    // ram: { type: String, required: true }, // Dung lượng RAM (8GB, 16GB, 32GB)
    // storage: { type: String, required: true }, // Ổ cứng (SSD 512GB, HDD 1TB)
    // display: { type: String, required: true }, // Màn hình (15.6" FHD, 17.3" 4K)
    // price: { type: Number, required: true }, // Giá sản phẩm
    gpu: { type: String }, // Card đồ họa (RTX 4060, Intel Iris Xe, v.v.)
    battery: { type: String }, // Dung lượng pin (56Wh, 99Wh)
    weight: { type: String }, // Cân nặng (1.5kg, 2.3kg, v.v.)
    os: { type: String, default: "Windows 11" }, // Hệ điều hành mặc định
    warranty: { type: Number, default: 12 }, // Bảo hành (tháng)
    stock: { type: Number, default: 0 }, // Số lượng trong kho
    
  },
  { timestamps: true }
);

export default mongoose.model("ProductDetail", ProductDetailSchema);
