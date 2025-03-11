import mongoose from "mongoose";

const ProductDetailSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    }, // Tham chiếu đến bảng Product
    name: { type: String, required: true,unique:true }, // tên rút gọn "i7 14650HX RAM 16GB SSD 1TB RTX 4060 16" 2.5K 165Hz"
    cpu: { type: String, required: true }, // CPU (Intel Core i7, Ryzen 7, v.v.)
    ram: { type: String, required: true }, // Dung lượng RAM (8GB, 16GB, 32GB)
    storage: { type: String, required: true }, // Ổ cứng (SSD 512GB, HDD 1TB)
    display: { type: String, required: true }, // Màn hình (15.6" FHD, 17.3" 4K)
    price: { type: Number, required: true }, // Giá sản phẩm
    scanFrequency: { type: String, required: true }, // tần số quét (165Hz)
    year: { type: String, required: true }, // năm sản xuất
    connectionPort: { type: String, default: "Chi tiết trong bài viết" }, // cổng kết nối (Type-C 1 Jack 3.5 mm 1 Thunderbolt 1 khe cắm thẻ nhớ SD  )
    images: { type: Array }, /// ảnh sản phẩm
    gpu: { type: String }, // Card đồ họa (RTX 4060, Intel Iris Xe, v.v.)
    battery: { type: String }, // Dung lượng pin (56Wh, 99Wh)
    weight: { type: String }, // Cân nặng (1.5kg, 2.3kg, v.v.)
    os: { type: String, default: "Windows 11" }, // Hệ điều hành mặc định
    warranty: { type: Number, default: 12 }, // Bảo hành (tháng)
    stock: { type: Number, default: 0 }, // Số lượng trong kho
    description: { type: String },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);
ProductDetailSchema.pre("save", function (next) {
  if (this.status === undefined) {
    this.status = "new";
  }
  if (this.os === undefined) {
    this.os = "Windows 11";
  }
  next();
});
export default mongoose.model("ProductDetail", ProductDetailSchema);
