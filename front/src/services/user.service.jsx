import axios from "axios";
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/test/'

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all')
    }

    getGuestBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }

    getMemberBoard() {
        return axios.get(API_URL + 'moderator', { headers: authHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() })
    }
}

export default new UserService();