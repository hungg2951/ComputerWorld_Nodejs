import { Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brandController.js";

const router = Router();
router.get('/brands',getBrands)
router.get('/brand',getBrand)
router.post('/create-brand',createBrand)
router.patch('/update-brand',updateBrand)
router.delete('/delete-brand',deleteBrand)
export default router;