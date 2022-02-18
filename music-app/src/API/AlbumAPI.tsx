import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";
import {AlbumTypeWithoutId} from "../components/AdminPage/AdminAlbumForm/AdminAlbumForm";

class AlbumAPI {

    async createAlbum(album: AlbumTypeWithoutId | FormData) {
        return await axios.post(`${url}/api/album/create`, album, {
            headers: {
                Authorization: "" + localStorage.getItem("token"),
                "content-type": "multipart/form-data"
            }
        }).then(res => {
            return res;
        }).catch(res => {
            console.log(res);
            return res;
        });
    }

    async getAlbumById(albumId: string) {
        return await axios.get(`${url}/api/album/${albumId}`, AuthorizationHeaderConfig).then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllAlbums() {
        return await axios.get(`${url}/api/album/allAlbums`, AuthorizationHeaderConfig).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllAlbumsWithSongs() {
        return await axios.get(`${url}/api/album/albumsWithSongs`, AuthorizationHeaderConfig).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
        });
    }

    async getArtistAlbums(artistId: string) {
        return await axios.get(`${url}/api/album/artist/${artistId}`, AuthorizationHeaderConfig).then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
        });
    }

    async deleteAlbum(id: string) {
        return await axios.delete(`${url}/api/album/delete/${id}`, AuthorizationHeaderConfig).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
}

export default new AlbumAPI();
