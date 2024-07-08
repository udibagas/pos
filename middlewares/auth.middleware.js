const { verify } = require("jsonwebtoken");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const { User } = require("../models");
const UnauthenticatedException = require("../exceptions/UnauthenticatedException");
const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthenticatedException();
    const [, token] = authorization.split(" ");
    if (!token) throw new UnauthorizedException();
    const decoded = verify(token, SECRET_KEY);
    const user = await User.findByPkOrFailed(decoded.id);
    req.user = user.toJSON();
    next();
  } catch (error) {
    next(error);
  }
};
