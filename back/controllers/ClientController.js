import Client from "../models/client.js";
import clientValidation from "../validation/clientValidation.js";

class ClientController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getAll(req, res) {
    try {
      const clients = await Client.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "date", "mail", "address", "postalcode"] },
      });
      res.status(200).json(clients);
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
      const clientFound = await Client.findByPk(id);
      if (!clientFound) return res.status(404).json({ message: "Ce client n'existe pas ..." });
      res.status(200).json(clientFound);
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    try {
      const { error } = clientValidation(req.body).ClientValidationCreate;
      if (error) return res.status(400).json(error.details[0].message);
      await Client.create({ ...req.body });
      res.status(200).json({ message: "Client ajouté avec succès !" });
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
      const { error } = clientValidation(req.body).ClientValidationUpdate;
      const { id } = req.params;
      const body = req.body;
      if (error) return res.status(400).json(error.details[0].message);
      const clientToUpdate = await Client.findByPk(id);
      if (!clientToUpdate) return res.status(404).json({ message: "Ce client n'existe pas ..." });
      await Client.update(body, { where: { id: id } });
      res.status(200).json({ message: "Les informations du client ont été mises à jour !" });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedClient = await Client.destroy({ returning: true, where: { id: id } });
      if (deletedClient === 0) return res.status(404).json({ message: "Le client n'existe pas ..." });
      res.status(200).json({ message: "Le client a bien été supprimé" });
    } catch (err) {
      res.status(500).json("Une erreur est survenue.");
    }
  }
}

export default ClientController;
