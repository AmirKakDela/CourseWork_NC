import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class GenreAPI {
    async getGenre(id: string) {
        return await axios.get(`${url}/api/genre/genre/${id}`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new GenreAPI();
