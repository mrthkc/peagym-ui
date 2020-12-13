import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9090/api/';

class UserService {
    getToken() {
        return axios.get(API_URL + 'token', { headers: authHeader() });
    }

    getUser(uid) {
        return axios.get(API_URL + 'user/' + uid + '/profile', { headers: authHeader() });
    }
}

export default new UserService();