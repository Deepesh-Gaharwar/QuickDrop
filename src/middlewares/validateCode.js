const FileShare = require("../models/fileShare");

const validateCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    if (!code || !/^\d{4}$/.test(code)) {
      return res.status(400).json({ error: "Invalid invite code format" });
    }

    const fileShare = await FileShare.findOne({ inviteCode: code });

    if (!fileShare || fileShare.files.length === 0) {
      return res
        .status(404)
        .json({ error: "Invalid invite code or files have expired" });
    }

    req.fileShare = fileShare;
    next();
  } catch (error) {
    console.error("ValidateCode Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = validateCode;
