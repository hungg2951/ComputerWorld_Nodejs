import brandModel from "../models/brandModel.js";

export const createBrand = async (req, res) => {
  try {
    const existBrand = await brandModel.findOne({ name: req.body.name });
    if (existBrand)
      return res.status(400).json({ message: "Thương hiệu tồn tại" });
    const savedBrand = await brandModel(req.body).save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBrands = async (req, res) => {
  try {
    const brand = await brandModel.find().sort({ createdAt: -1 });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBrand = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ _id: req.params.id });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateBrand = async (req, res) => {

  const { id, name } = req.body;
  try {
    const existBrand = await brandModel.findOne({ name, _id: { $ne: id } });
    if (existBrand)
      return res.status(400).json({ message: "Thương hiệu tồn tại" });
    const brand = await brandModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Sửa tên hãng thành công",
      brand,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await brandModel.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
      message: "Xóa hãng thành công",
      brand,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
