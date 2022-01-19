const Router = require('express');
const router = new Router();
const controller = require('../controllers/artistController');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {check} = require("express-validator");

router.post('/create', authMiddleware,
    check('name', 'Обязательное поле не заполнено').notEmpty(),
    controller.createArtist);

router.put('/update/:id', adminMiddleware, controller.updateArtist);

router.get('/all', authMiddleware, controller.getAllArtists);

router.get('/artist/:id', authMiddleware, controller.getArtist)

router.get('/all-songs/:id', authMiddleware, controller.getAllArtistSongs);

module.exports = router;