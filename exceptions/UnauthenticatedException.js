class UnauthenticatedException extends Error {
  constructor(message = "Unauthenticated") {
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthenticatedException;
