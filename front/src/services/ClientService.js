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
          Authorization: `Bearer ${this.jwt}`,
        },
      });
      return result.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async create(lastname, firstname, date, email, address, postalCode, city, country, profile_picture) {
    try {
      const result = await axios({
        url: "http://localhost:8000/client",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
        data: {
          lastname: lastname,
          firstname: firstname,
          date: date,
          mail: email,
          address: address,
          postalcode: postalCode,
          city: city,
          country: country,
          profile_picture: profile_picture,
        },
      });
      return result.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default ClientService;
