const { validationResult } = require("express-validator");
const Album = require("../models/Album");

class AlbumController {
    async getAlbum(req, res) {
        try {
            const albumId = req.params["albumId"];
            const album = await Album.findById(albumId);
            const albumWithSongs = await Album.findById(albumId).populate( "songs");
            const songs = albumWithSongs.songs;
            return res.json({ album, songs });
        } catch (e) {
            res.status(500).json({ message: `${e.message}.Ошибка сервера при получении альбома` });
        }
    }

    async getAllArtistAlbum(req, res) {
        try {
            const artistId = req.params["artistId"];
            const albums = await Album.findOne().populate({
                path: "songs",
                match: {artistId: artistId}
            });
            res.json(albums);
        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}.Ошибка сервера при получении всех альбомов артиста` });
        }
    }

    async getAllAlbums(req, res) {
        try {
            const albums = await Album.find();
            res.json(albums);
        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}.Ошибка сервера при получении всех альбомов` });
        }
    }

    async getAllAlbumsWithSongs(req, res) {
        try {
            const albums = await Album.find().populate( "songs");
            //const songs = albums.map(album => album.songs);
            res.json(albums);
        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}.Ошибка сервера при получении всех альбомов` });
        }
    }

    async createArtistAlbum(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(412)
                    .json({
                        message: "Ошибка при создании альбома",
                        errors
                    });
            }
            const { name, artist } = req.body;
            const candidateAlbum = await Album.findOne({ name, artist });
            if (candidateAlbum) {
                return res.status(412)
                    .json({
                        message: "Такой альбом уже существует",
                        candidateAlbum
                    });
            }
                const newAlbum = new Album({
                    ...req.body,
                     //cover: "/" + req.files.cover[0].path
                });
                await newAlbum.save();
                return res.status(200)
                    .json({
                        message: "Альбом успешно добавлен",
                        newAlbum
                    });
        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}. Ошибка сервера при создании альбома` });
        }
    }

    async deleteAlbum(req, res) {
        try {
            const id = req.params.id;
            const deletedAlbum = await Album.findByIdAndDelete(id);
            if (!deletedAlbum) {
                return res.status(412)
                    .json({ message: "Ошибка при удалении альбома" });
            }
            res.json({ message: "Альбом успешно удален" });
        } catch (e) {
            res.status(500)
                .json({ message: "Ошибка сервера при удалении альбома" });
        }
    }

    async updateAlbum(req, res) {
        try {
            const album = req.body;
            const id = req.params["id"];
            if (!id) {
                return res.status(412)
                    .json({ message: "Альбома с таким id не существует" });
            }
            const updatedAlbum = await Album.findByIdAndUpdate(id, album);
            return res.status(200)
                .json({
                    message: "Альбом успешно обновлен",
                    updatedAlbum
                });
        } catch (e) {
            res.status(500)
                .json({ message: "Ошибка сервера при обновлении альбома" });
        }
    }
}

module.exports = new AlbumController();
