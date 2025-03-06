import { Router } from "express";
import { getUser, getUsers, removeUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers )
router.get("/user", getUser )
router.delete("/user", removeUser )
router.patch("/user", updateUser )
export default router;