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

  // createEvent, 
  // find user by ID, push new entry into User events array
  async createEvent({ user, body }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { events: body } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json(updatedUser);
  },

  // deleteEvent
  // find user by ID, then pull event from events array based on event ID
  async deleteEvent({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { events: { _id: params.eventId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json(updatedUser);
  },

  // editEvent
  // find user by ID and Event by ID, Set the new data for the event
  async editEvent({ user, body }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, "events._id": body._id },
      { $set: { events: body } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json(updatedUser);
  },

  // editBudget
  // Find user by ID, update User Budget
  async editBudget({ user, body }, res) {
    console.log(body)
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, },
      { $set: { budget: body.budget } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json(updatedUser);
  },


};
