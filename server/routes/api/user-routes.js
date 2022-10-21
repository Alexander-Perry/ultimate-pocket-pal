const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
  deleteEvent
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
router.route('/').post(createUser);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getUser);
router.route('/events/:eventId').delete(authMiddleware, deleteEvent);

module.exports = router;
