import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/laptopTypeController.js";

const router = Router();

router.get("/laptops-type", getAll)
router.get("/laptop-type", getById)
router.post("/laptop-type", create)
router.patch("/laptop-type", update)
router.delete("/laptop-type", remove)

export default router;