const mongoose = require('mongoose');
require('dotenv').config();
// Connection setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ultimatepocketpal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
