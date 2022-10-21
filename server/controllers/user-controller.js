const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
// get user by ID or email
  async getUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { email: params.email }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.json(foundUser);
  },

  // Create a user, sign the token and send it back to client/src/components/Signup.js
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // Login, sign token and send it back (to client/src/components/Login.js
  async login({ body }, res) {
    const user = await User.findOne({ email: body.email });
    // Matching return message for both invalid user and password
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async deleteEvent({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { events: { _id: params.eventId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({message: "User not found"})
    }
    return res.json(updatedUser);
  },
};
