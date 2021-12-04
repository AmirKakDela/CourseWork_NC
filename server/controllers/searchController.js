const Artist = require("../models/Artist");
const Song = require("../models/Song");

class searchController {

    async getSearchResult(req, res) {
        const {query} = req.query;
        if (query === '') return res.json({});

        const songs = await Song.find({name: {$regex: query, $options: "i"}}).limit(5);
        const artists = await Artist.find({name: {$regex: query,  $options: "i"}}).limit(5);
        // Todo: Здесь еще потом написать поиск по плейлистам

        res.json({songs, artists});
    }

}

module.exports = new searchController();