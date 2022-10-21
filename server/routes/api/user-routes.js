const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
  deleteEvent,
  createEvent,
  editEvent
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
router.route('/').post(createUser);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getUser);
router.route('/events').post(authMiddleware, createEvent);
router.route('/events/:eventId').delete(authMiddleware, deleteEvent);
router.route('/events/:eventId').put(authMiddleware, editEvent);

module.exports = router;
