import userModel from "../models/userModel.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMaill } from "./sendMailController.js";

// đăng nhập
export const Login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    if (!user.status) {
      return res.status(400).json({
        message: "Tài khoản đã bị vô hiệu hóa",
      });
    }
    const checkPass = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPass) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }
    user.password = undefined;
    const access_token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Đăng nhập thành công",
      access_token: access_token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi đăng nhập",
    });
  }
};
// đăng ký
export const signUp = async (req, res) => {
  const existUser = await userModel.findOne({ email: req.body.email }).exec();
  try {
    if (existUser) {
      res.status(400).json({
        message: "Email đã tồn tại",
      });
    } else {
      const signUp = await new userModel(req.body).save();
      await sendMaill({
        email: req.body.email,
        subject: "ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG",
        html: `<H1>Chúc mừng bạn ${req.body.name} đã đăng ký tài khoản thành công tại ComputerWourld</H1>
        <p>Thông tin tài khoản của bạn là:</p>
        <p>Email: ${req.body.email}</p>
        <p>Mật khẩu: ${req.body.password}</p>
        <p>Vui lòng không chia sẻ thông tin tài khoản của bạn cho bất kỳ ai</p>
        `,
      });
      res.status(200).json({
        message: "Đăng ký thành công",
        id: signUp._id,
        name: signUp.name,
        email: signUp.email,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi đăng ký",
    });
  }
};

//  đổi mật khẩu
export const changePassword = async (req, res) => {
  const existUser = await userModel.findOne({ _id: req.body.id });
  try {
    if (!existUser)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    const checkPass = bcrypt.compareSync(req.body.password, existUser.password);
    if (!checkPass)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    const handPassword = bcrypt.hashSync(req.body.passwordNew, 10);
    await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { password: handPassword },
      { new: true }
    );
    existUser.password = undefined;
    res.status(200).json({
      message: "Đổi mật khẩu thành công",
      name: existUser.name,
      email: existUser.email,
      role: existUser.role,
      avatar: existUser.avatar,
      age: existUser.age,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Lỗi",
    });
  }
};
