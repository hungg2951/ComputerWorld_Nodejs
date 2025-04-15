import { Router } from "express";
import { sendMaillOrder } from "../controllers/sendMailController.js";

const router = Router()

router.post('/sendmail',sendMaillOrder)

export default router