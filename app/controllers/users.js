import models from '../models';
import HttpCode from '../utils/httpCode';

const User = models.User;

const UserController = {
  getUsers: function getUsers(req, res) {
    User.findAll({}).then(users => {
      res.status(HttpCode.OK).send({
        users: users
      });
    }).catch(err => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
        error: err
      });
    });
  }
};

module.exports = UserController;