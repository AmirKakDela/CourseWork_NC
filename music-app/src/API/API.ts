import axios from "axios";
import {url} from "../config/config";

class API {
    async getGenre(id: string) {
        return await axios.get(`${url}/api/genre/genre/${id}`, {
            headers: {
                Authorization: '' + localStorage.getItem('token')
            }
        })
    }
}

export default new API();