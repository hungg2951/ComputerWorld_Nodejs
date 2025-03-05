import { Router } from "express";
import { changePassword, Login,  signUp } from "../controllers/authController.js";

const router = Router();
router.post("/login", Login )
router.post("/register", signUp )
router.patch("/change-password", changePassword )
export default router;