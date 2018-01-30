const express = require("express");
const { check, param, query, validationResult } = require("express-validator/check");

const UserService = require("../services/users");
const HttpCode = require("../helpers/httpCode");
const ErrorFormatter = require("../helpers/errorFormatter");
const logger = require("../helpers/logger");

const router = express.Router();

/**
 * @api {get} /users Get users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users 유저 객체 배열
 * @apiSuccess {Number} users.id 유저 id
 * @apiSuccess {String} users.email 유저 이메일
 * @apiSuccess {String} users.nickname 유저 닉네임
 */
router.get("/", (req, res) => {
  UserService.getUsers().then(users => {
    res.status(HttpCode.OK).send({
      users: users,
    });
  }).catch(err => {
    /* istanbul ignore next */
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
      error: err,
    });
  });
});

/**
 * @api {get} /users/:id Get user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Object} user 유저 객체
 * @apiSuccess {Number} user.id 유저 id
 * @apiSuccess {String} user.email 유저 이메일
 * @apiSuccess {String} user.nickname 유저 닉네임
 */
router.get("/:id", [
  check("email").isEmail().withMessage("잘못된 이메일입니다."),
  param("id").isInt(),
  query("name").isAlphanumeric()
], (req, res) => {
  const errors = validationResult(req).formatWith(ErrorFormatter);
  if (!errors.isEmpty()) {
    logger.debug(errors.mapped());
    res.send({ errors: errors.array(), });
    return;
  }

  UserService.getUser(req.params.id).then(user => {
    res.status(HttpCode.OK).send({
      user: user,
    });
  }).catch(err => {
    /* istanbul ignore next */
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
      error: err,
    });
  });
});

module.exports = router;
