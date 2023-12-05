import User from "../models/user.js";
import userValidation from "../validation/userValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/jwtConfig.js";
import { generateAccessToken, generateRenewToken } from "../middlewares/auth.js";

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
          const accessToken = generateAccessToken(user);
          const renewToken = generateRenewToken(user);
          res.status(200).json({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            mail: user.mail,
            message: "Connecté(e)",
            token: accessToken,
            renew_token: renewToken,
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

const renewToken = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "token_missing" });
  }

  jwt.verify(token, config.RENEW_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "token_invalid" });
    }
    User.findByPk(user.id).then(() => {
      delete user.iat;
      delete user.exp;
      const renew_token = generateAccessToken(user);
      res.json({ token: renew_token });
    });
  });
};

// GET /user
const getAllUsers = (req, res) => {
  User.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json(error));
};

// GET /user/:id
const getOneUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
  })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas ..." });
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json(error));
};

// PUT /user/:id
const updateUser = (req, res) => {
  const { error } = userValidation(req.body).UserValidationUpdate;
  const { id } = req.params;
  const body = req.body;

  if (error) return res.status(401).json(error.details[0].message);

  User.findByPk(id).then((user) => {
    if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas ..." });

    User.update(body, { where: { id: id } })
      .then(() => res.status(200).json({ message: "Les informations de l'utilisateur ont été mises à jour !" }))
      .catch((error) => res.status(500).json(error));
  });
};

export { createUser, login, updateUser, getAllUsers, getOneUser, renewToken };
