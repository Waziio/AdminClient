import User from "../models/user.js";
import userValidation from "../validation/userValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/jwtConfig.js";
import { generateAccessToken, generateRenewToken } from "../middlewares/auth.js";

class AuthController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async signup(req, res) {
    try {
      const body = req.body;
      const { error } = userValidation(req.body).UserValidationSignUp;
      if (error) return res.status(400).json(error.details[0].message);
      // Hash password
      const hash = await bcrypt.hash(req.body.password, 10);
      body.password = hash;
      // Create user
      await User.create({ ...body });
      res.status(200).json({ message: "Compte créé !" });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async login(req, res) {
    try {
      const body = req.body;
      const { error } = userValidation(req.body).UserValidationLogin;
      // Data validation
      if (error) return res.status(400).json(error.details[0].message);
      const user = await User.findOne({ where: { mail: body.mail } });
      if (!user) return res.status(400).json({ message: "Adresse email ou mot de passe incorrect" });
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(body.password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "Adresse email ou mot de passe incorrect" });
      // Generate JWT
      const accessToken = generateAccessToken(user);
      res.status(200).json({
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        mail: user.mail,
        message: "Connecté(e)",
        token: accessToken,
      });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renewToken(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      if (!token) return res.status(401).json({ message: "token_missing" });
      jwt.verify(token, config.SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: "token_invalid" });
        const userFound = await User.findByPk(user.id);
        delete userFound.iat;
        delete userFound.exp;
        const renew_token = generateRenewToken(userFound);
        res.json({ token: renew_token });
      });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }
}

export default AuthController;
