import UserService from '../services/users';
import HttpCode from '../utils/httpCode';

const UserController = {
  getUsers: function getUsers(req, res) {
    UserService.getUsers().then(users => {
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

export default UserController;