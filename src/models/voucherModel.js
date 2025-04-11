import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // mã voucher
    discountType: { type: String, enum: ["percent", "fixed"], required: true }, //Loại giảm giá
    discountValue: { type: Number, required: true },//Giá trị giảm: % hoặc số tiền cụ thể
    maxDiscount: { type: Number }, // Số tiền giảm tối đa (nếu là percent)
    minOrderValue: { type: Number }, // Giá trị đơn hàng tối thiểu để áp dụng voucher
    quantity: { type: Number, required: true }, //Số lượng mã có thể sử dụng (tổng cộng)
    usedCount: { type: Number, default: 0 }, //Số lần đã sử dụng voucher (tổng cộng)
    validFrom: { type: Date, required: true }, //Ngày bắt đầu sử dụng
    validTo: { type: Date, required: true }, //Ngày kết thúc sử dụng
    isActive: { type: Boolean, default: true }, //Trạng thái hoạt động của voucher
    usersUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //Danh sách người dùng đã sử dụng voucher này
  },
  { timestamps: true }
);

export default mongoose.model("Voucher", voucherSchema);
