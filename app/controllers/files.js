const express = require("express");
const fs = require("fs");
const formidable = require("formidable");

const HttpCode = require("../helpers/httpCode");
const FileHelper = require("../helpers/file");
const logger = require("../helpers/logger");

const router = express.Router();

router.get("/:filename", (req, res, next) => {
  const filePath = FileHelper.getUploadPath(req.params.filename);

  if (!fs.existsSync(filePath)) {
    next("file not exist");
    return;
  }
  res.sendFile(filePath);
});

router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  let fileName;

  form.parse(req);

  form.on("fileBegin", (name, file) => {
    fileName = FileHelper.getUploadFileName(file.name);
    file.path = FileHelper.getUploadPath(fileName);
  });

  form.on("file", (name, file) => {
    logger.debug(`Uploaded ${file.name}`);
  });

  form.on("aborted", () => {
    logger.error("Upload failed");
  });

  form.on("end", () => {
    return res.status(HttpCode.OK).send({
      file: FileHelper.getFileUrl(fileName),
    });
  });
});


module.exports = router;
