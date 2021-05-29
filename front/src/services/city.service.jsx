import axios from "axios";
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/city'

class CityService {
    getCity() {
        return axios.get(API_URL)
    }
    getURL() {
        return API_URL
    }
    postCity(){
        return axios.post(API_URL, { headers: authHeader() })
    }
    deleteCity(){
        return axios.delete(API_URL, { headers: authHeader() })
    }
    putCity(){
        return axios.put(API_URL, { headers: authHeader() })
    }
}

export default new CityService();