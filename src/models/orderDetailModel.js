import mongoose from "mongoose";

const OderDetailSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Oders",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    product_detail_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: { //Giá sản phẩm tại thời điểm mua
      type: Number,
      required: true,
    },
    total: { //Tổng tiền của mục này (price * quantity)
      type: Number,
      required: true,
    }
  },
  { timestamp: true }
);

export default mongoose.model("OrderDetails",OderDetailSchema)
