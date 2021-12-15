const Song = require("../models/Song");
const User = require("../models/User");
const {validationResult} = require("express-validator");
const Artist = require("../models/Artist");

class songController {
    async createSong(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(412).json({message: 'Ошибка при создании трека', errors})

            const {name, artist} = req.body;

            const candidateSong = await Song.findOne({name, artist});
            if (candidateSong) return res.status(412).json({message: 'Такой трек уже существует', candidateSong});

            const song = new Song(req.body);
            await song.save();

            const candidateArtist = await Artist.findOne({name: artist});
            if (candidateArtist) {
                candidateArtist.songs.unshift(song._id);
                candidateArtist.save();
            } else {
                const newArtist = new Artist({name: artist, image: '', songs: [song._id]});
                newArtist.save();
            }

            return res.status(200).json({message: 'Трек успешно добавлен', song});

        } catch (e) {
            console.log(e);
            res.send({message: 'Ошибка сервера при создании трека'});
        }
    }

    async getAllSongs(req, res) {
        try {
            const songs = await Song.find();
            if (!songs) return res.status(412).json({message: "Ошибка сервера при получении списка всех треков."});

            return res.json(songs);
        } catch (e) {
            return res.send({message: "Ошибка сервера при получении списка всех треков."});
            console.log('Ошибка сервера при getAllSongs', e);
        }
    }

    async toggleLikeSong(req, res) {
        try {
            const song = await Song.findById(req.params.id);
            if (!song) return res.status(412).json({message: 'Песни с таким id не существует.'});

            const user = await User.findById(req.user);
            const songIndexInArray = user.likedSongs.indexOf(song._id);
            if (songIndexInArray === -1) {
                user.likedSongs.unshift(song._id);
                await user.save();
                return res.json({message: 'Добавлено в список любимых песен.'});
            } else {
                user.likedSongs.splice(songIndexInArray, 1);
                await user.save();
                return res.json({message: 'Удалено из списка любимых песен.'});
            }
        } catch (e) {
            return res.send({message: "Ошибка сервера добавлении песни в список любимых песен."});
            console.log('Ошибка сервера при toggleLikeSong', e);
        }
    }

    async deleteSong(req, res) {
        try {
            const deletedSong = await Song.findByIdAndDelete(req.params.id);
            if (!deletedSong) return res.status(412).json({message: "Ошибка сервера при удалении трека."});

            const users = await User.find({likedSongs: deletedSong._id});

            deleteLikeSongOnUser(users, deletedSong._id)
            return res.json({message: 'Песня успешно удалена', users});
        } catch (e) {
            return res.send({message: "Ошибка сервера при удалении трека."});
            console.log('Ошибка сервера при deleteSong', e);
        }
    }

    async updateSong(req, res) {
        try {
            if (Object.keys(req.body).length === 0 || !req.params.id) return res.status(412).json({message: "Недостаточно данных для обновления трека."});
            if (req.body.song || req.body.artist) return res.status(412).json({message: "Нельзя обновить имя исполнителя или аудиофайл песни."});
            const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedSong) return res.status(412).json({message: "Песни с таким id не существует"});
            res.json({message: 'Песня успешно обновлена'});
        } catch (e) {
            return res.send({message: "Ошибка сервера при обновлении трека."});
            console.log('Ошибка сервера при updateSong', e);
        }
    }

    async userLikedSongs(req, res) {
        try {
            const user = await User.findById(req.user);
            if (!user) return res.status(403).json({message: 'Пользователь не найден'});
            const songs = await Song.find({_id: user.likedSongs});
            return res.json(songs);
        } catch (e) {

        }
    }
}

module.exports = new songController();

// функция которая принимает на вход массив юзеров, у которых имеется песня, которую мы удаляем из общего стора песен
// и сам id песни. функция переберает массив и удаляет из likedSongs удаленную песню.
function deleteLikeSongOnUser(users, deletedSongId) {
    users.map(user => {
        const index = user.likedSongs.indexOf(deletedSongId);
        user.likedSongs.splice(index, 1);
        user.save();
    })
}