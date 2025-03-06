import brandModel from "../models/brandModel.js";

export const createBrand = async (req, res) => {
  try {
    const savedBrand = await brandModel(req.body).save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBrands = async (req, res) => {
  try {
    const brand = await brandModel.find().populate("laptop_type_id")
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBrand = async (req, res) => {
  try {
    const brand = await brandModel.findOne({_id:req.body.id}).populate("laptop_type_id")
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateBrand = async (req, res) => {
  try {
    const brand = await brandModel.findByOneAndUpdate(
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
}
