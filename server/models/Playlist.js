const {Schema, model} = require('mongoose');

const Playlist = new Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    cover: {type: String, required: true},
    songs: {type: [String], required: true},
})

module.exports = model('Playlist', Playlist);