import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class ArtistAPI {
    async getArtistById(id: string) {
        return await axios.get(`${url}/api/artist/artist/${id}`, AuthorizationHeaderConfig)
    }

    async getAllArtists() {
        return await axios.get(`${url}/api/artist/all`, AuthorizationHeaderConfig).then(response => {
            return response.data
        })
    }
}

export default new ArtistAPI();
