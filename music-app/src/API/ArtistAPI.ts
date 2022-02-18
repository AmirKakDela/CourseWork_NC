import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class ArtistAPI {
    async getArtistById(id: string) {
        return await axios.get(`${url}/api/artist/artist/${id}`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    async getAllArtists() {
        return await axios.get(`${url}/api/artist/all`, AuthorizationHeaderConfig).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
        })
    }

    async getAllArtistsSongs(artistId: string) {
        return await axios.get(`${url}/api/artist/all-songs/${artistId}`, AuthorizationHeaderConfig).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new ArtistAPI();
