const { compare } = require("bcryptjs");
const { User } = require("../models");
const { sign } = require("jsonwebtoken");
const UnauthenticatedException = require("../exceptions/UnauthenticatedException");
const { SECRET_KEY } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.scope("withPassword").findOneOrFailed({
    where: { email },
  });

  const authenticated = await compare(password, user.password);
  if (!authenticated) throw new UnauthenticatedException();
  const token = sign(user.toJSON(), SECRET_KEY);
  res.status(200).json({ user, token });
};
