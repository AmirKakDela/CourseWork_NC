const { validationResult } = require("express-validator");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

class AlbumController {
    async getArtistAlbum(req, res) {
        try {
            const id = req.params["id"];
            const album = await Album.findById(id);
            res.json(album);
        } catch (e) {
            res.status(500).json({ message: `${e.message}.Ошибка сервера при получении альбома` });
        }
    }

    async getAllArtistAlbum(req, res) {
        try {
            const artistId = req.query["artistId"];
            let albums = [];
            if(artistId) {
                albums = await Album.findOne(artistId);
            } else {
                albums = await Album.find();
            }
            res.json(albums || []);
        } catch (e) {
            res.status(500).json({ message: `${e.message}.Ошибка сервера при получении всех альбомов` });
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
            const album = new Album(req.body);
            const candidateArtist = await Artist.findOne({name: artist});
            if (candidateArtist) {
                candidateArtist.albums.unshift(album._id);
                await album.save();
                return res.status(200)
                    .json({
                        message: "Альбом успешно добавлен",
                        album
                    });
            } else {
                return res.status(412)
                    .json({
                        message: "Такого исполнителя не существует",
                    });
            }
        } catch (e) {
            res.status(500).json({ message: `${e.message}. Ошибка сервера при создании альбома` });
        }
    }

    async deleteAlbum(req, res) {
        try {
            const { id } = req.params;
            const deletedAlbum = await Album.findByIdAndDelete(id);
            if (!deletedAlbum) {
                return res.status(412)
                    .json({ message: "Ошибка при удалении альбома" })
            }
            res.json({ message: "Альбом успешно удален" });
        } catch (e) {
            res.status(500).json({ message: "Ошибка сервера при удалении альбома" });
        }
    }

    async updateAlbum(req, res) {
        try {
            const album = req.body;
            const id = req.params["id"];
            if (!id) {
                return res.status(412)
                    .json({ message: "Альбома с таким id не существует" })
            }
            const updatedAlbum = await Album.findByIdAndUpdate(id, album,{new: true});
            res.json({ message: "Альбом успешно обновлен" , updatedAlbum});
        } catch (e) {
            res.status(500).json({ message: "Ошибка сервера при обновлении альбома" });
        }
    }
}

module.exports = new AlbumController();
