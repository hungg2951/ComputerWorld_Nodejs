import { Router } from "express";
import { create, getAll, getOneProductDetail, getProductByBrand, getProductDetailsByProduct, remove, update } from "../controllers/productDetailController.js";

const router = Router()

router.get("/products-detail",getAll)
router.get("/product-detail-by-product/:id_product",getProductDetailsByProduct)
router.get("/product-detail/:id",getOneProductDetail)
router.get("/product-detail/brand/:slug",getProductByBrand)
router.post("/product-detail",create)
router.patch("/product-detail",update)
router.delete("/product-detail",remove)

export default router