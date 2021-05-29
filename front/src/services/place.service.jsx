import axios from "axios";
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/place'

class PlaceService {
    getPlace() {
        return axios.get(API_URL)
    }
    getURL() {
        return API_URL
    }
    createPlace(place_id, name, description, address, city, category, images, lat, lng, URLs) {
        return axios.post(API_URL, {
            headers: authHeader(),
            place_id, name, description, address, city, category, images, lat, lng, URLs
        })

    }
    deletePlace(id) {
        return axios.delete(API_URL + '/' + id)
    }
    putPlace(id, place_id, name, description, address, city, category, images, lat, lng, URLs) {
        return axios.put(API_URL + '/' + id, {
            headers: authHeader(),
            place_id, name, description, address, city, category, images, lat, lng, URLs
        })
    }
}

export default new PlaceService();