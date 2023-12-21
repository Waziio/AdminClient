import { verifyToken } from "../middlewares/auth.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import clientRoutes from "./clientRoutes.js";


export default (app) => {
  app.use(authRoutes);
  app.use("/user", verifyToken, userRoutes);
  app.use("/client", verifyToken, clientRoutes);
};
