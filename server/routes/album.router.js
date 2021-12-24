const Router = require("express");
const router = new Router();
const controller = require("../controllers/AlbumController");
const authMiddleware = require("../middlewares/auth.middleware");
const { check } = require("express-validator");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/:id", authMiddleware, controller.getArtistAlbum);
router.get("/all", authMiddleware, controller.getAllArtistAlbum);
router.post("/create",
    controller.createArtistAlbum);

// adminMiddleware,
//     check("name", "Обязательное поле не заполнено")
//         .notEmpty(),
//     check("artist", "Обязательное поле не заполнено")
//         .notEmpty(),
//     check("songs", "Обязательное поле не заполнено")
//         .notEmpty(),
//     check("cover", "Обязательное поле не заполнено")
//         .notEmpty(),

router.delete("/delete/:id", adminMiddleware, controller.deleteAlbum);
router.put("/update/:id", adminMiddleware, controller.updateAlbum);

//Для альбомов, которые пользователь добавил к себе, удалить и обновить альбом
// router.delete('/user/delete/:id', authMiddleware, controller.deleteAlbum);
// router.put('/user/update/:id', authMiddleware, controller.updateAlbum);

module.exports = router;
