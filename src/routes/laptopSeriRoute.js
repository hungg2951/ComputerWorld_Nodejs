import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/laptopSeriConller.js";

const router = Router();

router.get("/laptopSeris", getAll )
router.get("/laptop-seri", getById )
router.post("/laptop-seri", create )
router.patch("/laptop-seri",update)
router.delete("/laptop-seri",remove)

export default router;