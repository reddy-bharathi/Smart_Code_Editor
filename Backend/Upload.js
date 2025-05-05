const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { exec } = require("child_process");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;
    
    exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error || stderr) {
            res.json({ error: stderr });
        } else {
            res.json({ output: stdout });
        }
        fs.unlinkSync(filePath); // Delete file after execution
    });
});

module.exports = router;
