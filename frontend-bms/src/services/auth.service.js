import axios from "axios";

const API_URL = "http://localhost:9001/BookStore/auth/";

class AuthService {
  login(username, password) { 
    return axios.post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("BookStore", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("BookStore");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('BookStore'));;
  }
}

export default new AuthService();
