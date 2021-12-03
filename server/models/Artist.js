const {Schema, model} = require('mongoose');

const Artist = new Schema({
    name: {type: String, unique: true, required: true},
    songs: {type: [String], default: []},
    albums: {type: [String], default: []},
    image: {type: String}
})

module.exports = model('Artist', Artist);