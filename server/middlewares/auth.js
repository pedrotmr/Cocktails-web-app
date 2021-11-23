const jwt = require('jsonwebtoken');
const UserModel = require('./../models/user.model');
const config = require('config');

exports.authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, config.get('jwtSecret'));
    const user = await UserModel.findUserById(_id);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    console.log('Error authenticating user');
    res.status(401).send('Unauthorized access');
  }
};
