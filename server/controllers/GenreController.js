const {validationResult} = require("express-validator");
const Genre = require('../models/Genre')

class GenreController {
    async createGenre(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(412).json({message: 'Ошибка при создании жанра', errors})

            const candidateGenre = await Genre.findOne({name: req.body.name})
            if (candidateGenre) return res.status(412).json({message: 'Такой жанр уже существует'})

            const genre = new Genre(req.body)
            genre.save();

            return res.json({message: 'Жанр успешно добавлен', genre})

        } catch (e) {
            console.log('Ошибка сервера при createGenre', e);
            return res.send({message: "Ошибка сервера при создании жанра."});
        }
    }

    async getAllGenres(req, res) {
        try {
            const genres = await Genre.find();
            return res.json(genres)
        } catch (e) {
            console.log('Ошибка сервера при getAllGenres', e);
            return res.send({message: "Ошибка сервера при получении списка всех жанров."});
        }
    }

    async updateGenre(req, res) {
        try {
            const genre = await Genre.findByIdAndUpdate(req.params.id, req.body)
            const newGenre = await Genre.findById(req.params.id)

            return req.json({message: 'Жанр успешно обновлен', newGenre});
        } catch (e) {
            console.log('Ошибка сервера при updateGenre', e);
            return res.send({message: "Ошибка сервера при обновлении жанра."});
        }
    }
}

module.exports = new GenreController();