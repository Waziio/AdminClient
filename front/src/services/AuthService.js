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
        console.log(err)
        return false
    }
  }
}

export default AuthService;
