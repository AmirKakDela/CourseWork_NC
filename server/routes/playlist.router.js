const Router = require("express");
const router = new Router();
const controller = require("../controllers/playlistController");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {check} = require("express-validator");

router.post(
    "/create", authMiddleware,
    controller.createPlaylist
);

router.get(
    "/all",
    controller.getAllPlaylists
);

router.get(
    "/user/:id",
    controller.getUserPlaylists
);

router.get(
    "/:id",
    controller.getPlaylistById
);

router.put(
    "/addSong/:id",
    authMiddleware,
    controller.addSongToPlaylist
);

router.put(
    "/deleteSong/:id",
    authMiddleware,
    controller.deleteSongFromPlaylist
);

router.put(
    "/edit/:id",
    authMiddleware,
    controller.editPlaylist
);

router.delete(
    "/delete/:id",
    authMiddleware,
    controller.deletePlaylist
);

router.get(
    '/user/:id/liked-playlists',
    authMiddleware,
    controller.userLikedPlaylists);

router.put(
    '/user/like/:id',
    authMiddleware,
    controller.toggleLikePlaylist);

/*router.delete(
    "/user/delete/:id",
    controller.deletePlaylistFromUser
);*/


module.exports = router;