import models from '../models';

const User = models.User;

const UserService = {
  getUsers: function getUsers() {
    return User.findAll({});
  }
};

module.exports = UserService;