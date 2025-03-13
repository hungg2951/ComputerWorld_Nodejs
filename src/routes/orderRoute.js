import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/orderController.js";

const router = Router()

router.get('/orders',getAll)
router.get('/order/:id',getOne)
router.post('/order',create)
router.delete('/order',remove)
router.patch('/order',update)

export default router;