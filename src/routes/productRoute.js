import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/productController.js";

const router = Router()

router.get("/products",getAll)
router.get("/product",getById)
router.post("/product",create)
router.patch("/product",update)
router.delete("/product",remove)

export default router