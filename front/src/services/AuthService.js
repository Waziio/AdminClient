import axios from "axios";

class AuthService {
  async signin(email, password) {
    try {
      const result = await axios({
        url: "http://localhost:8000/login",
        method: "POST",
        data: {
          mail: email,
          password: password,
        },
      });
      return result.data;
    } catch (err) {
      const status = err?.response.status;
      if (status === 400) {
        if (err?.response?.data?.message) {
          return "Adresse email ou mot de passe incorrect.";
        } else {
          const data = err?.response?.data
          if (data === '"password" length must be at least 8 characters long') return "Le mot de passe doit contenir au moins 8 caractères.";
          if (typeof data === "string" && data.includes("empty")) return "Au moins un champ est vide.";
        }
      } else {
        return "Une erreur est survenue ...";
      }
    }
  }

  async signup(firstname, lastname, email, password) {
    try {
      const result = await axios({
        url: "http://localhost:8000/signup",
        method: "POST",
        data: {
          firstname: firstname,
          lastname: lastname,
          mail: email,
          password: password,
        },
      });
      return result.data;
    } catch (err) {
      console.log(err?.response.status);
      return false;
    }
  }
}

export default AuthService;
