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
      console.log(err);
      return false;
    }
  }
}

export default UserService;
