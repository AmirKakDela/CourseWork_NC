const {validationResult} = require("express-validator");
const User = require("../models/User");

class authController {
    async register(req, res) {
        try {
            console.log(req.body)
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: 'Ошибка при регистрации', errors})

            const {email, password, name} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) return res.status(400).json({message: `Пользователь с почтовым адрессом ${email} уже существует.`})

            const user = new User({email, password, name});
            await user.save();
            return res.json({message: 'Пользователь создан'})
        } catch (e) {
            console.log(e);
            res.send({message: 'Ошибка сервера при регистрации'});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) return res.status(403).json({message: `Пользователя с таким почтовым адресом не существует.`});

            if (user.password !== password) return res.status(403).json({message: 'Неверный пароль'});

            const token = user._id + '_' + user.admin;
            return res.json({token, userId: user._id, userName: user.name});

        } catch (e) {
            console.log(e);
            res.send({message: 'Ошибка сервера при логине'});
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({_id: req.user});
            const token = user._id + '_' + user.admin;
            return res.json({token, userId: user._id, userName: user.name});
        } catch (e) {
            console.log(e);
            res.send({message: 'Ошибка сервера при авторизации'});
        }
    }
}

module.exports = new authController();