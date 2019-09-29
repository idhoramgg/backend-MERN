const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: String,
  password: String,
  email: String
}, {
  timestamps: true
});

const Account = mongoose.model('account', accountSchema)

module.exports = Account;