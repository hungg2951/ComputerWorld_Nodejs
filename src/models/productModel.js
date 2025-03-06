import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import ProductDetail from './productDetailModel.js'
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên sản phẩm
    laptop_series_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LaptopSeris",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      slugOn: true, // tự động cập nhật slug theo "name" khi "name" thay đổi
      slug: "name",
    },
    image: { type: String, default: "" }, // Ảnh đại diện sản phẩm
  },
  { timestamps: true }
);
/** Middleware: Xóa tất cả ProductDetail khi xóa Product */
ProductSchema.pre("findOneAndDelete", async function (next) {
    try {
      // return console.log(this.getQuery());
      await ProductDetail.deleteMany({ product_id: this.getQuery()._id });
      next();
    } catch (error) {
      next(error);
    }
  });
export default mongoose.model("Products",ProductSchema)