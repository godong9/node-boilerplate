import models from '../models';

const User = models.User;

const UserService = {
  getUsers: function getUsers(params) {
    params = Object.assign({}, params);
    return User.findAll(params);
  },
  getUser: function getUser(id) {
    return User.findById(id);
  },
  saveUser: function saveUser(params) {
    params = Object.assign({}, params);
    return User.create(params);
  },
  deleteAll: function deleteAll() {
    return User.destroy({ truncate: true });
  }
};

module.exports = UserService;