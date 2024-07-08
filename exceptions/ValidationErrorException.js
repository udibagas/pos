class ValidationErrorException extends Error {
  constructor(err) {
    super("Validation error");
    this.status = 400;
    this.errors = this.parseError(err);
  }

  parseError(err) {
    const errors = {};
    err.errors.forEach((e) => {
      if (!errors[e.path]) errors[e.path] = [];
      errors[e.path].push(e.message);
    });

    return errors;
  }
}

module.exports = ValidationErrorException;
