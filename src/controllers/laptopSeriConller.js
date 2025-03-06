import laptopSeriModel from "../models/laptopSeriModel.js";

// create laptop seri
export const create = async (req, res) => {
  try {
    const laptopSeri = await new laptopSeriModel(req.body).save();
    res.status(200).json(laptopSeri);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

//update laptop seri
export const update = async (req, res) => {
  try {
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
    const laptopSeri = await laptopSeriModel.find().populate("brand_id");
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
