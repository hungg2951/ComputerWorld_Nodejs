import { Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brandController.js";

const router = Router();

router.get('/brands',getBrands)
router.get('/brand',getBrand)
router.post('/brand',createBrand)
router.patch('/brand',updateBrand)
router.delete('/brand',deleteBrand)

export default router;