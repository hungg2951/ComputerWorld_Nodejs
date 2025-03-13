import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/orderDetailController.js";

const router = Router()

router.get('/order-details',getAll)
router.get('/order-detail/:id',getOne)
router.post('/order-detail',create)
router.delete('/order-detail',remove)
router.patch('/order-detail',update)

export default router;