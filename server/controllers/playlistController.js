const { validationResult } = require("express-validator");

const Playlist = require("../models/Playlist");
const User = require("../models/User");

class playlistController {
  async createPlaylist(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(412)
          .json({ message: "Ошибка при создании плейлиста", errors });

      const { name, user } = req.body;
      const candidatePlaylist = await Playlist.findOne({ name, user });

      if (candidatePlaylist)
        return res.status(412).json({
          message:
            "Плейлист с таким названиием от данного пользователя уже существует.",
          candidatePlaylist,
        });

      const playlist = new Playlist(req.body);
      await playlist.save();

      const userToAdd = await User.findOne({ user });
      if (userToAdd) {
        userToAdd.playlists.push(playlist._id);
        await userToAdd.save();
      }
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера при создании плейлиста" });
    }
  }
  async getAllPlaylists(req, res) {
    try {
      const playlists = await Playlist.find();
      if (!playlists)
        return res.status(412).json({
          message: "Ошибка сервера при получении списка всех плейлистов.",
        });

      return res.json(playlists);
    } catch (e) {
      console.log(e);
      return res.send({
        message: "Ошибка сервера при получении списка всех плейлистов.",
      });
    }
  }
  async getUserPlaylists(req, res) {
    try {
      const { user } = req.body;
      const playlists = await Playlist.find({ user });
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
  }

  async getPlaylistById(req, res) {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist)
        return res
          .status(412)
          .json({ message: "Ошибка сервера при получении плейлиста." });

      return res.json(playlist);
    } catch (e) {
      console.log(e);
      return res.send({
        message: "Ошибка сервера при получении плейлиста по Id.",
      });
    }
  }

  async addTracksToPlaylist(req, res) {
    try {
      const updatedPlaylist = await Playlist.findById(req.params.id);
      const { songs } = req.body;
      console.log(songs);
      const oldLength = updatedPlaylist.songs.length;
      if (typeof songs.length == Array) {
        songs.map((song) => {
          if (updatedPlaylist.songs.find((s) => s == song))
            updatedPlaylist.songs.push(song);
        });
      } else {
        if (updatedPlaylist.songs.find((s) => s == songs))
          updatedPlaylist.songs.push(songs);
      }
      await updatedPlaylist.save();

      if (updatedPlaylist.songs == oldLength)
        return res.json({ message: "Данные треки уже есть в плейлисте" });
      res.json({
        message: "Треки успешно добавлены в плейлист.",
        updatedPlaylist,
      });
    } catch (e) {
      console.log(e);
      return res.send({ message: "Ошибка сервера при обновлении плейлиста." });
    }
  }

  async updatePlaylist(req, res) {
    try {
      if (Object.keys(req.body).length === 0 || !req.params.id)
        return res
          .status(412)
          .json({ message: "Недостаточно данных для обновления плейлиста." });

      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!updatedPlaylist)
        return res
          .status(412)
          .json({ message: "Плейлиста с таким id не существует" });
      res.json({ message: "Плейлист успешно обновлен", updatedPlaylist });
    } catch (e) {
      console.log(e);
      return res.send({ message: "Ошибка сервера при обновлении плейлиста." });
    }
  }

  async deletePlaylist(req, res) {
    try {
      const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
      if (!deletedPlaylist)
        return res
          .status(412)
          .json({ message: "Ошибка сервера при удалении плейлиста." });

      const users = await User.find({ playlists: deletedPlaylist._id });

      deletePlaylistOnUser(users, deletedPlaylist._id);
      return res.json({ message: "Плейлист успешно удален", users });
    } catch (e) {
      console.log(e);
      return res.send({ message: "Ошибка сервера при удалении плейлиста" });
    }
  }

  async deletePlaylistFromUser(req, res) {
    try {
      const deletedPlaylist = await Playlist.findById(req.params.id);
      if (!deletedPlaylist)
        return res.status(412).json({
          message: "Ошибка сервера при удалении плейлиста у пользователя.",
        });

      const { userId } = req.body;
      const user = await User.find({
        _id: userId,
        playlists: deletedPlaylist._id,
      });

      deletePlaylistOnUser(user, deletedPlaylist._id);
      return res.json({ message: "Плейлист успешно удален", user });
    } catch (e) {
      console.log(e);
      return res.send({
        message: "Ошибка сервера при удалении плейлиста у пользователя.",
      });
    }
  }
}

function deletePlaylistOnUser(users, deletedPlaylistId) {
  users.map((user) => {
    const index = user.playlists.indexOf(deletedPlaylistId);
    user.playlists.splice(index, 1);
    user.save();
  });
}

module.exports = new playlistController();
