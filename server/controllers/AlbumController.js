const Album = require("../models/Album");

class AlbumController {
    async getArtistAlbum(req,res){
        try{
            const {id} = req.params.id;
            const album = await Album.findById(id);
            res.json(album);
        }catch (e){
            res.send({message: 'Ошибка сервера при получении альбома'});
        }
    }
    async getAllArtistAlbum(req,res){
        try{
            const albums = await Album.find();
            res.json(albums);
        }catch (e){
            res.send({message: 'Ошибка сервера при получени всех альбомов'});
        }
    }

}

export default AlbumController;
