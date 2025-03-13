import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total_price: { type: Number },
    status: { type: String },
    payment_method: { type: String },
    payment_status: { type: String },
    shipping_address: { type: String, required: true },
    phone_number: { type: Number, required: true },
    note: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrderSchema);
