const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadMiddleware");
const { uploadFiles, downloadFiles } = require("../controllers/fileController");

router.post("/upload", upload.array("file"), uploadFiles);
router.get("/download/:code", downloadFiles);

module.exports = router;
