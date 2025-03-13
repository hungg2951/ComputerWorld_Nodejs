import OrderDetailSchema from "../models/orderDetailModel.js";

export const create = async (req, res) => {
  try {
    const order = await new OrderDetailSchema(req.body).save();
    res.status(200).json({
      message: "Create order detail success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Create order detail error!",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const existOrder = await OrderDetailSchema.findOne({ _id: req.body.id });
    if (!existOrder)
      return res.status(400).json({ message: "Order detail does not exist !" });
    const order = await OrderDetailSchema.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Update order detail success !",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Update order detail error!",
      error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const existOrderDetail = await OrderDetailSchema.findOne({ _id: req.body.id });
    if (!existOrderDetail)
      return res.status(400).json({ message: "Order details does not exist !" });
    const orderDetail = await OrderDetailSchema.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
      message: "Delete order details success !",
      orderDetail,
    });
  } catch (error) {
    res.status(400).json({
      message: "Delete order detail error!",
      error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const orderDetail = await OrderDetailSchema.find();
    res.status(200).json({
      message: "Get All Order Details success !",
      orderDetail,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get All order details error!",
      error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const orderDetail = await OrderDetailSchema.findOne({ _id: req.params.id });
    if (!orderDetail)
      return res.status(400).json({ message: "Order detail does not exist !" });
    res.status(200).json({
      message: "Get order detail success !",
      orderDetail,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get order detail error!",
      error,
    });
  }
};
