import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: { type: String },
    total_price: { type: Number,require:true },
    resultCode: { type: Number },
    status: { type: String ,default:"pending"},
    payment_method: { type: String },
    payment_status: { type: String },
    transId: { type: String },
    deliveryMethod: {
      type: String,
      enum: ["home_delivery", "store_pickup"], // Chỉ cho phép 2 giá trị này
      required: true,
    },
    informationClient: { type: Object },
    note: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrderSchema);
