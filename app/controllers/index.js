const express = require("express");

const UserController = require("./users");

const router = express.Router();

// users API controller
router.use("/users", UserController);

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
