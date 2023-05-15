import Client from "../models/client.js";
import clientValidation from "../validation/clientValidation.js";


// GET /client
const getAllClients = (req, res) => {
  Client.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "date", "mail", "address", "postalcode"] },
  })
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((error) => res.status(500).json(error));
};

// GET /client/:id
const getOneClient = (req, res) => {
  const { id } = req.params;
  Client.findByPk(id)
    .then((client) => {
      if (!client) return res.status(404).json({ message: "Ce client n'existe pas ..." });
      res.status(200).json(client);
    })
    .catch((error) => res.status(500).json(error));
};

// POST /client
const createClient = (req, res) => {
  const { error } = clientValidation(req.body);

  if (error) return res.status(401).json(error.details[0].message);

  Client.create({ ...req.body })
    .then(() => {
      res.status(200).json({ message: "Client ajouté avec succès !" });
    })
    .catch((error) => res.status(500).json(error));
};

// PUT /client/:id
const updateClient = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  Client.findByPk(id).then((client) => {
    if (!client) return res.status(404).json({ message: "Ce client n'existe pas ..." });

    Client.update(body, { where: { id: id } })
      .then(() => res.status(200).json({ message: "Les informations du client ont été mises à jour !" }))
      .catch((error) => res.status(500).json(error));
  });
};

// DELETE /client/:id
const deleteClient = (req, res) => {
  const { id } = req.params;
  Client.destroy({ returning: true, where: { id: id } })
    .then((deletedClients) => {
      if (deletedClients === 0) return res.status(404).json({ message: "Le client n'existe pas ..." });
      res.status(200).json({ message: "Le client a bien été supprimé" });
    })
    .catch((error) => res.status(500).json(error));
};

export { getAllClients, getOneClient, createClient, updateClient, deleteClient };
