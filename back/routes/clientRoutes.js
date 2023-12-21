import { Router } from "express";
import ClientController from "../controllers/ClientController.js";

const router = Router();
const clientController = new ClientController();

router.get("/", clientController.getAll);
router.get("/:id", clientController.getById);
router.post("/", clientController.create);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.delete);

export default router;
