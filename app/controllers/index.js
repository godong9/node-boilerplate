const express = require("express");

const UserController = require("./users");
const FileController = require("./files");

const router = express.Router();

// users API controller
router.use("/users", UserController);

// file API controller
router.use("/files", FileController);

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
