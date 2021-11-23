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

async function updateList(user, drink) {
  const { savedDrinks } = await User.findById(user);
  if (savedDrinks.includes(drink)) {
    const index = savedDrinks.indexOf(drink);
    savedDrinks.splice(index, 1);
    return await User.findByIdAndUpdate(user, { savedDrinks }, { returnDocument: "after" });
  } else {
    return await User.findByIdAndUpdate(user, { $push: { savedDrinks: drink }}, { returnDocument: "after" });
  }
}

module.exports = {
  findUser,
  findUserById,
  createUser,
  updateList
}
