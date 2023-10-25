
// import User from "../../model/authmodle/user.js";
const User = require("../../model/authmodle/user.js");

const userController ={
 

    async me (req,res,next){
        let user;

        try{
      user =  await User.find({_id: req.user._id})
 if(!user){
    return next(Error('User Not Found.'))
 }

        }catch(err){
            return next(err)
        }
   return res.json(user)
    }



}

// export default userController
module.exports = userController