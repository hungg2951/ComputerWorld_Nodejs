import laptopSeriModel from "../models/laptopSeriModel.js";

// create laptop seri
export const create = async (req, res) => {
  try {
    const existLaptopseries = await laptopSeriModel.findOne({
      name: req.body.name,
    });
    if (existLaptopseries)
      return res.status(400).json({ message: "Dòng laptop tồn tại" });
    const laptopSeri = await new laptopSeriModel(req.body).save();
    res.status(200).json(laptopSeri);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

//update laptop seri
export const update = async (req, res) => {
  try {
    const existLaptopSeries = await laptopSeriModel.findOne({
      name: req.body.name,
      _id: { $ne: req.body.id },
    });
    if (existLaptopSeries)
      return res.status(400).json({ message: "Loại laptop tồn tại" });
    const laptopSeri = await laptopSeriModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json(laptopSeri);
  } catch (error) {
    res.status(400).json({ message: "update lỗi", error });
  }
};
//delete laptop seri
export const remove = async (req, res) => {
  try {
    const laptopSeri = await laptopSeriModel.findOneAndDelete({
      _id: req.body.id,
    });
    res.status(200).json({ message: "delete success", laptopSeri });
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

//get all laptop seri
export const getAll = async (req, res) => {
  try {
    const laptopSeri = await laptopSeriModel
      .find()
      .populate("brand_id")
      .sort({ createdAt: -1 });
    res.status(200).json(laptopSeri);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

//get laptop seri by id
export const getById = async (req, res) => {
  try {
    const laptopSeri = await laptopSeriModel
      .findOne({ _id: req.body.id })
      .populate("brand_id");
    res.status(200).json(laptopSeri);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};
