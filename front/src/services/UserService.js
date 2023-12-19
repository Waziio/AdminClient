import axios from "axios";

class UserService {
  constructor() {
    this.jwt = localStorage.getItem("accessToken");
  }

  async getById(id) {
    try {
      const result = await axios({
        url: `http://localhost:8000/user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      });
      return result.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async update(id, lastname, firstname, email, password) {
    try {
      const result = await axios({
        url: `http://localhost:8000/user/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
        data: {
          lastname: lastname,
          firstname: firstname,
          mail: email,
          password: password,
        },
      });
      return result.data;
    } catch (err) {
      const res = err?.response;
      if (res?.status === 400) {
        if (typeof res?.data === "string") {
          if (res?.data.includes("empty")) {
            return "Au moins un des champs est vide.";
          }
          if (res?.data === '"password" length must be at least 8 characters long') {
            return "Le mot de passe doit contenir entre 8 et 20 caractères.";
          }
          if (res?.data === '"mail" must be a valid email') {
            return "Adresse email non valide.";
          }
        }
      }
      return "Une erreur est survenue.";
    }
  }
}

export default UserService;
