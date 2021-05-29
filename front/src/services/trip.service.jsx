import axios from "axios";
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/trip'

class TripService {
    getTrip() {
        return axios.get(API_URL)
    }
    getURL() {
        return API_URL
    }
    createTrip(title, note, city, place, startDate, endDate, email) {
        return axios.post(API_URL, {
            headers: authHeader(),
            title, note, city, place, startDate, endDate, email
        })

    }
    deleteTrip(id) {
        return axios.delete(API_URL + '/' + id)
    }
    putTrip(id, title, note, city, place, startDate, endDate, email) {
        return axios.put(API_URL + '/' + id, {
            headers: authHeader(),
            title, note, city, place, startDate, endDate, email
        })
    }
}

export default new TripService();