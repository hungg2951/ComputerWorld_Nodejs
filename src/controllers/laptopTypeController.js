import laptopTypeModel from "../models/laptopTypeModel.js";

// create a new laptop type
export const create = async (req, res) => {
  try {
    const existLaptopType = await laptopTypeModel.findOne({
      name: req.body.name,
    });
    if (existLaptopType)
      return res.status(400).json({ message: "Loại laptop tồn tại" });
    const laptopType = await new laptopTypeModel(req.body).save();
    res.status(201).json(laptopType);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

// update a laptop type
export const update = async (req, res) => {
  try {
    const existLaptopType = await laptopTypeModel.findOne({
      name: req.body.name,_id:{$ne:req.body.id}
    });
    if (existLaptopType)
      return res.status(400).json({ message: "Loại laptop tồn tại" });
    const laptopType = await laptopTypeModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json(laptopType);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

// delete a laptop type
export const remove = async (req, res) => {
  try {
    const laptopType = await laptopTypeModel.findOneAndDelete({
      _id: req.body.id,
    });
    res.status(200).json({
      message: "Xóa loại laptop thành công",
      laptopType,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};
// get all laptop types
export const getAll = async (req, res) => {
  try {
    const laptopTypes = await laptopTypeModel.find().sort({ createdAt: -1 });
    res.status(200).json(laptopTypes);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

// get a laptop type by id
export const getById = async (req, res) => {
  try {
    const laptopType = await laptopTypeModel.findById(req.query.id);
    res.status(200).json(laptopType);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};
