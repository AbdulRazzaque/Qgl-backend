const Joi = require("joi");
const User = require("../../model/authmodle/user.js");
const bcrypt = require("bcrypt");
const JWT = require("../../services/Jwt.js");

const LoginSchema = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    } 
    //-------------------------------------------chack user-----------------------
    let AccessToken;
    let loginUser
    try {
       loginUser = await User.findOne({ name: req.body.name });

      if (!loginUser) {
        return next(Error("User and Password are not found"));
      }
      const match =  bcrypt.compare(req.body.password, loginUser.password);

      if (!match) {
        return next(Error("User and Password are Wrong"));
      }
      
    AccessToken = JWT.sign({ _id: loginUser._id });
    res.json(loginUser);
    } catch (error) {
      return next(error);
    }
    //============================================match password code here===============================================================
    console.log(loginUser)



  },
};
// export default LoginSchema;
module.exports = LoginSchema;
