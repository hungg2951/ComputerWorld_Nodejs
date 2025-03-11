import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const LaptopTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        slugOn: true,
        slug: "name",
      },
      desc:{typeo:String}
  },
  { timestamps: true }
);
export default mongoose.model("LaptopType", LaptopTypeSchema);