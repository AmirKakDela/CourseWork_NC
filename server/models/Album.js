const { Schema, model } = require("mongoose");

const Album = new Schema({
        name: { type: String, required: true },
        artist: { type: String, required: true },
        songs: { type: [String], default: [], required: true },
        cover: { type: String, default: "",  required: true }
    }
);

module.exports = model("Album", Album);
