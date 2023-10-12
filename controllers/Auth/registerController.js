import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import User from "../../model/authmodle/user";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";
import JWT from "../../services/Jwt";
const registerSchema = {
  async register(req, res, next) {
    const { name, email, password } = req.body;

    const RegisterSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    });

    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    ///------check database user already exsit.-----------------------

    try {
      const exist = await User.exists({ email: email });

      if (exist) {
        return next(Error("User Already Exist."));
      }
    } catch (err) {
      return next(err);
    }

    //--------hashed password-----------

    const hashedPassword = await bcrypt.hash(password, 10);

    //==========modle save in a badabase--------------------

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    let AccessToken;
    try {
      const result = await user.save();
      AccessToken = JWT.sign({ _id: result._id });
    } catch (err) {
      return next(err);
    }

    return res.json(user);
  },
};

export default registerSchema;
