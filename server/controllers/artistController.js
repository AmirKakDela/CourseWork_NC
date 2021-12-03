const {validationResult} = require("express-validator");
const Artist = require("../models/Artist");
const Song = require("../models/Song");

class artistController {
    async createArtist(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(412).json({message: 'Ошибка при создании артиста', errors});

            const candidateArtist = await Artist.findOne({name: req.body.name});
            if (candidateArtist) return res.status(412).json({
                message: 'Такой исполнитель уже существует',
                candidateArtist
            });

            const artist = new Artist(req.body);
            artist.save();
            return res.json({message: 'Исполнитель успешно создан.', artist});
        } catch (e) {
            return res.send({message: "Ошибка сервера при добавлении артиста."});
            console.log('Ошибка сервера при createArtist', e);
        }
    }

    async updateArtist(req, res) {
        try {
            if (!Object.keys(req.body).includes('image') || Object.keys(req.body).length !== 1) return res.status(412).json({message: 'Поменять можно только изображение исполнителя'});

            const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedArtist) return res.status(412).json({message: "Артиста с таким id не существует"});
            updatedArtist.save();
            return res.json({message: 'Изображение артиста успешно изменено'});
        } catch
            (e) {
            return res.send({message: "Ошибка сервера при обновлении артиста."});
            console.log('Ошибка сервера при updateArtist', e);
        }
    }

    async getAllArtists(req, res) {
        try {
            const artists = await Artist.find();
            if (!artists) return res.status(412).json({message: "Ошибка сервера при получении списка всех треков."});

            return res.json(artists);
        } catch (e) {
            return res.send({message: "Ошибка сервера при получении списка всех артистов."});
            console.log('Ошибка сервера при getAllArtists', e);
        }
    }

    async getAllArtistSongs(req, res) {
        try {
            const artist = await Artist.findById(req.params.id);
            if (!artist) return res.status(412).json({message: 'Артиста с таким id не найдено.'});

            const songs = await Song.find({_id: artist.songs});
            return res.json(songs);
        } catch (e) {

        }
    }

}

module
    .exports = new artistController();