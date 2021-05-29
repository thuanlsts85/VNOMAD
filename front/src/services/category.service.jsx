import axios from "axios";
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/category'

class CategoryService {
    getCategory() {
        return axios.get(API_URL)
    }
    getURL() {
        return API_URL
    }
    createCategory(name) {
        return axios.post(API_URL, {
            headers: authHeader(),
            name
        })

    }
    deleteCategory(id) {
        return axios.delete(API_URL + '/' + id)
    }
    putCategory(id, name) {
        return axios.put(API_URL + '/' + id, {
            headers: authHeader(),
            name
        })
    }
}

export default new CategoryService();