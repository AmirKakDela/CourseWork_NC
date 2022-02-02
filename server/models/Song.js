const {Schema, model} = require('mongoose');

const Song = new Schema({
    name: {type: String, required: true},
    artistName:{type: String, required: true},
    artist: [{type: Schema.Types.ObjectId, ref: 'Artist', required: true}],
    cover: {type: String},
    song: {type: String},
    duration: {type: Number, required: true},
    genre: {type: String, required: true},
    // genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: true},
    // album: {type: String}
})

module.exports = model('Song', Song);
