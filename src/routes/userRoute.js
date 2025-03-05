import { Router } from "express";
import { getUser, getUsers, removeUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers )
router.get("/get-user", getUser )
router.delete("/remove-user", removeUser )
router.put("/update-user", updateUser )
export default router;