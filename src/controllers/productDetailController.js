import productDetailModel from "../models/productDetailModel.js";

// create product
export const create = async (req, res) => {
  try {
    const product = await new productDetailModel(req.body).save();
    res.status(200).json({
      message: "Thêm chi tiết sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Thêm chi tiết sản phẩm lỗi",
      error,
    });
  }
};
// update product
export const update = async (req, res) => {
  const exist = await productDetailModel.findOne({ _id: req.body.id });
  if (!exist)
    return res
      .status(400)
      .json({ message: "Không tìm thấy chi tiết sản phẩm để update" });
  try {
    const product = await productDetailModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Update product detail success !",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "update product detail error !",
      error,
    });
  }
};
// delete product
export const remove = async (req, res) => {
  const exist = await productDetailModel.findOne({ _id: req.body.id });
  if (!exist)
    return res
      .status(400)
      .json({ message: "Không tìm thấy chi tiết sản phẩm để xóa" });
  try {
    const product = await productDetailModel.findOneAndDelete({
      _id: req.body.id,
    });
    res.status(200).json({
      message: "delete product detail success!",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "delete product detail error !",
      error,
    });
  }
};
// get all product
export const getAll = async (req, res) => {
  //"product_id",{path:"laptop_series_id"}
  try {
    const productDetail = await productDetailModel.find().populate({
      path: "product_id",
      populate: {
        path: "laptop_series_id",
        populate:{
            path: "brand_id",
            populate:{
                path:"laptop_type_id"
            }
        }
      },
    });
    res.status(200).json({
      message: "Get all products detail success !",
      productDetail,
    });
  } catch (error) {
    res.status(400).json({
      message: "get all product detail error !",
      error,
    });
  }
};
// get by id product
export const getById = async (req, res) => {
  const exist = await productDetailModel.findOne({ _id: req.body.id });
  if (!exist)
    return res
      .status(400)
      .json({ message: "Không tìm thấy chi tiết sản phẩm nào" });
  try {
    const product = await productDetailModel
      .findOne({ _id: req.body.id })
      .populate("product_id");
    res.status(200).json({
      message: "get product detail success!",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "get product detail error !",
      error,
    });
  }
};
