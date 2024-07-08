class UnauthorizedException extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.status = 403;
  }
}

module.exports = UnauthorizedException;
