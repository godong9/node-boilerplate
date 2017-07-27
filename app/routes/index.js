import express from 'express';
import IndexController from '../controllers/index';

const router = express.Router();

/* GET index page */
router.get('/', IndexController.getIndexView);

module.exports = router;
