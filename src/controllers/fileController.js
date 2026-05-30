const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const FileShare = require("../models/fileShare");
const { UPLOADS_DIR } = require("../middlewares/uploadMiddleware");

const uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const inviteCode = Math.floor(1000 + Math.random() * 9000).toString();

    const filesData = req.files.map((file) => ({
      originalName: file.originalname,
      savedName: file.filename,
      size: file.size,
    }));

    await FileShare.create({ inviteCode, files: filesData });
    res.json({ inviteCode });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

const downloadFiles = async (req, res) => {
  try {
    const { code } = req.params;
    const fileShare = await FileShare.findOne({ inviteCode: code });

    if (!fileShare || fileShare.files.length === 0) {
      return res.status(400).json({ error: "Invalid invite code" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="files_${code}.zip"`,
    );

    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const file of fileShare.files) {
      const filePath = path.join(UPLOADS_DIR, file.savedName);

      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file.originalName });
      }
    }

    await archive.finalize();
    
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ error: "Download failed" });
  }
};

module.exports = { uploadFiles, downloadFiles };
