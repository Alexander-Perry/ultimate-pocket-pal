const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
router.route('/').post(createUser);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getUser);

module.exports = router;