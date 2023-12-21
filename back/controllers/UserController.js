import User from "../models/user.js";
import userValidation from "../validation/userValidation.js";
import bcrypt from "bcrypt";

class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const userFound = await User.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      if (!userFound) return res.status(404).json({ message: "Cet utilisateur n'existe pas ..." });
      res.status(200).json(userFound);
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    try {
      const { error } = userValidation(req.body).UserValidationUpdate;
      const { id } = req.params;
      const body = req.body;
      if (error) return res.status(400).json(error.details[0].message);
      const userToUpdate = await User.findByPk(id);
      if (!userToUpdate) return res.status(404).json({ message: "Cet utilisateur n'existe pas ..." });
      // Hash password
      if (body?.password) {
        body.password = await bcrypt.hash(body.password, 10);
      }
      // Update
      await User.update(body, { where: { id: id } });
      res.status(200).json({ message: "Les informations de l'utilisateur ont été mises à jour !" });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }
}

export default UserController;
