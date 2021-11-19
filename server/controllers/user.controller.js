const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('./../models/user.model');
const config = require('config');

exports.create = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password || !password2) {
      return res.status(400).send({ error: '400', message: 'Please fill in all fields' });
    }
    const user = await UserModel.findUser({ email });
    if (user) {
      return res.status(409).send({ error: '409', message: 'User already exists' });
    }
    if (password === '' || password !== password2) {
      return res.status(409).send({ error: '409', message: 'Enter valid password, ensure both passwords match' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.createUser({ ...req.body, password: hash });
    const accessToken = jwt.sign({ _id: newUser._id }, config.get('jwtSecret'), {
      expiresIn: 36000,
    });
    res.status(201).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(409).send({ message: 'Could not create user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findUser({ email });
    if (!user) {
      return res.status(409).send({ error: '409', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(409).send({ error: '409', message: 'Invalid credentials' });
    const accessToken = jwt.sign({ _id: user._id }, config.get('jwtSecret'), {
      expiresIn: 36000,
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(406).send({ message: 'Invalid credentials' });
  }
};

exports.loadUser = async (req, res) => {
  try {
    const user = await UserModel.findUser(req.user.email);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(406).send({ message: 'Resource not found' });
  }
};
