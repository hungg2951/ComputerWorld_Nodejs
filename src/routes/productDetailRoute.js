import { Router } from "express";
import { create, getAll, getOneProductDetail, getProductByBrand, getProductDetailsByProduct, getProductDetailsBySeries, remove, searchProductDetail, update } from "../controllers/productDetailController.js";

const router = Router()

router.get("/products-detail",getAll)
router.get("/product-detail-by-product/:id_product",getProductDetailsByProduct)
router.get("/product-detail/:slug",getOneProductDetail)
router.get("/product-detail/series/:series_id",getProductDetailsBySeries)
router.get("/product-detail/brand/:slug",getProductByBrand)
router.post("/search",searchProductDetail)
router.post("/product-detail",create)
router.patch("/product-detail",update)
router.delete("/product-detail",remove)

export default router