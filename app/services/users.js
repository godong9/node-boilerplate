const models = require("../models");

const User = models.User;

const UserService = {
  getUsers: function getUsers(params) {
    const modelParams = Object.assign({}, params);
    return User.findAll(modelParams);
  },
  getUser: function getUser(id) {
    return User.findById(id);
  },
  saveUser: function saveUser(params) {
    const modelParams = Object.assign({}, params);
    return User.create(modelParams);
  },
  deleteAll: function deleteAll() {
    return User.destroy({ truncate: true, });
  },
};

module.exports = UserService;
