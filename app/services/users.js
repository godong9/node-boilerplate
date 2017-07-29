import models from '../models';

const User = models.User;

const UserService = {
  getUsers: function getUsers(params) {
    return User.findAll(params);
  },
  getUser: function getUser(id) {
    return User.findById(id);
  },
  saveUser: function createUser(params) {
    return User.create(params);
  },
  deleteAll: function deleteAll() {
    User.destroy({ truncate: true });
  }
};

module.exports = UserService;