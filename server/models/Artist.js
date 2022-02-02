const {Schema, model} = require('mongoose');

const Artist = new Schema({
    name: {type: String, unique: true, required: true},
    image: {type: String},
    // songs: {type: [String], default: []},
    // albums: {type: [String], default: []},
})

module.exports = model('Artist', Artist);
