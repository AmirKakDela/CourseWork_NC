const Router = require('express');
const router = new Router();
const controller = require('../controllers/AlbumController');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:id', authMiddleware, controller.getArtistAlbum);
router.get('/', authMiddleware, controller.getAllArtistAlbum);

module.exports = router;
