const models  = require('../models');
const User = models.User;

const UserController = {
  getUsers: function getUsers(req, res) {
    User.findAll({}).then(users => {
      res.send(users);
    }).catch(err => {
      res.send(err);
    })
  }
};

module.exports = UserController;