const {Schema, model} = require('mongoose');

const Song = new Schema({
    name: {type: String, required: true},
    artist: {type: String, required: true},
    cover: {type: String, required: true},
    song: {type: String, required: true},
    duration: {type: Number, required: true},
    genre: {type: String, required: true},
    album: {type: String}
})

module.exports = model('Song', Song);