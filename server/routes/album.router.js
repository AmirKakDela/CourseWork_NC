const Router = require('express');
const router = new Router();
const controller = require('../controllers/AlbumController');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, controller.getArtistAlbum)

module.exports = router;
