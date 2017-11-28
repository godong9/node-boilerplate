import express from "express";

import UserController from "./users";

const router = express.Router();

// users API controller
router.use("/users", UserController);

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

export default router;
