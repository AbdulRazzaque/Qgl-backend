const Joi = require("joi");
const CustomErrorHandler = require("../../services/CustomErrorHandler.js");
const User = require("../../model/authmodle/user.js");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const JWT = require("../../services/Jwt.js");
 
const registerSchema = {
  async register(req, res, next) {
    const { name, email, password, role } = req.body;

    const RegisterSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      role: Joi.string().valid("SuperAdmin", "Admin", "User").optional()
    });

    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Check if user already exists
    try {
      const exist = await User.exists({ email: email });
      if (exist) {
        return next(Error("User Already Exist."));
      }
    } catch (err) {
      return next(err);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Only allow SuperAdmin to set role, otherwise default to 'User'
    let userRole = "User";
    if (req.user && req.user.role === "SuperAdmin" && role) {
      userRole = role;
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });
    let AccessToken;
    try {
      const result = await user.save();
      AccessToken = JWT.sign({ _id: result._id, role: result.role });
    } catch (err) {
      return next(err);
    }

    return res.json(AccessToken);
  },
};

module.exports = registerSchema

