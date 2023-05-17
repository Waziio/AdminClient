import express from "express";
import routes from "./routes/routes.js";
import db from "./db.js";
import {} from "./middlewares/auth.js"
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);

db.sync()
  .then(console.log("DB connectée"))
  .catch((error) => {
    console.log(error);
  });

app.listen(8080, () => {
  console.log("Lancé");
});
