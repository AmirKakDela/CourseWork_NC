import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class API {
    async getGenre(id: string) {
        return await axios.get(`${url}/api/genre/genre/${id}`, AuthorizationHeaderConfig)
    }
}

export default new API();
