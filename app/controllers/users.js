const models  = require('../models');
const User = models.User;

const UserController = {
  getUsers: function getUsers(req, res) {
    User.findAll({

    }).then(users => {
      res.send(users);
    })
  }
};

module.exports = UserController;