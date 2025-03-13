import { Router } from "express";
import { callback, payment, transactionStatus } from "../controllers/paymentController.js";

const router = Router()

router.post('/payment',payment)
router.post('/callback',callback)
router.post('/transaction-status',transactionStatus)

export default router