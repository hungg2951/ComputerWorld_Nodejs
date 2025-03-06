import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/productDetailController.js";

const router = Router()

router.get("/products-detail",getAll)
router.get("/product-detail",getById)
router.post("/product-detail",create)
router.patch("/product-detail",update)
router.delete("/product-detail",remove)

export default router