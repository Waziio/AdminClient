import express from "express";
import mountRoutes from "./routes/routes.js";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
mountRoutes(app)

db.sync()
  .then(console.log("DB connectée"))
  .catch((error) => {
    console.log(error);
  });

app.listen(8000, () => {
  console.log("Lancé");
});
