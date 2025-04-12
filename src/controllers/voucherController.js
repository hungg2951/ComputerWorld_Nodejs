import Voucher from "../models/voucherModel.js";

export const createVoucher = async (req, res) => {
  try {
    const existVoucher = await Voucher.findOne({ code: req.body.code });
    if (existVoucher)
      return res.status(400).json({ message: "Mã giảm giá tồn tại" });
    const voucher = await new Voucher(req.body).save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ message: "Tạo voucher thất bại", error });
  }
};

// Lấy danh sách voucher
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find().sort({ createdAt: -1 });
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy voucher theo mã
export const getVoucherByCode = async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ code: req.params.code });
    if (!voucher)
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật voucher
export const updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    if (!voucher)
      return res.status(404).json({ message: "Voucher không tồn tại" });
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật thất bại", error });
  }
};

// Xóa voucher
export const deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndDelete({ _id: req.body.id });
    if (!voucher)
      return res.status(404).json({ message: "Voucher không tồn tại" });
    res.json({ message: "Xóa voucher thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Áp dụng voucher
export const applyVoucher = async (req, res) => {
  try {
    const { code, userId, orderTotal } = req.body;

    const voucher = await Voucher.findOne({ code });

    if (!voucher || !voucher.isActive) {
      return res
        .status(400)
        .json({ message: "mã giảm giá không hợp lệ hoặc đã hết hiệu lực" });
    }

    const now = new Date();
    if (now < new Date(voucher.validFrom)) {
      return res.status(400).json({ message: "mã giảm giá chưa thể sử dụng" });
    }

    if (now > new Date(voucher.validTo)) {
      return res.status(400).json({ message: "mã giảm giá hết hạn sử dụng" });
    }

    if (voucher.usersUsed.includes(userId)) {
      return res.status(400).json({ message: "Bạn đã sử dụng mã này rồi" });
    }

    if (voucher.usedCount >= voucher.quantity) {
      return res
        .status(400)
        .json({ message: "mã giảm giá đã hết lượt sử dụng" });
    }

    if (voucher.minOrderValue && orderTotal < voucher.minOrderValue) {
      return res.status(400).json({
        message: `Đơn hàng phải từ ${voucher.minOrderValue.toLocaleString()} mới dùng được voucher này`,
      });
    }

    // Tính giá trị giảm
    let discount = 0;
    if (voucher.discountType === "percent") {
      discount = (orderTotal * voucher.discountValue) / 100;
      if (voucher.maxDiscount && discount > voucher.maxDiscount) {
        discount = voucher.maxDiscount;
      }
    } else {
      discount = voucher.discountValue;
    }

    res.json({ voucher, discount, message: "Áp dụng mã giảm giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi áp dụng mã giảm giá", error });
  }
};
