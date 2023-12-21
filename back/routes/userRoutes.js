import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);

export default router;
