import productModel from "../models/productModel.js";

// create product
export const create = async (req, res) => {
  try {
    const existProduct = await productModel.findOne({ name: req.body.name });
    if (existProduct)
      return res.status(400).json({ message: "Tên sản phẩm này đã tồn tại" });
    const product = await new productModel(req.body).save();
    res.status(200).json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Thêm sản phẩm lỗi",
      error,
    });
  }
};
// update product
export const update = async (req, res) => {
  const exist = await productModel.findOne({ _id: req.body.id });
  if (!exist)
    return res
      .status(400)
      .json({ message: "Không tìm thấy sản phẩm để update" });

  try {
    const existProduct = await productModel.findOne({ name: req.body.name,_id:{$ne:req.body.id} });
    if (existProduct)
      return res.status(400).json({ message: "Tên sản phẩm này đã tồn tại" });
    const product = await productModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Update product success !",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "update product error !",
      error,
    });
  }
};
// delete product
export const remove = async (req, res) => {
  const exist = await productModel.findOne({ _id: req.body.id });
  if (!exist)
    return res.status(400).json({ message: "Không tìm thấy sản phẩm để xóa" });
  try {
    const product = await productModel.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
      message: "delete product success!",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "delete product error !",
      error,
    });
  }
};
// get all product
export const getAll = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("series_id")
      .populate("brand_id")
      .populate("type_id")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Get all products success !",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: "get all product error !",
      error,
    });
  }
};
// get by id product
export const getBySlug = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    // .populate("laptop_series_id");
    if (!product)
      return res.status(400).json({ message: "Sản phẩm không tồn tại" });
    res.status(200).json({
      message: "get product success!",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "get product error !",
      error,
    });
  }
};
