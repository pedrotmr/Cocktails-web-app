const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const config = require('config');

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(409).send({ message: 'User already exists' });
    if (password === '') throw new Error();

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hash });
    const accessToken = jwt.sign({ _id: newUser.id }, config.get('jwtSecret'), {
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
    const user = await User.findOne({ email });
    if (!user) return res.status(409).send({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();
    const accessToken = jwt.sign({ _id: user.id }, config.get('jwtSecret'), {
      expiresIn: 36000,
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(406).send({ message: 'Invalid credentials' });
  }
};
