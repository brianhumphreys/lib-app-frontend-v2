import axios from "axios";
import type { User } from "..";

const API_URL = window.location.host.includes('localhost') ? 'http://localhost:8080/api/v1/' : 'https://fierce-lake-63862.herokuapp.com/api/v1/'
// const API_URL = `https://fierce-lake-63862.herokuapp.com/api/v1/`;
// const API_URL = `${process.env.API_URL ? process.env.API_URL : 'http://localhost:8080'}/api/v1/`;

class AuthService {
  login(user: User) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  signup(user: User) {
    return axios.post(API_URL + "signup", user).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
