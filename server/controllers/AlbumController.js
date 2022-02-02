const { validationResult } = require("express-validator");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Song = require("../models/Song");

class AlbumController {
    async getArtistAlbum(req, res) {
        try {
            const artistId = req.params["artistId"];
            const albumId = req.params["albumId"];
            const artistsAlbum = await Album.findById(albumId).populate({
                path: "songs",
                match: {_id: artistId}
            });
            res.json(artistsAlbum);
        } catch (e) {
            res.status(500).json({ message: `${e.message}.Ошибка сервера при получении альбома` });
        }
    }

    async getAllArtistAlbum(req, res) {
        try {
            const artistId = req.query["artistId"];
            let albums = [];
            if (!artistId) {
                return res.status(412)
                    .json({ message: "Артиста с таким id не существует" });
            }
            albums = await Album.find().populate({
                path: "songs",
                match: {_id: artistId}
            });
            res.json(albums || []);
        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}.Ошибка сервера при получении всех альбомов артиста` });
        }
    }

    async getAllAlbums(req, res) {
        try {
            const albums = await Album.find().populate( "songs");
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
            const { name, songs } = req.body;
            const candidateAlbum = await Album.findOne({ name, songs });
            if (candidateAlbum) {
                return res.status(412)
                    .json({
                        message: "Такой альбом уже существует",
                        candidateAlbum
                    });
            }

            const albumsSongs = await Album.findOne().populate({
                path: "songs",
                match: {_id: songs}
            });

            if (albumsSongs.songs.length < songs.length){
                return res.status(412)
                    .json({
                        message: "Таких треков не существует",
                    });
            } else {
                const newAlbum = new Album(req.body);
                await newAlbum.save();
                return res.status(200)
                    .json({
                        message: "Альбом успешно добавлен",
                        newAlbum
                    });
            }
            //
            // const candidateArtist = await Artist.findOne({ name: artist });
            // if (candidateArtist) {
            //     candidateArtist.albums.unshift(album._id);
            //     await album.save();
            //     return res.status(200)
            //         .json({
            //             message: "Альбом успешно добавлен",
            //             album
            //         });
            // } else {
            //     return res.status(412)
            //         .json({
            //             message: "Такого исполнителя не существует",
            //         });
            //}

        } catch (e) {
            res.status(500)
                .json({ message: `${e.message}. Ошибка сервера при создании альбома` });
        }
    }

    async deleteAlbum(req, res) {
        try {
            const { id } = req.params["id"];
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
            const updatedAlbum = await Album.findByIdAndUpdate(id, album, { new: true });
            res.json({
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
