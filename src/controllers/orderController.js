import OrderSchema from "../models/ordersModel.js";
import OrderDetailSchema from "../models/orderDetailModel.js";

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

export const getOrderId = async (req, res) => {
  try {
    const order = await OrderSchema.findOne({ orderId: req.params.id });
    if (!order)
      return res.status(400).json({ message: "Order does not exist !" });
    const orderDetail = await OrderDetailSchema.find({ order_id: order._id })
      .populate("product_id")
      .populate("product_detail_id");
    res.status(200).json({
      message: "Get order success !",
      order,
      orderDetail,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get order error!",
      error,
    });
  }
};

// tổng tiền tất cả các đơn hàng thành công
export const totalRevenueSuccess = async (req, res) => {
  try {
    const result = await OrderSchema.aggregate([
      {
        $match: { status: "success" }, // lấy đơn hàng có trạng thái "success"
      },
      {
        $group: {
          _id: null, // tất cả đơn hàng "success"
          totalRevenue: { $sum: "$total_price" }, // Cộng tổng tiền của các đơn hàng "success"
        },
      },
    ]);
    console.log(result);
    return res.status(200).json(result.length > 0 ? result[0].totalRevenue : 0);
  } catch (error) {
    return res.status(400).json({ message: "Lỗi khi tính tổng tiền", error });
  }
};

//
export const getTotalRevenueByYear = async (req,res) => {
  try {
    const result = await OrderSchema.aggregate([
      {
        $match: { status: "success" }, // lấy đơn hàng có trạng thái "success"
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } }, // Nhóm theo năm từ trường createdAt
          totalRevenue: { $sum: "$total_price" }, // Cộng tổng tiền theo từng năm
        },
      },
      {
        $sort: { "_id.year": 1 }, // Sắp xếp theo năm tăng dần
      },
    ]);

    return res.status(200).json(
      result.map((item) => ({
        year: item._id.year,
        totalRevenue: item.totalRevenue,
      }))
    );
  } catch (error) {
    return res.status(400).json({ message: "Lỗi khi tính tổng doanh thu theo năm", error });
  }
};
