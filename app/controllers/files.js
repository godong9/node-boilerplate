const express = require("express");
const fs = require("fs");
const formidable = require("formidable");

const HttpCode = require("../helpers/httpCode");
const FileHelper = require("../helpers/file");
const logger = require("../helpers/logger");
const AjaxResponse = require("../helpers/ajaxResponse");

const router = express.Router();

/**
 * @api {get} /files/:filename Get file
 * @apiName GetFile
 * @apiGroup File
 *
 * @apiSuccess {File} file 파일 데이터
 */
router.get("/:filename", (req, res, next) => {
  const filePath = FileHelper.getUploadPath(req.params.filename);

  if (!fs.existsSync(filePath)) {
    next("file path not exist");
    return;
  }
  res.sendFile(filePath);
});

/**
 * @api {post} /files/upload Post file
 * @apiName PostFile
 * @apiGroup File
 *
 * @apiSuccess {String} file 업로드한 파일 url
 */
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
    return res.status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(AjaxResponse.error("Upload failed"));
  });

  form.on("end", () => {
    return res.send(AjaxResponse.success({
      file: FileHelper.getFileUrl(fileName),
    }));
  });
});


module.exports = router;
