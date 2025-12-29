const Joi = require("joi");
const User = require("../../model/authmodle/user.js");
const bcrypt = require("bcrypt");
const JWT = require("../../services/Jwt.js");

const LoginSchema = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
      }),
      password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(new Error(error.details[0].message)); // Return the custom message
    }

    let loginUser;
    try {
      loginUser = await User.findOne({ name: req.body.name });

      if (!loginUser) {
        return next(new Error("User and password do not match"));
      }

      const match = await bcrypt.compare(req.body.password, loginUser.password);

      if (!match) {
        return next(new Error("User and password do not match"));
      }

      const AccessToken = JWT.sign({ _id: loginUser._id, role: loginUser.role });
      res.json({ user: loginUser, token: AccessToken, role: loginUser.role });

    } catch (error) {
      return next(error);
    }
  }
};

module.exports = LoginSchema;

