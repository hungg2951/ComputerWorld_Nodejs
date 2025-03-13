import axios from "axios";
import crypto from "crypto";
import ordersModel from "../models/ordersModel.js";

var accessKey = "F8BBA842ECF85";
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var orderInfo = "pay with MoMo";
var partnerCode = "MOMO";
export const payment = async (req, res) => {
  var redirectUrl = "http://localhost:5173/checkout";
  var ipnUrl =
    "https://2efd-2001-ee0-8202-a255-2ce3-8730-577b-6ca9.ngrok-free.app/api/callback";
  var requestType = "captureWallet";
  var amount = "50000";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  //signature
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  try {
    const result = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // tránh lỗi mạng
      }
    );
    return res.status(200).json(result.data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const callback = async (req, res) => {
  try {
    const { orderId, resultCode, transId, message } = req.body;
    console.log(req.body);
    let status = "failed"; // Mặc định nếu giao dịch thất bại

    if (resultCode === 0) {
      status = "paid"; // Thành công
    } else if (resultCode === 1006 && transId) {
      status = "pending"; // Đang chờ xử lý
    }
    await ordersModel.findOneAndUpdate({ orderId }, { status, transId });
    res.json({ success: true, message: `Trạng thái đơn hàng: ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi xử lý IPN", error });
  }
};

export const transactionStatus = async (req, res) => {
  const { orderId } = req.body;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

  const signature = crypto
    .createHmac("SHA256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode: partnerCode,
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  };

  const result = await axios.post(
    "https://test-payment.momo.vn/v2/gateway/api/query",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // tránh lỗi mạng
    }
  );
  return res.status(200).json(result.data);
};
