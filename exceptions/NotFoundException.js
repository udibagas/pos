class NotFoundException extends Error {
  constructor(message = "Data not found") {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundException;
