const mongoose = require('mongoose');
const {MONGOOSE_DB, MONGOOSE_CONNECTION} = require('./envir')

const CONNECTION = MONGOOSE_CONNECTION || `mongodb://localhost:27017/${MONGOOSE_DB}`;

mongoose.connect(CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
module.exports = db;