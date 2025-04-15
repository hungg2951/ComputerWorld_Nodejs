import { Router } from "express";
import { sendMaill } from "../controllers/sendMailController.js";

const router = Router()

router.post('/sendmail',sendMaill)

export default router