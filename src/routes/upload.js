import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/configCloudinary.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Không có ảnh nào được tải lên!" });
    }
    // Upload từng ảnh lên Cloudinary
    const uploadPromises = req.files.map((file) => {
      const fileBuffer = `data:image/png;base64,${file.buffer.toString(
        "base64"
      )}`;
      return cloudinary.uploader.upload(fileBuffer, { folder: "hung2951" });
    });
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.secure_url);

    res.json({ urls: imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed", error });
  }
});
export default router;
