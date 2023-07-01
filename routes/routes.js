import { Router } from "express";
import { getAllClients, getOneClient, createClient, updateClient, deleteClient } from "../controllers/ClientController.js";
import { createUser, getAllUsers, getOneUser, login, renewToken, updateUser } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

// Authentication
router.post("/signup", createUser);
router.post("/login", login);
router.get("/renew", renewToken);

// Client
router.get("/client", verifyToken, getAllClients);
router.get("/client/:id", verifyToken, getOneClient);
router.post("/client", verifyToken, createClient);
router.put("/client/:id", verifyToken, updateClient);
router.delete("/client/:id", verifyToken, deleteClient);
// User
router.get("/user", verifyToken, getAllUsers);
router.get("/user/:id", verifyToken, getOneUser);
router.put("/user/:id", verifyToken, updateUser);


export default router;
