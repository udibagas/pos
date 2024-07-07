const { compare } = require("bcryptjs");
const { User } = require("../models");
const { sign } = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({
      where: {
        email,
      },
    });

    if (user && (await compare(password, user.password))) {
      const token = sign(user.toJSON(), SECRET_KEY);
      return res.json({ user, token });
    }

    throw new Error("Username atau password salah");
  } catch (err) {
    next(err.message);
  }
};

exports.logout = (req, res) => {};
