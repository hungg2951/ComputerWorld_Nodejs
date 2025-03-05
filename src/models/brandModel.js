import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      slugOn: true, // tự động cập nhật slug theo "name" khi "name" thay đổi
      slug: "name",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Brand", BrandSchema);
