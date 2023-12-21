import { verifyToken } from "../middlewares/auth.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import clientRoutes from "./clientRoutes.js";


export default (app) => {
  app.use(authRoutes);
  app.use("/user", verifyToken, userRoutes);
  app.use("/client", verifyToken, clientRoutes);
};

// // Authentication
// router.post("/signup", createUser);
// router.post("/login", login);
// router.get("/renew", renewToken);

// // Client
// router.get("/client", verifyToken, getAllClients);
// router.get("/client/:id", verifyToken, getOneClient);
// router.post("/client", verifyToken, createClient);
// router.put("/client/:id", verifyToken, updateClient);
// router.delete("/client/:id", verifyToken, deleteClient);
// // User
// router.get("/user", verifyToken, getAllUsers);
// router.get("/user/:id", verifyToken, getOneUser);
// router.put("/user/:id", verifyToken, updateUser);
