import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

/* GET user list api */
router.get('/', UserController.getUsers);

module.exports = router;
