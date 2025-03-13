import OrderSchema from "../models/ordersModel.js";

export const create = async (req, res) => {
  try {
    const order = await new OrderSchema(req.body).save();
    res.status(200).json({
      message: "Create order success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Create order error!",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const existOrder = await OrderSchema.findOne({ _id: req.body.id });
    if (!existOrder)
      return res.status(400).json({ message: "Order does not exist !" });
    const order = await OrderSchema.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Update order success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Update order error!",
      error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const existOrder = await OrderSchema.findOne({ _id: req.body.id });
    if (!existOrder)
      return res.status(400).json({ message: "Order does not exist !" });
    const order = await OrderSchema.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
      message: "Delete order success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Delete order error!",
      error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const order = await OrderSchema.find();
    res.status(200).json({
      message: "Get All orders success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get All orders error!",
      error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const order = await OrderSchema.findOne({ _id: req.params.id });
    if (!order)
      return res.status(400).json({ message: "Order does not exist !" });
    res.status(200).json({
      message: "Get order success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get order error!",
      error,
    });
  }
};
