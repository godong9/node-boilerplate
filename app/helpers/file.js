const path = require("path");
const moment = require("moment");

const RELATIVE_UPLOAD_PATH = "../../uploads/";
const FILE_URL = "/files/";

function getUploadFileName(fileName) {
  return `${moment.now()}_${fileName}`;
}

function getUploadPath(fileName) {
  return path.join(__dirname, RELATIVE_UPLOAD_PATH, fileName);
}

function getFileUrl(fileName) {
  return FILE_URL + fileName;
}


module.exports = {
  getUploadFileName: getUploadFileName,
  getUploadPath: getUploadPath,
  getFileUrl: getFileUrl,
};
