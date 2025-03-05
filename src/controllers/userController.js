import { name } from "ejs";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được danh sách tài khoản người dừng",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được tài khoản người dừng",
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
      message: "Xóa tài khoản người dùng thành công",
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được danh sách tài khoản người dừng",
    });
  }
};

export const updateUser = async (req, res) => {
  const existUser = await User.findOne({ _id: req.body.id });
  try {
    if (!existUser)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    await User.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Cập nhật tài khoản thành công",
      existUser
    });
  } catch (error) {}
};
