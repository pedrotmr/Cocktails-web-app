const User = require('./../models/user.schema');

async function findUser(email) {
  return await User.findOne({ email });
}

async function findUserById(id) {
  return User.findById(id);
}

async function createUser(user) {
  return await User.create(user);
}

module.exports = {
  findUser,
  findUserById,
  createUser
}
