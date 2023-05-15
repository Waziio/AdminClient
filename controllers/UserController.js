import User from "../models/user.js";
import userValidation from "../validation/userValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/jwtConfig.js";


// POST /signup
const createUser = (req, res) => {
  const body = req.body;
  const { error } = userValidation(req.body).UserValidationSignUp;

  if (error) return res.status(401).json(error.details[0].message);

  // Hash du mdp
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      body.password = hash;
      // Création compte
      User.create({ ...body })
        .then(() => {
          res.status(200).json({ message: "Compte créé !" });
        })
        .catch((error) => res.status(500).json(error.errors[0].message));
    })
    .catch((error) => res.status(500).json(error.errors[0].message));
};


// POST /login
const login = (req, res) => {
  const body = req.body;
  const { error } = userValidation(req.body).UserValidationLogin;

  if (error) return res.status(401).json(error.details[0].message);

  User.findOne({ where: { mail: body.mail } })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "Adresse mail incorrecte" });
      bcrypt
        .compare(body.password, user.password)
        .then((result) => {
          if (!result) return res.status(404).json({ message: "Mot de passe incorrect" });
          res.status(200).json({
            id: user.id,
            mail: user.mail,
            message: "Connecté(e)",
            token: jwt.sign({ id: user.id }, config.SECRET_KEY, { expiresIn: "12h" }),
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

export { createUser, login };
