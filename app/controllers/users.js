import express from "express";
import UserService from "../services/users";
import HttpCode from "../helpers/httpCode";

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
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
      error: err,
    });
  });
});

export default router;
