import axios from "axios";

const API_URL = "http://localhost:9090/api/";

class AuthService {
    login(email, password) {
        return axios.post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                }
                return response.data;
            });
    }
  
    logout() {
        localStorage.removeItem("user");
    }
  
    register(fullname, email, password) {
        return axios.post(API_URL + "user", {
            fullname,
            email,
            password
        });
    }
  
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
  }
  
  export default new AuthService();