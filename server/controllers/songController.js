const Song = require("../models/Song");
const User = require("../models/User");
const {validationResult} = require("express-validator");
const Artist = require("../models/Artist");

class songController {
    async createSong(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(412).json({message: 'Ошибка при создании трека', errors})
            const {name, artistName} = req.body;
            const candidateSong = await Song.findOne({name, artistName});
            if (candidateSong)
                return res.status(412).json({message: 'Такой трек уже существует', candidateSong});
            let artistOfNewSong = await Artist.findOne({name: artistName});
            if (!artistOfNewSong) {
                const newArtist = new Artist({name: artistName, image: ''});
                newArtist.save();
                artistOfNewSong = newArtist;
            }
            const newSong = new Song( {
                ...req.body,
                artist: artistOfNewSong._id,
            });
            await newSong.save();
            // if (candidateArtist) {
            //     candidateArtist.songs.unshift(song._id);
            //     candidateArtist.save();
            // } else {
            //     const newArtist = new Artist({name: artist, image: '', songs: [song._id]});
            //     newArtist.save();
            // }
            return res.status(200).json({message: 'Трек успешно добавлен', newSong});
        } catch (e) {
            res.send({message: e + ' Ошибка сервера при создании трека'});
        }
    }

    async getAllSongs(req, res) {
        try {
            const songs = await Song.find();
            if (!songs)
                return res.status(412).json({message: "Ошибка сервера при получении списка всех треков."});
            return res.json(songs);
        } catch (e) {
            console.log('Ошибка сервера при getAllSongs', e);
            return res.send({message: "Ошибка сервера при получении списка всех треков."});
        }
    }

    async getSong(req, res) {
        try {
            const id = req.params["id"];
            const song = await Song.findById(id);
            if (!song) return res.status(412).json({message: "Ошибка сервера при получении трека."});
            return res.json(song);
        } catch (e) {
            return res.send({message: "Ошибка сервера при getSong."});
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
            console.log('Ошибка сервера при toggleLikeSong', e);
            return res.send({message: "Ошибка сервера добавлении песни в список любимых песен."});
        }
    }

    async deleteSong(req, res) {
        try {
            const deletedSong = await Song.findByIdAndDelete(req.params.id);
            if (!deletedSong) return res.status(412).json({message: "Такого трека не существует"});

            const users = await User.find({likedSongs: deletedSong._id});

            deleteLikeSongOnUser(users, deletedSong._id)
            return res.json({message: 'Песня успешно удалена', users});
        } catch (e) {
            console.log('Ошибка сервера при deleteSong', e);
            return res.send({message: "Ошибка сервера при удалении трека."});
        }
    }

    async updateSong(req, res) {
        try {
            if (Object.keys(req.body).length === 0 || !req.params.id)
                return res.status(412).json({message: "Недостаточно данных для обновления трека."});
            if (req.body.song || req.body.artist)
                return res.status(412).json({message: "Нельзя обновить имя исполнителя или аудиофайл песни."});
            const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedSong)
                return res.status(412).json({message: "Песни с таким id не существует"});
            res.json({message: 'Песня успешно обновлена'});
        } catch (e) {
            console.log('Ошибка сервера при updateSong', e);
            return res.send({message: "Ошибка сервера при обновлении трека."});
        }
    }

    async userLikedSongs(req, res) {
        try {
            const user = await User.findById(req.user);
            if (!user) return res.status(403).json({message: 'Пользователь не найден'});
            const songs = await Song.find({_id: user.likedSongs});
            return res.json(songs);
        } catch (e) {
            console.log('Ошибка сервера при userLikedSongs', e);
            return res.send({message: "Ошибка сервера при сохранении понравившейся песни."});
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
