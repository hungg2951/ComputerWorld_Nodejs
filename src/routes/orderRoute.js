import { Router } from "express";
import { create, getAll, getOne, getOrderId, getTotalRevenueByYear, remove, totalRevenueSuccess, update } from "../controllers/orderController.js";

const router = Router()

router.get('/orders',getAll)
router.get('/order/:id',getOne)
router.get('/orderId/:id',getOrderId)
router.get('/total-revenue',totalRevenueSuccess)
router.get('/total-revenue-by-year',getTotalRevenueByYear)
router.post('/order',create)
router.delete('/order',remove)
router.patch('/order',update)

export default router;