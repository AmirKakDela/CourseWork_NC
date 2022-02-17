const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = new Date().toLocaleTimeString().replace(/:/g, "-");
        cb(null, `${date}-${file.originalname}`)
    }
})

module.exports = multer({
    storage
})
