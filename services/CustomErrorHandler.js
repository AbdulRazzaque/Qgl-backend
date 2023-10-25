class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    (this.status = status), (this.message = message);
  }

  static alreadyExist(message) {
    return next(CustomErrorHandler(409, message));
  }
}

// export default CustomErrorHandler;
module.exports = CustomErrorHandler;

