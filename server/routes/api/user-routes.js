const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
  deleteEvent,
  createEvent,
  editEvent,
  editBudget
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
// Routes
router.route('/').post(createUser);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getUser);
router.route('/events').post(authMiddleware, createEvent);
router.route('/events/:eventId').delete(authMiddleware, deleteEvent);
router.route('/events/:eventId').put(authMiddleware, editEvent);
router.route('/budget').put(authMiddleware, editBudget)

module.exports = router;
