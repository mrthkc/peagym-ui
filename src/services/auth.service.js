import axios from "axios";

const API_URL = "http://localhost:9090/api/";

class AuthService {
    async login(email, password) {
        const response = await axios.post(API_URL + "login", {
            email,
            password
        });

        if (response.data && response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            return response.data;
        }
        return response;
    }
  
    logout() {
        localStorage.removeItem("user");
    }
  
    async register(fullname, email, password) {
        return await axios.post(API_URL + "user", {
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