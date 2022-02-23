const {validationResult} = require("express-validator");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song")

class playlistController {
    async createPlaylist(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res
                    .status(412)
                    .json({message: "Ошибка при создании плейлиста", errors});

            const {name} = req.body;
            const candidatePlaylist = await Playlist.findOne({name, user: {id: req.user}});
            if (candidatePlaylist)
                return res.status(412).json({
                    message:
                        "Плейлист с таким названиием от данного пользователя уже существует.",
                    candidatePlaylist,
                });
            const playlist = new Playlist(req.body);
            await playlist.save();
            const userToAdd = await User.findById(req.user);
            if (userToAdd) {
                userToAdd.playlists.push(playlist._id);
                await userToAdd.save();
            }
            return res.json({playlist: playlist})
        } catch (e) {
            console.log(e);
            res.send({message: "Ошибка сервера при создании плейлиста"});
        }
    }

    async getAllPlaylists(req, res) {
        try {
            const playlists = await Playlist.find();
            if (!playlists)
                return res.status(412).json({
                    message: "Ошибка сервера при получении списка всех плейлистов.",
                });
            return res.json({playlists});
        } catch (e) {
            console.log(e);
            return res.send({
                message: "Ошибка сервера при получении списка всех плейлистов.",
            });
        }
    }

    /*async getUserPlaylists(req, res) {
        try {
            const {user} = req.body;
            const playlists = await Playlist.find({user});
            if (!playlists)
                return res.status(412).json({
                    message:
                        "Ошибка сервера при получении списка плейлистов от пользователя.",
                    user,
                });

            return res.json(playlists);
        } catch (e) {
            console.log(e);
            return res.send({
                message: "Ошибка сервера при получении списка плейлистов пользователя.",
            });
        }
    }*/

    async getPlaylistById(req, res) {
        try {
            const playlist = await Playlist.findById(req.params.id);
            if (!playlist)
                return res
                    .status(412)
                    .json({message: "Ошибка сервера при получении плейлиста."});

            const songs = await Song.find().then(song => {
                return song.filter(s => playlist.songs.indexOf(s._id) > -1)
            })
            //const songs = allSongs.filter(s => playlist.songs.indexOf(s) > 0)
            return res.json({playlist, songs});
        } catch (e) {
            console.log(e);
            return res.send({
                message: "Ошибка сервера при получении плейлиста по Id.",
            });
        }
    }

    async addSongToPlaylist(req, res) {
        try {
            const updatedPlaylist = await Playlist.findById(req.params.id);
            const {song} = req.body;
            //const oldLength = updatedPlaylist.songs.length;

            if (updatedPlaylist.songs.indexOf(song) < 0) {
                updatedPlaylist.songs.push(song);
                await updatedPlaylist.save();
            }
            const songs = await Song.find().then(song => {
                return song.filter(s => updatedPlaylist.songs.indexOf(s._id) > -1)
            })
            res.json({updatedPlaylist, songs});
        } catch (e) {
            console.log(e);
            return res.send({message: "Ошибка сервера при обновлении плейлиста."});
        }
    }

    async deleteSongFromPlaylist(req, res) {
        try {
            const updatedPlaylist = await Playlist.findById(req.params.id);
            const {song} = req.body;
            //const oldLength = updatedPlaylist.songs.length;
            const index = updatedPlaylist.songs.indexOf(song);
            if (index !== -1) {
                updatedPlaylist.songs.splice(index, 1);
                await updatedPlaylist.save();
            }

            const songs = await Song.find().then(song => {
                return song.filter(s => updatedPlaylist.songs.indexOf(s._id) > -1)
            })
            res.json({
                    updatedPlaylist,
                    songs
                }
            );
        } catch (e) {
            console.log(e);
            return res.send({message: "Ошибка сервера при обновлении плейлиста."});
        }
    }

    async editPlaylist(req, res) {
        try {
            if (Object.keys(req.body).length === 0 || !req.params.id)
                return res
                    .status(412)
                    .json({message: "Недостаточно данных для обновления плейлиста."});

            const updatedPlaylist = await Playlist.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            if (!updatedPlaylist)
                return res
                    .status(412)
                    .json({message: "Плейлиста с таким id не существует"});
            res.json(updatedPlaylist);
        } catch (e) {
            console.log(e);
            return res.send({message: "Ошибка сервера при обновлении плейлиста."});
        }
    }

    async deletePlaylist(req, res) {
        try {
            const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
            if (!deletedPlaylist)
                return res
                    .status(412)
                    .json({message: "Ошибка сервера при удалении плейлиста."});

            const users = await User.find({playlists: deletedPlaylist._id});

            deletePlaylistOnUser(users, deletedPlaylist._id);
            return res.json({message: "Плейлист успешно удален", users});
        } catch (e) {
            console.log(e);
            return res.send({message: "Ошибка сервера при удалении плейлиста"});
        }
    }

    async getUserPlaylists(req, res) {
        try {

            const user = await User.findById(req.params.id)

            const playlists = await Playlist.find().then(playlists => {
                if (playlists) return playlists.filter(p => user.playlists.indexOf(p._id) > -1)
                return []
            })

            return res.json({playlists});
        } catch (e) {
            console.log(e);
            return res.send({
                message: "Ошибка сервера при получении списка всех плейлистов.",
            });
        }
    }

    async userLikedPlaylists(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(403).json({message: 'Пользователь не найден'});
            const playlists = await Playlist.findById(user.likedPlaylists);
            return res.json(playlists);
        } catch (e) {
            console.log('Ошибка сервера при userLikedSongs', e);
            return res.send({message: "Ошибка сервера при сохранении понравившейся песни."});
        }
    }

    async toggleLikePlaylist(req, res) {
        try {
            const playlist = await Playlist.findById(req.params.id);
            if (!playlist) return res.status(412).json({message: 'Плейлиста с таким id не существует.'});

            const user = await User.findById(req.user);
            const playlistIndexInArray = user.likedPlaylists.indexOf(playlist._id);
            if (playlistIndexInArray === -1) {
                user.likedPlaylists.unshift(playlist._id);
                await user.save();
                return res.json({message: 'Добавлено в список любимых плейлистов.'});
            } else {
                user.likedPlaylists.splice(playlistIndexInArray, 1);
                await user.save();
                return res.json({message: 'Удалено из списка любимых плейлистов.'});
            }
        } catch (e) {
            console.log('Ошибка сервера при toggleLikeSong', e);
            return res.send({message: "Ошибка сервера при добавлении плейлиста в список любимых плейлистов."});
        }
    }

    /*async deletePlaylistFromUser(req, res) {
        try {
            const deletedPlaylist = await Playlist.findById(req.params.id);
            if (!deletedPlaylist)
                return res.status(412).json({
                    message: "Ошибка сервера при удалении плейлиста у пользователя.",
                });

            const {userId} = req.body;
            const user = await User.find({
                _id: userId,
                playlists: deletedPlaylist._id,
            });

            deletePlaylistOnUser(user, deletedPlaylist._id);
            return res.json({message: "Плейлист успешно удален", user});
        } catch (e) {
            console.log(e);
            return res.send({
                message: "Ошибка сервера при удалении плейлиста у пользователя.",
            });
        }
    }*/
}

function deletePlaylistOnUser(users, deletedPlaylistId) {
    users.map((user) => {
        const index = user.playlists.indexOf(deletedPlaylistId);
        const likeIndex = user.likedPlaylists.indexOf(deletedPlaylistId)
        user.playlists.splice(index, 1);
        user.likedPlaylists.splice(likeIndex, 1);
        user.save();
    });
}

module.exports = new playlistController();
