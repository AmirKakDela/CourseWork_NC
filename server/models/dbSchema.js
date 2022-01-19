const {Schema, model} = require('mongoose');

const DbSchema = new Schema({
    name: {type: String, unique: true, required: true},
    image: {type: String},
    albums: [{
        _id: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        cover: { type: String, default: "",  required: true },
        songs: [{
            _id: { type: String, unique: true, required: true },
            name: {type: String, required: true},
            cover: {type: String, required: true},
            duration: {type: Number, required: true},
            genre: {type: String, required: true},
        }],
    }],
})

module.exports = model('DbSchema', DbSchema);
