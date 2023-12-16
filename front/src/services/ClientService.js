import axios from "axios";

class ClientService {
  constructor(jwt) {
    this.jwt = jwt;
  }

  async getAll() {
    try {
      const result = await axios({
        url: "http://localhost:8000/client",
        method: "GET",
        headers: {
            Authorization: `Bearer ${this.jwt}`
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default ClientService;
