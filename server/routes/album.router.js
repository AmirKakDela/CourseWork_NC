const Router = require("express");
const router = new Router();
const controller = require("../controllers/AlbumController");
const authMiddleware = require("../middlewares/auth.middleware");
const { check } = require("express-validator");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/:id", authMiddleware, controller.getArtistAlbum);
router.get("/all", authMiddleware, controller.getAllArtistAlbum);
router.post("/create",adminMiddleware,
    check("name", "Обязательное поле не заполнено")
        .notEmpty(),
    check("artist", "Обязательное поле не заполнено")
        .notEmpty(),
    check("songs", "Обязательное поле не заполнено")
        .notEmpty(),
    check("cover", "Обязательное поле не заполнено")
        .notEmpty(),
    controller.createArtistAlbum);

router.delete("/delete/:id",adminMiddleware, controller.deleteAlbum);
router.put("/update/:id", adminMiddleware, controller.updateAlbum);

module.exports = router;
