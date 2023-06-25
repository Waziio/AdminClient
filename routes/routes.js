import { Router } from "express";
import { getAllClients, getOneClient, createClient, updateClient, deleteClient } from "../controllers/ClientController.js";
import { createUser, getAllUsers, getOneUser, login, updateUser } from "../controllers/UserController.js";
import passport from "passport";

const router = Router();

// Authentication
router.post("/signup", createUser);
router.post("/login", login);

// Need jwt
router.use(passport.authenticate("jwt", { session: false }));
// Client
router.get("/client", getAllClients);
router.get("/client/:id", getOneClient);
router.post("/client", createClient);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);
// User
router.get("/user", getAllUsers);
router.get("/user/:id", getOneUser);
router.put("/user/:id", updateUser);

export default router;
