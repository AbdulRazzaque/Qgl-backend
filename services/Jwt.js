// import jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken");


class JWT{
   static sign(payload,expriy= '1y',secrect= process.env.SECRECT){
  return  jwt.sign(payload,secrect,{expiresIn:expriy})

 }
 static verify(payload,secrect= process.env.SECRECT){
    return  jwt.verify(payload,secrect)
  
   }
}


// export default JWT
module.exports = JWT;
