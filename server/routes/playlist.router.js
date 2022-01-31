const Router = require("express");
const router = new Router();
const controller = require("../controllers/playlistController");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const { check } = require("express-validator");

router.post(
  "/create",
  controller.createPlaylist
);

router.get("/all", controller.getAllPlaylists);

router.get("/user/playlists", controller.getUserPlaylists);

router.get("/:id", controller.getPlaylistById)

router.put("/addTracks/:id",  controller.addTracksToPlaylist)

router.put("/update/:id", controller.updatePlaylist)

router.delete("/delete/:id",  controller.deletePlaylist)

router.delete("/user/delete/:id", controller.deletePlaylistFromUser)



module.exports = router;
