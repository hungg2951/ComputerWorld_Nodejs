import { Router } from "express";
import { create, getAll, getBySlug, remove, update } from "../controllers/productController.js";

const router = Router()

router.get("/products",getAll)
router.get("/product/:slug",getBySlug)
router.post("/product",create)
router.patch("/product",update)
router.delete("/product",remove)

export default router